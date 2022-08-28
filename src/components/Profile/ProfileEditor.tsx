import { useState } from 'react';
import { NewPassword } from './NewPassword';
import { NewEmail } from './NewEmail';
import { NewUsername } from './NewUsername';

export const ProfileEditor = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="my-4">
      { !isOpen && (
        <button className="w-full p-2 rounded-lg bg-neutral-200 text-slate-600 font-bold text-center border-solid border-2 border-slate-500 my-2"
                onClick={ () => setIsOpen(true) }>
          Edit profile
        </button>
      ) }

      { isOpen && (
        <div>

          <div className="border-0 border-b-2 border-solid border-slate-300">
            <NewUsername />
          </div>


          <div className="border-0 border-b-2 border-solid border-slate-300">
            <NewEmail />
          </div>


          <div className="border-0 border-b-2 border-solid border-slate-300">
            <NewPassword />
          </div>


          <button className=" p-2 rounded-lg bg-neutral-200 text-slate-600 font-bold text-center border-solid border-2 border-slate-500 my-2"
                  onClick={ () => setIsOpen(false) }>
            Done edit
          </button>
        </div>
      ) }
    </div>
  );
};
