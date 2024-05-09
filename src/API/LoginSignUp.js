import axios from "axios";
export const RegisterUser = async (postData) => {
  try {
    const { data } = await axios.post("/users", postData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!data) {
      return { data: null, status: null, success: false };
    }
    return {
      data: data,
    };
  } catch (error) {
    return {
      data: null,
      status: error?.response?.status,
      success: false,
      error: error?.response?.data?.message,
    };
  }
};

export const LoginUser = async (postData) => {
  try {
    const { data } = await axios.post("/users/login", postData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!data) {
      return { data: null, status: null, success: false };
    }
    return {
      data: data,
    };
  } catch (error) {
    return {
      data: null,
      status: error?.response?.status,
      success: false,
      error: error?.response?.data?.message,
    };
  }
};
