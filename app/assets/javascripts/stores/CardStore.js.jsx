import { register } from '../AppDispatcher';
import { createStore, mergeIntoBag, isInBag, getAllByConditions } from '../utils/StoreUtils';
import selectn from 'selectn';
import ActionTypes from '../constants/ActionTypes'

const _store = {};


/********************************************
 * Store Definition
 *******************************************/

const CardStore = createStore({
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

CardStore.dispatchToken = register(payload => {

  switch(payload.type) {
    case ActionTypes.INIT_GAME:
    case ActionTypes.UPDATE_GAME_SUCCESS:
      const records = selectn('response.entities.cards', payload);
      if (records) {
        mergeIntoBag(_store, records);
        CardStore.emitChange(); // Wait for all stores to update?
      }
      break;
  }
});

export default CardStore;
