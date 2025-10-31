import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router";
import './css/global.css'; // Créer le fichier, si vous voulez
import Index from './pages';
import Form from './pages'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/form" element={<Form />} />
        </Routes>
    </BrowserRouter>
)