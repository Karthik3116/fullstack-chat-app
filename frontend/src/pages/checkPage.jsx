import React, {useEffect, useState } from 'react';

const CheckPage = () => {
  const [count, setCount] = useState(0); // State hook
  useEffect(() =>{
    console.log("Count is : " + count);
  } , [count])
  return (
    <div className='tutorial'>

<div className='flex flex-col justify-center items-center p-6 sm:p-12'>
  <p className="text-lg font-semibold">Hello, world!</p>
  <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl">Click Me</button>
</div>
      <h1>Count : {count}</h1>
      <button onClick={() => setCount(count + 1)}>inc</button>
      <br /><br /><br />
      <button onClick={() => setCount(count - 1)}>dec</button>
    </div>
  );
};

export default CheckPage;
