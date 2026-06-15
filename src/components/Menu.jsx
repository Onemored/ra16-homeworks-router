import { NavLink } from 'react-router-dom';

const menuItems = [
  { path: '/', label: 'Главная' },
  { path: '/drift', label: 'Дрифт-такси' },
  { path: '/timeattack', label: 'Time Attack' },
  { path: '/forza', label: 'Forza Karting' },
];

function getLinkClass({ isActive }) {
  return `menu__item${isActive ? ' menu__item-active' : ''}`;
}

export default function Menu() {
  return (
    <nav className="menu" aria-label="Основная навигация">
      {menuItems.map(({ path, label }) => (
        <NavLink
          className={getLinkClass}
          end={path === '/'}
          key={path}
          to={path}
        >
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
