
const isWeb = typeof window !== 'undefined'
const isNode = typeof process !== 'undefined'

const isWebDevelopment = isWeb && (
  window.outerWidth - window.innerWidth > 100 ||
    window.outerHeight - window.innerHeight > 100)

const isNodeProduction = isNode && (process.env.NODE_ENV || 'production') === 'production'

const isDebug = isWebDevelopment || (isNode && !isNodeProduction)

if (isDebug) {
  console.warn('Contract checking enabled.')
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
