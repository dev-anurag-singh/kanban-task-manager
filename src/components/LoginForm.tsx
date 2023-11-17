'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { signIn } from '@/lib/actions/auth-actions';

function LoginForm() {
  const [error, dispatch] = useFormState(signIn, undefined);

  return (
    <form action={dispatch} className='flex flex-col gap-6'>
      <Input type='email' name='email' label='Email Address' />
      <Input type='password' name='password' label='Password' />
      {error && <p className='text-red-dark text-center text-base'>{error}</p>}
      <div className='flex flex-col'>
        <Button />
      </div>
    </form>
  );
}

const Button = () => {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className='bg-purple-dark disabled:cursor-not-allowed disabled:bg-purple-light py-2 text-base text-white hover:bg-purple-light rounded-lg '
    >
      Login
    </button>
  );
};

const Input = ({
  label,
  type,
  name,
}: {
  label: string;
  type: string;
  name: string;
}) => {
  return (
    <div className='flex flex-col gap-2'>
      <label className='text-xs text-grey-medium'>{label}</label>
      <input
        type={type}
        name={name}
        required
        className='px-4 py-2 border outline-none text-base font-semibold border-grey-medium border-opacity-25 rounded-lg'
      />
    </div>
  );
};

export default LoginForm;
