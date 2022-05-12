import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import HomePage from './pages/homepage/HomePage';
import Characters from './pages/characters/Characters';
import Character from './pages/character/Character';
import Episodes from './pages/episodes/Episodes';
import Episode from './pages/episode/Episode';
import Locations from './pages/locations/Locations';
import LocationPage from './pages/location/Location';
import Page404 from './pages/page404/Page404';

const App = () => (
  <div className="App">
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />
        <Route
          path="/characters"
          element={<Characters />}
        />
        <Route
          path="/characters/:id"
          element={<Character />}
        />
        <Route
          path="/episode"
          element={<Episodes />}
        />
        <Route
          path="/episode/:id"
          element={<Episode />}
        />
        <Route
          path="/location"
          element={<Locations />}
        />
        <Route
          path="/location/:id"
          element={<LocationPage />}
        />
        <Route
          path="*"
          element={<Page404 />}
        />
      </Routes>
    </Router>
  </div>
);

export default App;
