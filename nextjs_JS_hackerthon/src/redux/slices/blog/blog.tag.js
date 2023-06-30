import { createSlice } from '@reduxjs/toolkit';
import { findBlogTagsAPI, getBlogTagByIdAPI } from '../../../service/blog/blog.tag.service';
// utils

const initialState = {
  isLoading: false,
  error: null,
  totalElements: 0,
  totalPages: 0,
  numberOfElements: 0,
  tags: [],
  tag: null,
  search: {
    page: 0,
    size: 10,
    value: '',
    orders: [
      {
        order: 'desc',
        property: 'createdAt',
      },
    ],
  },
};

const slice = createSlice({
  name: 'blogTag',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
      state.error = null;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    setTags(state, action) {
      state.isLoading = false;
      const response = action.payload;
      state.tags = response.data;
      state.totalElements = response.totalElements;
      state.totalPages = response.totalPages;
      state.numberOfElements = response.numberOfElements;
    },
    setTag(state, action) {
      state.isLoading = false;
      const response = action.payload;
      state.tag = response.data;
    },
    setBlogTagSearch(state, action) {
      state.isLoading = false;
      state.search = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;
// Actions
export const { setBlogTagSearch } = slice.actions;
// ----------------------------------------------------------------------

export function getBlogTags() {
  return async (dispatch, getState) => {
    dispatch(slice.actions.startLoading());
    // read state from rootReducer
    const { blogTag } = getState();

    const resp = await findBlogTagsAPI({ ...blogTag.search, value: `%${blogTag.search.value}%` });

    if (resp.code === '200') dispatch(slice.actions.setTags(resp));
    else dispatch(slice.actions.hasError(resp));
  };
}

export function getBlogTag(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());

    const resp = await getBlogTagByIdAPI(id);
    if (resp.code === '200') dispatch(slice.actions.setTags(resp));
    else dispatch(slice.actions.hasError(resp));
  };
}
