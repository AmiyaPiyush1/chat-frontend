import React from 'react';

const Page1 = () => {
  return (
    <div className='flex justify-center items-center h-screen bg-blue-100'>
      <div className="flex flex-col justify-between bg-gray-100 p-4" style={{ height: "750px", width: "600px" }}>
        
        <div className="flex justify-around space-x-4 mt-auto">
        <hr className="my-4 border-t-2 border-blue-300" />
          <button className="bg-blue-800 text-white px-3 py-2 rounded-lg font-bold">Search</button>
          <button className="bg-blue-800 text-white px-3 py-2 rounded-lg font-bold">My Account</button>
        </div>
      </div>
    </div>
  );
}

export default Page1;
