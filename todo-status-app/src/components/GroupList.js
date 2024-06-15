import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addGroup } from '../features/groups/groupSlice';
import Group from './Group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const GroupList = () => {
  const groups = useSelector(state => state.groups);
  const dispatch = useDispatch();

  const handleAddGroup = () => {
    dispatch(addGroup());
  };

  return (
    <div className="p-4">
      {groups.map(group => (
        <Group key={group.id} group={group} />
      ))}
      <button onClick={handleAddGroup} className="bg-blue-500 text-white px-4 py-2 rounded mt-4 flex items-center"> 
        <FontAwesomeIcon icon={faPlus} className="mr-2" />
        Add Group
      </button>
    </div>
  );
};

export default GroupList;
