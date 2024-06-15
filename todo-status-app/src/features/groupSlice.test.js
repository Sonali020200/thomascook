import groupReducer, { addGroup, deleteGroup, updateGroup, setStatuses } from './groupSlice';

describe('group reducer', () => {
  const initialState = [
    { id: 1, from: 1, to: 10, statuses: [] }
  ];

  it('should handle initial state', () => {
    expect(groupReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle addGroup', () => {
    expect(groupReducer(initialState, addGroup())).toHaveLength(2);
  });

  it('should handle deleteGroup', () => {
    const state = groupReducer(initialState, addGroup());
    expect(groupReducer(state, deleteGroup(2))).toHaveLength(1);
  });

  it('should handle updateGroup', () => {
    const state = groupReducer(initialState, updateGroup({ id: 1, from: 1, to: 5 }));
    expect(state[0].to).toEqual(5);
  });

  it('should handle setStatuses', () => {
    const state = groupReducer(initialState, setStatuses({ id: 1, statuses: [{ id: 1, completed: true }] }));
    expect(state[0].statuses).toHaveLength(1);
  });

  it('should not add group if last group does not end at 10', () => {
    const invalidState = [{ id: 1, from: 1, to: 9, statuses: [] }];
    const state = groupReducer(invalidState, addGroup());
    expect(state).toHaveLength(1);
  });

  it('should not add group if there is a gap between groups', () => {
    const invalidState = [{ id: 1, from: 1, to: 5, statuses: [] }];
    const state = groupReducer(invalidState, addGroup({ id: 2, from: 7, to: 10, statuses: [] }));
    expect(state).toHaveLength(1);
  });
});
