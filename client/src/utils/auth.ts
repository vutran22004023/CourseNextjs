import {jwtDecode} from 'jwt-decode';
import { AppDispatch, store } from '@/redux/store';
import { resetUser, updateUser } from '@/redux/Slides/userSide';
import { GetDetailUser } from '@/apis/user';
import {getTokenFromApi,getRefreshTokenFromApi,Refreshtoken} from '@/apis/auth'

// Hàm lấy token từ cookies
export const getTokenFromCookies = async (): Promise<string | null> => {
  try {
    const res = await getTokenFromApi(); // res là đối tượng có trường token
    return res.token || null; // Trả về giá trị của trường token
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getRefreshTokenFromCookies = async (): Promise<string | null> => {
  try {
    const res = await getRefreshTokenFromApi(); // res là đối tượng có trường token
    return res.token || null; // Trả về giá trị của trường token
  } catch (err) {
    console.log(err);
    return null;
  }
};

const getUserIdFromToken = (token: string) => {
  try {
    const decodedToken = jwtDecode(token);
    return decodedToken?.id || null;
  } catch (e) {
    console.error('Failed to decode token', e);
    return null;
  }
};

// Hàm lưu token vào cookies
export const setTokenInCookies = (token: string) => {
  document.cookie = `access_Token=${token}; Secure; HttpOnly; SameSite=Strict; Path=/`;
};

// Hàm xóa token khỏi cookies
const removeTokenFromCookies = () => {
  document.cookie = `access_Token=; Max-Age=0; Path=/`;
};

export const initializeUser = async (dispatch: AppDispatch) => {
  const isTokenExpired = (token: string): boolean => {
    try {
      const decodedToken: { exp?: number } = jwtDecode(token);
      if (!decodedToken.exp) {
        return true;
      }

      const currentTime = Math.floor(Date.now() / 1000);
      return decodedToken.exp < currentTime;
    } catch (e) {
      console.error('Failed to decode token', e);
      return true;
    }
  };

  try {
    const token = await getTokenFromCookies(); // Lấy token từ cookies

    if (token ) {
      if (isTokenExpired(token)) {
        const refreshToken = await getRefreshTokenFromCookies();
        if (refreshToken) {
           await Refreshtoken(refreshToken);
        }
      } else {
        const userId = getUserIdFromToken(token);

        if (userId) {
          try {
            const response = await GetDetailUser(userId, token);

            if (response.status === 200) {
              dispatch(updateUser({
                name: response.data.name || "",
                email: response.data.email || "",
                avatar: response.data.avatar || "",
                _id: response.data._id || '',
                isAdmin: response.data.isAdmin || false,
                status: response.data.status || false,
              }));
            }
          } catch (error) {
            console.error('Failed to authenticate user', error);
          }
        } else {
          dispatch(resetUser()); // Không có ID trong token, reset user
        }
      }
    } else {
      dispatch(resetUser()); // Không có token, reset user
    }
  } catch (error) {
    console.error('Error fetching token or initializing user', error);
    dispatch(resetUser()); // Đảm bảo reset user trong trường hợp có lỗi
  }
};

