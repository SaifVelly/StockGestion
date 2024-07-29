import { createSlice } from '@reduxjs/toolkit';

const name = JSON.parse(localStorage.getItem("name"));
const email = JSON.parse(localStorage.getItem("email"));
const photo = JSON.parse(localStorage.getItem("photo"));

const initialState = {
    isLoggedIn: false,
    name: name ? name : "",
    user: {
        name: "",
        email: email ? email : "",
        phone: "",
        bio: "",
        photo: photo ? photo: ""
    },
    userId: ""
}

const authSlice  = createSlice({
    name: "auth",
    initialState,
    reducers: {
        SET_LOGIN(state, action) {
            state.isLoggedIn = action.payload;
        },
        SET_NAME(state,action) {
            const temp = action.payload;
            const cName = temp.charAt(0).toUpperCase() + temp.slice(1);
            localStorage.setItem("name", JSON.stringify(cName));
            state.name = cName;
        },
        SET_EMAIL(state,action) {
            localStorage.setItem("email", JSON.stringify(action.payload));
            state.user.email = action.payload;
        },
        SET_PHOTO(state,action) {
            localStorage.setItem("photo", JSON.stringify(action.payload));
            state.user.photo = action.payload;
        },
        SET_USER(state, action) {
            const profile = action.payload;
            state.user.name = profile.name;
            state.user.email = profile.email;
            state.user.phone = profile.phone;
            state.user.bio = profile.bio;
            state.user.photo = profile.photo;
        },
    }
})

export const { SET_LOGIN, SET_NAME, SET_EMAIL, SET_USER, SET_PHOTO } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;

export const selectName = (state) => state.auth.name;
export const selectEmail = (state) => state.auth.user.email;
export const selectPhoto = (state) => state.auth.user.photo;
export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;