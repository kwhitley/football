export const validators = {
  email: () => ({
    isValid: v => v.match(/^.+@.{2,}\..{2,}$/),
    message: `Please enter a valid email address`,
  }),
  password: () => ({
    isValid: v => v.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/),
    message: `Passwords should be at least 8 characters, include capital
              and lowercase letters, and at least one number`,
  }),
  collectionName: (isAvailable) => ({
    isValid: () => isAvailable,
    message: 'This name is invalid or has already been taken',
  })
}
