import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Group from './Group';

const mockStore = configureStore([]);

describe('Group Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      groups: [
        { id: 1, from: 1, to: 10, statuses: [] }
      ]
    });
  });

  it('renders Group component', () => {
    render(
      <Provider store={store}>
        <Group group={{ id: 1, from: 1, to: 10, statuses: [] }} />
      </Provider>
    );

    expect(screen.getByText('Group 1')).toBeInTheDocument();
  });

  it('can change from and to values', () => {
    render(
      <Provider store={store}>
        <Group group={{ id: 1, from: 1, to: 10, statuses: [] }} />
      </Provider>
    );

    fireEvent.change(screen.getByDisplayValue(1), { target: { value: '2' } });
    fireEvent.change(screen.getByDisplayValue(10), { target: { value: '9' } });

    expect(screen.getByDisplayValue('2')).toBeInTheDocument();
    expect(screen.getByDisplayValue('9')).toBeInTheDocument();
  });

  it('displays error message when group 1 does not start from 1', () => {
    render(
      <Provider store={store}>
        <Group group={{ id: 1, from: 2, to: 10, statuses: [] }} />
      </Provider>
    );

    fireEvent.click(screen.getByText('Show Status'));

    expect(screen.getByText('Group 1 has to start from 1.')).toBeInTheDocument();
  });

  it('displays error message for overlapping groups', () => {
    store = mockStore({
      groups: [
        { id: 1, from: 1, to: 5, statuses: [] },
        { id: 2, from: 5, to: 10, statuses: [] }
      ]
    });

    render(
      <Provider store={store}>
        <Group group={{ id: 1, from: 1, to: 5, statuses: [] }} />
        <Group group={{ id: 2, from: 5, to: 10, statuses: [] }} />
      </Provider>
    );

    fireEvent.click(screen.getByText('Show Status'));

    expect(screen.getByText('No gaps or overlaps allowed between groups.')).toBeInTheDocument();
  });

  it('displays error message when last group does not end at 10', () => {
    store = mockStore({
      groups: [
        { id: 1, from: 1, to: 5, statuses: [] },
        { id: 2, from: 6, to: 9, statuses: [] }
      ]
    });

    render(
      <Provider store={store}>
        <Group group={{ id: 1, from: 1, to: 5, statuses: [] }} />
        <Group group={{ id: 2, from: 6, to: 9, statuses: [] }} />
      </Provider>
    );

    fireEvent.click(screen.getByText('Show Status'));

    expect(screen.getByText('Last group should always end at 10.')).toBeInTheDocument();
  });
});
