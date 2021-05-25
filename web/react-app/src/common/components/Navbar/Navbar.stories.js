import React from 'react';
import Navbar from './Navbar';

export default {
  title: 'Components/Navbar',
  component: Navbar,
};

export const Dark = () => (
  <div style={{ backgroundColor: '#000' }}>
    <Navbar hasSwitchedToDarkMode />
  </div>
);

export const Light = () => <Navbar hasSwitchedToDarkMode={false} />;
