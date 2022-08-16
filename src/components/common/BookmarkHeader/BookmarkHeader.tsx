import React from 'react';

interface Props {
  children: React.ReactNode;
}

export const BookmarkHeader = ({ children }: Props) => {
  return (
    <div className="px-4 w-full max-w-[1200px] mx-auto relative text-white mb-8">
      <div className="bg-slate-500 p-4 mt-8 md:px-8 w-full overflow-hidden rounded-md">
        { children }
      </div>
    </div>
  );
};
