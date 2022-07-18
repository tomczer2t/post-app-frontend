import React from 'react';
import { Brand } from './Brand/Brand';
import { Menu } from './Menu/Menu';

export const Header = () => {

  return (
    <header className="flex items-center px-4 h-[80px] relative z-50 bg-zinc-50 md:shadow-md">
      <Brand />
      <Menu />
    </header>
  );
};
