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
import CardStore from '../../stores/CardStore'
import PlayerStore from '../../stores/PlayerStore'
import UserStore from '../../stores/UserStore'
import ApplicationStateStore from '../../stores/state/ApplicationStateStore'
import GameBoardStateStore from '../../stores/state/GameBoardStateStore'


// === Components
//
//  import Component from './Component'
//
import CardComponent from './CardComponent'
import DeckComponent from './DeckComponent'



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
  const cards = CardStore.getAllBy({ game_id: game_id });
  const players = PlayerStore.getAllBy({ game_id: game_id });
  const current_user = UserStore.get(current_user_id);

  return {
    game,
    cards,
    players,
    current_user
  };
}


/********************************************
 * Main Component
 *******************************************/

class GameBoardComponent extends Component {

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
    current_user:       PropTypes.object.isRequired,
    game:               PropTypes.object.isRequired,
    players:            PropTypes.array.isRequired,
    cards:              PropTypes.array.isRequired
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
    const { game, cards, players, current_user } = props;

    // This component is responsible for grouping and
    // sorting the PointOfMeasures. We can not let child
    // components do the sorting because that would conflict
    // with the reordering of components (DnD) that is
    // handled by this component as well.
    var groupedCards = { deck: [], board: [] };
    players.map(player => { groupedCards[`hand${player.id}`] = []; });

    cards.map(card => {
      const pos = card.position_type == 'hand' ? `hand${card.position_id}` : card.position_type;
      groupedCards[pos].push(card);
    });

    this.setState({
      current_user: current_user,
      game: game,
      groupedCards: groupedCards,
      players: players
    });
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
    const { groupedCards } = this.state;

    return <div className="row">
      <div className="column" style={{ height: '40rem' }}>

        <DeckComponent cards={ groupedCards.deck } />

        {groupedCards.board.map(card => {
          return <CardComponent card={card} />;
        })}


      </div>
    </div>;
  }
}

export default connectToStores([GameStore, CardStore, UserStore, PlayerStore, GameBoardStateStore, ApplicationStateStore], getState)(
  GameBoardComponent
)
