import { createSlice } from "@reduxjs/toolkit";
import { findAnswerAPI, getAnswerByIdAPI } from "../../../service/hackerthon/hackerthon.answer.service";
import { dispatch } from "src/redux/store";

const initialState = {
    isLoading: false,
    error: null,
    totalElements: 0,
    totalPages: 0,
    numberOfElements: 0,
    answers: [],
    answer: {
        id : '',
        useAnswer:''
    },
    search: {
        page: 0,
        size: 100,
        value: '',
        orders: [
            {
                order: "desc",
                property: 'createAt'
            }
        ]
    },
    // body:""
};

const slice = createSlice({
    name: 'answer',
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
        setAnswers(state, action) {
            state.isLoading = false;
            const response = action.payload;
            state.answers = response.data;
            state.totalElements = response.totalElements;
            state.totalPages = response.totalPages;
            state.numberOfElements = response.numberOfElements;
        },
        setAnswer(state, action) {
            state.isLoading = false;
            const response = action.payload;
            state.answer = response.data;
        },
        setAnswerSearch(state, action) {
            state.isLoading = false;
            state.search = action.payload;
        },
        setBody(state, action) {
            state.answer.useAnswer = action.payload;
        }
    }
});

// Reducer
export default slice.reducer;
// Actions
export const { setAnswerSearch,setBody } = slice.actions;
// ----------------------------------------------------------------------

export function getAnswers() {
    return async (dispatch, getState) => {
        dispatch(slice.actions.startLoading());
        // read state from rootReducer
        const { hackerthonAnswer } = getState();

        const resp = await findAnswerAPI({ ...hackerthonAnswer.search, value: `%${hackerthonAnswer.search.value}%` });
        console.log(resp);
        if (resp.code === '200')
            dispatch(slice.actions.setAnswers(resp));
        else
            dispatch(slice.actions.hasError(resp));
    };
}

export function getAnswer(id) {
    return async (dispatch) => {
        dispatch(slice.actions.startLoading());

        const resp = await getAnswerByIdAPI(id);
        if (resp.code === '200')
            dispatch(slice.actions.setAnswer(resp));
        else
            dispatch(slice.actions.hasError(resp));
    };
}
