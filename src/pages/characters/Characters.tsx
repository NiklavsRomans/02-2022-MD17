import './Characters.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import CharacterCard from '../../components/characterCard/CharacterCard';
import Loader from '../../components/loader/Loader';
import { Character } from '../../Models/CharacterModel';

const Characters = () => {
  // UseStates
  const [characters, setCharacters] = useState<Character[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [filteredCharacters, setFilteredCharacters] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Buttons
  const buttons = [
    {
      title: 'All',
      bgColor: 'white',
      onClick: () => setFilteredCharacters(''),
    },
    {
      title: 'Alive',
      bgColor: 'green',
      onClick: () => setFilteredCharacters('?status=alive'),
    },
    {
      title: 'Dead',
      bgColor: '#cc0000',
      onClick: () => setFilteredCharacters('?status=dead'),
    },
    {
      title: 'Unknown',
      bgColor: 'grey',
      onClick: () => setFilteredCharacters('?status=unknown'),
    },
  ];

  // Get Characters API
  const getCharacters = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/character/${filteredCharacters}`);
      setCharacters(response.data.results);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.status === 404 ? 'Nothing to dislplay' : error.message;
        setErrorMessage(message);
      } else {
        setErrorMessage('Not Axious error');
      }
    } finally {
      setLoading(false);
    }
  };

  // UseEffect
  useEffect(() => {
    getCharacters().then();
  }, [filteredCharacters]);

  return (
    <div className="main">
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <div className="button-container">
              {buttons.map((button) => (
                <button
                  className="filter-button"
                  onClick={button.onClick}
                  style={{ backgroundColor: button.bgColor }}
                  key={button.title}
                >
                  {button.title}

                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <div className="box">
              {loading && <Loader />}
              <div className="card-container">
                {characters && characters.map((
                  {
                    id, name, image, status,
                  },
                ) => (
                  <CharacterCard
                    key={id}
                    id={id}
                    name={name}
                    image={image}
                    status={status}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {errorMessage && <span>{errorMessage}</span>}
    </div>
  );
};

export default Characters;
