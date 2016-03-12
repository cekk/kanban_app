import React from 'react';
import Notes from './Notes.jsx';
import AltContainer from 'alt-container';
import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';
import LaneActions from '../actions/LaneActions';

export default class Lane extends React.Component {

  render() {
    // define lane variable from this.props, and set the other props in "props" const
    const {lane, ...props} = this.props;

    return (
      <div {...props}>
        <div className="lane-header">
          <h4>New lane</h4>
          <div className="lane-add-note">
            <button onClick={this.addNote}>+</button>
          </div>
          <div className="lane-name">{lane.name}</div>
        </div>
        <AltContainer
          stores={[NoteStore]}
          inject={{
            notes: () => NoteStore.getNotesByIds(lane.notes) || []
          }}>
          <Notes onEdit={this.editNote} onDelete={this.deleteNote} />
        </AltContainer>
      </div>
    );
  }

  addNote = (e) => {
    const laneId = this.props.lane.id;
    const note = NoteActions.create({task: "New task"});
    LaneActions.attachToLane({
      noteId: note.id,
      laneId
    });
  }

  editNote(id, task) {
    if(!task.trim()) {
      return;
    }
      NoteActions.update({id, task});
    }

  deleteNote(noteId, e) {
    e.stopPropagation();
    const laneId = this.props.lane.id;
    LaneActions.detachToLane({noteId, laneId});
    NoteActions.delete(id);
  }
}
