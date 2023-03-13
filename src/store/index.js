import {create} from 'zustand'


// 전역으로 써야할 state가 무엇인가..

// quiz에 대한 전역상태
export const useQuizStore  = create((set)=>({
    isPlaying : false,
    result : null,
    isGameEnd : false,
    endTime : "",
    setIsPlaying : (newValue)=> set({isPlaying : newValue}),
    setResult : (newValue)=> set({result : newValue}),
    setEndTime : (newValue)=> set({endTime : newValue}),
    setIsGameEnd : (newValue)=> set({isGameEnd : newValue}),
}))

// user(getAuth)와 관련된 전역상태
export const useUserStore = create((set)=>({
    user : null,
    setUser : (newValue) => set({user:newValue}),
}))