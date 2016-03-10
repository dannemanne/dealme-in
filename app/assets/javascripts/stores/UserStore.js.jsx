import { register } from '../AppDispatcher';
import { createStore, mergeIntoBag, isInBag, getAllByConditions } from '../utils/StoreUtils';
import selectn from 'selectn';
import ActionTypes from '../constants/ActionTypes'

const _store = {};


/********************************************
 * Store Definition
 *******************************************/

const UserStore = createStore({
  contains(id, fields) {
    return isInBag(_store, id, fields);
  },

  get(id) {
    return _store[id];
  },

  getAllBy(conditions) {
    return getAllByConditions(_store, conditions);
  }

});


/********************************************
 * Dispatched Action Listeners
 *******************************************/

UserStore.dispatchToken = register(payload => {

  switch(payload.type) {
    case ActionTypes.INIT_GAME:
    case ActionTypes.INDEX_USERS:
      const records = selectn('response.entities.users', payload);
      if (records) {
        mergeIntoBag(_store, records);
        UserStore.emitChange(); // Wait for all stores to update?
      }
      break;
  }
});

export default UserStore;
