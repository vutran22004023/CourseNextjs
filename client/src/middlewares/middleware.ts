// middleware.js
import { updateUser } from '../redux/Slides/userSide'; // Action để lưu thông tin người dùng vào Redux store
import { GetDetailUser } from '@/apis/user';

export const checkAuthMiddleware = store => next => async action => {
  if (action.type === '@@redux-persist/REHYDRATE') {
    const token = store.getState().user.access_Token;
    const id = store.getState().user.id;
    if (token) {
      try {
        const response = await GetDetailUser(id, token);
        if(response.status === 200) {
          store.dispatch(updateUser({
            name:response.data.name || "",
            email:response.data.email || "",
            access_Token: token,
            avatar: response.data.avatar || "",
            _id:id,
            isAdmin:response.data.isAdmin || false,
            status:response.data.status || false,
          }));}
      } catch (error) {
        console.error('Failed to authenticate user', error);
      }
    }
  }
  return next(action);
};
