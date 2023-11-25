'use client';
import { createPortal } from 'react-dom';

function Modal() {
  return createPortal(
    <div className='fixed w-full h-full top-0 bg-black bg-opacity-50'>
      <div className=' w-64 h-80 rounded-lg bg-white mt-4 ml-14'>Content</div>
    </div>,
    document.getElementById('content-layout') || document.body
  );
}

export default Modal;
