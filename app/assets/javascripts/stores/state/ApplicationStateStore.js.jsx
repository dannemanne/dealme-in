import { register } from '../../AppDispatcher';
import { createStore, mergeIntoBag, isInBag, getAllByConditions } from '../../utils/StoreUtils';
import selectn from 'selectn';
import ActionTypes from '../../constants/ActionTypes'

const _store = {};


/********************************************
 * Store Definition
 *******************************************/

const ApplicationStateStore = createStore({

  getCurrentUserId() {
    return _store.currentUserId;
  }

});


/********************************************
 * Dispatched Action Listeners
 *******************************************/

ApplicationStateStore.dispatchToken = register(payload => {

  switch(payload.type) {
    case ActionTypes.STATE_CURRENT_USER:
      const userId = selectn('response.user.id', payload);
      if (userId) {
        _store.currentUserId = userId;
        ApplicationStateStore.emitChange(); // Wait for all stores to update?
      }
      break;
  }
});

export default ApplicationStateStore;
