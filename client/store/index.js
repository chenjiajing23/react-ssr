import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { clientAxiosInstance, serverAxiosInstance } from "../utils/axios";

import homeReducer from "./home";

//合并项目组件中store的reducer
const reducer = combineReducers({
  home: homeReducer
});

//导出创建的store
// 导出函数的目的是，在服务端渲染时，保证每个用户请求得到是不同的store
export const getServerStore = () => {
  return createStore(
    reducer,
    applyMiddleware(thunk.withExtraArgument(serverAxiosInstance))
  );
};

// 服务端不支持 window，所以这里要区分服务端和客户端的方法
export const getClientStore = () => {
  const initialState = window.initialState ? window.initialState : {};
  return createStore(
    reducer,
    initialState,
    composeWithDevTools(
      applyMiddleware(thunk.withExtraArgument(clientAxiosInstance))
    )
  );
};
