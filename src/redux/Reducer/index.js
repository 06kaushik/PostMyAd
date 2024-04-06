import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";


const initialState = {
    userData: null,
  }

  export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      setUser: (state, action) => {
        state.userData = action.payload
      },
      removeUser: (state) => {
        console.log("USer data has benn removed ...");
        state.userData = null
      },
    },
  })

  export const { setUser, removeUser} = userSlice.actions
  export default userSlice.reducer


  export function getUser(email, password) {
    return async function getUserthunk(dispatch, getState) {
        try {
            const body = {
                email: email,
                password: password
            }
            console.log("Body from api call ==> ", body)
            let res = await axios.post("/api/user/signin", body);
            console.log("GETUSER TRY RESPONSE ++> ", res)
            dispatch(setUser(res.data))
            await AsyncStorage.setItem('userData', JSON.stringify(res.data));
            await AsyncStorage.setItem('user', JSON.stringify(res.data.user));
        } catch (err) {
            console.log(" ERROR Login GETUSER ==> ", err.message);
        }
    }
}

export function deluser() {
  return async function removeUserthunk(dispatch, getState) {
    try {
      console.log("DEL_+++")
      dispatch(removeUser())
    } catch (err) {
      console.log("ERROR DELUSER ==> ", err);
    }
  }
}