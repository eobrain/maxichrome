
const isWeb = typeof window !== 'undefined'
const isNode = typeof process !== 'undefined'

const isDockedDevtool = isWeb && (
  window.outerWidth - window.innerWidth > 100 ||
    window.outerHeight - window.innerHeight > 100)

const isDevelopment = isNode && (process.env.NODE_ENV || 'development') === 'development'

const isDebug = isDockedDevtool || isDevelopment

if (isDebug) {
  console.log('Contract checking enabled.')
} else {
  console.log('No Contract checking.')
}

export const requires = isDebug
  ? condition => {
    if (!condition()) {
      throw Error('Precondition violated')
    }
  }
  : () => {}

export const ensures = isDebug
  ? condition => {
    if (!condition()) {
      throw Error('Postcondition violated')
    }
  }
  : () => {}
