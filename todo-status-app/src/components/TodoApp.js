import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Group from './Group';
import { addGroup, fetchAllStatuses } from '../features/groups/groupSlice';
import Popup from './Popup';

const TodoApp = () => {
  const dispatch = useDispatch();
  const groups = useSelector(state => state.groups);
  const [groupIdCounter, setGroupIdCounter] = useState(groups.length + 1);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const allTodosAllocated = () => {
    const totalTodos = groups.reduce((sum, group) => sum + (group.to - group.from + 1), 0);
    return totalTodos >= 10;
  };

  const handleAddGroup = async () => {
    if (allTodosAllocated()) {
      alert('All Todo items are already allocated in groups. Cannot add a new group!');
      return;
    }

    const lastGroup = groups[groups.length - 1];
    const newGroup = { id: groupIdCounter, from: lastGroup.to + 1, to: 10, statuses: [] };

    await dispatch(addGroup(newGroup));
    setShowPopup(true);
    setGroupIdCounter(groupIdCounter + 1);

    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const validateGroups = () => {
    if (groups[0].from !== 1) {
      return 'Group 1 has to start from 1.';
    }
    for (let i = 0; i < groups.length - 1; i++) {
      if (groups[i].to + 1 !== groups[i + 1].from) {
        return 'No gaps or overlaps allowed between groups.';
      }
    }
    if (groups[groups.length - 1].to !== 10) {
      return 'Last group should always end at 10.';
    }
    return '';
  };

  const handleShowStatus = () => {
    const validationError = validateGroups();
    if (validationError) {
      setErrorMessage(validationError);
    } else {
      setErrorMessage('');
      dispatch(fetchAllStatuses());
    }
  };

  return (
    <div className="p-4">
      {groups.map(group => (
        <Group key={group.id} group={group} />
      ))}
      <div className="flex flex-wrap items-center mt-4">
        <button onClick={handleAddGroup} className="bg-blue-500 text-white px-4 py-2 rounded flex items-center mr-4 mb-4 sm:mb-0">
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Add Group
        </button>
        <Popup show={showPopup} onClose={handleClosePopup} />
        <button onClick={handleShowStatus} className="bg-green-500 text-white px-4 py-2 rounded mb-4 sm:mb-0">
          Show Status
        </button>
      </div>
      {errorMessage && <div className="text-red-500 mt-4">{errorMessage}</div>}
    </div>
  );
};

export default TodoApp;
