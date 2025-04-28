import React, { useEffect, useState } from "react";

const CheckPage = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(`Count updated: ${count}`);
  }, [count]);

  return (
    <div className="tutorial flex flex-col items-center justify-center p-6 sm:p-12 space-y-6">
      <p className="text-lg font-semibold">Hello, world!</p>

      <button
        onClick={() => alert("Button clicked!")}
        className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
      >
        Click Me
      </button>

      <div className="text-center">
        <h1 className="text-2xl font-bold">Count: {count}</h1>

        <div className="flex space-x-4 mt-4">
          <button
            onClick={() => setCount(count + 1)}
            className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
          >
            Increment
          </button>

          <button
            onClick={() => setCount(count - 1)}
            className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
          >
            Decrement
          </button>

          <button
            onClick={() => setCount(0)}
            className="px-4 py-2 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckPage;
