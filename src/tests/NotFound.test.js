import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../pages/NotFound';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente NotFound', () => {
  it(
    'Verifica se a página contém um heading h2 com o texto Page requested not found',
    () => {
      renderWithRouter(<NotFound />);

      const titleNotFound = screen.getByRole(
        'heading',
        { name: 'Page requested not found' },
      );
      expect(titleNotFound).toBeInTheDocument();
    },
  );
  it('Verifica se a pagina mostra uma determinada imagem', () => {
    renderWithRouter(<NotFound />);

    const imgNotFound = screen.getByAltText(
      'Pikachu crying because the page requested was not found',
    );
    expect(imgNotFound).toBeInTheDocument();
    expect(imgNotFound.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
