import { createSlice } from "@reduxjs/toolkit";
import { findExerciseAPI, getExerciseByIdAPI } from "../../../service/hackerthon/hackerthon.exercise.service";

const initialState = {
    isLoading: false,
    error: null,
    totalElements: 0,
    totalPages: 0,
    numberOfElements: 0,
    exercises: [],
    exercise: null,
    search: {
        page: 0,
        // size: 0,
        value: '',
        orders: [
            {
                order: "desc",
                property: 'createdAt'
            }
        ]
    }
};

const slice = createSlice({
    name: 'exercise',
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
        setExercises(state, action) {
            state.isLoading = false;
            const response = action.payload;
            state.exercises = response.data;
            state.totalElements = response.totalElements;
            state.totalPages = response.totalPages;
            state.numberOfElements = response.numberOfElements;
        },
        setExercise(state, action) {
            state.isLoading = false;
            const response = action.payload;
            state.exercise = response.data;
        },
        setExerciseSearch(state, action) {
            state.isLoading = false;
            state.search = action.payload;
        }
    }
});

// Reducer
export default slice.reducer;
// Actions
export const { setExerciseSearch } = slice.actions;
// ----------------------------------------------------------------------

export function getExercises() {
    return async (dispatch, getState) => {
        dispatch(slice.actions.startLoading());
        // read state from rootReducer
        const { hackerthonExercise } = getState();

        const resp = await findExerciseAPI({ ...hackerthonExercise.search, value: `%${hackerthonExercise.search.value}%` });
        console.log(resp);
        if (resp.code === '200')
            dispatch(slice.actions.setExercises(resp));
        else
            dispatch(slice.actions.hasError(resp));
    };
}

export function getExercise(id) {
    return async (dispatch) => {
        dispatch(slice.actions.startLoading());

        const resp = await getExerciseByIdAPI(id);
        if (resp.code === '200')
            dispatch(slice.actions.setExercise(resp));
        else
            dispatch(slice.actions.hasError(resp));
            console.log(resp)
    };
}