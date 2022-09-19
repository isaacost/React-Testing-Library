import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testando o componente Pokemon', () => {
  it(
    'Verifica se é renderizado um card com as informações de determinado pokémon',
    () => {
      renderWithRouter(<App />);

      const nome = screen.getByText(/Pikachu/i);
      expect(nome).toBeInTheDocument();
      const tipo = screen.getAllByText(/Electric/i);
      expect(tipo.length).toBe(2);
      const peso = screen.getByText(/average weight: 6\.0 kg/i);
      expect(peso).toBeInTheDocument();
      const img = screen.getByRole('img', { name: /pikachu sprite/i });
      expect(img).toBeInTheDocument();
      expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
      expect(img.alt).toBe('Pikachu sprite');
    },
  );
  it(
    'Verifica e o card do pokémon indicado na Pokédex contém um link de navegação',
    () => {
      renderWithRouter(<App />);

      const moreDetails = screen.getByRole('link', { name: /more details/i });
      expect(moreDetails).toBeInTheDocument();
      expect(moreDetails.href).toBe('http://localhost/pokemons/25');
    },
  );
  it(
    'Verifica se ao clicar no link de navegação do pokémon, é feito o redirecionamento',
    () => {
      renderWithRouter(<App />);

      const moreDetails = screen.getByRole('link', { name: /more details/i });
      userEvent.click(moreDetails);

      const pokemonDetails = screen.getByRole('heading', { name: /Pikachu Details/i });
      expect(pokemonDetails).toBeInTheDocument();
    },
  );
  it('Verifica se a URL exibida no navegador muda para /pokemon/<id>', () => {
    const { history } = renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });
  it('Verifica se existe um ícone de estrela nos pokémons favoritados', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);

    const checkbox = screen.getByRole('checkbox', { name: /Pokémon favoritado/i });
    userEvent.click(checkbox);

    const favorite = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(favorite.src).toBe('http://localhost/star-icon.svg');
    expect(favorite.alt).toBe('Pikachu is marked as favorite');
  });
});
