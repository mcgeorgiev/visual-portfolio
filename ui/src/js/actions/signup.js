export const signupSubmitted = () => ({
  type: 'SIGNUP_SUBMITTED',
});

export const signupErrorMessage = error => ({
  type: 'SIGNUP_ERROR',
  error
})

export const signupEmailChanged = email => ({
  type: 'SIGNUP_EMAIL_CHANGED',
  email
})

export const signupPasswordChanged = password => ({
  type: 'SIGNUP_PASSWORD_CHANGED',
  password
})

export const signupFullNameChanged = fullName => ({
  type: 'SIGNUP_FULLNAME_CHANGED',
  fullName
})