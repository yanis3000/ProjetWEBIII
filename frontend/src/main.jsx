import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router";
import './css/global.css'; // Créer le fichier, si vous voulez
import Index from './pages/index.jsx';
import Form from './pages/form.jsx'
import Game from './pages/game.jsx'
import MovingSquare from './pages/square.jsx'
import Test from './pages/test.jsx'


createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Routes>
            <Route path="/"     element={<Index />} />
            <Route path="/form" element={<Form />} />
            <Route path="/game" element={<Game />} />
            <Route path="/square" element={<MovingSquare />} />
            <Route path="/test" element={<Test />} />
        </Routes>
    </BrowserRouter>
)
