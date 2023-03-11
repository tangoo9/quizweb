import {create} from 'zustand'


// 전역으로 써야할 state가 무엇인가..

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

