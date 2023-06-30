import { createSlice } from "@reduxjs/toolkit";
import { findExamAPI, getExamByIdAPI } from "../../../service/hackerthon/hackerthon.exam.service";

const initialState = {
    isLoading: false,
    error: null,
    totalElements: 0,
    totalPages: 0,
    numberOfElements: 0,
    exams: [],
    exam: null,
    search: {
        page: 0,
        // size: 10,
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
    name: 'exam',
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
        setExams(state, action) {
            state.isLoading = false;
            const response = action.payload;
            state.exams = response.data;
            state.totalElements = response.totalElements;
            state.totalPages = response.totalPages;
            state.numberOfElements = response.numberOfElements;
        },
        setExam(state, action) {
            state.isLoading = false;
            const response = action.payload;
            state.exam = response.data;
        },
        setExamSearch(state, action) {
            state.isLoading = false;
            state.search = action.payload;
        }
    }
});

// Reducer
export default slice.reducer;
// Actions
export const { setExamSearch } = slice.actions;
// ----------------------------------------------------------------------

export function getExams() {
    return async (dispatch, getState) => {
        dispatch(slice.actions.startLoading());
        // read state from rootReducer
        const { hackerthonExam } = getState();

        const resp = await findExamAPI({ ...hackerthonExam.search, value: `%${hackerthonExam.search.value}%` });
        console.log(resp);
        if (resp.code === '200')
            dispatch(slice.actions.setExams(resp));
        else
            dispatch(slice.actions.hasError(resp));
    };
}

export function getExam(id) {
    return async (dispatch) => {
        dispatch(slice.actions.startLoading());

        const resp = await getExamByIdAPI(id);
        if (resp.code === '200')
            dispatch(slice.actions.setExam(resp));
        else
            dispatch(slice.actions.hasError(resp));
    };
}