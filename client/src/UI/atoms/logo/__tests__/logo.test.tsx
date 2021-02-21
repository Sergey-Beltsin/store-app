import { render } from '@/lib/tests';
import { Logo } from '@/UI/atoms';

describe('logo', () => {
  it('should render logo', () => {
    const { container } = render(<Logo />);
    expect(container.firstElementChild).toBeInTheDocument();
  });
});
