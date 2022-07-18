import { LoginForm } from '../components/login/LoginForm';
import image from '../assets/images/5394269.png';

import { Link } from 'react-router-dom';

export const LoginView = () => {
  return (
  <div className="mb-20">
    <div className="flex flex-col md:flex-row-reverse w-full items-center md:items-start max-w-[1200px] md:pt-20 mx-auto p-4">
      <div className="basis-1/2 opacity-60 md:opacity-100 md:w-1 overflow-hidden absolute -z-10 md:static flex justify-start">
        <img src={image}
             className="block w-full min-w-[350px] max-w-[500px] md:max-w-full"
             alt="" />
      </div>
      <div className="w-full md:basis-1/2 mt-[200px] md:mt-0">
        <LoginForm />
      </div>
    </div>
    <p className="text-center text-slate-600">
      Don't have an accout yet? Click <Link className="underline" to="/account/register">here</Link> to sign up.
    </p>
  </div>
  );
};
