import React from 'react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testando o componente App', () => {
  it(
    ' verifica se o topo da aplicação contém um conjunto fixo de links de navegação',
    () => {
      renderWithRouter(<App />);

      const home = screen.getByRole('link', { name: 'Home' });
      const about = screen.getByRole('link', { name: 'About' });
      const favorite = screen.getByRole('link', { name: 'Favorite Pokémons' });

      expect(home).toBeInTheDocument();
      expect(about).toBeInTheDocument();
      expect(favorite).toBeInTheDocument();
    },
  );
  it('Verifica se ao clicar em Home é direcionado para a rota /', () => {
    const { history } = renderWithRouter(<App />);

    const home = screen.getByRole('link', { name: 'Home' });
    expect(home).toBeInTheDocument();
    userEvent.click(home);

    const { pathname } = history.location;

    expect(pathname).toBe('/');
  });
  it('Verifica se ao clicar em About é direcionado para a rota /about', () => {
    const { history } = renderWithRouter(<App />);

    const about = screen.getByRole('link', { name: 'About' });
    expect(about).toBeInTheDocument();
    userEvent.click(about);

    const { pathname } = history.location;

    expect(pathname).toBe('/about');
  });
  it(
    'Verifica se ao clicar em Favorite Pokémons é direcionado para a rota /favorites',
    () => {
      const { history } = renderWithRouter(<App />);

      const favorites = screen.getByRole('link', { name: 'Favorite Pokémons' });
      expect(favorites).toBeInTheDocument();
      userEvent.click(favorites);

      const { pathname } = history.location;

      expect(pathname).toBe('/favorites');
    },
  );
  it('Verifica se renderiza NotFound ao entrar em uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);

    const URL_INVALID = '/desconhecida';
    act(() => {
      history.push(URL_INVALID);
    });

    const titleNotFound = screen.getByRole(
      'heading',
      { name: 'Page requested not found' },
    );
    expect(titleNotFound).toBeInTheDocument();

    const imgNotFound = screen.getByRole(
      'img',
      { alt: 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif' },
    );
    expect(imgNotFound).toBeInTheDocument();
  });
});
