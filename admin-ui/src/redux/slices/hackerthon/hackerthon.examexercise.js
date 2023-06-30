import { createSlice } from '@reduxjs/toolkit';
import { findExamsAPI, getExamByIdAPI } from '../../../service/hackerthon/hackerthon.exam.service';
import { findExamExercisesAPI, getExamExerciseByIdAPI } from '../../../service/hackerthon/hackerthon.examExercise.service';
// utils

const initialState = {
  isLoading: false,
  error: null,
  totalElements: 0,
  totalPages: 0,
  numberOfElements: 0,
  examexercises: [],
  examexercise: null,
  search: {
    page: 0,
    size: 10,
    value: '',
    // orders: [
    //   {
    //     order: 'desc',
    //     property: 'createdAt',
    //   },
    // ],
  },
};

const slice = createSlice({
  name: 'examexercise',
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
    setExamExercises(state, action) {
      state.isLoading = false;
      const response = action.payload;
      state.examexercises = response.data;
      state.totalElements = response.totalElements;
      state.totalPages = response.totalPages;
      state.numberOfElements = response.numberOfElements;
    },
    setExamExercise(state, action) {
      state.isLoading = false;
      const response = action.payload;
      state.examexercise = response.data;
    },
    setExamExerciseSearch(state, action) {
      state.isLoading = false;
      state.search = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;
// Actions
export const { setExamExerciseSearch } = slice.actions;
// ----------------------------------------------------------------------

export function getExamExercises() {
  return async (dispatch, getState) => {
    dispatch(slice.actions.startLoading());
    // read state from rootReducer
    const { examexercise } = getState();

    const resp = await findExamExercisesAPI({ ...examexercise.search, value: `%${examexercise.search.value}%` });

    if (resp.code === '200') dispatch(slice.actions.setExamExercises(resp));
    else dispatch(slice.actions.hasError(resp));
  };
}

export function getExam(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());

    const resp = await getExamExerciseByIdAPI(id);
    if (resp.code === '200') dispatch(slice.actions.setExamExercise(resp));
    else dispatch(slice.actions.hasError(resp));
  };
}
