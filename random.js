
export const randInt = n => Math.floor(n * Math.random())

const CHANNEL = ['r', 'g', 'b']

export const randColorChange = () => {
  const result = {}
  result[CHANNEL[randInt(3)]] = randInt(3) - 1
  return result
}
