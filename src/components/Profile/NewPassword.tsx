import { FormEvent, useState } from 'react';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';
import { ErrorModal } from '../common/modals/ErrorModal';
import { SuccessModal } from '../common/modals/SuccessModal';

export const NewPassword = () => {
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [repetition, setRepetition] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const axiosPrivate = useAxiosPrivate();

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    if (newPassword !== repetition) {
      setError('Passwords are different');
      return;
    }
    if (!newPassword || !oldPassword || !repetition) {
      setError('All forms are required');
      return;
    }
    try {
      await axiosPrivate.patch('/users', { newPassword, password: oldPassword });
      setOldPassword('');
      setNewPassword('');
      setRepetition('');
      setSuccess(true);
      setIsPasswordOpen(false);
    } catch (e: any) {
      const message = e.response?.data?.error || e.message;
      console.log(e);
      setError(message);
    }
  }

  const handleChange = (setValue: React.Dispatch<React.SetStateAction<string>>, value: string) => {
    setSuccess(false);
    setError('');
    setValue(value);
  }

  return (
    <>
      { !isPasswordOpen ? (
        <button className="w-full p-2 rounded-lg bg-neutral-200 text-slate-600 font-bold text-center border-solid border-2 border-slate-500 my-2"
                onClick={ () => setIsPasswordOpen(true) }>
          Change password
        </button>
      ) : (
        <form onSubmit={ handleSave }>
          <input type="password"
                 required
                 value={ newPassword }
                 onChange={ (e) => handleChange(setNewPassword, e.target.value)}
                 placeholder="New password"
                 className="w-full p-2 rounded-lg bg-neutral-100 text-slate-600 font-bold text-center border-solid border-2 border-slate-500 my-2" />
          <input type="password"
                 required
                 value={ repetition }
                 onChange={ (e) => handleChange(setRepetition, e.target.value)}
                 placeholder="Repeat password"
                 className="w-full p-2 rounded-lg bg-neutral-100 text-slate-600 font-bold text-center border-solid border-2 border-slate-500 my-2" />
          <input type="password"
                 required
                 value={ oldPassword }
                 onChange={ (e) => handleChange(setOldPassword, e.target.value)}
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
      <ErrorModal close={ () => setError('') } error={ error } />
      <SuccessModal close={ () => setSuccess(false) } success={ success }>
        <p>Successfully changed password</p>
      </SuccessModal>
    </>
  )
}
