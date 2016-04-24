import React from 'react';
import Editable from './Editable.jsx';
import Note from './Note';
import LaneActions from '../actions/LaneActions';

export default ({notes, onValueClick, onEdit, onDelete}) => {
  return (
    <ul className="notes">{notes.map(note =>
      <Note
        id={note.id}
        key={note.id}
        className="note"
        onMove={LaneActions.move}>
        <Editable
          editing={note.editing}
          value={note.task}
          onEdit={onEdit.bind(null, note.id)}
          onValueClick={onValueClick.bind(null, note.id)}
          onDelete={onDelete.bind(null, note.id)} />
      </Note>
    )}</ul> );
}
