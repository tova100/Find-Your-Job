import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk("post/login", async (user) => {
  debugger;
  try {
    const response = await axios.post(
      "https://localhost:7208/api/JobDetail/jobDetailLogin",
      user
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});
export const fetchJobData = createAsyncThunk(
  "get/joblist",
  async (id, { getState }) => {
    const state = getState();
    try {
      //
      const response = await axios.get(
        `https://localhost:7208/api/JobDetail/${state.user.currentJob.id}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
const initialState = {
  isRegister: false,
  currentJob: {
    email: "",
    id: 0,
    jobAddress: "",
    jobName: "",
    passwordJob: "0",
    link: "",
  },
  ListOfApplicants: [{}],
  listJob: [
    {
      job: {
        id: 0,
        idJob: 1,
        jobTitle: "",
        degree: false,
        army: false,
        jobType: false,
        hybrid: false,
        location: "",
        salary: 6000,
      },
      jobExperienceProgrammingLanguage: [
        {
          id: 0,
          idJob: 0,
          numberOfYears: 0,
          programmingLanguage: "",
        },
      ],
      jobLanguage: [
        {
          id: 0,
          idJob: 0,
          spokenlanguage: "",
          levelOfKnowledge: 0,
        },
      ],
    },
  ],
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setListOfApplicants(state, action) {
      state.ListOfApplicants = {
        ...state.ListOfApplicants,
        name: action.payload.name,
        mark: action.payload.mark,
        id: action.payload.id,
      };
    },
    setIsRegisterJob(state, action) {
      state.isRegister = action.payload;
    },
    setCurrentJob(state, action) {
      state.currentJob = {
        ...state.currentJob,
        email: action.payload.email,
        jobName: action.payload.jobName,
        passwordJob: action.payload.passwordJob,
        link: action.payload.link,
        jobAddress: action.payload.jobAddress,
        id: action.payload.id,
      };
    },
    setListOfJob(state, action) {
      debugger;
      action.payload.map((job) => {
        state.listJob.push({
          job: job.job,
          jobExperienceProgrammingLanguage:
            job.jobExperienceProgrammingLanguage,
          jobLanguage: job.jobLanguage,
        });
      });
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentJob = action.payload;
      })

      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        console.log("login failed");
      })
      .addCase(fetchJobData.fulfilled, (state, action) => {
        console.log(action);
        state.listJob = action.payload;
      })
      .addCase(fetchJobData.rejected, (state, action) => {
        state.status = "failed";
        console.log("fetchJobData failed");
      })
      .addCase(fetchJobData.pending, (state, action) => {
        state.status = "loading";
      });
  },
});

export const {
  setIsRegisterJob,
  setListOfJob,
  setCurrentJob,
  setListOfApplicants,
} = userSlice.actions;
export default userSlice.reducer;
