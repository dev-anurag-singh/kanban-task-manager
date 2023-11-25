import Button from '@/components/Button';

function Home() {
  return (
    <div className='basis-full grid place-items-center'>
      <div className=' max-w-[21rem] text-center space-y-6'>
        <p className='text-lg text-grey-medium'>
          This board is empty. Create a new column to get started.
        </p>
        <Button size='large'>+Add New Column</Button>
      </div>
    </div>
  );
}

export default Home;
