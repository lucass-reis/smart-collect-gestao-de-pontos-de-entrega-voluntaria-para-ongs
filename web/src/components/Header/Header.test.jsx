// Header.test.js
import { render, screen } from '@testing-library/react';
import Header from './Header'; // Importando o componente Header

describe('Header Component', () => {
  test('deve renderizar o componente corretamente', () => {
    render(<Header />); // Renderiza o componente Header

    // Verifica se o elemento com a classe "header" está no documento
    const headerElement = screen.getByRole('banner');
    expect(headerElement).toBeInTheDocument();

    // Verifica se o texto "Contato" está no componente
    const contatoLink = screen.getByText(/Contato/i);
    expect(contatoLink).toBeInTheDocument();

    // Verifica se o texto "Encontre um PEV" está no componente
    const encontraPEVLink = screen.getByText(/Encontre um PEV/i);
    expect(encontraPEVLink).toBeInTheDocument();
  });

  test('deve renderizar o logo dentro do Header', () => {
    render(<Header />);

    // Verifica se o componente Logo está sendo renderizado corretamente
    const logoElement = screen.getByAltText('Logo');
    expect(logoElement).toBeInTheDocument();
  });
});
