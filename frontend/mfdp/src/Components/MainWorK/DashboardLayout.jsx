import React from 'react'
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
  return (
    <div>
    <div className="grid grid-cols-1 md:grid-cols-4 h-screen">
    <div className="bg-gray-200 p-4 col-span-1">
        <h2 className="text-xl mb-4">MY DASHBOARD</h2>
        <ul>
            <li className="mb-2"><LatestUpdateViewAndEdit/></li>
            <li className="mb-2"><StudentAdmissionPortal/></li>
            <li className="mb-2"><FeesStructure/></li>
            <li className="mb-2"><EmployeeSalrieStructure/></li>
            <li className="mb-2"><RoutineViewAndUpdate/></li>
            <li className="mb-2"><AttendanceManagement/></li>
            <li className="mb-2"><LibraryManagement/></li>
            <li className="mb-2"><ResultViewAndUpdate/></li>
            <li className="mb-2"><TeacherAndEmployeAdmissionPortal/></li>
            <li className="mb-2"><TeacherAndEpmloyeeAttendance/></li>
            <li className="mb-2"><InventoryManagement/></li>

            {/* Add more stories as needed */}
        </ul>
    </div>
    <div className="bg-white p-4 col-span-3">
        {/* Actual story content */}
        <h2 className="text-2xl mb-4">Story Title</h2>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        {/* Add more story content as needed */}
    </div>
</div>
</div>

  )
}

export default DashboardLayout