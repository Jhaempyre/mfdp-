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
        passwordtoken : "",
        otpVerified : false,
        currentPage: "Latest_Update",
        paymentStats:false,
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
          authStats : data
        }) ,

        TokenStatus : (data) =>set({
          passwordtoken : data
        }),
        
        RemoveToken :(data)=>set({
          passwordtoken : ""
        }),
        otpverify : (data) => set({
          otpVerified : data
        }),
        pageStatus:(data)=>set({
          currentPage : data
        }),
        paymentStatus : (data) => set({
          paymentStats : data
        }),
      }),
      {
        name: 'admin',
      }
    )
  )
);

export default useAdminStore;




