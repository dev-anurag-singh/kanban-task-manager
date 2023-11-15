import Link from 'next/link';

function LoginPage() {
  return (
    <div className='flex flex-col gap-10 md:p-10 md:bg-grey-light md:rounded-lg'>
      <div className='space-y-3'>
        <h2 className='text-xl text-black'>Login</h2>
        <p className='text-md text-grey-medium'>
          Add your details below to get back to the app.
        </p>
      </div>
      <div>
        <form className='flex flex-col gap-6'>
          <Input type='email' name='email' label='Email Address' />
          <Input type='password' name='password' label='Password' />
          <div className='flex flex-col'>
            <button className='bg-purple-dark py-2 text-base text-white hover:bg-purple-light rounded-lg '>
              Login
            </button>
          </div>
          <div className='flex flex-col items-center'>
            <span>Don&apos;t have an account?</span>
            <Link href='/signup' className='text-purple-dark'>
              Signup here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

// Will seperate it in another component later

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
      <label className='text-sm text-grey-medium font-bold'>{label}</label>
      <input
        type={type}
        name={name}
        className='px-4 py-2 border outline-none font-semibold border-grey-medium border-opacity-25 rounded-lg text-base'
      />
    </div>
  );
};

export default LoginPage;
