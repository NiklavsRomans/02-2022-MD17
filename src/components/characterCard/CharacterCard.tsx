import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import './CharacterCard.scss';

type cardProps = {
    id: number
    name: string
    image: string
    status: string
}

const CharacterCard:FC<cardProps> = ({
  id, name, image, status,
}) => {
  const navigate = useNavigate();

  return (
    <div className={`character__card ${status.toLowerCase()}`}>
      <img className="character__card--img" src={image} alt={name} />
      <h2 className="character__card--title">{name}</h2>
      <button className="character__card--btn" onClick={() => { navigate(`/characters/${id}`); }}>Learn More</button>
    </div>
  );
};

export default CharacterCard;
