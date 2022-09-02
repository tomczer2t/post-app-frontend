import React, { ForwardedRef } from 'react';

interface Props {
  type?: 'text' | 'email' | 'password';
  disabled?: boolean;
  id?: string;
  placeholder?: string;
  value: string;
  setValue: (value: string) => void;
  name?: string;
  classname?: string;
  ref?: any;
}

export const FormInput = ({ type = 'text', classname = '', disabled, id, placeholder, value, setValue, name, }: Props) => {
  return (
    <input type={ type }
           className={ `p-2 border-solid border-l-4 border-l-blue-500 border-t-0 border-b-0 border-r-0 bg-gray-100 outline-0 focus:border-slate-500 transition-colors duration-200${ classname }` }
           placeholder={ placeholder }
           disabled={ disabled }
           value={ value }
           onChange={ (e) => setValue(e.target.value) }
           id={ id }
           name={ name }
    />
  );
};
