"use client"

import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 shadow-md text-center py-4 mt-10 ">
      <div className="container flex flex-col items-center justify-center h-[100px]">
        <p className="text-sm text-gray-600">&copy; {new Date().getFullYear()} Anonymous Message. All rights reserved.</p>
        <p className="text-sm text-gray-600 mt-2">
          Crafted with care for your anonymous conversations.
        </p>
      </div>
    </footer>
  );
}

export default Footer;

