import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
// slices
import mailReducer from './slices/mail';
import chatReducer from './slices/chat';
import productReducer from './slices/product';
import calendarReducer from './slices/calendar';
import kanbanReducer from './slices/kanban';
import blogTagReducer from './slices/blog/blog.tag';
import hackerthonExerciseReducer from './slices/hackerthon/hackerthon.exercise';
import hackerthonAnswerReducer from './slices/hackerthon/hackerthon.answer';
import hackerthonCategoryReducer from './slices/hackerthon/hackerthon.category';
import hackerthonExamReducer from './slices/hackerthon/hackerthon.exam';
import hackerthonSolutionReducer from './slices/hackerthon/hackerthon.solution';



// ----------------------------------------------------------------------

const createNoopStorage = () => ({
  getItem() {
    return Promise.resolve(null);
  },
  setItem(_key, value) {
    return Promise.resolve(value);
  },
  removeItem() {
    return Promise.resolve();
  },
});

const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

const productPersistConfig = {
  key: 'product',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};

const rootReducer = combineReducers({
  mail: mailReducer,
  chat: chatReducer,
  calendar: calendarReducer,
  kanban: kanbanReducer,
  product: persistReducer(productPersistConfig, productReducer),
  blogTag: persistReducer({ ...rootPersistConfig, key: "blog-tag" }, blogTagReducer),
  hackerthonExercise: persistReducer({ ...rootPersistConfig, key: "hackerthon-exercise" }, hackerthonExerciseReducer),
  hackerthonAnswer: persistReducer({ ...rootPersistConfig, key: "hackerthon-answer" }, hackerthonAnswerReducer),
  hackerthonCategory: persistReducer({ ...rootPersistConfig, key: "hackerthon-category" }, hackerthonCategoryReducer),
  hackerthonExam: persistReducer({ ...rootPersistConfig, key: "hackerthon-exam" }, hackerthonExamReducer),
  hackerthonSolution: persistReducer({ ...rootPersistConfig, key: "hackerthon-solution" }, hackerthonSolutionReducer),

});

export { rootPersistConfig, rootReducer };
