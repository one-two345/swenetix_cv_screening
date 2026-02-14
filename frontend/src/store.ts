import { configureStore } from "@reduxjs/toolkit";
// import jobsReducer from "../features/jobs/jobsSlice";
// import applicantsReducer from "../features/applicants/applicantsSlice";

export const store = configureStore({
  reducer: {
    // jobs: jobsReducer,
    // applicants: applicantsReducer,
  },
});

// Types for useSelector and useDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
