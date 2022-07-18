import { useEffect, useState } from 'react';
import { Form } from '../common/form/Form';
import { FormGroup } from '../common/form/FormGroup';
import { FormLabel } from '../common/form/FormLabel';
import { FormInput } from '../common/form/FormInput';
import { FormBtn } from '../common/form/FormBtn';
import { axios } from '../../api/axios';
import { ErrorModal } from '../common/modals/ErrorModal';
import { useAuth } from '../../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import { RefreshVerificationEmailBtn } from './RefreshVerificationEmailBtn';
import { SuccessModal } from '../common/modals/SuccessModal';
import { FormHeadline } from '../common/form/FormHeadline';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showVerifyButton, setShowVerifyButton] = useState(false);
  const [refreshVerificationSuccess, setRefreshVerificationSuccess] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = (location?.state as { from: string })?.from || '/';

  const { setAuth } = useAuth();

  useEffect(() => {
    setError('');
    setRefreshVerificationSuccess(false);
  }, [email, password]);

  const handleLogin = async () => {
    setRefreshVerificationSuccess(false);
    setError('');
    if (!email || !password) {
      setError('Please fill out all forms')
      return;
    }
    try {
      setLoading(true);
      const { data: axiosDataResponse } = await axios.post('auth/login', { email, password }, { withCredentials: true });
      setAuth(axiosDataResponse.data);
      console.log(axiosDataResponse)
      window.localStorage.setItem('stay-logged-in', JSON.stringify(true));
      navigate(from);
    } catch (error: any) {
      const responseStatus = error?.response?.status;
      if (responseStatus === 403) {
        setShowVerifyButton(true);
      }
      const err = error?.response?.data || error;
      setError(err.error || error.message);

    } finally
    {
      setLoading(false)
    }
  }

  const handleRefreshVerificationCode = async () => {
    setError('');
    if (!email) {
      setError('Please fill out all forms');
    }
    try {
      setLoading(true);
      await axios.patch('users/refresh-verification-code', { email });
      setRefreshVerificationSuccess(true);
      setShowVerifyButton(false);
    } catch (error: any) {
      const err = error?.response?.data || error;
      setError(err.error || error.message);
    } finally
    {
      setLoading(false);
    }
  }


  return (
      <>
        <Form>
          <FormHeadline headline="Sign in to your account" />
          <FormGroup>
            <FormLabel htmlFor="email">Email</FormLabel>
            <FormInput value={email} disabled={loading} type="email" setValue={setEmail} />
          </FormGroup>

          <FormGroup>
            <FormLabel htmlFor="password">Password</FormLabel>
            <FormInput value={password} disabled={loading} type="password" setValue={setPassword}/>
          </FormGroup>

          <FormBtn disabled={loading} onClick={ handleLogin }>Login</FormBtn>

          { showVerifyButton && <RefreshVerificationEmailBtn  onClick={ handleRefreshVerificationCode } loading={ loading }/>}
        </Form>

        <ErrorModal close={ () => setError('') }
                    error={ error } />

        <SuccessModal close={ () => setRefreshVerificationSuccess(false) }
                      success={ refreshVerificationSuccess }>
          <strong className="block">Check you mailbox.</strong>
          <p>
            <span className="block">We sent verification to <strong>{ email }</strong></span>
          </p>
        </SuccessModal>

      </>
  );
};
