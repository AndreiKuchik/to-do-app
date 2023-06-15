import reducer, {
  fetchToDoList,
} from './toDoListSlice';
import Filters from '../core/filtersEnum';
import Statuses from '../core/statusesEnum';

describe('exampleSlice', () => {
  describe('reducers', () => {
    const initialState = {
      toDoList: [],
      status: Statuses.Undefined,
      filter: Filters.All,
    };

    it('initial state changes to loading status when fetchList is pending', () => {
      const action = { type: fetchToDoList.pending.type };
      const state = reducer(initialState, action);
      expect(state.status).toEqual(Statuses.Loading);
    });

    it('state status changes when fetchList is fulfilled successfully', () => {
      const action = { type: fetchToDoList.fulfilled.type };
      const state = reducer(initialState, action);
      expect(state.status).toEqual(Statuses.Succeeded);
    });
  });
});
