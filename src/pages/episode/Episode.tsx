import './Episode.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../components/loader/Loader';
import { Episode } from '../../Models/EpisodeModel';

const EpisodePage = () => {
  const [episode, setEpisode] = useState<Episode>();
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { id } = useParams();
  const navigate = useNavigate();

  const getEpisode = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/episode/${id}`);
      setEpisode(response.data);
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
    getEpisode().then();
  }, [id]);

  return (
    <div className="main">
      {episode && (
        <div className="container">
          <div className="row center-xs">
            <div className="col-xs-4">
              <div className="single-episode__container">
                <div className="single-episode__box">
                  <div className="episode__box--content">
                    <p>{`Name: ${episode.name}`}</p>
                    <p>{`Airdate: ${episode.air_date}`}</p>
                    <p>{`Created: ${episode.created}`}</p>
                    <p>{`Episode: ${episode.episode}`}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <div className="episode-btn">
                <button
                  onClick={() => { navigate(`/episode/${Number(id) - 1}`); }}
                  className="switch-btn"
                >
                  Prev

                </button>
                <button
                  onClick={() => { navigate(`/episode/${Number(id) + 1}`); }}
                  className="switch-btn"
                >
                  Next

                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {loading && <Loader />}
      {errorMessage && <span>{errorMessage}</span>}
    </div>
  );
};

export default EpisodePage;
