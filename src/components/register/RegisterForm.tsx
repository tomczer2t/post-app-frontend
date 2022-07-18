import { Form } from '../common/form/Form';
import { FormGroup } from '../common/form/FormGroup';
import { FormBtn } from '../common/form/FormBtn';
import { FormLabel } from '../common/form/FormLabel';
import { FormInput } from '../common/form/FormInput';
import { FormHeadline } from '../common/form/FormHeadline';
import { useCallback, useEffect, useState } from 'react';
import { ErrorModal } from '../common/modals/ErrorModal';
import { SuccessModal } from '../common/modals/SuccessModal';
import { Link } from 'react-router-dom';
import { axios } from '../../api/axios';


export const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repetition, setRepetition] = useState('');

  const [error, setError] = useState('');
  const [successModal, setSuccessModal] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setError('');
  }, [username, email, password, repetition]);

  const isFormValid = useCallback(() => {
    if (!username || !email || !password || !repetition)
    {
      setError('Please fill out all required forms.');
      return false;
    }
    else if (password.length < 8)
    {
      setError('Password should have at least 8 characters.');
      return false;
    }
    else if (password !== repetition)
    {
      setError('Plase make sure that passwords are equal.');
      return false;
    }
    else
    {
      return true;
    }
  }, [username, email, password, repetition]);

  const register = async () => {
    if (!isFormValid()) return;

    try
    {
      const { data } = await axios.post('/users', { username, email, password });
      setLoading(true);
      console.log(data);
      setSuccessModal(true);
      setRegistrationSuccess(true);
      setPassword('');
      setRepetition('');
    }
    catch (error: any)
    {
      const err = error?.response?.data || error;
      // console.log(err);
      setError(err.error || error.message);
    }
    finally
    {
      setLoading(false);
    }
  };


  return (
    <>
      <Form>
        <FormHeadline headline="Create new account" />

        <ErrorModal close={ () => setError('') }
                    error={ error } />

        <FormGroup>
          <FormLabel htmlFor="username">Username *</FormLabel>
          <FormInput id="username"
                     disabled={ loading || registrationSuccess }
                     value={ username }
                     setValue={ setUsername } />
        </FormGroup>

        <FormGroup>
          <FormLabel htmlFor="email">Email *</FormLabel>
          <FormInput id="email"
                     type="email"
                     disabled={ loading || registrationSuccess }
                     value={ email }
                     setValue={ setEmail } />
        </FormGroup>

        <FormGroup>
          <FormLabel htmlFor="password">Password *</FormLabel>
          <FormInput id="password"
                     type="password"
                     disabled={ loading || registrationSuccess }
                     value={ password }
                     setValue={ setPassword } />
        </FormGroup>

        <FormGroup>
          <FormLabel htmlFor="password-repetition">Repeat password *</FormLabel>
          <FormInput id="password-repetition"
                     type="password"
                     disabled={ loading || registrationSuccess }
                     value={ repetition }
                     setValue={ setRepetition } />
        </FormGroup>

        <FormBtn onClick={ register }
                 disabled={ loading || registrationSuccess }>Register</FormBtn>
      </Form>

      <SuccessModal close={ () => setSuccessModal(false) }
                    success={ successModal }>
        <strong className="block">Successfully registered!</strong>
        <p>
          <span className="block">We sent verification to <strong>{ email }</strong></span>
          <span>Click <Link className="underline" to="/account/login">here</Link> to go to login page</span>
        </p>
      </SuccessModal>
    </>
  );
};
