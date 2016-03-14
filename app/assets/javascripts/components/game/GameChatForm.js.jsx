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
import ReactSelect from 'react-select'


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
import PlayerStore from '../../stores/PlayerStore'


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

class GameChatForm extends Component {

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

    // === Bind function context
    //
    //  this.moveItem = this.moveItem.bind(this);
    //  this.updateItemOrder = this.updateItemOrder.bind(this);
    //
    this._parseProps = this._parseProps.bind(this);
    this._formOnChange = this._formOnChange.bind(this);
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

  _formOnChange(value) {}


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
    const {  } = this.props;
    const {  } = this.state;

    return (
      <div className="game-chat-form">
        <ReactSelect options={[]} onChange={this._formOnChange} />
      </div>
    );
  }
}

export default GameChatForm
