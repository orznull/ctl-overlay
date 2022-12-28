import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PlayerOverlay from './pages/PlayerOverlay';
import PlayerOverlayConfig from './pages/PlayerOverlayConfig';
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/overlay" element={<PlayerOverlay />} />
        <Route path="/config" element={<PlayerOverlayConfig />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
