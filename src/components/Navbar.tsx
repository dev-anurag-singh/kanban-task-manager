import { LogoFull, LogoSmall } from './Logo';
import EllipsisVertical from '@/icons/EllipsisVertical.svg';
import ArrowDown from '@/icons/ArrowDown.svg';
import IconPlus from '@/icons/IconPlus.svg';
import Button from './Button';

function Navbar() {
  return (
    <nav className='flex'>
      <div className='hidden md:grid place-content-center md:w-64 lg:w-80 border-r border-lines-light'>
        <LogoFull />
      </div>
      <div className='flex grow gap-4 p-4 md:px-6 items-center '>
        <div className='md:hidden'>
          <LogoSmall />
        </div>
        <div className='mr-auto flex'>
          <h4 className='text-lg'>Platform Launch</h4>
          <span className='grid place-content-center p-2 cursor-pointer md:hidden'>
            <ArrowDown />
          </span>
        </div>
        <div className='hidden md:block'>
          <Button disabled={true} size='large'>
            + Add New Task
          </Button>
        </div>
        <div className='md:hidden shadow-lg rounded-3xl'>
          <Button disabled={true} size='medium'>
            <IconPlus />
          </Button>
        </div>
        <button>
          <EllipsisVertical />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
