import React, { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { motion } from 'framer-motion';

import { Menu, X, LogOut } from 'lucide-react';

import { useAuth } from '../context/AuthContext';



const Navbar = ({ onOpenContact }) => {

  const [isOpen, setIsOpen] = useState(false);

  const { user, logout } = useAuth();

  const navigate = useNavigate();



  const handleLogout = async () => {

    await logout();

    navigate('/login');

    setIsOpen(false);

  };



  const links = [

    { name: 'Home', path: '/' },

    { name: 'About', path: '/#about' },

    { name: 'Projects', path: '/#projects' },

    { name: 'Certificates', path: '/#certificates' },

    { name: 'Achievements', path: '/#achievements' },

    { name: 'Notes', path: '/#notes' },

    { name: 'Dashboard', path: '/dashboard' }

  ];



  return (

    <motion.nav 

      initial={{ y: -100 }}

      animate={{ y: 0 }}

      transition={{ duration: 0.5 }}

      className="fixed w-full z-50 top-0 left-0 bg-black/80 backdrop-blur-sm border-b border-gray-800"

    >

      <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">

        <Link to="/" className="text-xl font-bold tracking-wider text-white">

          ARCHITECT

        </Link>



        {/* Desktop Links */}

        <div className="hidden md:flex items-center space-x-8">

          {links.filter(link => link.name !== 'Dashboard').map((link) => (

            link.path.startsWith('/#') ? (

              <a 

                key={link.name} 

                href={link.path.replace('/', '')} 

                className="text-sm text-gray-300 hover:text-white transition-colors"

              >

                {link.name === 'Home' ? 'Work' : link.name === 'About' ? 'Expertise' : link.name}

              </a>

            ) : (

              <Link 

                key={link.name} 

                to={link.path}

                className="text-sm text-gray-300 hover:text-white transition-colors"

              >

                {link.name === 'Home' ? 'Work' : link.name === 'About' ? 'Expertise' : link.name}

              </Link>

            )

          ))}

          
        </div>



        <div className="hidden md:flex items-center gap-4">

          {true && (

            <button 

              onClick={handleLogout}

              className="p-2 text-gray-400 hover:text-white transition-colors"

              title="Logout"

            >

              <LogOut size={20} />

            </button>

          )}

        </div>



        {/* Mobile Toggle */}

        <button className="md:hidden text-white p-1" onClick={() => setIsOpen(!isOpen)}>

          {isOpen ? <X size={28} /> : <Menu size={28} />}

        </button>

      </div>



      {/* Mobile Menu */}

      {isOpen && (

        <motion.div 

          initial={{ opacity: 0, y: -20 }}

          animate={{ opacity: 1, y: 0 }}

          className="absolute top-[78px] left-3 right-3 cyber-glass bg-[#020617]/95 flex flex-col items-center space-y-5 py-6 md:hidden shadow-2xl border-cyberCyan/20 max-h-[70vh] overflow-y-auto"

        >

          {links.map((link) => (

            link.path.startsWith('/#') ? (

              <a 

                key={link.name} 

                href={link.path.replace('/', '')}

                onClick={() => setIsOpen(false)}

                className="text-slate-200 text-base hover:text-cyberCyan transition-colors font-black tracking-[0.2em]"

              >

                {link.name}

              </a>

            ) : (

              <Link 

                key={link.name} 

                to={link.path}

                onClick={() => setIsOpen(false)}

                className="text-slate-200 text-base hover:text-cyberCyan transition-colors font-black tracking-[0.2em]"

              >

                {link.name}

              </Link>

            )

          ))}



          {user && (

            <button

              onClick={handleLogout}

              className="w-full py-3 text-aiCyan font-semibold flex items-center justify-center gap-2 border border-aiCyan/20 rounded-xl bg-aiCyan/5 mt-4"

            >

              <LogOut size={18} /> TERM_SESSION

            </button>

          )}

        </motion.div>

      )}

    </motion.nav>

  );

};



export default Navbar;

