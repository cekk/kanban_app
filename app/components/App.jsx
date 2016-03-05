import React from 'react';
//alternative method for importing portions from react:
//import React, {Component} from 'react';
import uuid from 'node-uuid';
import Notes from './Notes.jsx';
import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';
import AltContainer from 'alt-container';

export default class App extends React.Component {

  addNote = () => {
    NoteActions.create({'task': 'New task'});
  }

  deleteNote(id) {
    NoteActions.delete(id);
  }

  editNote = (id, task) => {
    // Don't modify if trying set an empty value
    if(!task.trim()) {
      return;
    }
    NoteActions.update({id, task})
  };

  render() {
    return (
      <div className="NotesWrapper">
        <h3>Notes:</h3>
        <button className="add-note" onClick={this.addNote}>+</button>
        //The AltContainer allows us to bind data to its immediate children.
        <AltContainer
          stores={[NoteStore]}
          inject={{
            notes: () => NoteStore.getState().notes
          }}
          <Notes onEdit={this.editNote} onDelete={this.deleteNote}/>
        </AltContainer>
      </div>
    );
  }
}
