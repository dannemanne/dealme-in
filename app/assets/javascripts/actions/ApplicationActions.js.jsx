import { dispatch, dispatchAsync } from '../AppDispatcher';
import ActionTypes from '../constants/ActionTypes';

import * as UserAPI from '../api/UserAPI';


/********************************************
 * === Init Actions
 *******************************************/




/********************************************
 * === Record Change Actions
 *******************************************/




/********************************************
 * === State Change Actions
 *******************************************/

export function setCurrentUser(json) {
  const normalizedUser = UserAPI.normalizeUser(json.current_user);

  dispatch(ActionTypes.INDEX_USERS, { response: normalizedUser });
  dispatch(ActionTypes.STATE_CURRENT_USER, { response: { user: json.current_user } });
}
