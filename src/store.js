import create from 'zustand';

// Define your store
const useStore = create((set) => ({
  loginstatus: false,
  setloginstatus: (newData) => set({ loginstatus: newData }),
  addloginstatus: (item) => set((state) => ({ loginstatus: [...state.loginstatus, item] })),
}));

export default useStore;
