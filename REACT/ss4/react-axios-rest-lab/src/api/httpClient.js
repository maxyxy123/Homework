import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3004",
  timeout: 5000,
});

// REQUEST INTERCEPTOR
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Không có token thì bỏ qua, không throw lỗi.
    return config;
  },
  (error) => Promise.reject(error)
);

// RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      console.warn("401 Unauthorized -> chuyển về trang login");
      window.location.href = "/login";
    }

    if (status === 500) {
      console.error("500 Internal Server Error");
    }

    return Promise.reject(error);
  }
);

function cleanParams(params) {
  if (!params || typeof params !== "object" || Array.isArray(params)) {
    return {};
  }

  return Object.fromEntries(
    Object.entries(params).filter(
      ([, value]) => value !== undefined && value !== null && value !== ""
    )
  );
}

export function get(url, params = {}, config = {}) {
  return api.get(url, {
    ...config,
    params: cleanParams(params),
  });
}

export function post(url, data) {
  return api.post(url, data);
}

export function put(url, data) {
  return api.put(url, data);
}

export function patch(url, data) {
  return api.patch(url, data);
}

export function remove(url) {
  return api.delete(url);
}

export default api;
