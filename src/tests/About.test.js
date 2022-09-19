import React from 'react';
import { screen } from '@testing-library/react';
import About from '../pages/About';
import renderWithRouter from '../renderWithRouter';

describe('Testando o componente About', () => {
  it('Verifica se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);

    const h2 = screen.getByRole('heading', { name: 'About Pokédex' });
    expect(h2).toBeInTheDocument();
  });
  it('Verifica se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const paragrafos = screen.queryAllByText(/Pokémons/i);
    expect(paragrafos.length).toEqual(2);
  });
  it('Verifica se a pagina conte uma determinada imagem', () => {
    renderWithRouter(<About />);
    const imagem = screen.getByAltText('Pokédex');
    expect(imagem).toBeInTheDocument();
    expect(imagem.src).toBe(
      'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
});
