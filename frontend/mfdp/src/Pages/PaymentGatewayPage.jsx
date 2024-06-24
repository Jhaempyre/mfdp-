import React, { useState } from 'react'
import PaymnetGateway from '../Components/MainWorK/PaymnetGateway'
import useAdminStore from '../Zustand/adminStore';

function PaymentGatewayPage() {
  const [selectedItem , setSelectedItem] = useState('Payment_Gateway');
  const adminData = useAdminStore((state) => state.adminData);
  return (
    <div>
    <div className="grid grid-cols-1 md:grid-cols-4 h-screen">
    <div className="bg-gray-200 p-4 col-span-1">
        <h2 className="text-xl mb-4">MY DASHBOARD</h2>
        <ul>
        <li 
  className={`mb-2 pt-4 font-bold cursor-pointer text-lg 
    ${selectedItem === 'Latest_Update' 
      ? 'text-red-800' 
      : 'hover:text-blue-600'
    }`}
  onClick={() => setSelectedItem('Latest_Update')}
>
  ~Latest Update
</li>

<li className={`mb-2 pt-4 font-bold cursor-pointer text-lg 
  ${selectedItem === 'Student_Admission' ? 'text-red-800' : 'hover:text-blue-600'}`}
  onClick={() => setSelectedItem('Student_Admission')}>
  ~Student Admission Portal
</li>

<li className={`mb-2 pt-4 font-bold cursor-pointer text-lg 
  ${selectedItem === 'Fees_Structure' ? 'text-red-800' : 'hover:text-blue-600'}`}
  onClick={() => setSelectedItem('Fees_Structure')}>
  ~Fees Structure
</li>

<li className={`mb-2 pt-4 font-bold cursor-pointer text-lg 
  ${selectedItem === 'Employee_Salrie_Structure' ? 'text-red-800' : 'hover:text-blue-600'}`}
  onClick={() => setSelectedItem('Employee_Salrie_Structure')}>
  ~Employee Salries Structure
</li>

<li className={`mb-2 pt-4 font-bold cursor-pointer text-lg 
  ${selectedItem === 'Payment_Gateway' ? 'text-red-800' : 'hover:text-blue-600'}`}
  onClick={() => setSelectedItem('Payment_Gateway')}>
  ~Payment Gateway
</li>

<li className={`mb-2 pt-4 font-bold cursor-pointer text-lg 
  ${selectedItem === 'Routine_View_Update' ? 'text-red-800' : 'hover:text-blue-600'}`}
  onClick={() => setSelectedItem('Routine_View_Update')}>
  ~Routine View & Update
</li>

<li className={`mb-2 pt-4 font-bold cursor-pointer text-lg 
  ${selectedItem === 'Student_Attendance' ? 'text-red-800' : 'hover:text-blue-600'}`}
  onClick={() => setSelectedItem('Student_Attendance')}>
  ~Student Attendance
</li>

<li className={`mb-2 pt-4 font-bold cursor-pointer text-lg 
  ${selectedItem === 'Library_Management' ? 'text-red-800' : 'hover:text-blue-600'}`}
  onClick={() => setSelectedItem('Library_Management')}>
  ~Library Management
</li>

<li className={`mb-2 pt-4 font-bold cursor-pointer text-lg 
  ${selectedItem === 'Result_View_Update' ? 'text-red-800' : 'hover:text-blue-600'}`}
  onClick={() => setSelectedItem('Result_View_Update')}>
  ~Result View & Update
</li>

<li className={`mb-2 pt-4 font-bold cursor-pointer text-lg 
  ${selectedItem === 'Employee_Admission_Portal' ? 'text-red-800' : 'hover:text-blue-600'}`}
  onClick={() => setSelectedItem('Employee_Admission_Portal')}>
  ~Employee Admission Portal
</li>

<li className={`mb-2 pt-4 font-bold cursor-pointer text-lg 
  ${selectedItem === 'Employee_Attendance' ? 'text-red-800' : 'hover:text-blue-600'}`}
  onClick={() => setSelectedItem('Employee_Attendance')}>
  ~Employee Attendance
</li>

<li className={`mb-2 pt-4 font-bold cursor-pointer text-lg 
  ${selectedItem === 'Inventory_Management' ? 'text-red-800' : 'hover:text-blue-600'}`}
  onClick={() => setSelectedItem('Inventory_Management')}>
  ~Inventory Management
</li>
</ul>
  </div>
  {selectedItem === 'Payment_Gateway' && (
    <div className="bg-white p-4 col-span-3">
      <h2 className="text-2xl mb-4">{selectedItem}</h2>
      <PaymnetGateway/>
    </div>
  )}
  </div>
  </div>
  )
}

export default PaymentGatewayPage