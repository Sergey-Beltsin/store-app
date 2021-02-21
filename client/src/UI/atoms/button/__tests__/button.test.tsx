import { render, screen } from '@/lib/tests';
import { Button } from '@/UI/atoms';

describe('Button', () => {
  it('render button component', () => {
    render(<Button>Hello world!</Button>);
    expect(screen.getByText(/hello world!/i)).toBeInTheDocument();
  });
});
