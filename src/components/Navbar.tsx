'use client';
import React, { useRef } from 'react';
import { useHover } from 'usehooks-ts';
import Logo from './Logo';

const Navbar: React.FC = () => {
  const aboutRef = useRef<HTMLLIElement>(null);
  const isAboutHovered = useHover(aboutRef as React.RefObject<HTMLElement>);

  const docsRef = useRef<HTMLLIElement>(null);
  const isDocsHovered = useHover(docsRef as React.RefObject<HTMLElement>);

  const cameraRef = useRef<HTMLLIElement>(null);
  const isCameraHovered = useHover(cameraRef as React.RefObject<HTMLElement>);

  return (
    <nav className="flex justify-evenly items-center p-4 border-b bg-gray-950 border-gray-700">
      <div className="flex items-center m-2">
        {/* Placeholder for logo */}
        <Logo height={24} className="mr-2" aria-label="Lepus Logo" />
      </div>
      <ul className="list-none flex m-0 p-0">
        <li
          ref={aboutRef}
          className="ml-6 relative"
        >
          <a href="#" className="no-underline text-white hover:text-gray-300">About Lepus</a>
          {isAboutHovered && (
            <ul className="absolute top-full left-0 bg-gray-950 border border-gray-600 list-none p-2 rounded shadow-lg z-10 min-w-max">
              <li className="hover:bg-gray-700 p-1 cursor-pointer text-white">Our Mission</li>
              <li className="hover:bg-gray-700 p-1 cursor-pointer text-white">Team</li>
              <li className="hover:bg-gray-700 p-1 cursor-pointer text-white">Careers</li>
            </ul>
          )}
        </li>
        <li
          ref={docsRef}
          className="ml-6 relative"
        >
          <a href="#" className="no-underline text-white hover:text-gray-300">Documentation</a>
          {isDocsHovered && (
            <ul className="absolute top-full left-0 bg-gray-950 border border-gray-600 list-none p-2 rounded shadow-lg z-10 min-w-max">
              <li className="hover:bg-gray-700 p-1 cursor-pointer text-white">Getting Started</li>
              <li className="hover:bg-gray-700 p-1 cursor-pointer text-white">API Reference</li>
              <li className="hover:bg-gray-700 p-1 cursor-pointer text-white">FAQs</li>
            </ul>
          )}
        </li>
        <li
          ref={cameraRef}
          className="ml-6 relative"
        >
          <a href="#" className="no-underline text-white hover:text-gray-300">Camera</a>
          {isCameraHovered && (
            <ul className="absolute top-full left-0 bg-gray-950 border border-gray-600 list-none p-2 rounded shadow-lg z-10 min-w-max">
              <li className="hover:bg-gray-700 p-1 cursor-pointer text-white">Hardware</li>
              <li className="hover:bg-gray-700 p-1 cursor-pointer text-white">Software</li>
              <li className="hover:bg-gray-700 p-1 cursor-pointer text-white">Camera 1</li>
              <li className="hover:bg-gray-700 p-1 cursor-pointer text-white">Camera 2</li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;