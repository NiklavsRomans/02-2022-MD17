import './Location.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../components/loader/Loader';
import { Location } from '../../Models/Location';

const LocationPage = () => {
  const [location, setLocation] = useState<Location>();
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { id } = useParams();
  const navigate = useNavigate();

  const getLocation = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/location/${id}`);
      setLocation(response.data);
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
    getLocation().then();
  }, [id]);

  return (
    <div className="main">
      {location && (
        <div className="container">
          <div className="row center-xs">
            <div className="col-xs-4">
              <div className="single-episode__container">
                <div className="single-episode__box">
                  <div className="episode__box--content">
                    <p>{`Name: ${location.name}`}</p>
                    <p>{`Type: ${location.type}`}</p>
                    <p>{`Dimension: ${location.dimension}`}</p>
                    <p>{`Created: ${location.created}`}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <div className="episode-btn">
                <button
                  onClick={() => { navigate(`/location/${Number(id) - 1}`); }}
                  className="switch-btn"
                >
                  Prev

                </button>
                <button
                  onClick={() => { navigate(`/location/${Number(id) + 1}`); }}
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

export default LocationPage;
