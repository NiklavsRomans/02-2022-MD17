import './Character.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Character } from '../../Models/CharacterModel';
import Loader from '../../components/loader/Loader';

const CharacterPage = () => {
  const [character, setCharacter] = useState<Character>();
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { id } = useParams();
  const navigate = useNavigate();

  const getCharacter = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
      setCharacter(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.status === 404 ? 'Nothing to show' : error.message;
        setErrorMessage(message);
      } else {
        setErrorMessage('Not Axious error');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCharacter().then();
  }, [id]);

  return (
    <div className="main">
      {character && (
        <div className="container">
          <div className="row middle-xs">
            <div className="col-xs-4">
              <div className="btn-container">
                <button
                  className="switch-btn"
                  onClick={() => { navigate(`/characters/${Number(id) - 1}`); }}
                >
                  Prev

                </button>
              </div>
            </div>
            <div className="col-xs-4">
              <div className="single-card__container">
                <div className={`single-card__box ${character.status.toLowerCase()}`}>
                  <div className="card__box--img">
                    <img src={character.image} alt={character.name} />
                  </div>
                  <div className="card__box--content">
                    <p>{`Name: ${character.name}`}</p>
                    <p>{`Status: ${character.status}`}</p>
                    <p>{`Gender: ${character.gender}`}</p>
                    <p>{`Species: ${character.species}`}</p>
                    <p>{`Origin: ${character.origin.name}`}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xs-4">
              <div className="btn-container">
                <button
                  className="switch-btn"
                  onClick={() => { navigate(`/characters/${Number(id) + 1}`); }}
                >
                  Next

                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="loader-box">
        {loading && <Loader />}
        {errorMessage && <span>{errorMessage}</span>}
      </div>
    </div>
  );
};

export default CharacterPage;
