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

const GameSchema = new Schema('games');
const UserSchema = new Schema('users');
const PlayerSchema = new Schema('players');
const CardSchema = new Schema('cards');

PlayerSchema.define({
  user: UserSchema
});

GameSchema.define({
  created_by: UserSchema,
  players: arrayOf(PlayerSchema),
  cards: arrayOf(CardSchema)
});

export function normalizeGame(json) {
  return normalize(json, GameSchema);
}

export function normalizeGames(json) {
  return normalize(json, arrayOf(GameSchema));
}


/********************************************
 * === API Functions
 *
 * The function calls for the endpoints of the
 * current API
 *
 *******************************************/

export function updateGame(game) {
  const url = `/games/${game.id}`;

  return update({ game: game }, url, normalizeGame);
}
