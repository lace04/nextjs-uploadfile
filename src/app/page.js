'use client';

import { useState } from 'react';
import Image from 'next/image';

function HomePage() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) return;

    try {
      //crear form data
      const form = new FormData();
      form.set('file', file);

      //enviar datos
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: form,
      });

      if (res.ok) {
        console.log('File uploaded!');
      }

      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex flex-col h-screen justify-center items-center'>
      <form onSubmit={handleSubmit} className='bg-zinc-900 p-5'>
        <h1 className='text-4xl text-center my-4'>Upload a file!</h1>
        <input
          type='file'
          onChange={handleFileChange}
          className='bg-zinc-800 text-zinc-100 p-2 rounded block mb-2'
        />
        <button
          className='bg-green-700 text-zinc-100 p-2 rounded block w-full disabled:opacity-50'
          disabled={!file}
        >
          Submit
        </button>
      </form>

      <div className='flex flex-row'>
        {file && (
          <Image
            src={URL.createObjectURL(file)}
            alt='upload'
            className='w-64 h-64 object-cover mt-4 mx-auto'
            width={256}
            height={256}
          />
        )}
      </div>
    </div>
  );
}

export default HomePage;
