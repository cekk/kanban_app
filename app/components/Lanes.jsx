import React from 'react';
import Lane from './Lane.jsx';

export default ({lanes}) => {
  return (
    <div className="lanes">
      {
        lanes.map(lane =>
          <Lane className="lane" key={lane.id} lane={lane}>
            <Lane.Header name={lane.name}></Lane.Header>
            <Lane.Notes notes={lane.notes}></Lane.Notes>
          </Lane>
        )
      }
    </div>
  );
}
