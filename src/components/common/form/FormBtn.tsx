import React from 'react';

interface Props {
  onClick: (() => Promise<void>) | (() => void);
  disabled?: boolean;
  children: React.ReactNode;
  loading?: boolean;
  className?: string;
}

export const FormBtn = ({ onClick, className = '', disabled = false, children }: Props) => {
  return (
    <button disabled={ disabled }
            className={ `text-slate-500 border-solid border-slate-500 w-full rounded py-1 text-lg hover:bg-slate-500 hover:text-white transition-colour duration-150 active:bg-slate-600 disabled:border-slate-300 disabled:text-slate-300 disabled:pointer-events-none ${ className }` }
            onClick={ onClick }>
      { children }
    </button>
  );
};
