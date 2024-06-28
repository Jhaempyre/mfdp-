import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useUpdateStore from "../../Zustand/updateStore";
import toast from "react-hot-toast";
import useAdminStore from '../../Zustand/adminStore';
import useAddUpdate from '../../Hooks/useAddUpdate';
import useEditUpdate from '../../Hooks/useEditUpdate';
import useDeleteUpdate from '../../Hooks/useDeleteUpdate';
import { useNavigate } from 'react-router-dom';


function LatestUpdateViewAndEdit() {
  const [isOpen, setIsOpen] = useState(false);
  const adminStore = useAdminStore()
  const updateStore = useUpdateStore()
  const adminData = useAdminStore((state) => state.adminData);
  const updatedData = useUpdateStore((state)=>state.updates)
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditReq,setIsEditReq] = useState(false)
  const navigate = useNavigate()
  const [Edits,setEdits] = useState({
                              tittle : '',
                              message : '',
                              id : '',
                              schoolUniqueCodex: ''
                                          })
  const [newUpdate, setNewUpdate] = useState({ tittle: '', message: '' });
  const {loading , addUpdate} = useAddUpdate()
  const {loadin,editUpdate}= useEditUpdate()
  const {loadeng,deleteUpdate} = useDeleteUpdate()
  // Dummy update data in your format is dumped now 😂😂😂😂

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
  },[loading,loadin,loadeng])

  console.log("seedha",updatedData[0])
  const dataToShoi=updatedData[0]
  console.log("marked erroe",dataToShoi)
  const dataToShow = updatedData[0].slice().sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  console.log(dataToShow.reverse())
  
  const handleEdit = (xyz) => {
    console.log('Edit Update clicked for id:', xyz);
    setEdits({
      id : xyz,
      schoolUniqueCodex : adminData.schoolUniqueCode
    })
    setIsEditReq(true)
  };

  const handleDelete = async(id) => {
    console.log('Delete Update clicked for id:', id);
    const del = {id,
      schoolUniqueCodex : adminData.schoolUniqueCode
    }
    console.log(del)
    await deleteUpdate(del)
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setNewUpdate({ tittle: '', message: '' });
  };

  const handleEditDialogClose = ()=> {
    setIsEditReq(false);
    setEdits({
      tittle : '',
      message : '',
      id : '',
      schoolUniqueCodex:''
    })
  }

  
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEdits(prev => ({ ...prev, [name]: value }));
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUpdate(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("added update",newUpdate)
    await addUpdate(newUpdate)
    handleDialogClose();
  };

  const handleAddNew = () => {
    console.log('Add New Update clicked');
    setIsDialogOpen(true);
    // Implement the logic to add a new update here
  };

  const handleEditSubmit = async(e)=>{
    e.preventDefault()
    console.log("Edit requested for this one ",Edits)
    await editUpdate(Edits)
    handleEditDialogClose()
  }

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
   {/* <h1 className='pl-6'>Add New Update</h1>
    <div className='p-6 w-[70vw] mx-auto bg-white rounded-xl shadow-md relative'>
        <div>
          <div>
          <textarea className="textarea textarea-accent w-[50vw]" placeholder="Bio"></textarea>
          </div>
          <button className="btn btn-accent">Add Update</button>
        </div>
    </div>*/}
          {isDialogOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Add New Update</h3>
              <form onSubmit={handleSubmit} className="mt-2 text-left">
                <div className="mb-4">
                  <label htmlFor="tittle" className="block text-gray-700 text-sm font-bold mb-2">Title</label>
                  <input 
                    type="text" 
                    id="tittle" 
                    name="tittle"
                    value={newUpdate.tittle}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-white bg-black leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">Message</label>
                  <textarea 
                    id="message" 
                    name="message"
                    value={newUpdate.message}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-white bg-black leading-tight focus:outline-none focus:shadow-outline"
                    rows="3"
                    required
                  ></textarea>
                </div>
                <div className="flex items-center justify-between">
                  <button 
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Submit
                  </button>
                  <button 
                    type="button"
                    onClick={handleDialogClose}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {isEditReq && (<div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Edit The Update</h3>
              <form onSubmit={handleEditSubmit} className="mt-2 text-left">
                <div className="mb-4">
                  <label htmlFor="tittle" className="block text-gray-700 text-sm font-bold mb-2">Title</label>
                  <input 
                    type="text" 
                    id="tittle" 
                    name="tittle"
                    value={Edits.tittle}
                    onChange={handleEditInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-white bg-black leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">Message</label>
                  <textarea 
                    id="message" 
                    name="message"
                    value={Edits.message}
                    onChange={handleEditInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-white bg-black leading-tight focus:outline-none focus:shadow-outline"
                    rows="3"
                    required
                  ></textarea>
                </div>
                <div className="flex items-center justify-between">
                  <button 
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Submit
                  </button>
                  <button 
                    type="button"
                    onClick={handleEditDialogClose}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )

      }
    </div>
  );
}
export default LatestUpdateViewAndEdit;