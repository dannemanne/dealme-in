import { register } from '../AppDispatcher';
import { createStore, mergeIntoBag, isInBag, getAllByConditions } from '../utils/StoreUtils';
import selectn from 'selectn';
import ActionTypes from '../constants/ActionTypes'

const _store = {};


/********************************************
 * Store Definition
 *******************************************/

const GameStore = createStore({
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

GameStore.dispatchToken = register(payload => {

  switch(payload.type) {
    case ActionTypes.INIT_GAME:
      const records = selectn('response.entities.games', payload);
      if (records) {
        mergeIntoBag(_store, records);
        GameStore.emitChange(); // Wait for all stores to update?
      }
      break;
  }
});

export default GameStore;
