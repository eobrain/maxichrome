
export const randInt = n => Math.floor(n * Math.random())

/**
 * Shuffles array in place.
 * https://stackoverflow.com/a/6274381/978525
 * @param {Array} a items An array containing the items.
 */
export const shuffle = a => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
