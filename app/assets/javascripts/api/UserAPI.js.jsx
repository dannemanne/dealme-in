import { Schema, arrayOf, normalize } from 'normalizr';
import { update } from '../utils/APIUtils';

/********************************************
 * === Schema
 *
 * Defines the schemas that are used for this
 * particular API. Also exports functions used
 * to parse object according to the Schema.
 *
 *******************************************/

const UserSchema = new Schema('users');

export function normalizeUser(json) {
  return normalize(json, UserSchema);
}

export function normalizeUsers(json) {
  return normalize(json, arrayOf(UserSchema));
}


/********************************************
 * === API Functions
 *
 * The function calls for the endpoints of the
 * current API
 *
 *******************************************/

//export function updateUser(user) {
//  const url = `/games/${game.id}`;
//
//  return update({ game: game }, url, normalizeGame);
//}
