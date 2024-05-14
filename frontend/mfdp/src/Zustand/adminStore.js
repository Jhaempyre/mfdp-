import {create} from 'zustand';
import {devtools, persist} from 'zustand/middleware'


const adminStore = create((set)=>({
    adminData: {
        schoolName: '',
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        schoolAddress: '',
        schoolNumber: '',
        adminMobile: '',
        pincode: '',
        schoolProfile: '',
        adminProfile: ''
      },

      adminStore: (data) => set((state) => ({ adminData: { ...state.adminData, ...data } }))
}))


const useAdminStore = create(
    devtools(
        persist(adminStore, {
            name: "admin",
        })
    )
)

export default useAdminStore;

