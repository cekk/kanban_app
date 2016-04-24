import React from 'react';
import Notes from './Notes.jsx';
import Editable from './Editable';
import AltContainer from 'alt-container';
import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';
import LaneActions from '../actions/LaneActions';

import {DropTarget} from 'react-dnd';
import ItemTypes from '../constants/itemTypes';

const noteTarget = {
  hover(targetProps, monitor) {
    const targetId = targetProps.id;
    const sourceProps = monitor.getItem();
    const sourceId = sourceProps.id;
  }
};

@DropTarget(ItemTypes.NOTE, noteTarget, (connect) => ({
  connectDropTarget: connect.dropTarget()
}))

class Lane extends React.Component {
  render() {
    // define lane variable from this.props, and set the other props in "props" const
    const {connectDropTarget, lane, ...props} = this.props;
    return connectDropTarget(
      <div {...props}>
        <div className="lane-header" onClick={this.activateLaneEdit}>
          <Editable className="lane-name"
                    editing={lane.editing}
                    value={lane.name}
                    onEdit={this.editName}>

          </Editable>
          <div className="lane-add-note">
            <button onClick={this.addNote}>+</button>
          </div>
          <div className="lane-delete">
            <button onClick={this.deleteLane}>X</button>
          </div>
        </div>
        <AltContainer
          stores={[NoteStore]}
          inject={{
            notes: () => NoteStore.getNotesByIds(lane.notes) || []
          }}>
          <Notes
            onEdit={this.editNote}
            onDelete={this.deleteNote}
            onValueClick={this.activateNoteEdit}/>
        </AltContainer>
      </div>
    );
  }

  addNote = (e) => {
    // If note is added, avoid opening lane name edit by stopping
    // event bubbling in this case.
    e.stopPropagation();
    const laneId = this.props.lane.id;
    const note = NoteActions.create({task: "New task"});
    LaneActions.attachToLane({
      noteId: note.id,
      laneId
    });
  }

  editName = (name) => {
    const laneId = this.props.lane.id;
    if(!name.trim) {
      LaneActions.update({id: laneId, editing: false});
      return;
    }
    LaneActions.update({id: laneId, name, editing: false});
  }

  deleteLane = () => {
    const laneId = this.props.lane.id;
    LaneActions.delete(laneId);
  };

  activateLaneEdit = () => {
    const laneId = this.props.lane.id;
    LaneActions.update({id: laneId, editing: true});
  };

  activateNoteEdit(id) {
    NoteActions.update({id, editing: true});
  };

  editNote(id, task) {
    if(!task.trim()) {
      NoteActions.update({id, editing: false});
      return;
    }
    NoteActions.update({id, task, editing: false});
  }

  deleteNote(noteId, e) {
    e.stopPropagation();
    const laneId = this.props.lane.id;
    LaneActions.detachToLane({noteId, laneId});
    NoteActions.delete(id);
  }
}

Lane.Header = class LaneHeader extends React.Component {
  render() {
    // define lane variable from this.props, and set the other props in "props" const
    const {lane, ...props} = this.props;
    return (
      <div className="lane-header" onClick={this.activateLaneEdit}>
        <Editable className="lane-name"
                  editing={lane.editing}
                  value={lane.name}
                  onEdit={this.editName}>

        </Editable>
        <div className="lane-add-note">
          <button onClick={this.addNote}>+</button>
        </div>
        <div className="lane-delete">
          <button onClick={this.deleteLane}>X</button>
        </div>
      </div>
    );
  }
}

Lane.Notes = class LaneNotes extends React.Component {
  render() {
    // define lane variable from this.props, and set the other props in "props" const
    const {lane, ...props} = this.props;
    return (
      <AltContainer
        stores={[NoteStore]}
        inject={{
          notes: () => NoteStore.getNotesByIds(lane.notes) || []
        }}>
        <Notes
          onEdit={this.editNote}
          onDelete={this.deleteNote}
          onValueClick={this.activateNoteEdit}/>
      </AltContainer>
    );
  }
}

export default Lane;
