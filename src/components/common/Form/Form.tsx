import React, { FormEvent } from 'react';

interface Props {
  children?: React.ReactNode;
  className?: string;
}

export const Form = ({ children, className = '' }: Props) => {

  return (
    <form onSubmit={ (e) => e.preventDefault() }
          className={ `w-full p-2 md:p-6 flex flex-col gap-y-4 bg-white ${ className }` }>
      { children }
    </form>
  );
};
