import image from '../assets/images/5396346.jpg';
import { RegisterForm } from '../components/register/RegisterForm';
import { Link } from 'react-router-dom';

export const RegistrationView = () => {
  return (
    <div className="mb-20">
      <div className="flex flex-col md:flex-row-reverse w-full items-center md:items-start max-w-[1200px] md:pt-20 mx-auto p-4">
        <div className="basis-1/2 opacity-60 md:opacity-100 md:w-1 overflow-hidden absolute -z-10 md:static flex justify-start">
          <img src={image}
               className="block w-full min-w-[350px] max-w-[500px] md:mt-6 md:max-w-full"
               alt="" />
        </div>
        <div className="w-full md:basis-1/2 mt-[200px] md:mt-0">
          <RegisterForm />
        </div>
      </div>
      <p className="text-center text-slate-600">
        Already have an account? Click <Link className="underline" to="/account/login">here</Link> to sign in.
      </p>
    </div>
  );
};
