'use client';

import { motion } from 'framer-motion';

import { useState } from 'react';

function Sidebar() {
  const variants = {
    open: { opacity: 1, 'margin-left': 0 },
    closed: { opacity: 1, 'margin-left': 'calc(var(--sidebar-width)* -1)' },
  };

  const [isOpen, setIsOpen] = useState(true);

  return (
    <motion.div
      animate={isOpen ? 'open' : 'closed'}
      variants={variants}
      className='overflow-hidden hidden md:flex basis-64 lg:basis-80 bg-white border-r border-lines-light'
    >
      <button className='bg-purple-light p-6' onClick={() => setIsOpen(false)}>
        Hide
      </button>
    </motion.div>
  );
}

export default Sidebar;
