import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = [
  { id: 1, from: 1, to: 10, statuses: [], isComplete: false }
];

export const fetchStatuses = createAsyncThunk(
  'groups/fetchStatuses',
  async (groupId, { getState }) => {
    const group = getState().groups.find(g => g.id === groupId);
    const statuses = await Promise.all(
      Array.from({ length: group.to - group.from + 1 }, (_, i) => 
        axios.get(`https://jsonplaceholder.typicode.com/todos/${group.from + i}`)
          .then(res => ({ id: res.data.id, completed: res.data.completed }))
      )
    );
    return { groupId, statuses };
  }
);

export const fetchAllStatuses = createAsyncThunk(
  'groups/fetchAllStatuses',
  async (_, { dispatch, getState }) => {
    const groups = getState().groups;
    for (const group of groups) {
      await dispatch(fetchStatuses(group.id));
    }
  }
);

const isGroupComplete = (statuses) => {
  return statuses.every(status => status.completed);
};

const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    addGroup: (state, action) => {
      state.push({ ...action.payload, isComplete: false });
    },
    deleteGroup: (state, action) => {
      return state.filter(group => group.id !== action.payload);
    },
    updateGroup: (state, action) => {
      const { id, from, to } = action.payload;
      const group = state.find(group => group.id === id);
      if (group) {
        group.from = from;
        group.to = to;
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchStatuses.fulfilled, (state, action) => {
      const { groupId, statuses } = action.payload;
      const group = state.find(group => group.id === groupId);
      if (group) {
        group.statuses = statuses;
        group.isComplete = isGroupComplete(statuses);
      }
    });
  }
});

export const { addGroup, deleteGroup, updateGroup } = groupsSlice.actions;
export default groupsSlice.reducer;
