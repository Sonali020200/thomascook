import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import groupReducer from './features/groups/groupSlice';
import './index.css';
import TodoApp from './components/TodoApp';

const store = configureStore({
  reducer: {
    groups: groupReducer
  }
});

ReactDOM.render(
  <Provider store={store}>
    <TodoApp />
  </Provider>,
  document.getElementById('root')
);
