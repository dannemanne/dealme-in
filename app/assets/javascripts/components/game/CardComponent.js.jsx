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
import { DragSource } from 'react-dnd';
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



// === Components
//
//  import Component from './Component'
//



/********************************************
 * General Functions (for Decorators, etc)
 *******************************************/



/********************************************
 * Main Component
 *******************************************/

class CardComponent extends Component {

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
    card:         PropTypes.object.isRequired
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
    this._cardClassNames = this._cardClassNames.bind(this);
  }



  /********************************************
   * === Custom Methods
   *
   * Naming conventions for the custom methods
   * is with a leading underscore.
   *
   *******************************************/

  _cardClassNames() {
    const { card } = this.props;

    if (card.facing_up && card.card_type) {
      return 'card '+card.card_type;
    } else {
      return 'card back';
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
    const { card } = this.props;

    const classNames = this._cardClassNames();

    return <div className={classNames} style={{ zIndex: card.pos_z }}>&nbsp;</div>;
  }
}

export default CardComponent
