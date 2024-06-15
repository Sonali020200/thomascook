import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import GroupManager from './GroupManager';

const mockStore = configureStore([]);

describe('GroupManager Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      groups: {
        groups: [
          { id: 1, from: 1, to: 10, statuses: [] }
        ],
        validationMessage: ''
      }
    });
  });

  it('renders Group component', () => {
    render(
      <Provider store={store}>
        <GroupManager />
      </Provider>
    );

    expect(screen.getByText('Group 1')).toBeInTheDocument();
  });

  it('displays validation message when adding a group with all todos grouped', () => {
    store = mockStore({
      groups: {
        groups: [
          { id: 1, from: 1, to: 10, statuses: [] }
        ],
        validationMessage: ''
      }
    });

    render(
      <Provider store={store}>
        <GroupManager />
      </Provider>
    );

    fireEvent.click(screen.getByText('+ Add Group'));

    expect(screen.getByText('Cannot add more groups, all todos are already grouped.')).toBeInTheDocument();
  });

  it('can change from and to values', () => {
    render(
      <Provider store={store}>
        <GroupManager />
      </Provider>
    );

    fireEvent.change(screen.getByDisplayValue(1), { target: { value: '2' } });
    fireEvent.change(screen.getByDisplayValue(10), { target: { value: '9' } });

    expect(screen.getByDisplayValue('2')).toBeInTheDocument();
    expect(screen.getByDisplayValue('9')).toBeInTheDocument();
  });

  it('displays error message when group 1 does not start from 1', () => {
    store = mockStore({
      groups: {
        groups: [
          { id: 1, from: 2, to: 10, statuses: [] }
        ],
        validationMessage: ''
      }
    });

    render(
      <Provider store={store}>
        <GroupManager />
      </Provider>
    );

    fireEvent.click(screen.getByText('Show Status'));

    expect(screen.getByText('Group 1 has to start from 1.')).toBeInTheDocument();
  });

  it('displays error message for overlapping groups', () => {
    store = mockStore({
      groups: {
        groups: [
          { id: 1, from: 1, to: 5, statuses: [] },
          { id: 2, from: 5, to: 10, statuses: [] }
        ],
        validationMessage: ''
      }
    });

    render(
      <Provider store={store}>
        <GroupManager />
      </Provider>
    );

    fireEvent.click(screen.getByText('Show Status'));

    expect(screen.getByText('No gaps or overlaps allowed between groups.')).toBeInTheDocument();
  });

  it('displays error message when last group does not end at 10', () => {
    store = mockStore({
      groups: {
        groups: [
          { id: 1, from: 1, to: 5, statuses: [] },
          { id: 2, from: 6, to: 9, statuses: [] }
        ],
        validationMessage: ''
      }
    });

    render(
      <Provider store={store}>
        <GroupManager />
      </Provider>
    );

    fireEvent.click(screen.getByText('Show Status'));

    expect(screen.getByText('Last group should always end at 10.')).toBeInTheDocument();
  });
});
