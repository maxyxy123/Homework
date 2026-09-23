import { put, patch } from "./httpClient";

// PUT: gửi toàn bộ object user.
export function updateUserByPut(id, fullUser) {
  return put(`/users/${id}`, fullUser);
}

// PATCH: chỉ gửi field cần thay đổi.
export function updateUserPhoneByPatch(id, phone) {
  return patch(`/users/${id}`, { phone });
}
