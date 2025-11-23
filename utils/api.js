import { get } from "http";
import Cookies from "js-cookie";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL_V1;

export const API = {
  register: (data) => hitAPI("/auth/register", data, "POST"),
  login: (data) => hitAPI("/auth/login", data, "POST"),
  selectRole: (data) => hitAPI("/auth/select-role", data, "POST", 'yes'),
  forgotPassword: (data) => hitAPI("/auth/forgot-password", data, "POST"),
  resetPassword: (data) => hitAPI("/auth/reset-password", data, "POST"),
  //   verifyOtp: (data) => hitAPI("auth/verify-otp", data, "POST"),
  //   resetPassword: (data) => hitAPI("auth/reset-password", data, "POST"),
  //   profileUpdate: (data) => hitAPI("my-profile/save-personal-info", data, "POST", "yes"),
  //   profilePhotoUpdate: (data) => hitAPI("my-profile/save-profile-photo", data, "POST", "yes"),
};

export const DashboardAPI = {
  // changePassword: (data) => hitAPI("/users/change-password", data, "POST", 'yes'),
  changePassword: (data) => hitAPI("/auth/update-password", data, "PUT", 'yes'),
  get2FAStatus: () => hitAPI("/2fa/status", {}, "GET", 'yes'),
  setupAuthenticator: () => hitAPI("/2fa/authenticator/setup", {}, "POST", 'yes'),
  verifyAuthenticator: (data) => hitAPI("/2fa/authenticator/verify", data, "POST", 'yes'),
  disableAuthenticator: () => hitAPI("/2fa/authenticator/disable", {}, "POST", 'yes'),
  enableOneTimeOTP: () => hitAPI("/2fa/one-time-code/enable", {}, "POST", 'yes'),
  disableOneTimeOTP: () => hitAPI("/2fa/one-time-code/disable", {}, "POST", 'yes'),
  setupSecurityQuestions: (data) => hitAPI("/2fa/security-questions/setup", data, "POST", 'yes'),
  disableSecurityQuestions: () => hitAPI("/2fa/security-questions/disable", {}, "POST", 'yes'),
  getSecurityQuestions: () => hitAPI("/2fa/security-questions", {}, "GET", 'yes'),
  verifyAuth2FA: (data) => hitAPI("/auth/verify-2fa", data, "POST"),
  sendOneTimeOTP: (data) => hitAPI("/auth/send-2fa-code", data, "POST"),
  // changePassword: (data) => hitAPI("/users/change-password", data, "POST", 'yes'),
  changeEmail: (data) => hitAPI("/auth/change-email", data, "PUT", 'yes'),

  // Device sessions
  getDeviceSessions: () => hitAPI("/device-sessions", {}, "GET", 'yes'),
  blockDeviceSession: (sessionId) => hitAPI(`/device-sessions/${sessionId}/block`, { sessionId }, "PUT", 'yes'),
  unblockDeviceSession: (sessionId) => hitAPI(`/device-sessions/${sessionId}/unblock`, { sessionId }, "PUT", 'yes'),
  // Profile
  getProfile: () => hitAPI("/profile", {}, "GET", 'yes'),
  updateProfile: (data) => hitAPI("/profile", data, "PUT", 'yes'),
};

export const SuperAdminAPI = {
  GetAdmin: (data) => hitAPI("/business/users", data, "GET",'yes'),
  Createadmin: (data) => hitAPI("/business/users", data, "POST",'yes'),
  updateAdmin: (userId, data) => hitAPI(`/business/users/${userId}`, data, "PUT",'yes'),
  suspendAdmin: (userId) => hitAPI(`/business/users/${userId}/suspend`, {}, "PUT",'yes'),
  activateAdmin: (userId) => hitAPI(`/business/users/${userId}/activate`, {}, "PUT",'yes'),
  removeAdmin: (userId) => hitAPI(`/business/users/${userId}`, {}, "DELETE",'yes'),
};

export const billingAPI = {
  addPaymentMethod: (data) => hitAPI("/billing/payment-methods", data, "POST", 'yes'),
  getPaymentMethods: () => hitAPI("/billing/payment-methods", {}, "GET", 'yes'),
  deletePaymentMethod: (paymentMethodId) => hitAPI(`/billing/payment-methods/${paymentMethodId}`, {}, "DELETE", 'yes'),
  setDefaultPaymentMethod: (paymentMethodId) => hitAPI(`/billing/payment-methods/${paymentMethodId}/set-default`, {}, "PUT", 'yes'),
};

async function hitAPI(endpoint, data = {}, method = "POST", token = null) {
  try {
    if (token === "yes") {
      token = Cookies.get("authToken");
    }

    const isFormData = data instanceof FormData;

    // Build full URL
    let url = `${BASE_URL}${endpoint}`;

    // For GET requests, append params to URL
    if (method === "GET" && data && Object.keys(data).length > 0) {
      const query = new URLSearchParams(data).toString();
      url += `?${query}`;
    }

    const options = {
      method,
      headers: {
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };

    // Only include body for non-GET methods
    if (method !== "GET" && method !== "HEAD") {
      options.body = isFormData ? data : JSON.stringify(data);
    }

    const res = await fetch(url, options);

    // Gracefully handle empty responses (e.g., 204 No Content)
    const contentType = res.headers.get('content-type') || '';
    let bodyText = '';
    try {
      bodyText = await res.text();
    } catch (_) {
      bodyText = '';
    }

    let result = null;
    if (bodyText && contentType.includes('application/json')) {
      try {
        result = JSON.parse(bodyText);
      } catch (_) {
        result = bodyText;
      }
    } else if (bodyText) {
      result = bodyText;
    }

    if (!res.ok) {
      let finalMessage = "Something went wrong";

      // Handle new validation error format with fields array
      if (result && typeof result === 'object' && result.fields && Array.isArray(result.fields)) {
        const firstFieldError = result.fields[0];
        finalMessage = firstFieldError?.error || result.message || finalMessage;
        return { success: false, message: finalMessage, fields: result.fields };
      }
      // Handle old errors object format
      else if (result && typeof result === 'object' && result.errors) {
        const firstField = Object.keys(result.errors)[0];
        finalMessage = result.errors[firstField][0] || finalMessage;
      } else if (result && typeof result === 'object' && result.message) {
        finalMessage = result.message;
      } else if (typeof result === 'string' && result.trim().length) {
        finalMessage = result;
      }

      return { success: false, message: finalMessage };
    }

    return { success: true, message: result };
  } catch (err) {
    console.error("API Error:", err);
    return { success: false, message: "Network error. Please try again later." };
  }
}

// export async function logOut() {
//   const token = Cookies.get("authToken");

//   const res = await fetch(`${BASE_URL}logout`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       ...(token && { Authorization: `Bearer ${token}` }),
//     },
//   });

//   const result = await res.json();

//   if (!res.ok) {
//     let finalMessage = "Something went wrong";

//     if (result.errors) {
//       const firstField = Object.keys(result.errors)[0];
//       finalMessage = result.errors[firstField][0] || finalMessage;
//     } else if (result.message) {
//       finalMessage = result.message;
//     }

//     return { success: false, message: finalMessage };
//   }

//   return { success: true, message: result };
// }
