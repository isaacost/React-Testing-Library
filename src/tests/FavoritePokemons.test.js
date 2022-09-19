import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import FavoritePokemons from '../pages/FavoritePokemons';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testando o componente FavoritePokemons', () => {
  it('Verifica se é exibida na tela a mensagem No favorite pokemon found', () => {
    renderWithRouter(<FavoritePokemons />);

    const noFavorite = screen.getByText('No favorite pokemon found');

    expect(noFavorite).toBeInTheDocument();
  });
  it('Verifica se são exibidos todos os cards de pokémons favoritados', () => {
    renderWithRouter(<App />);

    const moreDetail = screen.getByRole('link', { name: /more details/i });
    expect(moreDetail).toBeInTheDocument();
    userEvent.click(moreDetail);

    const checkbox = screen.getByRole('checkbox', { name: /Pokémon favoritado/i });
    expect(checkbox).toBeInTheDocument();
    userEvent.click(checkbox);

    const favorites = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(favorites).toBeInTheDocument();
    userEvent.click(favorites);

    const pokemonFavorito = screen.queryAllByTestId('pokemon-name');
    expect(pokemonFavorito.length).toEqual(1);
  });
});
