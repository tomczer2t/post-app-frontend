import { FormEvent, useState } from 'react';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';
import { ErrorModal } from '../common/modals/ErrorModal';
import { SuccessModal } from '../common/modals/SuccessModal';
import { UpdateProfileResponse } from 'types';
import { useAuth } from '../../hooks/useAuth';

export const NewUsername = () => {
  const [isUsernameOpen, setIsUsernameOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const axiosPrivate = useAxiosPrivate();
  const { setAuth } = useAuth();

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    if (!username) {
      setError('Username is required');
      return;
    }
    try {
      const { data } = await axiosPrivate.patch<UpdateProfileResponse>('/users', { username });
      setAuth(prev => {
        if (prev === null) return null;
        return { ...prev, user: { ...prev.user, username: data.username }};
      })
      setUsername('');
      setSuccess(true);
      setIsUsernameOpen(false);
    } catch (e: any) {
      const message = e.response?.data?.error || e.message;
      setError(message);
    }
  }

  const handleChange = (setValue: React.Dispatch<React.SetStateAction<string>>, value: string) => {
    setSuccess(false);
    setError('');
    setValue(value);
  }

  const handleCancel = () => {
    setIsUsernameOpen(false);
    setUsername('');
    setError('');
  }

  return (
    <>
      { !isUsernameOpen ? (
        <button className="w-full p-2 rounded-lg bg-neutral-200 text-slate-600 font-bold text-center border-solid border-2 border-slate-500 my-2"
                onClick={ () => setIsUsernameOpen(true) }>
          Change username
        </button>
      ) : (
        <form onSubmit={ handleSave }>
          <input type="text"
                 required
                 value={ username }
                 onChange={ (e) => handleChange(setUsername, e.target.value)}
                 placeholder="New username"
                 className="w-full p-2 rounded-lg bg-neutral-100 text-slate-600 font-bold text-center border-solid border-2 border-slate-500 my-2" />
          <div className="flex gap-2">
            <button type="submit"
                    className="py-2 px-6 rounded-lg bg-green-500 text-white text-center border-solid border-2 border-green-600 my-2">Save
            </button>
            <button type="submit"
                    className="py-2 px-6 rounded-lg bg-neutral-500 text-white text-center border-solid border-2 border-neutral-600 my-2" onClick={ handleCancel }>Cancel
            </button>
          </div>
        </form>
      ) }
      <ErrorModal close={ () => setError('') } error={ error } />
      <SuccessModal close={ () => setSuccess(false) } success={ success }>
        <p>Successfully changed username</p>
      </SuccessModal>
    </>
  )
}
