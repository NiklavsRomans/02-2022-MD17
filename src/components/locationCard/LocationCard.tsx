import './LocationCard.scss';

import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

type locationProps = {
    id: number
    name: string
    type:string
}

const LocationCard:FC<locationProps> = ({
  id, name, type,
}) => {
  const navigate = useNavigate();

  return (
    <div className="episode-box">
      <div className="episode-title">
        <h2>{`Name: ${name}`}</h2>
      </div>
      <div className="episode-info">
        <h3>{`Type: ${type}`}</h3>
      </div>
      <div className="episode-btn">
        <button onClick={() => { navigate(`/location/${id}`); }} className="learn-ep">Learn More</button>
      </div>
    </div>
  );
};

export default LocationCard;
