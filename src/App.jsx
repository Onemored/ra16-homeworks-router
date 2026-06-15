import { Route, Routes } from 'react-router-dom';
import Menu from './components/Menu.jsx';
import Drift from './pages/Drift.jsx';
import Forza from './pages/Forza.jsx';
import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx';
import TimeAttack from './pages/TimeAttack.jsx';

export default function App() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <p className="site-header__eyebrow">Сочи Автодром</p>
        <Menu />
      </header>

      <main className="page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/drift" element={<Drift />} />
          <Route path="/timeattack" element={<TimeAttack />} />
          <Route path="/forza" element={<Forza />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}
