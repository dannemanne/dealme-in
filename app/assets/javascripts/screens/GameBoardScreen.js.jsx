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


// === Utils & Constants
//
//  import { connectToStores } from '../../utils/connectToStores'
//  import DraggableTypes from '../../constants/DraggableTypes';
//
import { connectToStores } from '../utils/connectToStores'


// === Actions
//
//  import { updateRecord } from '../../actions/RecordActions'
//
import { initGameBoard } from '../actions/GameScreenActions'
import { setCurrentUser } from '../actions/ApplicationActions'


// === Stores
//
//  import RecordStore from '../../stores/RecordStore'
//
import GameStore from '../stores/GameStore'



// === Components
//
//  import Component from './Component'
//
import GameBoardComponent from '../components/game/GameBoardComponent'


/********************************************
 * General Functions (for Decorators, etc)
 *******************************************/



/********************************************
 * Main Component
 *******************************************/

class GameBoardScreen extends Component {

  /********************************************
   * === Properties
   *
   * Default properties that defines the Component.
   *
   *******************************************/

  // === Prop Types
  //
  //  PropTypes.array
  //  PropTypes.bool
  //  PropTypes.func
  //  PropTypes.number
  //  PropTypes.object
  //  PropTypes.string
  //
  static propTypes = {
    game:             PropTypes.object.isRequired,
    current_user:     PropTypes.object.isRequired
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
  }

  componentWillMount() {
    const { game, current_user } = this.props;

    initGameBoard({ game: game });
    setCurrentUser({ current_user: current_user });
  }


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
    const { game, current_user } = this.props;
    return <GameBoardComponent game_id={game.id} current_user_id={current_user.id} />;
  }
}

export default GameBoardScreen
