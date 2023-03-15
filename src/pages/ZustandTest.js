// import React from 'react'

// import { useSetState, useBooleanStore, useCountStore } from '../store/zustandStore'

// const ZustandTest = () => {

//     const { state, setState } = useSetState();
//     const { booleanState, setBooleanState } = useBooleanStore();
//     const { count, setCount, removeCount} = useCountStore();

//     function handleClick() {
//         setState(true);
//     }

//     function handleClick2() {
//         setBooleanState();
//     }


//     return (
//         <div>
//             <p>Boolean state value: {booleanState.toString()}</p>
// 			<button className="mt-5" onClick={handleClick}>Set to {state ? "true" : "false"}</button>
// 			<button onClick={handleClick2}>Set to {booleanState ? " toggle true" : "toggle false"}</button>
// 			{<div>count : {count}</div>}
// 			<button onClick={() => setCount()}>Increment Count</button>
// 			<button onClick={() => removeCount()}>remove Count</button>
//         </div>
//     )
// }

// export default ZustandTest