/* eslint-disable camelcase */
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import './EpisodeCard.scss';

type episodeProps = {
    id: number
    name: string
    episode:string
}

const EpisodeCard:FC<episodeProps> = ({
  id, name, episode,
}) => {
  const navigate = useNavigate();

  return (
    <div className="episode-box">
      <div className="episode-title">
        <h2>{`Name: ${name}`}</h2>
      </div>
      <div className="episode-info">
        <h3>{`Episode: ${episode}`}</h3>
      </div>
      <div className="episode-btn">
        <button onClick={() => { navigate(`/episode/${id}`); }} className="learn-ep">Learn More</button>
      </div>
    </div>
  );
};

export default EpisodeCard;
