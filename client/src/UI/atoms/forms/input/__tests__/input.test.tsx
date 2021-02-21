import { render } from '@/lib/tests';
import userEvent from '@testing-library/user-event';
import { Input } from '@/UI/atoms/forms';

describe('Input', () => {
  it('render Input component', () => {
    const onChange = jest.fn();
    const { container } = render(<Input value="" onChange={onChange} />);
    const input = container.firstElementChild;
    expect(input).toBeInTheDocument();
  });

  it('should change value on type', () => {
    const onChange = jest.fn();
    const { getByTestId } = render(<Input value="" onChange={onChange} />);
    const input = getByTestId('input');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('');
    userEvent.type(input, 'Hello world!');
    expect(input).toHaveValue('Hello world!');
  });
});
