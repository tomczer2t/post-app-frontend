import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { axios } from '../../api/axios';
import { VerificationLoading } from '../EmailVerification/VerificationLoading';
import image from '../../assets/images/Data_security.jpg';
import { Verification } from '../common/Verification/Verification';
import { useAuth } from '../../hooks/useAuth';

export const ChangeEmailVerification = () => {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const { auth } = useAuth();

  const { verificationCode } = useParams();

  useEffect(() => {
    void verifyEmail();
  }, []);

  const verifyEmail = async () => {
    try {
      await axios.get(`users/verify/email/${ verificationCode }`);
      setMessage('Email successfully changed.');
      setSuccess(true);
    } catch (error: any) {
      console.log({ error });
      const err = error?.response?.data || error;
      setSuccess(false);
      setMessage(err.error || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center pt-10 flex flex-col md:flex-row justify-center max-w-[1200px] mx-auto md:pt-20 p-4">
      <div className="basis-1/2 flex flex-col justify-center">
        <VerificationLoading loading={ loading } />
        <Verification isOpen={ !loading }>
          <h2 className={ `text-${ success ? 'green' : 'red' }-600` }>{ message }</h2>
          { !auth ? (
            <Link to="/account/login">
              <button className={ `font-bold rounded-md border-${ success ? 'green' : 'red' }-700 text-${ success ? 'green' : 'red' }-700 border-solid px-6 py-2 bg-${ success ? 'green' : 'red' }-200` }>
                Sign in
              </button>
            </Link>
          ) : (
            <Link to="/">
              <button className={ `font-bold rounded-md border-${ success ? 'green' : 'red' }-700 text-${ success ? 'green' : 'red' }-700 border-solid px-6 py-2 bg-${ success ? 'green' : 'red' }-200` }>
                Go Home
              </button>
            </Link>
          ) }
        </Verification>
      </div>
      <div className="basis-1/2">
        <img src={ image }
             className="hidden md:block w-full"
             alt="" />
      </div>
    </div>
  );
};
