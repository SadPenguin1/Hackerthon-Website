import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import mediaCacheReducer from './slices/hackerthon/hackerthon.cache';
import categoryReducer from './slices/hackerthon/hackerthon.category';
import examReducer from './slices/hackerthon/hackerthon.exam';
import mediaPrivilegeReducer from './slices/hackerthon/hackerthon.privilege';
import mediaRoleReducer from './slices/hackerthon/hackerthon.role';
import exerciseReducer from './slices/hackerthon/hackerthon.exercise';
import solutionReducer from './slices/hackerthon/hackerthon.solution';
import mediaUserReducer from './slices/hackerthon/hackerthon.user';
import tagReducer from './slices/hackerthon/hackerthon.tag';


// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  blacklist: ['error']
};

const rootReducer = combineReducers({
  mediaCache: persistReducer({ ...rootPersistConfig, key: "hackerthon-cache" }, mediaCacheReducer),
  mediaPrivilege: persistReducer({ ...rootPersistConfig, key: "hackerthon-privilege" }, mediaPrivilegeReducer),
  mediaRole: persistReducer({ ...rootPersistConfig, key: "hackerthon-role" }, mediaRoleReducer),
  mediaUser: persistReducer({ ...rootPersistConfig, key: "hackerthon-user" }, mediaUserReducer),
  exercise: persistReducer({ ...rootPersistConfig, key: "hackerthon-exercise" }, exerciseReducer),
  category: persistReducer({ ...rootPersistConfig, key: "hackerthon-category" }, categoryReducer),
  exam: persistReducer({ ...rootPersistConfig, key: "hackerthon-exam" }, examReducer),
  solution: persistReducer({ ...rootPersistConfig, key: "hackerthon-solution" }, solutionReducer),
  tag: persistReducer({ ...rootPersistConfig, key: "hackerthon-tag" }, tagReducer),

});

export { rootPersistConfig, rootReducer };

