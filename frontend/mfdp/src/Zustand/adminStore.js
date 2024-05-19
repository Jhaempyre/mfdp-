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
          updatedAt: ''
        },
        loggedAdmin: (data) => set((state) => ({
            adminData: { adminData: data.Admin }
          })),
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
            updatedAt: ''
          }
        }),
      }),
      {
        name: 'admin',
      }
    )
  )
);

export default useAdminStore;
