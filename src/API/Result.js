import axios from "axios";

export const GetResultData = async (adminId) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/result/declare/${adminId}`
    );
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
