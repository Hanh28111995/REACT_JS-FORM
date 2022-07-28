import { ADD_USER, UPDATE_USER, DELETE_USER, SET_SELECTED_USER  } from "../types/user";

const DEFAULT_STATE = {
  userList: [
    {
      id: 1,
      MaSV: 1,
      HoTen: "Hanh Tran",
      phoneNumber: "123131231",
      email: "dasaf@gmail.com",
    },
    {
      id: 2,
      MaSV: 2,
      HoTen: "Hoa Tran",
      phoneNumber: "123155555",
      email: "aadfsdf@gmail.com",
    },
  ],
  selectedUser:null ,
};

export const userReducer = (state = DEFAULT_STATE, { type, payload }) => {
  switch (type) {
    case ADD_USER: {
      const data = [...state.userList];
      data.push({ ...payload, id: Date.now() });
      state.userList = data;
      return { ...state };
    }
    case UPDATE_USER: {
      // const data = [...state.userList];
      // const idx = data.findIndex(ele => ele.id=== payload.id);
      // if(idx !== -1) {
      //   data[idx] = payload;
      // }
      // state.userList = data ;
      state.userList = state.userList.map((ele) =>
        ele.id === payload.id ? payload : ele
      );
      state.selectedUser = null;
      return { ...state };
    }
    case SET_SELECTED_USER: {
      state.selectedUser = payload;
      return { ...state };
    }
    case DELETE_USER: {
      // const data = [...state.userList];
      // const idx = data.findIndex((ele) => ele.id === payload.id);
      // if (idx !== -1) {
      //   data.splice(idx, 1);
      // }
      // state.userList = data;
      state.userList = state.userList.filter((ele) => ele.id !== payload.id);
      return { ...state };
    }
    default:
      return state;
  }
}