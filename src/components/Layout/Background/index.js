import React from 'react';
import DarkBlueBackground from './DarkBlue';
import LightBlueBackground from './LightBlue';
import PeopleBackground from './People';
import PlainBackground from './Plain';

export default function Background({ children, color, size }) {
    const background = {
      'Plain': PlainBackground,
      'DarkBlue': DarkBlueBackground,
      'LightBlue': LightBlueBackground,
      'People': PeopleBackground,
    };
    const LayoutBackground = background[color] || PlainBackground;
    return (
      <LayoutBackground size={size}>
        {children}
      </LayoutBackground>
    )
}