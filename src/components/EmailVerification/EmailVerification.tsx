import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { axios } from '../../api/axios';
import image from '../../assets/images/Data_security.jpg';
import { VerificationLoading } from './VerificationLoading';
import { VerificationSuccess } from './VerificationSuccess';
import { VerificationError } from './VerificationError';

export const EmailVerification = () => {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();
  const { verificationCode } = useParams();

  useEffect(() => {
    verifyEmail();
  }, []);

  const verifyEmail = async () => {
    try {
      const { data } = await axios.get(`users/verify/${ verificationCode }`);
      console.log({ data });
      setSuccess(true);
    } catch (error: any) {
      const err = error?.response?.data || error;
      setError(err.error || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center pt-10 flex flex-col md:flex-row justify-center max-w-[1200px] mx-auto md:pt-20 p-4">
      <div className="basis-1/2 flex flex-col justify-center">
        <VerificationLoading loading={loading} />
        <VerificationSuccess success={success}/>
        <VerificationError error={error} />
        {/*<button onClick={ () => setLoading(prev => !prev) }>click</button>*/}
      </div>
      <div className="basis-1/2">
        <img src={ image }
             className="hidden md:block w-full"
             alt="" />
      </div>
    </div>
  );
};
