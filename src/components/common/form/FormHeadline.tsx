import React from 'react';

interface Props {
  headline: string;
  className?: string;
}

export const FormHeadline = ({ headline, className = '' }: Props) => {
  return (
    <h1 className={ `m-0 text-blue-600 text-center ${ className }` }>{ headline }</h1>
  );
};
