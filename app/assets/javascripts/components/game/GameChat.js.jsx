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
import {  } from '../../actions/GameScreenActions'


// === Stores
//
//  import RecordStore from '../../stores/RecordStore'
//
import GameStore from '../../stores/GameStore'
import UserStore from '../../stores/UserStore'
import ApplicationStateStore from '../../stores/state/ApplicationStateStore'
import GameBoardStateStore from '../../stores/state/GameBoardStateStore'


// === Components
//
//  import Component from './Component'
//
import GameChatForm from './GameChatForm'


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
  const game_id = GameBoardStateStore.getCurrentGameId();

  const game = GameStore.get(game_id);
  const current_user = UserStore.get(current_user_id);

  return {
    game,
    current_user
  };
}


/********************************************
 * Main Component
 *******************************************/

class GameChat extends Component {

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
    game:               PropTypes.object
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

    this.state = {};

    // === Bind function context
    //
    //  this.moveItem = this.moveItem.bind(this);
    //  this.updateItemOrder = this.updateItemOrder.bind(this);
    //
    this._parseProps = this._parseProps.bind(this);
  }

  componentWillMount() {
    this._parseProps(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this._parseProps(nextProps);
  }

  // === Parsing Props
  //
  //  Takes care of component specific adjustment of
  //  props that parent components does not need to
  //  know about. An example can be sorting or grouping
  //  of records.
  //
  _parseProps(props) {
    const {  } = props;

    this.setState({

    });
  }


  /********************************************
   * === Event Methods
   *
   * Event and Callback methods
   *
   *******************************************/



  /********************************************
   * === Custom Methods
   *
   * Naming conventions for the custom methods
   * is with a leading underscore.
   *
   *******************************************/




  /********************************************
   * === Render Method
   *
   * Main function that renders the content of
   * the component.
   *
   *******************************************/

  render(){
    const { current_user, game } = this.props;
    const {  } = this.state;

    return (
      <div className="game-chat">
        <GameChatForm game={game}  current_user={current_user} />
      </div>
    );
  }
}

export default connectToStores([ApplicationStateStore, GameBoardStateStore], getState)(
  GameChat
)
