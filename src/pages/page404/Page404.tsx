import './Page404.scss';
import { useNavigate } from 'react-router-dom';

const Page404 = () => {
  const navigate = useNavigate();

  return (
    <div className="container page404">
      <div className="row center-xs">
        <div className="col-xs-12">
          <div className="box404">
            <div className="info404">
              <h1>404</h1>
              <h3>Page Not Found</h3>
              <button onClick={() => { navigate('/'); }} className="button404">Take Me Home</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page404;
