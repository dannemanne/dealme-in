/********************************************
 * Dependencies from other libs and components
 *******************************************/

// === General Libraries & Functions
//
//  import ReactDOM from 'react/lib/ReactDOM'
//  import update from 'react/lib/update';
//  import { DragDropContext } from 'react-dnd';
//
import { Component, PropTypes } from 'react'
import ReactDOM from 'react/lib/ReactDOM'
import update from 'react/lib/update';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';


// === Utils & Constants
//
//  import { connectToStores } from '../../utils/connectToStores'
//  import DraggableTypes from '../../constants/DraggableTypes';
//
import { connectToStores } from '../../utils/connectToStores'


// === Actions
//
//  import { updateRecord } from '../../actions/RecordActions'
//
import { updateGame } from '../../actions/GameScreenActions'


// === Stores
//
//  import RecordStore from '../../stores/RecordStore'
//
import GameStore from '../../stores/GameStore'
import PlayerStore from '../../stores/PlayerStore'
import UserStore from '../../stores/UserStore'
import ApplicationStateStore from '../../stores/state/ApplicationStateStore'
import GameBoardStateStore from '../../stores/state/GameBoardStateStore'


// === Components
//
//  import Component from './Component'
//




/********************************************
 * General Functions (for Decorators, etc)
 *******************************************/

// === getState
//
//  Called by connectToStore Decorator when a
//  store is changed. The return value of this
//  function will update the props of the
//  decorated Component.
//
function getState(props) {
  const current_user_id = ApplicationStateStore.getCurrentUserId();
  const current_game_id = GameBoardStateStore.getCurrentGameId();

  const current_game = GameStore.get(current_game_id);
  const current_user = UserStore.get(current_user_id);

  return {
    current_game,
    current_user
  };
}


/********************************************
 * Main Component
 *******************************************/

class GameMenuComponent extends Component {

  /********************************************
   * === Properties
   *
   * Default properties that defines the Component.
   *
   *******************************************/

  // === Prop Types
  //
  //  PropTypes.array.isRequired
  //  PropTypes.bool.isRequired
  //  PropTypes.func
  //  PropTypes.number
  //  PropTypes.object
  //  PropTypes.string
  //
  static propTypes = {
    current_user:       PropTypes.object,
    current_game:       PropTypes.object
  };


  /********************************************
   * === Lifecycle Methods
   *
   * Built-in React methods called during the
   * the life of the component.
   *
   *******************************************/

  constructor(props){
    super();

    // === Bind function context
    //
    //  this.moveItem = this.moveItem.bind(this);
    //  this.updateItemOrder = this.updateItemOrder.bind(this);
    //
    this.getStartReshuffleLink = this.getStartReshuffleLink.bind(this);
    this.getJoinLeaveLink = this.getJoinLeaveLink.bind(this);

    this._startGameClick = this._startGameClick.bind(this);
  }



  /********************************************
   * === Custom Methods
   *
   * Naming conventions for the custom methods
   * is with a leading underscore.
   *
   *******************************************/

  _startGameClick(event) {
    event.preventDefault();
    const { current_game } = this.props;

    if (current_game.status == 'waiting_for_players') {
      const updatedGame = update(current_game, { status: { $set: 'playing' } });
      updateGame(updatedGame);
    }
  }

  getStartReshuffleLink() {
    const { current_game } = this.props;

    if (current_game) {
      if (current_game.status == 'playing') {
        return <li className="active"><a href="#">Re-Shuffle Cards</a></li>;
      } else {
        return <li className="active"><a href="#" onClick={this._startGameClick}>Start Game</a></li>;
      }
    } else {
      return <li><a href="#">Start Game</a></li>;
    }
  }

  getJoinLeaveLink() {
    const { current_game, current_user } = this.props;

    if (current_game && current_user) {
      const players = PlayerStore.getAllBy({ game_id: current_game.id, user_id: current_user.id });

      if (players.length == 0) {
        return <li className="active"><a href="#">Join Game</a></li>;
      } else {
        return <li className="active"><a href="#">Leave Game</a></li>;
      }
    } else {
      return <li><a href="#">Join Game</a></li>;
    }
  }



  /********************************************
   * === Render Method
   *
   * Main function that renders the content of
   * the component.
   *
   *******************************************/

  render(){
    const {  } = this.props;

    const startOrShuffle = this.getStartReshuffleLink();
    const joinOrLeave = this.getJoinLeaveLink();

    return <ul className="right">
      <li className="has-dropdown">
        <a href="#">Game</a>
        <ul className="dropdown">
          { startOrShuffle }

          { joinOrLeave }

          <li className="active">
            <a href="/">Back to Dashboard</a>
          </li>
        </ul>
      </li>
    </ul>;
  }
}

export default connectToStores([GameStore, UserStore, GameBoardStateStore, ApplicationStateStore], getState)(
  GameMenuComponent
)
