'use client';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import { toast, ToastContainer } from 'react-toastify';

export default function ToastifyExample() {
  const notify = () =>
    toast('🦄 Wow so easy !', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  return (
    <div>
      <button onClick={notify}>Notify !</button>
      <ToastContainer />
    </div>
  );
}
