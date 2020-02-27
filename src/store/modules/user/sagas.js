import { takeLatest, call, put, all } from "redux-saga/effects";
import { toast } from "react-toastify";
import api from "~/services/api";
import { updateProfileSuccess, updateProfileFailure } from "./actions";

export function* updateProfile({ payload }) {
  try {
    const { name, email, avatar_id, ...others } = payload.data;

    const profile = Object.assign(
      { name, email, avatar_id },
      others.oldPassword ? others : { }
    );

    const response = yield call(api.put, "users", profile);

    toast.success("Profile updated successfully");

    yield put(updateProfileSuccess(response.data));
  } catch (err) {
    toast.error("Profile update error. Please, check your data");
    yield put(updateProfileFailure());
  }
}

export default all([takeLatest("@user/UPDATE_PROFILE_REQUEST", updateProfile)]);
