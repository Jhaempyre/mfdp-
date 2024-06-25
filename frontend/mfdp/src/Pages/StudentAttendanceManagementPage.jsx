import React,{useState} from 'react'
import AttendanceManagement from '../Components/MainWorK/AttendanceManagement'
import useAdminStore from '../Zustand/adminStore';
import { useNavigate } from 'react-router-dom';

function StudentAttendanceManagementPage() {
  const [selectedItem , setSelectedItem] = useState('Student_Attendance');
  const adminData = useAdminStore((state) => state.adminData);
  const navigate = useNavigate();
  const adminStore = useAdminStore();
   const onclickNavigation= (page)=>{
    setSelectedItem(page)
    console.log(selectedItem)
    adminStore.pageStatus(page)
    navigate(`/dashboard/${page}/${adminData.username}`)}
   
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
  onClick={() => onclickNavigation('Latest_Update')}
>
  ~Latest Update
</li>

<li className={`mb-2 pt-4 font-bold cursor-pointer text-lg 
  ${selectedItem === 'Student_Admission' ? 'text-red-800' : 'hover:text-blue-600'}`}
  onClick={() => {
    setSelectedItem('Student_Admission')
    console.log(selectedItem)
    adminStore.pageStatus("Student_Admission")
    console.log(adminStore.currentPage)
    navigate(`/dashboard/Student_Admission/${adminData.username}`)}}>
  ~Student Admission Portal
</li>

<li className={`mb-2 pt-4 font-bold cursor-pointer text-lg 
  ${selectedItem === 'Fees_Structure' ? 'text-red-800' : 'hover:text-blue-600'}`}
  onClick={() => {
    setSelectedItem('Fees_Structure')
    console.log(selectedItem)
    adminStore.pageStatus("Fees_Structure")
    console.log(adminStore.currentPage)
    navigate(`/dashboard/Fees_Structure/${adminData.username}`)}}>
  ~Fees Structure
</li>

<li className={`mb-2 pt-4 font-bold cursor-pointer text-lg 
  ${selectedItem === 'Employee_Salrie_Structure' ? 'text-red-800' : 'hover:text-blue-600'}`}
  onClick={() => (onclickNavigation('Employee_Salrie_Structure'))}>
  ~Employee Salries Structure
</li>

<li className={`mb-2 pt-4 font-bold cursor-pointer text-lg 
  ${selectedItem === 'Payment_Gateway' ? 'text-red-800' : 'hover:text-blue-600'}`}
  onClick={() => {
    setSelectedItem('Payment_Gateway')
    console.log(selectedItem)
    adminStore.pageStatus("Payment_Gateway")
    console.log(adminStore.currentPage)
    navigate(`/dashboard/Payment_Gateway/${adminData.username}`)}}>
  ~Payment Gateway
</li>

<li className={`mb-2 pt-4 font-bold cursor-pointer text-lg 
  ${selectedItem === 'Routine_View_Update' ? 'text-red-800' : 'hover:text-blue-600'}`}
  onClick={() => onclickNavigation('Routine_View_Update')}>
  ~Routine View & Update
</li>

<li className={`mb-2 pt-4 font-bold cursor-pointer text-lg 
  ${selectedItem === 'Student_Attendance' ? 'text-red-800' : 'hover:text-blue-600'}`}
  onClick={() => onclickNavigation('Student_Attendance')}>
  ~Student Attendance
</li>

<li className={`mb-2 pt-4 font-bold cursor-pointer text-lg 
  ${selectedItem === 'Library_Management' ? 'text-red-800' : 'hover:text-blue-600'}`}
  onClick={() => onclickNavigation('Library_Management')}>
  ~Library Management
</li>

<li className={`mb-2 pt-4 font-bold cursor-pointer text-lg 
  ${selectedItem === 'Result_View_Update' ? 'text-red-800' : 'hover:text-blue-600'}`}
  onClick={() => onclickNavigation('Result_View_Update')}>
  ~Result View & Update
</li>

<li className={`mb-2 pt-4 font-bold cursor-pointer text-lg 
  ${selectedItem === 'Employee_Admission_Portal' ? 'text-red-800' : 'hover:text-blue-600'}`}
  onClick={() => onclickNavigation('Employee_Admission_Portal')}>
  ~Employee Admission Portal
</li>

<li className={`mb-2 pt-4 font-bold cursor-pointer text-lg 
  ${selectedItem === 'Employee_Attendance' ? 'text-red-800' : 'hover:text-blue-600'}`}
  onClick={() => onclickNavigation('Employee_Attendance')}>
  ~Employee Attendance
</li>

<li className={`mb-2 pt-4 font-bold cursor-pointer text-lg 
  ${selectedItem === 'Inventory_Management' ? 'text-red-800' : 'hover:text-blue-600'}`}
  onClick={() => onclickNavigation('Inventory_Management')}>
  ~Inventory Management
</li>
</ul>
  </div>

  {selectedItem === 'Student_Attendance' && (
    <div className="bg-white p-4 col-span-3">
      <h2 className="text-2xl mb-4">{selectedItem}</h2>
      <AttendanceManagement/>
    </div>
  )}
  </div>
  </div>
  )
}

export default StudentAttendanceManagementPage