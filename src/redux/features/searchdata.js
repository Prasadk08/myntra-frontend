import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getSearchData = createAsyncThunk(
  "/searchdata/getsearchdata",
  async (data) => {
    let res = await axios.get(
      `https://fakestoreapi.in/api/products/category?type=${data}`
    );
    return res.data.products;
  }
);

const searchdataSlice = new createSlice({
  name: "searchdata",
  initialState: {
    searchdata: [],
    search: "",
    loading: "",
    error: "",
  },
  reducers: {
    filterRange: (state, action) => {
      const [min, max] = action.payload;
      state.searchdata = state.searchdata.filter(
        (item) => item.price >= min && item.price <= max
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSearchData.pending, (state) => {
        state.loading = "true";
      })
      .addCase(getSearchData.fulfilled, (state, action) => {
        state.loading = "false";
        state.error = "";
        state.searchdata = action.payload;
      })
      .addCase(getSearchData.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const {filterRange}=searchdataSlice.actions

export default searchdataSlice.reducer;
