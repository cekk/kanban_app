import React from 'react';
//alternative method for importing portions from react:
//import React, {Component} from 'react';
import uuid from 'node-uuid';
import Notes from './Notes.jsx';
import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';
import AltContainer from 'alt-container';
export default class App extends React.Component {

  constructor(props) {
    //set an initial static state
    super(props);
    this.state = NoteStore.getState();
  }

  componentDidMount() {
    NoteStore.listen(this.storeChanged);
  }

  componentWillUnmount() {
    NoteStore.unlisten(this.storeChanged);
  }

  storeChanged = (state) => {
    // Without a property initializer `this` wouldn't
    // point at the right context because it defaults to
    // `undefined` in strict mode.
    this.setState(state);
  }
  // We are using an experimental feature known as property
  // initializer here. It allows us to bind the method `this`
  // to point at our *App* instance.
  //
  // Alternatively we could `bind` at `constructor` using
  // a line, such as this.addNote = this.addNote.bind(this);
  addNote = () => {
    // It would be possible to write this in an imperative style.
    // I.e., through `this.state.notes.push` and then
    // `this.setState({notes: this.state.notes})` to commit.
    //
    // I tend to favor functional style whenever that makes sense.
    // Even though it might take more code sometimes, I feel
    // the benefits (easy to reason about, no side effects)
    // more than make up for it.
    // Libraries, such as Immutable.js, go a notch further.
    // this.setState({
    //   //use the spread operator of es6 to add an element to list
    //   notes: [...this.state.notes, {id: uuid.v4(), task: 'New task'}]
    //   //alternative method
    //   // notes: this.state.notes.concat(
    //   //   [
    //   //     {
    //   //       id: uuid.v4(),
    //   //       task: 'New task'
    //   //     }
    //   //   ]
    //   // )
    // }, () => console.log("Note added"));
    NoteActions.create({'task': 'New task'});
  }

  deleteNote(id) {
    // old method
    // this.setState({
    //   notes: this.state.notes.filter(note => note.id !== id)
    // }, () => console.log("Note removed"));

    //store method
    NoteActions.delete(id);
  }

  editNote = (id, task) => {
    // Don't modify if trying set an empty value
    if(!task.trim()) {
      return;
    }
    // old method
    // const notes = this.state.notes.map(note => {
    //   if(note.id === id && task) {
    //     note.task = task;
    //   }
    //   return note;
    // });
    // this.setState({notes});
    NoteActions.update({id, task})
  };

  render() {
    const notes = this.state.notes;
    return (
      <div className="NotesWrapper">
        <h3>Notes:</h3>
        <button className="add-note" onClick={this.addNote}>+</button>
        <Notes notes={notes} onEdit={this.editNote} onDelete={this.deleteNote}/>
      </div>
    );
  }
}
