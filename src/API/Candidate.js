import axios from "axios";

export const GetCandidateForUser = async (userId) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/users/candidate/${userId}`
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
export const GetCandidateForAdmin = async (adminId) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/admin/candidates/${adminId}`
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

export const handlegetsingleCandidate = async (candidateId) => {
  console.log(candidateId);
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/admin/candidate/${candidateId}`
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

export const handleUserVote = async (candidate_id, userId) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/users/voting/${candidate_id}`,
      { id: userId },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      return { data: response?.data, message: response?.data?.message };
    }
  } catch (error) {
    return {
      data: null,
      status: error?.response?.status,
      success: false,
      error: error?.response?.data?.message,
    };
  }
};

export const handleLogoutapi = async () => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/admin/logout`
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

export const handleAddCandidate = async (name, currentusername) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/admin/addCandidate`,
      { name, username: currentusername },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
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
