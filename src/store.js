import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userSlice from './Login/userSlice';
import { useReducer } from 'react';
import EmployeeSlice from './Employee/EmployeeSlice';
import { composeWithDevTools } from 'redux-devtools-extension';

// const store = configureStore({
//   user:userSlice,
// // });
// const rootReducer = combineReducers({
//     user: userSlice,
  
//   });

const store=configureStore({
  
  reducer:{
      user:userSlice,
      employee:EmployeeSlice
  }
})
export default store;
// // import { combineReducers, configureStore } from '@reduxjs/toolkit';
// // import userReducer from './Login/userSlice';

// // const rootReducer = combineReducers({
// //   user: userReducer,
// // });

// // const store = configureStore({
// //   reducer: rootReducer,
// // });

// // export default store;


// import { combineReducers, configureStore } from '@reduxjs/toolkit';
// import userSlice from './Login/userSlice';
// import EmployeeSlice from './Employee/EmployeeSlice';
// import { composeWithDevTools } from 'redux-devtools-extension';

// const rootReducer = combineReducers({
//   user: userSlice,
//   employee: EmployeeSlice
// });

// const store = configureStore({
//   reducer: rootReducer,
//   devTools: true
// });

// export default store;

  