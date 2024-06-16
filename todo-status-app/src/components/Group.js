import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { deleteGroup, updateGroup } from '../features/groups/groupSlice';
import CompleteStatus from '../features/groups/CompleteStatus';

const Group = ({ group, statusVisible }) => {
  const dispatch = useDispatch();
  const groups = useSelector(state => state.groups);

  const handleFromChange = (e) => {
    const from = Number(e.target.value);
    if (from >= 1 && from <= group.to && (group.id === 1 || groups[group.id - 2].to + 1 === from)) {
      dispatch(updateGroup({ id: group.id, from, to: group.to }));
    }
  };

  const handleToChange = (e) => {
    const to = Number(e.target.value);
    if (to <= 10 && to >= group.from && (group.id === groups.length || groups[group.id].from - 1 === to)) {
      dispatch(updateGroup({ id: group.id, from: group.from, to }));
    }
  };

  const handleDelete = () => {
    dispatch(deleteGroup(group.id));
  };

  return (
    <div className="flex flex-wrap items-center mb-4">
      <button onClick={handleDelete} className="text-red-500 mr-2 mb-2 sm:mb-0">
        <FontAwesomeIcon icon={faTrash} />
      </button>
      <span className="mr-2 mb-2 sm:mb-0">Group {group.id}</span>
      <input
        type="number"
        value={group.from}
        onChange={handleFromChange}
        className="border rounded px-2 py-1 mr-2 mb-2 sm:mb-0"
      />
      <span className="mr-2 mb-2 sm:mb-0">-</span>
      <input
        type="number"
        value={group.to}
        onChange={handleToChange}
        className="border rounded px-2 py-1 mr-2 mb-2 sm:mb-0"
      />
      {statusVisible && (
        <div className="ml-0 sm:ml-4 flex flex-wrap">
          {group.statuses.map(status => (
            <div key={status.id} className={`px-2 py-1 rounded ${status.completed ? 'bg-green-300' : 'bg-red-300'} mx-1 mb-2 sm:mb-0`}>
              ({status.id}) {status.completed ? 'True' : 'False'}
            </div>
          ))}
        </div>
      )}
      <CompleteStatus isComplete={group.isComplete} />
    </div>
  );
};

export default Group;
