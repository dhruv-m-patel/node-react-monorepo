import React from 'react';
import { render, screen } from '@testing-library/react';
import Navbar from './Navbar';

describe('Navbar', () => {
  test('it should render in light mode', () => {
    render(<Navbar hasSwitchedToDarkMode={false} />);
    expect(
      screen.getByRole('img', {
        class: 'svg-inline--fa fa-moon fa-w-16 fa-2x ',
      })
    ).toBeDefined();
  });

  test('it should render in dark mode', () => {
    render(<Navbar hasSwitchedToDarkMode />);
    expect(screen.queryAllByRole('img')[1]).toBeInTheDocument();
  });

  // test('it should render in dark mode', () => {
  //   const onDarkModeTriggerClick = jest.fn();
  //   render(
  //     <Navbar onDarkModeTriggerClick={onDarkModeTriggerClick} />
  //   );
  //   const element = screen.getAllByRole('img')[1];
  //   fireEvent.click(element);
  //   expect(onDarkModeTriggerClick).toHaveBeenCalled();
  // });
});
