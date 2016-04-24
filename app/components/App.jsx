import React from 'react';
//alternative method for importing portions from react:
//import React, {Component} from 'react';
import uuid from 'node-uuid';
import LaneActions from '../actions/LaneActions';
import LaneStore from '../stores/LaneStore';
import AltContainer from 'alt-container';
import Lanes from './Lanes.jsx';

import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

@DragDropContext(HTML5Backend)
export default class App extends React.Component {

  render() {
    return (
      <div className="NotesWrapper">
        <h3>Lanes:</h3>
        <button className="add-lane" onClick={this.addLane}>+</button>
        <AltContainer
          stores={[LaneStore]}
          inject={{
            lanes: () => LaneStore.getState().lanes || []
          }}>
          <Lanes />
        </AltContainer>
      </div>
    );
  }

  addLane = () => {
    LaneActions.create({'lane': 'New Lane'});
  }
}
