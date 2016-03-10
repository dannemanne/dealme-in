import { register } from '../../AppDispatcher';
import { createStore, mergeIntoBag, isInBag, getAllByConditions } from '../../utils/StoreUtils';
import selectn from 'selectn';
import ActionTypes from '../../constants/ActionTypes'

const _store = {};


/********************************************
 * Store Definition
 *******************************************/

const GameBoardStateStore = createStore({

  getCurrentGameId() {
    return _store.currentGameId;
  }

});


/********************************************
 * Dispatched Action Listeners
 *******************************************/

GameBoardStateStore.dispatchToken = register(payload => {

  switch(payload.type) {
    case ActionTypes.STATE_CURRENT_GAME:
      const gameId = selectn('response.game.id', payload);
      if (gameId) {
        _store.currentGameId = gameId;
        GameBoardStateStore.emitChange(); // Wait for all stores to update?
      }
      break;
  }
});

export default GameBoardStateStore;
