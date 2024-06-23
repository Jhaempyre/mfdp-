import React, { useState } from 'react'
import FeesStructure from './FeesStructure'
import EmployeeSalrieStructure from './EmployeeSalrieStructure'
import RoutineViewAndUpdate from './RoutineViewAndUpdate'
import LibraryManagement from './LibraryManagement'
import ResultViewAndUpdate from './ResultViewAndUpdate'
import TeacherAndEmployeAdmissionPortal from './TeacherAndEmployeAdmissionPortal'
import TeacherAndEpmloyeeAttendance from './TeacherAndEpmloyeeAttendance'
import AttendanceManagement from './AttendanceManagement'
import InventoryManagement from './InventoryManagement'
import StudentAdmissionPortal from './StudentAdmissionPortal'
import PaymnetGateway from './PaymnetGateway'
import LatestUpdateViewAndEdit from "./LatestUpdateViewAndEdit"
import { useNavigate } from "react-router-dom";
import LatestUpdateViewAndEditPage from '../../Pages/LatestUpdateViewAndEditPage'

function DashboardLayout() {
  const [selectedItem , setSelectedItem] = useState('LatestUpdate');
  const navigate = useNavigate()

  return (
    <div>
    <div className="grid grid-cols-1 md:grid-cols-4 h-screen">
    <div className="bg-gray-200 p-4 col-span-1">
        <h2 className="text-xl mb-4">MY DASHBOARD</h2>
        <ul>
        <li 
  className={`mb-2 pt-4 font-bold cursor-pointer text-lg 
    ${selectedItem === 'LatestUpdate' 
      ? 'text-red-800' 
      : 'hover:text-blue-600'
    }`}
  onClick={() => setSelectedItem('LatestUpdate')}
>
  ~Latest Update
</li>

<li className={`mb-2 pt-4 font-bold cursor-pointer text-lg 
  ${selectedItem === 'Student Admission' ? 'text-red-800' : 'hover:text-blue-600'}`}
  onClick={() => setSelectedItem('Student Admission')}>
  ~Student Admission Portal
</li>

<li className={`mb-2 pt-4 font-bold cursor-pointer text-lg 
  ${selectedItem === 'Fees Structure' ? 'text-red-800' : 'hover:text-blue-600'}`}
  onClick={() => setSelectedItem('Fees Structure')}>
  ~Fees Structure
</li>

<li className={`mb-2 pt-4 font-bold cursor-pointer text-lg 
  ${selectedItem === 'Employee Salrie Structure' ? 'text-red-800' : 'hover:text-blue-600'}`}
  onClick={() => setSelectedItem('Employee Salrie Structure')}>
  ~Employee Salries Structure
</li>

<li className={`mb-2 pt-4 font-bold cursor-pointer text-lg 
  ${selectedItem === 'Payment Gateway' ? 'text-red-800' : 'hover:text-blue-600'}`}
  onClick={() => setSelectedItem('Payment Gateway')}>
  ~Payment Gateway
</li>

<li className={`mb-2 pt-4 font-bold cursor-pointer text-lg 
  ${selectedItem === 'Routine View & Update' ? 'text-red-800' : 'hover:text-blue-600'}`}
  onClick={() => setSelectedItem('Routine View & Update')}>
  ~Routine View & Update
</li>

<li className={`mb-2 pt-4 font-bold cursor-pointer text-lg 
  ${selectedItem === 'Student Attendance' ? 'text-red-800' : 'hover:text-blue-600'}`}
  onClick={() => setSelectedItem('Student Attendance')}>
  ~Student Attendance
</li>

<li className={`mb-2 pt-4 font-bold cursor-pointer text-lg 
  ${selectedItem === 'Library Management' ? 'text-red-800' : 'hover:text-blue-600'}`}
  onClick={() => setSelectedItem('Library Management')}>
  ~Library Management
</li>

<li className={`mb-2 pt-4 font-bold cursor-pointer text-lg 
  ${selectedItem === 'Result View & Update' ? 'text-red-800' : 'hover:text-blue-600'}`}
  onClick={() => setSelectedItem('Result View & Update')}>
  ~Result View & Update
</li>

<li className={`mb-2 pt-4 font-bold cursor-pointer text-lg 
  ${selectedItem === 'Employee Admission Portal' ? 'text-red-800' : 'hover:text-blue-600'}`}
  onClick={() => setSelectedItem('Employee Admission Portal')}>
  ~Employee Admission Portal
</li>

<li className={`mb-2 pt-4 font-bold cursor-pointer text-lg 
  ${selectedItem === 'Employee Attendance' ? 'text-red-800' : 'hover:text-blue-600'}`}
  onClick={() => setSelectedItem('Employee Attendance')}>
  ~Employee Attendance
</li>

<li className={`mb-2 pt-4 font-bold cursor-pointer text-lg 
  ${selectedItem === 'Inventory Management' ? 'text-red-800' : 'hover:text-blue-600'}`}
  onClick={() => setSelectedItem('Inventory Management')}>
  ~Inventory Management
</li>
</ul>
  </div>

  {selectedItem === 'LatestUpdate' && (
    <div className="bg-white p-4 col-span-3">
      <h2 className="text-2xl mb-4">{selectedItem}</h2>

      <LatestUpdateViewAndEdit/>
    </div>
  )}

  {selectedItem==='Fees Structure' && (<div className="bg-white p-4 col-span-3">
        <h2 className="text-2xl mb-4">{`${selectedItem}`}</h2>
        {console.log(selectedItem)}
        <FeesStructure/>
    </div>)}

    {selectedItem === 'Student Admission' && (
    <div className="bg-white p-4 col-span-3">
      <h2 className="text-2xl mb-4">{selectedItem}</h2>
      <StudentAdmissionPortal/>
    </div>
  )}

  {selectedItem === 'Fees Structure' && (
    <div className="bg-white p-4 col-span-3">
      <h2 className="text-2xl mb-4">{selectedItem}</h2>
      <FeesStructure />
    </div>
  )}

  {selectedItem === 'Employee Salrie Structure' && (
    <div className="bg-white p-4 col-span-3">
      <h2 className="text-2xl mb-4">{selectedItem}</h2>
      <EmployeeSalrieStructure />
    </div>
  )}

  {selectedItem === 'Payment Gateway' && (
    <div className="bg-white p-4 col-span-3">
      <h2 className="text-2xl mb-4">{selectedItem}</h2>
      <PaymnetGateway/>
    </div>
  )}

  {selectedItem === 'Routine View & Update' && (
    <div className="bg-white p-4 col-span-3">
      <h2 className="text-2xl mb-4">{selectedItem}</h2>
      <RoutineViewAndUpdate />
    </div>
  )}

  {selectedItem === 'Student Attendance' && (
    <div className="bg-white p-4 col-span-3">
      <h2 className="text-2xl mb-4">{selectedItem}</h2>
      <AttendanceManagement />
    </div>
  )}

  {selectedItem === 'Library Management' && (
    <div className="bg-white p-4 col-span-3">
      <h2 className="text-2xl mb-4">{selectedItem}</h2>
      <LibraryManagement />
    </div>
  )}

  {selectedItem === 'Result View & Update' && (
    <div className="bg-white p-4 col-span-3">
      <h2 className="text-2xl mb-4">{selectedItem}</h2>
      <ResultViewAndUpdate />
    </div>
  )}

  {selectedItem === 'Employee Admission Portal' && (
    <div className="bg-white p-4 col-span-3">
      <h2 className="text-2xl mb-4">{selectedItem}</h2>
      <TeacherAndEmployeAdmissionPortal />
    </div>
  )}

  {selectedItem === 'Employee Attendance' && (
    <div className="bg-white p-4 col-span-3">
      <h2 className="text-2xl mb-4">{selectedItem}</h2>
      <TeacherAndEpmloyeeAttendance />
    </div>
  )}

  {selectedItem === 'Inventory Management' && (
    <div className="bg-white p-4 col-span-3">
      <h2 className="text-2xl mb-4">{selectedItem}</h2>
      <InventoryManagement />
    </div>
  )}    
</div>
</div>

  )
}

export default DashboardLayout