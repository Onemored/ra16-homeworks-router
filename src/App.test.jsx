import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import App from './App.jsx';
import Article from './components/Article.jsx';
import { getBasename } from './routerBase.js';

function renderApp(initialEntry = '/') {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <App />
    </MemoryRouter>,
  );
}

describe('App', () => {
  it.each([
    ['/', 'Главная', 'Гоночное такси', 'мастерством гонщика'],
    ['/drift', 'Дрифт-такси', 'Дрифт-такси', 'королеве дрифта'],
    ['/timeattack', 'Time Attack', 'Гонка Time Attack', 'лучшее время одного круга'],
    ['/forza', 'Forza Karting', 'Forza Karting Sochi', 'системой хронометража'],
  ])('renders the page and active menu item for %s', (path, activeLink, heading, text) => {
    renderApp(path);

    const navigation = screen.getByRole('navigation', { name: 'Основная навигация' });

    expect(screen.getByRole('heading', { name: heading })).toBeInTheDocument();
    expect(screen.getByText(new RegExp(text))).toBeInTheDocument();
    expect(within(navigation).getAllByRole('link')).toHaveLength(4);
    expect(within(navigation).getByRole('link', { name: activeLink })).toHaveClass(
      'menu__item-active',
    );
    expect(within(navigation).getAllByRole('link', { current: 'page' })).toHaveLength(1);
  });

  it('navigates without reloading and updates the active menu item', async () => {
    const user = userEvent.setup();
    renderApp();

    await user.click(screen.getByRole('link', { name: 'Time Attack' }));

    expect(screen.getByRole('heading', { name: 'Гонка Time Attack' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Time Attack' })).toHaveClass('menu__item-active');
    expect(screen.getByRole('link', { name: 'Главная' })).not.toHaveClass('menu__item-active');
  });

  it('renders a 404 page and returns home through its link', async () => {
    const user = userEvent.setup();
    renderApp('/missing');

    expect(screen.getByRole('heading', { name: 'Страница не найдена' })).toBeInTheDocument();
    await user.click(screen.getByRole('link', { name: 'На главную' }));
    expect(screen.getByRole('heading', { name: 'Гоночное такси' })).toBeInTheDocument();
  });
});

describe('Article', () => {
  it('renders its title and children', () => {
    render(
      <Article title="Тестовый заголовок">
        <p>Тестовое содержимое</p>
      </Article>,
    );

    expect(screen.getByRole('heading', { name: 'Тестовый заголовок' })).toBeInTheDocument();
    expect(screen.getByText('Тестовое содержимое')).toBeInTheDocument();
  });
});

describe('getBasename', () => {
  it.each([
    ['/', '/'],
    ['/drift', '/'],
    ['/ra16-homeworks-router', '/ra16-homeworks-router'],
    ['/ra16-homeworks-router/', '/ra16-homeworks-router'],
    ['/ra16-homeworks-router/drift', '/ra16-homeworks-router'],
    ['/ra16-homeworks-router-old', '/'],
  ])('returns the correct base for %s', (pathname, expectedBase) => {
    expect(getBasename(pathname)).toBe(expectedBase);
  });
});
