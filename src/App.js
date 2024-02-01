import './App.css';
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';
import PlayerOverlay from './screens/PlayerOverlay';
import PlayerOverlayConfig from './screens/PlayerOverlayConfig';
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
