import React from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { deleteGroup, updateGroup } from '../features/groups/groupSlice';

const Group = ({ group }) => {
  const dispatch = useDispatch();

  const handleFromChange = (e) => {
    const from = Number(e.target.value);
    if (from >= 1 && from <= group.to) {
      dispatch(updateGroup({ id: group.id, from, to: group.to }));
    }
  };

  const handleToChange = (e) => {
    const to = Number(e.target.value);
    if (to <= 10 && to >= group.from) {
      dispatch(updateGroup({ id: group.id, from: group.from, to }));
    }
  };

  const handleDelete = () => {
    dispatch(deleteGroup(group.id));
  };

  return (
    <div className="flex items-center mb-4">
      <button onClick={handleDelete} className="text-red-500 mr-2">
        <FontAwesomeIcon icon={faTrash} />
      </button>
      <span className="mr-2">Group {group.id}</span>
      <input
        type="number"
        value={group.from}
        onChange={handleFromChange}
        className="border rounded px-2 py-1 mr-2"
      />
      <span className="mr-2">-</span>
      <input
        type="number"
        value={group.to}
        onChange={handleToChange}
        className="border rounded px-2 py-1 mr-2"
      />
      <div className="ml-4 flex">
        {group.statuses.map(status => (
          <div key={status.id} className={`px-2 py-1 rounded ${status.completed ? 'bg-green-300' : 'bg-red-300'} mx-1`}>
            ({status.id}) {status.completed ? 'True' : 'False'}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Group;
