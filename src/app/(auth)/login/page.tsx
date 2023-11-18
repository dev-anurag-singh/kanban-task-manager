import LoginForm from '@/components/LoginForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login',
};

function LoginPage() {
  return (
    <div className='flex flex-col gap-10 md:p-10 md:bg-grey-light md:rounded-lg'>
      <div className='space-y-3'>
        <h2 className='text-xl text-black'>Login</h2>
        <p className='text-md font-normal text-grey-medium'>
          Add your details below to get back to the app.
        </p>
      </div>
      <LoginForm />
    </div>
  );
}

export default LoginPage;
