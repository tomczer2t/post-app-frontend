import { FormEvent, useState } from 'react';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';
import { ErrorModal } from '../common/modals/ErrorModal';
import { SuccessModal } from '../common/modals/SuccessModal';
import { useAuth } from '../../hooks/useAuth';
import { UpdateProfileResponse } from 'types';

export const NewEmail = () => {
  const [isEmailOpen, setIsEmailOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const axiosPrivate = useAxiosPrivate();
  const { auth, setAuth } = useAuth();

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('All forms are required');
      return;
    }
    try {
      const { data } = await axiosPrivate.patch<UpdateProfileResponse>('/users', { email, password });
      setAuth(prev => {
        if (prev === null) return null;
        return { ...prev, user: { ...prev.user, username: data.username } };
      });
      setEmail('');
      setPassword('');
      setSuccess(true);
      setIsEmailOpen(false);
    } catch (e: any) {
      const message = e.response?.data?.error || e.message;
      setError(message);
    }
  };

  const handleChange = (setValue: React.Dispatch<React.SetStateAction<string>>, value: string) => {
    setSuccess(false);
    setError('');
    setValue(value);
  };

  const handleCancel = () => {
    setIsEmailOpen(false);
    setEmail('');
    setPassword('');
    setError('');
  };

  return (
    <>
      { !isEmailOpen ? (
        <button className="w-full p-2 rounded-lg bg-neutral-200 text-slate-600 font-bold text-center border-solid border-2 border-slate-500 my-2"
                onClick={ () => setIsEmailOpen(true) }>
          Change email
        </button>
      ) : (
        <form onSubmit={ handleSave }>
          <input type="email"
                 required
                 value={ email }
                 onChange={ (e) => handleChange(setEmail, e.target.value) }
                 placeholder="New email"
                 className="w-full p-2 rounded-lg bg-neutral-100 text-slate-600 font-bold text-center border-solid border-2 border-slate-500 my-2" />
          <input type="password"
                 required
                 value={ password }
                 onChange={ (e) => handleChange(setPassword, e.target.value) }
                 placeholder="Password"
                 className="w-full p-2 rounded-lg bg-neutral-100 text-slate-600 font-bold text-center border-solid border-2 border-slate-500 my-2" />
          <div className="flex gap-2">
            <button type="submit"
                    className="py-2 px-6 rounded-lg bg-green-500 text-white text-center border-solid border-2 border-green-600 my-2">Save
            </button>
            <button type="submit"
                    className="py-2 px-6 rounded-lg bg-neutral-500 text-white text-center border-solid border-2 border-neutral-600 my-2"
                    onClick={ handleCancel }>Cancel
            </button>
          </div>
        </form>
      ) }
      <ErrorModal close={ () => setError('') }
                  error={ error } />
      <SuccessModal close={ () => setSuccess(false) }
                    success={ success }>
        <p>Verification mail was sent to { auth?.user.email }</p>
      </SuccessModal>
    </>
  );
};
