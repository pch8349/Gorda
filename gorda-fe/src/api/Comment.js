import apiInstance from "./Index";

const api = apiInstance();

export const postComment = async (data, success, fail) => {
  await api.post(`api/donation_comment/regist`, data).then(success).catch(fail);
};

export const getComment = async (data, success, fail) => {
  await api
    .get(`api/donation_comment/user/${data.userIdx}`)
    .then(success)
    .catch(fail);
};

export const deleteComment = async (data, success, fail) => {
  await api
    .delete(`api/donation_comment/${data.donationCommentIdx}`)
    .then(success)
    .catch(fail);
};
