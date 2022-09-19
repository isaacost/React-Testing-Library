import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testando o componente PokemonDetails', () => {
  it(
    'Verifica se as informações detalhadas do pokémon selecionado são mostradas na tela',
    () => {
      renderWithRouter(<App />);
      const moreDetails = screen.getByRole('link', { name: /more details/i });
      userEvent.click(moreDetails);

      const pokemonDetails = screen.getByText(/Pikachu Details/i);
      expect(pokemonDetails).toBeInTheDocument();
      expect(moreDetails).not.toBeInTheDocument();

      const summary = screen.getByRole('heading', { name: /Summary/i });
      expect(summary).toBeInTheDocument();

      const resumo = screen.getByText(/This intelligent Pokémon roasts hard berries/i);
      expect(resumo).toBeInTheDocument();
    },
  );
  it(
    'Verifica se existe uma seção com os mapas contendo as localizações do pokémon',
    () => {
      renderWithRouter(<App />);
      const moreDetails = screen.getByRole('link', { name: /more details/i });
      userEvent.click(moreDetails);

      const location = screen.getByRole(
        'heading',
        { name: /Game Locations of Pikachu/i },
      );
      expect(location).toBeInTheDocument();

      const imagens = screen.getAllByRole('img', { name: /Pikachu Location/i });
      expect(imagens.length).toBe(2);
      expect(imagens[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
      expect(imagens[0].alt).toBe('Pikachu location');
      expect(imagens[1].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
      expect(imagens[1].alt).toBe('Pikachu location');
    },
  );
  it(
    'Verifica se se o usuário pode favoritar um pokémon através da página de detalhes',
    () => {
      renderWithRouter(<App />);
      const moreDetails = screen.getByRole('link', { name: /more details/i });
      userEvent.click(moreDetails);

      const checkbox = screen.getByLabelText(/Pokémon favoritado\?/i);
      expect(checkbox).toBeInTheDocument();
      expect(checkbox.checked).toBe(false);

      userEvent.click(checkbox);
      expect(checkbox.checked).toBe(true);
    },
  );
});
