
import create from 'zustand';

// Define your store


const useStore = create((set) => ({

  userdata:{}, 
  setuserdata: (newData) => set({ userdata: newData }),


  loginstatus: false,
  setloginstatus: (newData) => set({loginstatus: newData}),

  
 
}));





export default useStore;
