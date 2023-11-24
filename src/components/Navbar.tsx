import Image from 'next/image';
import { LogoSmall } from './Logo';
import ArrowDown from '@/icons/ArrowDown.svg';
import EllipsisVertical from '@/icons/EllipsisVertical.svg';

function Navbar() {
  return (
    <nav>
      <LogoSmall />
      <div>
        <h4 className='text-lg'>Platform Launch</h4>
        <ArrowDown />
      </div>
      <button
        disabled
        className='p-3 text-md text-white bg-purple-dark disabled:bg-purple-light'
      >
        +
      </button>
      <button>
        <EllipsisVertical />
      </button>
    </nav>
  );
}

export default Navbar;
