import React from 'react';
import GroupList from './components/GroupList';

const App = () => {
  return (
    <div className="App">
      <header className="bg-gray-600 text-white p-4 text-center">
        <h1>Todo Status App</h1>
      </header>
      <main className="p-4">
        <GroupList />
      </main>
    </div>
  );
};

export default App;
