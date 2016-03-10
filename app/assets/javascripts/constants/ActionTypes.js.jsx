import keyMirror from 'keymirror';

/********************************************
 * === Action Types
 *
 * A list of different Actions that can be
 * dispatched. The name of the Actions should
 * adapt the following naming convention:
 *
 *  INIT_*
 *  Dispatched by components that are mounted
 *  with initial data that should be inserted
 *  into stores.
 *
 *  UPDATE_*
 *  Dispatched when performing a PUT request
 *  to a REST-ful API endpoint.
 *
 *  ADD_*
 *  Dispatched when a new record should be
 *  added to a store as a placeholder for
 *  a new record. But it will NOT call the
 *  API to create the record. So it is only
 *  a local instance.
 *
 *******************************************/

export default keyMirror({
  STATE_CURRENT_USER: null,
  STATE_CURRENT_GAME: null,

  INIT_GAME: null,

  UPDATE_GAME_REQUEST: null,
  UPDATE_GAME_SUCCESS: null,
  UPDATE_GAME_ERROR: null,

  INDEX_USERS: null

});
