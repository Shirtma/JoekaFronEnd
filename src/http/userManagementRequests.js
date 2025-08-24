import { makeAuthPOSTAPIRequest, makeAuthGETAPIRequest, makeAPIRequest } from './request';

/**
 * Register new user
 * @param {object} newUser - Input names and values from register form e.g {fname: "QA", lname: "Tester"}
 * @returns {AuthPOSTAPIRequest} AuthPOSTAPIRequest
 */
export const register = (newUser) => {
  console.log(`newuser ${newUser}`);
  return makeAuthPOSTAPIRequest('/auth/register', newUser, {}, false);
};

/**
 * Login user
 * @param {object} user - Input names and values from login form e.g {email: "email.com"}
 *  * @returns {AuthPOSTAPIRequest} AuthPOSTAPIRequest
 */
export const login = (user) => makeAPIRequest('/auth/login', 'POST', user, {}, false);

/**
 * Verify code sent to user's email
 * @param {object} code - Code to be verified e.g {code: 1234}
 * @returns {AuthPOSTAPIRequest} AuthPOSTAPIRequest
 */
export const verify = (code) => makeAuthPOSTAPIRequest('/auth/verify/code', code);

/**
 * Resend email verification code
 * @returns {AuthPOSTAPIRequest} AuthPOSTAPIRequest
 */
export const resendVerificationCode = () => makeAuthPOSTAPIRequest('/auth/resend/code');

/**
 * Get authenticated user
 * @returns {AuthAPIRequest} AuthAPIRequest
 */
export const getAutheticatedUser = (path, data, customHeaders) => makeAuthGETAPIRequest('/auth/user', data, customHeaders);
