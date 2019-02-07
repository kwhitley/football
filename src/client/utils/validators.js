export const validators = {
  password: {
    fn: v => v.length > 8,
    message: 'Password should be longer than 8 characters',
  }
}
