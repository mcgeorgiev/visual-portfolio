export const signupSubmitted = () => ({
  type: 'SIGNUP_SUBMITTED',
});

export const signupErrorMessage = error => ({
  type: 'SIGNUP_ERROR',
  error
})