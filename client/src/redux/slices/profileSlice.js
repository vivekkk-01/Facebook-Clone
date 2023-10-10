import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  loading: false,
  profileInfo: null,
  error: null,
  allImages: null,
  updatedProfilePic: false,
  imagesLoading: false,
  imagesError: null,
  profilePicturesLoading: false,
  profilePicturesError: null,
  profilePictures: null,
  coverPictureLoading: false,
  coverPictureError: null,
  updateDetailsError: null,
};

const profileSlice = createSlice({
  initialState,
  name: "profile",
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setProfileInfo: (state, { payload }) => {
      state.loading = false;
      state.profileInfo = payload;
      state.error = null;
    },
    setImagesLoading: (state) => {
      state.imagesLoading = true;
    },
    setAllImages: (state, { payload }) => {
      state.imagesLoading = false;
      state.allImages = payload;
      state.imagesError = null;
    },
    setImagesError: (state, { payload }) => {
      state.imagesLoading = false;
      state.allImages = null;
      state.imagesError = payload;
    },
    setProfilePicturesLoading: (state) => {
      state.profilePicturesLoading = true;
    },
    setProfilePictures: (state, { payload }) => {
      state.profilePicturesLoading = false;
      state.profilePictures = payload;
      state.profilePicturesError = null;
    },
    setProfilePicturesError: (state, { payload }) => {
      state.profilePicturesLoading = false;
      state.profilePictures = null;
      state.profilePicturesError = payload;
    },
    resetProfilePictures: (state) => {
      state.profilePicturesLoading = false;
      state.profilePictures = null;
      state.profilePicturesError = null;
    },
    updateProfileInfo: (state, { payload }) => {
      const { profile, accessToken } = payload;
      state.loading = false;
      state.profileInfo = profile;
      const userData = {
        id: profile._id,
        firstName: profile.first_name,
        lastName: profile.last_name,
        username: profile.username,
        verified: profile.verified,
        picture: profile.picture,
        accessToken,
      };
      Cookies.remove("user");
      Cookies.set("user", JSON.stringify(userData), {
        secure: true,
        sameSite: "strict",
        expires: 30,
      });
      state.updatedProfilePic = true;
      state.error = null;
    },
    resetUpdateProfilePic: (state) => {
      state.loading = false;
      state.updatedProfilePic = false;
      state.error = null;
    },
    updateCoverPicLoading: (state) => {
      state.coverPictureLoading = true;
    },
    updateCoverPic: (state, { payload }) => {
      state.coverPictureLoading = false;
      state.profileInfo = payload;
      state.coverPictureError = null;
    },
    updateCoverPicError: (state, { payload }) => {
      state.coverPictureLoading = false;
      state.coverPictureError = payload;
    },
    setUpdateDetails: (state, { payload }) => {
      state.profileInfo = { ...state.profileInfo, details: payload };
    },
    setUpdateDetailsError: (state, { payload }) => {
      state.updateDetailsError = payload;
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.profileInfo = null;
      state.error = payload;
    },
  },
});

export default profileSlice.reducer;
export const {
  setProfileInfo,
  setLoading,
  setImagesLoading,
  setAllImages,
  setImagesError,
  setProfilePicturesLoading,
  setProfilePictures,
  setProfilePicturesError,
  resetProfilePictures,
  updateProfileInfo,
  resetUpdateProfilePic,
  updateCoverPicLoading,
  updateCoverPic,
  updateCoverPicError,
  setUpdateDetails,
  setUpdateDetailsError,
  setError,
} = profileSlice.actions;
