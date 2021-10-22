import { render, screen } from '@testing-library/react';
import App from './App';

test('renderiza interface', () => {
  render(<App />);

  const tituloEl = screen.getByText(/kanban do projeto/i);
  expect(tituloEl).toBeInTheDocument();
});
