import React, {useState, useCallback} from 'react'
// 커스텀훅
/**
 * 커스텀훅 사용 규칙 : 
 * 1. 훅은 오직 리액트 함수 내에서만 사용되어야 한다. 일반적인 js 함수에서는 호출하면 안된다.
 * 2. 리액트 함수 최상위에서 호출해야 한다.  -> 반복문, 조건문, 중첩된 함수 내에서 hook을 호출하면 안된다.
 * 
 *  */ 

// state, input에 바인딩할 값, setState를 리턴 
export const useInput = (initialValue=null) =>{
    const [value, setValue] = useState(initialValue)
    const handler = useCallback((e) =>{
        setValue(e.target.value);
    },[])
    return [value, handler, setValue]
}