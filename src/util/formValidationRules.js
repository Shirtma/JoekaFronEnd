import naijaNumber from 'naija-phone-number';
// import React from "react";
export function validateLogin(values = {}) {
  const errors = {};
  if (!values.username) {
    errors.username = 'Input your email address';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.username)) {
    errors.username = 'Confirm that this is a valid email address';
  }
  if (!values.password) {
    errors.password = 'Input your password';
  }

  return errors;
}

export function validateSignUp(values) {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = 'Input your first name';
  }
  if (!values.lastName) {
    errors.lastName = 'Input your last name';
  }
  if (!values.email) {
    errors.email = 'Input your email address';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Confirm that this is a valid email address';
  }
  if (!values.password) {
    errors.password = 'Input your password';
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = 'Input confirm password';
  }

  if ((values.password && values.confirmPassword) && (values.password !== values.confirmPassword)) {
    errors.confirmPassword = 'passowords do not match';
  }
  return errors;
}

export function validateReserve(values) {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = 'Input your first name';
  }
  if (!values.lastName) {
    errors.lastName = 'Input your last name';
  }
  if (!values.email) {
    errors.email = 'Input your email address';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Confirm that this is a valid email address';
  }
  if (!values.phoneNumber) {
    errors.phoneNumber = 'Input your phone number';
  }
  if (!values.phoneNumber.length && naijaNumber.isValid(values.phoneNumber)) {
    errors.phoneNumber = 'Input a valid phone number';
  }
  if (!values.date) {
    errors.date = 'Select a date';
  }

  if (!values.guests) {
    errors.guests = 'Input number of expected guests';
  }

  if (!values.arrival) {
    errors.arrival = 'Input arrival time';
  }
  return errors;
}

export function validateVerify(values) {
  const errors = {};
  if (!values.code) {
    errors.code = 'Input your verification code';
  }
  return errors;
}

export function validateProfile(values) {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = 'Input your first name';
  }
  if (!values.lastName) {
    errors.lastName = 'Input your last name';
  }
  if (!values.email) {
    errors.email = 'Input your email address';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Confirm that this is a valid email address';
  }
  if (!values.bio) {
    errors.password = 'Enter your bio';
  }
  return errors;
}

export function validatePassword(values) {
  const errors = {};
  if (!values.current_password) {
    errors.current_password = 'Input your current password';
  }
  if (!values.new_password) {
    errors.new_password = 'Input your new password';
  }
  if (!values.confirm_password) {
    errors.confirm_password = 'Confirm your new password';
  }
  return errors;
}

export function validateModalForm(values, name, label) {
  const errors = {};
  if (!values[name]) {
    errors[name] = `Input your ${label}`;
  }
  return errors;
}
