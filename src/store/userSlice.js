import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const tryLoginUser = createAsyncThunk(
    'user/loginUser',
    async(userCredetials)=>{
        localStorage.setItem('user',userCredetials)
        return userCredetials;
    }
)

export const logout = createAsyncThunk('user/logoutUser', async () => {
    try {
      if (localStorage.getItem('user') !== null) {
        console.log("sud delete ")
        localStorage.removeItem('user');
      }
      return 'Logout successful';
    } catch (error) {
      console.error('Logout error:', error);
      throw new Error('Logout failed');
    }
  });

const userSlice = createSlice({
    name:'user',
    initialState:{
        loading: false,
        user: null,
        error: null
    },
    extraReducers: (builder)=>{
        builder
        .addCase(tryLoginUser.fulfilled,(state,action)=>{
            state.loading = false;
            state.user = action.payload;
            state.error = null;
        })
        .addCase(logout.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(logout.fulfilled, (state, action) => {
            state.loading = false;
            state.user = null;
            state.error = null;
          })
          .addCase(logout.rejected, (state, action) => {
            state.loading = false;
            state.user = null;
            state.error = action.error.message;
          });
    }
})

export default userSlice.reducer;