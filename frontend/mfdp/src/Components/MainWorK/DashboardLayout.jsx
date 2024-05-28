import React, { useState } from 'react'
import LatestUpdateViewAndEdit from './LatestUpdateViewAndEdit'
import StudentAdmissionPortal from './StudentAdmissionPortal'
import FeesStructure from './FeesStructure'
import EmployeeSalrieStructure from './EmployeeSalrieStructure'
import RoutineViewAndUpdate from './RoutineViewAndUpdate'
import LibraryManagement from './LibraryManagement'
import ResultViewAndUpdate from './ResultViewAndUpdate'
import TeacherAndEmployeAdmissionPortal from './TeacherAndEmployeAdmissionPortal'
import TeacherAndEpmloyeeAttendance from './TeacherAndEpmloyeeAttendance'
import AttendanceManagement from './AttendanceManagement'
import InventoryManagement from './InventoryManagement'

function DashboardLayout() {
  const [selectedItem , setSelectedItem] = useState('');

  return (
    <div>
    <div className="grid grid-cols-1 md:grid-cols-4 h-screen">
    <div className="bg-gray-200 p-4 col-span-1">
        <h2 className="text-xl mb-4">MY DASHBOARD</h2>
        <ul>
            <li className="mb-2 pt-4  font-bold cursor-pointer text-lg  hover:text-blue-600 active:text-red-800"
             onClick={() => setSelectedItem('LatestUpdate')}>~Latest Update</li>

            <li className="mb-2 pt-4 font-bold cursor-pointer text-lg hover:text-blue-600 active:text-red-800"
             onClick={() => setSelectedItem('Student Admission')}>~Student Admission Portal</li>

            <li className="mb-2 pt-4 font-bold cursor-pointer text-lg hover:text-blue-600 active:text-red-800"
             onClick={() => setSelectedItem('Fees Structure')}>~Fees Structure</li>

            <li className="mb-2 pt-4 font-bold cursor-pointer text-lg hover:text-blue-600 active:text-red-800"
             onClick={() => setSelectedItem('Employee Salrie Structure')}>~Employee Salries Structure</li>

            <li className="mb-2 pt-4 font-bold cursor-pointer text-lg hover:text-blue-600 active:text-red-800"
             onClick={() => setSelectedItem('Routine View & Update')}>~Routine View & Update</li>

            <li className="mb-2 pt-4 font-bold cursor-pointer text-lg hover:text-blue-600 active:text-red-800"
             onClick={() => setSelectedItem('Student Attendance')}>~Student Attendance</li>

            <li className="mb-2 pt-4 font-bold cursor-pointer text-lg hover:text-blue-600 active:text-red-800"
             onClick={() => setSelectedItem('Library Management')}>~Library Management</li>

            <li className="mb-2 pt-4 font-bold cursor-pointer text-lg hover:text-blue-600 active:text-red-800"
             onClick={() => setSelectedItem('Result View & Update')}>~Result View & Update</li>

            <li className="mb-2 pt-4 font-bold cursor-pointer text-lg hover:text-blue-600 active:text-red-800"
             onClick={() => setSelectedItem('Employee Admission Portal')}>~Employee Admission Portal</li>

            <li className="mb-2 pt-4 font-bold cursor-pointer text-lg hover:text-blue-600 active:text-red-800"
             onClick={() => setSelectedItem('Employee Attendance')}>~Employee Attendance</li>

            <li className="mb-2 pt-4 font-bold cursor-pointer text-lg hover:text-blue-600 active:text-red-800"
             onClick={() => setSelectedItem('Inventory Management')}>~Inventory Management</li>

        </ul>
    </div>
    <div className="bg-white p-4 col-span-3">
        {/* Actual story content */}
        <h2 className="text-2xl mb-4">{`${selectedItem}`}</h2>
        {console.log(selectedItem)}
        <FeesStructure/>
        {/* Add more story content as needed */}
    </div>
</div>
</div>

  )
}

export default DashboardLayout