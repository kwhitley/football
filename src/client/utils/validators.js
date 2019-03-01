export const validators = {
  email: {
    isValid: v => v.match(/^.+@.{2,}\..{2,}$/),
    message: `Please enter a valid email address`,
  },
  password: {
    isValid: v => v.length > 8,//match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/),
    message: `Passwords should be at least 8 characters, include capital
              and lowercase letters, and at least one number`,
  },
  collectionName: {
    isValid: isAvailable => isAvailable,
    message: `Collection "slugs" should be a unique identifier of 5 characters or more,
              and only contain lowercase letters, numbers, or dashes.  Example: http://www.supergeneric.me/your-cool-gallery-here`,
  },
}
