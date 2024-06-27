import React from 'react';

function PaymentGateway() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold">
          <span className="bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
            Flexible Plans
          </span>
        </h1>
        <p className="mt-4 text-xl text-gray-600">Choose a plan that works best for you</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Basic Plan Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-purple-600">This Month</h2>
          <p className="mb-4 text-green-500">Perfect for Starters</p>
          <p className="text-3xl font-bold mb-4 text-orange-600">₹5,999/-</p>
          <ul className="list-disc list-inside mb-6">
          <li className='text-blue-400'>GST inclusive</li>
          <li className='text-black'><b>15 Days Free trial</b></li>
            <li className='text-red-600'><b>For 30 days</b></li>
            <li className='text-green-500'><b>12*7 Full Support</b></li>
            
          </ul>
          <button className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition duration-300">Choose Plan</button>
        </div>

        {/* Card 2 - Per Month (with Best Seller badge) */}
        <div className="bg-white rounded-lg shadow-md p-6 relative">
          {/* Best Seller Badge */}
          <div className="absolute -top-3 -left-3 bg-blue-800 text-white text-sm font-bold px-4 py-1 rounded-full transform -rotate-12">
            Best Seller
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-orange-600">Per Month</h2>
          <p className=" mb-4 text-blue-600">8.3% Discount</p>
          <p className="text-3xl font-bold mb-4 text-green-600">₹5,499/-</p>
          <ol className="list-disc list-inside mb-6">
            <li className='text-blue-400'>+18% GST</li>
            <li className='text-black'><b>Full refund in 7 days</b></li>
            <li className='text-green-500'><b>Auto Renewal</b></li>
            <li className='text-red-600'><b>24*7 Full support</b></li>
          </ol>
          <button className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300">Choose Plan</button>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-lg shadow-md p-6 relative">
          {/* Popular Badge */}
          <div className="absolute -top-3 -left-3 bg-green-700 text-white text-sm font-bold px-4 py-1 rounded-full transform -rotate-12">
            Popular
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-green-600">6 Months</h2>
          <p className="text-red-800 mb-4"><b><i>16.65% Discount</i></b></p>
          <p className="text-3xl font-bold mb-4 text-purple-600">₹29,999/-</p>
          <ul className="list-disc list-inside mb-6">
          <li className='text-blue-400'>+18% GST</li>
          <li className='text-red-600'><b>24*7 Full support</b></li>
          <li className='text-green-500'><b>Budget Freindly</b></li>
          <li className='text-black'><b>Full refund in 30 days</b></li>
          </ul>
          <button className="w-full bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600 transition duration-300">Choose Plan</button>
        </div>
      </div>
    </div>
  );
}

export default PaymentGateway;