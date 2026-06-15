import { Link } from 'react-router-dom';
import Article from '../components/Article.jsx';

export default function NotFound() {
  return (
    <Article title="Страница не найдена">
      <p>Похоже, такого маршрута нет.</p>
      <Link className="home-link" to="/">На главную</Link>
    </Article>
  );
}
