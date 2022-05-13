/* eslint-disable react/no-children-prop */
import './Characters.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import CharacterCard from '../../components/characterCard/CharacterCard';
import Loader from '../../components/loader/Loader';
import { Character } from '../../Models/CharacterModel';
import { Info } from '../../Models/InfoModel';

const Characters = () => {
  // UseStates
  const [characters, setCharacters] = useState<Character[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [filteredCharacters, setFilteredCharacters] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [nextPage, setNextPage] = useState<string>('');

  // Get Characters API
  const getCharacters = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/character/${filteredCharacters}`);
      setCharacters(response.data.results);
      if (response.data.info.next === null) {
        setHasMore(false);
      } else {
        setNextPage(response.data.info.next);
        setHasMore(true);
      }
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

  const fetchMoreCharacters = async () => {
    setLoading(true);
    try {
      if (nextPage) {
        const response = await axios.get(nextPage);
        setNextPage(response.data.info.next);
        const data = response.data.results;
        return data;
      }
      setHasMore(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.status === 404 ? '404 not Found' : error.message;
        setErrorMessage(message);
      } else {
        setErrorMessage('Not Axious error');
      }
    }
    return [];
  };

  // Buttons
  const buttons = [
    {
      title: 'All',
      color: 'white',
      id: 1,
      onClick: () => setFilteredCharacters(''),
    },
    {
      title: 'Dead',
      color: '#cc0000',
      id: 2,
      onClick: () => setFilteredCharacters('?status=dead'),
    },
    {
      title: 'Alive',
      color: 'green',
      id: 3,
      onClick: () => setFilteredCharacters('?status=alive'),
    },
    {
      title: 'Unknown',
      color: 'grey',
      id: 4,
      onClick: () => setFilteredCharacters('?status=unknown'),
    },
  ];

  // UseEffect
  useEffect(() => {
    getCharacters().then();
  }, [filteredCharacters]);

  const fetchData = async () => {
    const moreCharacters = await fetchMoreCharacters();
    if (characters) {
      setCharacters([...characters, ...moreCharacters]);
    }
  };

  return (
    <div className="main">
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <div className="button-container">
              {buttons.map((button) => (
                <button
                  className="next-button"
                  onClick={button.onClick}
                  style={{ backgroundColor: button.color }}
                  key={button.id}
                >
                  {button.title}

                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            {characters && (
              <InfiniteScroll
                dataLength={characters.length}
                next={fetchData}
                hasMore={hasMore}
                loader={<h3>.</h3>}
                endMessage={(<p>You seen it all</p>)}
                children={undefined}
              />
            )}
            <div className="loader-box">
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
