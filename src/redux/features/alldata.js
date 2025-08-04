import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getalldata = createAsyncThunk(
  "/alldata/getalldata",
  async () => {
    let res = await axios.get(
      `https://fakestoreapi.in/api/products`
    );
    return res.data.products;
  }
);

const allDataSlice = new createSlice({
  name: "alldata",
  initialState: {
    alldata: [],
    loading: false,
    error: "",
  },
  reducers: {
    filteralldata: (state, action) => {
      const [min, max] = action.payload;

      state.alldata = state.alldata.filter(
        (item) => item.price >= min && item.price <= max
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getalldata.pending, (state) => {
        state.loading = true;
      })
      .addCase(getalldata.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.alldata = action.payload;
      })
      .addCase(getalldata.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { filteralldata } = allDataSlice.actions;

export default allDataSlice.reducer;
