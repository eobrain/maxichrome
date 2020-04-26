import fs from 'fs'
import maxichromeDev from './index_dev.js'

const repetitions = 100

const CsvOut = (path, columns) => new Promise((resolve, reject) => {
  const promises = []
  const write = (...args) => {
    promises.push(new Promise((resolve, reject) => {
      fs.appendFile(path, args.join() + '\n', err => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    }))
  }

  const close = () => Promise.all(promises)

  fs.writeFile(path, columns + '\n', err => {
    if (err) {
      reject(err)
    } else {
      resolve({ write, close })
    }
  })
})

const Stats = () => {
  let n = 0
  let sum = 0
  let sumSq = 0
  let min_ = Infinity
  let max_ = -Infinity
  const dist_ = []
  const put = x => {
    ++n
    sum += x
    sumSq += x * x
    min_ = Math.min(min_, x)
    max_ = Math.max(max_, x)
    const bucket = 2 * Math.round(x / 2)
    dist_[bucket] = (dist_[bucket] || 0) + 1
  }
  const mean = () => sum / n
  const stddev = () => Math.sqrt(n * sumSq - sum * sum) / n
  const dist = () => dist_
  const min = () => min_
  const low = () => mean() - stddev() * 2
  const high = () => mean() + stddev() * 2
  const max = () => max_
  return { put, min, low, mean, high, max, stddev, dist }
}

const kL = 0.5
const kC = 8
const kH = 2

;(async () => {
  const csvOut = await CsvOut('perf.csv', 'n, tries, time, dEMin, dELow, dEMean, dist, roughness')
  for (let tries = 1; tries <= 5; ++tries) {
    const n = 7
    const elapsedStats = Stats()
    const dEStats = Stats()
    const dEStddevStats = Stats()
    for (let i = 0; i < repetitions; ++i) {
      const start = Date.now()
      const colors = await maxichromeDev(kL, kC, kH, n, tries)
      const dt = (Date.now() - start) / 1000.0
      const colorStats = Stats()
      for (let i = 0; i < n; ++i) {
        for (let j = i + 1; j < n; ++j) {
          colorStats.put(colors[i].deltaE(kL, kC, kH, colors[j]))
        }
      }
      elapsedStats.put(dt)
      dEStats.put(colorStats.mean())
      dEStddevStats.put(colorStats.stddev())
    }
    const time = elapsedStats.mean()
    const dEMean = dEStats.mean()
    const dEMin = dEStats.min()
    const dELow = dEStats.low()
    const dist = dEStats.dist()
    const roughness = dEStddevStats.mean()
    console.table({ n, tries, time, dEMin, dELow, dEMean, dist, roughness })
    csvOut.write(n, tries, time, dEMin, dELow, dEMean, dist, roughness)
  }
  await csvOut.close()
})()
