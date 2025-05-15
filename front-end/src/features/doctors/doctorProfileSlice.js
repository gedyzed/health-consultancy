const doctorProfileSlice = createSlice({
  name: 'doctorProfile',
  initialState: {
    loading: false,
    error: null,
    success: false,
    response: null,
  },
  reducers: {
    resetDoctorProfileState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.response = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitDoctorProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(submitDoctorProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.response = action.payload;
      })
      .addCase(submitDoctorProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Submission failed';
        state.success = false;
      });
  },
});

export const { resetDoctorProfileState } = doctorProfileSlice.actions;

export default doctorProfileSlice.reducer;