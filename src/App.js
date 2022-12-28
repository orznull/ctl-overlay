import './App.css';
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';
import PlayerOverlay from './pages/PlayerOverlay';
import PlayerOverlayConfig from './pages/PlayerOverlayConfig';
const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/overlay" element={<PlayerOverlay />} />
        <Route path="/config" element={<PlayerOverlayConfig />} />
      </Routes>
    </HashRouter>
  )
}

export default App;
