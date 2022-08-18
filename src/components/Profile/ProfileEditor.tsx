import { useState } from 'react';

export const ProfileEditor = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);
  const [isEmailOpen, setIsEmailOpen] = useState(false);
  const [isUsernameOpen, setIsUsernameOpen] = useState(false);

  const handleDoneEdit = () => {
    setIsOpen(false);
    setIsUsernameOpen(false);
    setIsEmailOpen(false);
    setIsPasswordOpen(false);
  };

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
            { !isUsernameOpen ? (
              <button className="w-full p-2 rounded-lg bg-neutral-200 text-slate-600 font-bold text-center border-solid border-2 border-slate-500 my-2"
                      onClick={ () => setIsUsernameOpen(true) }>
                Change username
              </button>
            ) : (
              <form>
                <input type="text"
                       placeholder="New username"
                       className="w-full p-2 rounded-lg bg-neutral-100 text-slate-600 font-bold text-center border-solid border-2 border-slate-500 my-2" />
                <button type="submit"
                        className="py-2 px-6 rounded-lg bg-green-500 text-white text-center border-solid border-2 border-green-600 my-2">Save
                </button>
              </form>
            ) }
          </div>


          <div className="border-0 border-b-2 border-solid border-slate-300">
            { !isEmailOpen ? (
              <button className="w-full p-2 rounded-lg bg-neutral-200 text-slate-600 font-bold text-center border-solid border-2 border-slate-500 my-2"
                      onClick={ () => setIsEmailOpen(true) }>
                Change email
              </button>
            ) : (
              <form>
                <input type="email"
                       placeholder="New email"
                       className="w-full p-2 rounded-lg bg-neutral-100 text-slate-600 font-bold text-center border-solid border-2 border-slate-500 my-2" />
                <input type="password"
                       placeholder="Password"
                       className="w-full p-2 rounded-lg bg-neutral-100 text-slate-600 font-bold text-center border-solid border-2 border-slate-500 my-2" />
                <button type="submit"
                        className="py-2 px-6 rounded-lg bg-green-500 text-white text-center border-solid border-2 border-green-600 my-2">Save
                </button>
              </form>
            ) }
          </div>


          <div className="border-0 border-b-2 border-solid border-slate-300">
            { !isPasswordOpen ? (
              <button className="w-full p-2 rounded-lg bg-neutral-200 text-slate-600 font-bold text-center border-solid border-2 border-slate-500 my-2"
                      onClick={ () => setIsPasswordOpen(true) }>
                Change password
              </button>
            ) : (
              <form>
                <input type="password"
                       placeholder="New password"
                       className="w-full p-2 rounded-lg bg-neutral-100 text-slate-600 font-bold text-center border-solid border-2 border-slate-500 my-2" />
                <input type="password"
                       placeholder="Repeat password"
                       className="w-full p-2 rounded-lg bg-neutral-100 text-slate-600 font-bold text-center border-solid border-2 border-slate-500 my-2" />
                <input type="password"
                       placeholder="Old password"
                       className="w-full p-2 rounded-lg bg-neutral-100 text-slate-600 font-bold text-center border-solid border-2 border-slate-500 my-2" />
                <div className="flex gap-2">
                  <button type="submit"
                          className="py-2 px-6 rounded-lg bg-green-500 text-white text-center border-solid border-2 border-green-600 my-2">Save
                  </button>
                  <button type="submit"
                          className="py-2 px-6 rounded-lg bg-neutral-500 text-white text-center border-solid border-2 border-neutral-600 my-2" onClick={ () => setIsPasswordOpen(false) }>Cancel
                  </button>
                </div>
              </form>
            ) }
          </div>


          <button className=" p-2 rounded-lg bg-neutral-200 text-slate-600 font-bold text-center border-solid border-2 border-slate-500 my-2"
                  onClick={ handleDoneEdit }>
            Done edit
          </button>
        </div>
      ) }
    </div>
  );
};
