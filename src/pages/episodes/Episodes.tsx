import './Episodes.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Episode } from '../../Models/EpisodeModel';
import EpisodeCard from '../../components/episodeCard/EpisodeCard';
import Loader from '../../components/loader/Loader';

const Episodes = () => {
  // UseStates
  const [episodes, setEpisodes] = useState<Episode[]>();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');

  // Get Episodes API
  const getEpisodes = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://rickandmortyapi.com/api/episode/');
      setEpisodes(response.data.results);
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
    getEpisodes().then();
  }, [searchText]);

  // Handler event
  const handleSearch = () => {
    const newEpisodes = episodes?.filter((namee) => namee.name.toLowerCase().includes(searchText.toLowerCase()));
    setEpisodes(newEpisodes);
  };

  return (
    <div className="main">
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <div className="search-box">
              <input className="input" type="text" onChange={(e) => setSearchText(e.target.value)} />
              <button onClick={handleSearch}>Search Episode</button>
            </div>
          </div>
          <div className="col-xs-12">
            <div className="episode-container">
              {episodes && episodes.map((
                {
                  id, name, episode,
                },
              ) => (
                <EpisodeCard
                  key={id}
                  id={id}
                  name={name}
                  episode={episode}
                />
              ))}
              {errorMessage && setErrorMessage}
              <div className="loader-box">
                {loading && <Loader />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Episodes;
