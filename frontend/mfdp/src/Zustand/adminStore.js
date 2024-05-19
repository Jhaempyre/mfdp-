import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const useAdminStore = create(
  devtools(
    persist(
      (set) => ({
        adminData: {
          fullname: '',
          email: '',
          username: '',
          schoolName: '',
          schoolUniqueCode: '',
          accessKey: '',
          schoolAddress: '',
          schoolMobile: '',
          adminMobile: '',
          profileImage: '',
          schoolImage: '',
          createdAt: '',
          updatedAt: '',
        },
        authStats: false,
        loggedAdmin: (data) => set({
          adminData: data
        }),
        logout: () => set({
          adminData: {
            fullname: '',
            email: '',
            username: '',
            schoolName: '',
            schoolUniqueCode: '',
            accessKey: '',
            schoolAddress: '',
            schoolMobile: '',
            adminMobile: '',
            profileImage: '',
            schoolImage: '',
            createdAt: '',
            updatedAt: '',
          }
        }),
        
        authStatus : (data) => set({
          authStats : true
        })

      }),
      {
        name: 'admin',
      }
    )
  )
);

export default useAdminStore;




