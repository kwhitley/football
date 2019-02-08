export const validators = {
  password: () => ({
    isValid: v => v.length > 8,
    message: 'Password should be longer than 8 characters',
  }),
  collectionName: (isAvailable) => ({
    isValid: () => isAvailable,
    message: 'This name is invalid or has already been taken',
  })
}
