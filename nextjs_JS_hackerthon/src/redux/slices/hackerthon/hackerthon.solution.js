import { createSlice } from "@reduxjs/toolkit";
import { findSolutionAPI, getSolutionByIdAPI } from "../../../service/hackerthon/hackerthon.solution.service";

const initialState = {
    isLoading: false,
    error: null,
    totalElements: 0,
    totalPages: 0,
    numberOfElements: 0,
    solutions: [],
    solution: null,
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
    name: 'solution',
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
        setSolutions(state, action) {
            state.isLoading = false;
            const response = action.payload;
            state.solutions = response.data;
            state.totalElements = response.totalElements;
            state.totalPages = response.totalPages;
            state.numberOfElements = response.numberOfElements;
        },
        setSolution(state, action) {
            state.isLoading = false;
            const response = action.payload;
            state.solution = response.data;
        },
        setSolutionSearch(state, action) {
            state.isLoading = false;
            state.search = action.payload;
        }
    }
});

// Reducer
export default slice.reducer;
// Actions
export const { setSolutionSearch } = slice.actions;
// ----------------------------------------------------------------------

export function getSolutions() {
    return async (dispatch, getState) => {
        dispatch(slice.actions.startLoading());
        // read state from rootReducer
        const { hackerthonSolution } = getState();

        const resp = await findSolutionAPI({ ...hackerthonSolution.search, value: `%${hackerthonSolution.search.value}%` });
        console.log(resp);
        if (resp.code === '200')
            dispatch(slice.actions.setSolutions(resp));
        else
            dispatch(slice.actions.hasError(resp));
    };
}

export function getSolution(id) {
    return async (dispatch) => {
        dispatch(slice.actions.startLoading());

        const resp = await getSolutionByIdAPI(id);
        if (resp.code === '200')
            dispatch(slice.actions.setSolution(resp));
        else
            dispatch(slice.actions.hasError(resp));
            console.log(resp)
    };
}