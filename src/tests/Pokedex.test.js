import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testando o componente Pokedex', () => {
  it('Verifica se a página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);

    const h2 = screen.getByRole('heading', { name: /Encountered pokémons/i });
    expect(h2).toBeInTheDocument();
  });
  it('Verifica se é exibido o próximo pokémon da lista', () => {
    const pokemons = ['Charmander', 'Caterpie', 'Ekans', 'Alakazam', 'Mew',
      'Rapidash', 'Snorlax', 'Dragonair', 'Pikachu'];
    renderWithRouter(<App />);

    const button = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(button).toBeInTheDocument();
    userEvent.click(button);

    pokemons.forEach((pokemon) => {
      const pokemonAtual = screen.getByText(pokemon);
      expect(pokemonAtual).toBeInTheDocument();
      userEvent.click(button);
    });
  });
  it('Verifica se é mostrado apenas um pokémon por vez', () => {
    renderWithRouter(<App />);

    const pokemons = screen.getAllByTestId('pokemon-name');
    expect(pokemons.length).toBe(1);
  });
  it('Verifica se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);

    const buttonFiltro = screen.getAllByTestId('pokemon-type-button');
    const quantidadeFiltro = 7;
    expect(buttonFiltro.length).toBe(quantidadeFiltro);

    const buttonAll = screen.getByRole('button', { name: /all/i });
    expect(buttonAll).toBeInTheDocument();

    expect(buttonFiltro[0]).toHaveTextContent('Electric');
    expect(buttonFiltro[1]).toHaveTextContent('Fire');
    expect(buttonFiltro[2]).toHaveTextContent('Bug');
    expect(buttonFiltro[3]).toHaveTextContent('Poison');
    expect(buttonFiltro[4]).toHaveTextContent('Psychic');
    expect(buttonFiltro[5]).toHaveTextContent('Normal');
    expect(buttonFiltro[6]).toHaveTextContent('Dragon');

    userEvent.click(buttonFiltro[3]);

    const pokemon = screen.getByText('Ekans');
    expect(pokemon).toBeInTheDocument();
  });
  it('Verifica se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const buttonAll = screen.getByRole('button', { name: /all/i });
    expect(buttonAll).toHaveTextContent('All');

    userEvent.click(buttonAll);

    const pokemon = screen.getByText('Pikachu');
    expect(pokemon).toBeInTheDocument();
  });
});
