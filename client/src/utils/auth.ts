import { updateUser } from '@/redux/Slides/userSide';
import { AppDispatch } from '@/redux/store';
import { parse } from 'cookie';

export const initializeUser = (dispatch: AppDispatch) => {
  if (typeof document !== 'undefined') {
    const cookies = parse(document.cookie || '');
    const userCookie = cookies.user;

    if (userCookie) {
      const user = JSON.parse(userCookie);
      dispatch(updateUser(user));
    }
  }
};