import React from 'react';

interface Props {
  children: React.ReactNode;
  htmlFor?: string;
}

export const FormLabel = ({ children, htmlFor }: Props) => {
  return (
    <label htmlFor={ htmlFor }>{ children }</label>
  );
};
