import React from 'react'
import {create} from 'zustand'
import {devtools} from 'zustand/middleware'

// const useQuizStore = create((set) => ({
//     result: null,
//     setResult: (result) => set(() => ({ result })),
//     score: 0,
//     setScore: (score) => set(() => ({ score })),
//     isPlaying: false,
//     setIsPlaying: (isPlaying) => set(() => ({ isPlaying })),
//     endTime: 0,
//     setEndTime: (endTime) => set(() => ({ endTime })),
// }));

// export default useQuizStore

// const stores = create((set) => ({
//     bears: 0,
//     increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
//     removeAllBears: () => set({ bears: 0 }),
// }))

// const useBearStore = create(process.env.NODE_ENV !== 'production' ? devtools(stores) : stores)

// const useBearStore = create((set) => ({
//     bears: 0,
//     increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
//     removeAllBears: () => set({ bears: 0 }),
// }))

    
const useBearStore = create(devtools((set) => ({
    bears: 0,
    increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
    removeAllBears: () => set({ bears: 0 }),
})));


export default useBearStore;

export const useBooleanStore = create((set) => ({
    booleanState: false,
    setBooleanState: (newValue) => set({ booleanState: newValue }),
    }));