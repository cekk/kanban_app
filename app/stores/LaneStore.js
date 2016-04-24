import uuid from 'node-uuid';
import alt from '../libs/alt';
import LaneActions from '../actions/LaneActions';
import update from 'react-addons-update';

class LaneStore {
  constructor() {
    this.bindActions(LaneActions);
    this.lanes = [];
  }

  create(lane) {
    const lanes = this.lanes;
    lane.id = uuid.v4();
    lane.name = "";
    lane.notes = lane.notes || [];
    this.setState({
      lanes: lanes.concat(lane)
    });
  }

  update(updatedLane) {
    const lanes = this.lanes.map(lane => {
      if (lane.id === updatedLane.id) {
        // Object.assign is used to patch the note data here. It
        // mutates target (first parameter). In order to avoid that,
        // I use {} as its target and apply data on it.
        //
        // Example: {}, {a: 5, b: 3}, {a: 17} -> {a: 17, b: 3}
        //
        // You can pass as many objects to the method as you want.
        return Object.assign({}, lane, updatedLane);
      }
      return lane;
    });
    this.setState({lanes});
    // this is equals to, if the key has the same name of the value variable:
    // this.setState({lanes: lanes});
  }

  delete(id) {
    this.setState({
      lanes: this.lanes.filter(lane => lane.id !== id)
    });
    //WE SHOULD REMOVE ALSO RELATED NOTES FROM NoteStore
  }

  attachToLane({laneId, noteId}) {
    const lanes = this.lanes.map(lane  => {
      if (lane.id === laneId) {
        if (lane.notes.includes(noteId)) {
          console.warn('Already attached note to lane', lanes);
        }
        else {
          lane.notes.push(noteId);
        }
      }
      return lane;
    });
    this.setState({lanes});
  }

  detachFromLane({laneId, noteId}) {
    const lanes = this.lanes.map(lane  => {
      if (lane.id === laneId) {
        lane.notes = lane.notes.filter(note => note.id !== noteId);
      }
      return lane;
    });
    this.setState({lanes});
  }

  move({sourceId, targetId}) {
    const lanes = this.lanes;
    const sourceLane = lanes.filter(lane => lane.notes.includes(sourceId))[0];
    const targetLane = lanes.filter(lane => lane.notes.includes(targetId))[0];
    const sourceNodeIndex = sourceLane.notes.indexOf(sourceId);
    const targetNodeIndex = targetLane.notes.indexOf(targetId);

    if (sourceLane === targetLane) {
      //move in the same lane
      sourceLane.notes = update(sourceLane.notes, {
        //remove note in source index and add it in target index
        $splice: [
          [sourceNodeIndex, 1],
          [targetNodeIndex, 0, sourceId]
        ]
      });
    }
    else {
      //remove the element in source lane
      sourceLane.notes.splice(sourceNodeIndex, 1);
      // and add it in target lane
      targetLane.notes.splice(targetNodeIndex, 0, sourceId);
    }
    this.setState({lanes});
  }

}

export default alt.createStore(LaneStore, 'LaneStore');
