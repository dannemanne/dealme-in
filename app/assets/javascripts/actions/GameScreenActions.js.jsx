import { dispatch, dispatchAsync } from '../AppDispatcher';
import ActionTypes from '../constants/ActionTypes';

import * as GameAPI from '../api/GameAPI';


/********************************************
 * === Init Actions
 *******************************************/

export function initGameBoard(json) {
  const normalizedGame = GameAPI.normalizeGame(json.game);

  dispatch(ActionTypes.INIT_GAME, { response: normalizedGame });
  dispatch(ActionTypes.STATE_CURRENT_GAME, { response: { game: json.game } });
}


/********************************************
 * === Record Change Actions
 *******************************************/

export function updateGame(game) {
  dispatchAsync(GameAPI.updateGame(game), {
    request: ActionTypes.UPDATE_GAME_REQUEST,
    success: ActionTypes.UPDATE_GAME_SUCCESS,
    failure: ActionTypes.UPDATE_GAME_ERROR
  });
}


/********************************************
 * === State Change Actions
 *******************************************/


