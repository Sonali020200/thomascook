import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Group from './Group';
import { addGroup, fetchAllStatuses } from '../features/groups/groupSlice';

const TodoApp = () => {
  const dispatch = useDispatch();
  const groups = useSelector(state => state.groups);
  const [groupIdCounter, setGroupIdCounter] = useState(groups.length + 1);

  const handleAddGroup = () => {
    const newGroup = { id: groupIdCounter, from: 1, to: 10, statuses: [] };
    dispatch(addGroup(newGroup));
    setGroupIdCounter(groupIdCounter + 1);
  };

  const handleShowStatus = () => {
    dispatch(fetchAllStatuses());
  };

  return (
    <div className="p-4">
      {groups.map(group => (
        <Group key={group.id} group={group} />
      ))}
      <div className="flex items-center mt-4">
        <button onClick={handleAddGroup} className="bg-blue-500 text-white px-4 py-2 rounded flex items-center mr-4">
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Add Group
        </button>
        <button onClick={handleShowStatus} className="bg-green-500 text-white px-4 py-2 rounded">
          Show Status
        </button>
      </div>
    </div>
  );
};

export default TodoApp;
