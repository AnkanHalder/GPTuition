import React, { useState } from 'react';

const PromptInput = ({ handleSubmit, buttonText }) => {
  const [prompt, setPrompt] = useState('');

  return (
    <form onSubmit={(e) => handleSubmit(e,prompt)} className='w-11/12 sm:w-3/5 rounded-full bg-sec p-2 relative'>
      <button
        type="submit" // Not a submit button
        className='absolute z-10 top-0 right-0 rounded-full h-full w-max shadow-small-light font-bold cursor-pointer flex-center px-6 hover:bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 hover:bg-clip-text hover:text-transparent'>
        {buttonText ? buttonText : "Generate"}
      </button>
      <input
        name="prompt"
        onChange={(e) => setPrompt(e.target.value)}
        type='text'
        className='relative z-1 w-full p-2 color-white bg-transparent outline-none text-left sm:text-center'
      />
    </form>
  );
};

export default PromptInput;
