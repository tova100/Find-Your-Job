import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Alert, message } from "antd";
import axios from "axios";
export const loginEmployee = createAsyncThunk(
  "post/login",
  async (employee) => {
    try {
      const response = await axios.post(
        "https://localhost:7208/api/EmployeeDetail/PostEmployeeLogin",
        employee
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const AddEmployeeDemands = createAsyncThunk(
  "post/employeeDemands",
  async (employeeDemands) => {
    try {
      const response = await axios.post(
        "https://localhost:7208/api/EmployeeDetail/Employee",
        employeeDemands
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  showAfterClickAnalys: true,
  showcv: false,
  isRegister: false,
  isSucsses: false,
  pathPdf: "",
  distance: 0,
  currentEmployee: {
    distance: 0,
    AddressEmployee: "",
    PasswordEmployee: "",
    NameEmployee: "",
    Phone: "",
    Email: "",
  },

  employeeDemands: {
    id: 0,
    nameEmployee: "",
    phone: "",
    email: "",
    degree: false,
    army: false,
    jobType: false,
    salary: 0,
    hybrid: false,
    addressEmployee: "",
    passwordEmployee: "",
    experienceProgrammingLanguages: [
      {
        numberOfYears: 0,
        programmingLanguage: "",
      },
    ],

    languages: [
      {
        spokenlanguage: "",
        levelOfKnowledge: 0,
      },
    ],
    professionalknowledges: [""],
  },
};
const EmployeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    setpathPdf(state, action) {
      state.pathPdf = action.payload;
    },
    setDistance(state, action) {
      state.distance = action.payload;
    },
    setEmployeeBasicDemands(state, action) {
      state.employeeDemands = {
        ...state.employeeDemands,
        degree: action.payload.degree,
        army: action.payload.army,
        hybrid: action.payload.hybrid,
        jobType: action.payload.jobType,
        salary: action.payload.salary,
      };
    },
    setId(state, action) {
      state.employeeDemands = {
        ...state.employeeDemands,
        id: action.payload,
      };
    },

    setEmployeeDemandsFromaAnalayse(state, action) {
      const newProffesoinal = action.payload.professionalknowledges.map(
        (name) => {
          return { nameLanguage: name };
        }
      );
      state.employeeDemands = {
        ...state.employeeDemands,
        experienceProgrammingLanguages:
          action.payload.experienceProgrammingLanguages,
        professionalknowledges: newProffesoinal,
        languages: action.payload.languages,
      };
    },
    setLanguages(state, action) {
      state.employeeDemands = {
        ...state.employeeDemands,
        languages: action.payload,
      };
    },
    setLanguagesllevelOfKnowledge(state, action) {
      state.employeeDemands = {
        ...state.employeeDemands.languages,
        spokenlanguage: action.payload.namelanguage,
        levelOfKnowledge: action.payload.levelOfKnowledge,
      };
    },
    setExperienceProgrammingLanguages(state, action) {
      state.employeeDemands = {
        ...state.employeeDemands,
        experienceProgrammingLanguages: action.payload,
      };
    },
    setEmployeeDetail(state, action) {
      state.employeeDemands = {
        ...state.employeeDemands,
        id: action.payload.id,
        addressEmployee: action.payload.addressEmployee,
        passwordEmployee: action.payload.passwordEmployee,
        nameEmployee: action.payload.nameEmployee,
        phone: action.payload.phone,
        email: action.payload.email,
      };
    },
    setIsRegister(state, action) {
      state.isRegister = action.payload;
    },
    setIsShowcv(state, action) {
      state.showcv = action.payload;
    },
    setshowAfterClickAnalys(state, action) {
      state.showAfterClickAnalys = action.payload;
    },
  },

  extraReducers(builder) {
    builder
      .addCase(loginEmployee.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentEmployee = action.payload;
        state.employeeDemands = {
          ...state.employeeDemands,
          id: action.payload.id,
          addressEmployee: action.payload.addressEmployee,
          passwordEmployee: action.payload.passwordEmployee,
          nameEmployee: action.payload.nameEmployee,
          phone: action.payload.phone,
          email: action.payload.email,
        };
      })
      .addCase(loginEmployee.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(loginEmployee.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export const {
  setId,
  setshowAfterClickAnalys,
  setIsShowcv,
  setDistance,
  setpathPdf,
  setLanguagesllevelOfKnowledge,
  setExperienceProgrammingLanguages,
  setLanguages,
  setEmployeeBasicDemands,
  setEmployeeDemandsFromaAnalayse,
  setEmployeeDetail,
  setIsRegister,
} = EmployeeSlice.actions;
export default EmployeeSlice.reducer;
