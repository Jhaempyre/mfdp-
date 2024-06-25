import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useUpdateStore from "../../Zustand/updateStore";
import toast from "react-hot-toast";
import useAdminStore from '../../Zustand/adminStore';


function LatestUpdateViewAndEdit() {
  const [isOpen, setIsOpen] = useState(false);
  const adminStore = useAdminStore()
  const updateStore = useUpdateStore()
  const updatedData = useUpdateStore((state)=>state.updates)
  // Dummy update data in your format
  console.log("seedha",updatedData[0])
  const dataToShow = updatedData[0]
  useEffect(()=>{
    const fetchAllUpdate = async()=>{
      try {
        console.log("sending request to backend for getting all updates ")
        const getUpdate = await axios.get("/api/v2/update/viewUpdates",{
 
          headers: {
            'Content-Type': 'application/json',
            },
        });
        console.log("updates",getUpdate);
        console.log("data",getUpdate.data.data)
        if (getUpdate.data.error){
          console.log("error in getting updates",getUpdate.data.error);
          throw new Error(getUpdate.data.error)
        }
        toast.success("All Updates Received")
        updateStore.getUpdate(getUpdate.data.data)
        
      } catch (error) {
        console.log(error.message);
        toast.error(error.message);
      }
    };
    fetchAllUpdate();
  },[adminStore.currentPage])

  const handleEdit = (id) => {
    console.log('Edit Update clicked for id:', id);
  };

  const handleDelete = (id) => {
    console.log('Delete Update clicked for id:', id);
  };

  const handleAddNew = () => {
    console.log('Add New Update clicked');
    // Implement the logic to add a new update here
  };

  // Function to format the date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div>
    <div className="p-6 w-[70vw] mx-auto bg-white rounded-xl shadow-md relative">
      <button
        onClick={handleAddNew}
        className="absolute top-2 right-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow transition duration-200 ease-in-out"
      >
        Add New Update
      </button>

      <h1 className="text-2xl font-bold mb-6 text-gray-800 pr-32">Showing Latest {dataToShow.length} Updates</h1>
      
      <div className="mb-6">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-2 text-left bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow transition duration-200 ease-in-out"
        >
          {isOpen ? 'Hide Updates' : 'Show Updates'}
        </button>
        
        {isOpen && (
          <div className="mt-3">
            <div className="p-4 bg-gray-100 rounded-lg">
              {dataToShow.map((update) => (
                <div key={update._id} className="mb-4 p-4 bg-white rounded shadow">
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="font-semibold text-lg">{update.tittle}</h2>
                    <p className="text-sm text-gray-600">{formatDate(update.createdAt)}</p>
                  </div>
                  <p className="text-gray-700 mb-3">{update.message}</p>
                  <p className="text-sm text-gray-500 mb-3">School Code: {update.schoolUniqueCode}</p>
                  <div className="flex justify-end space-x-2">
                    <button 
                      onClick={() => handleEdit(update._id)}
                      className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded shadow transition duration-200 ease-in-out"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(update._id)}
                      className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white font-semibold rounded shadow transition duration-200 ease-in-out"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
    <h1 className='pl-6'>Add New Update</h1>
    <div className='p-6 w-[70vw] mx-auto bg-white rounded-xl shadow-md relative'>
        <div>
          <div>
          <textarea className="textarea textarea-accent w-[50vw]" placeholder="Bio"></textarea>
          </div>
          <button className="btn btn-accent">Add Update</button>
        </div>
    </div>
    </div>
  );
}

export default LatestUpdateViewAndEdit;