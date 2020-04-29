import test from 'ava'
import { requires, ensures } from './../src/common/contract.js'

if (!process.env.NODE_ENV) {
  test('environment variable not set', t => {
    requires(() => false)
    ensures(() => false)

    // Contract not checked
    t.pass()
  })
}

if (process.env.NODE_ENV === 'production') {
  test('production mode', t => {
    process.env.NODE_ENV = 'production'

    requires(() => false)
    ensures(() => false)

    // Contract not checked
    t.pass()
  })
}

if (process.env.NODE_ENV === 'development') {
  test('development mode, contract fails', t => {
    // Contract violated
    t.throws(() => {
      requires(() => false)
    }, {
      message: /precondition/i
    })
    t.throws(() => {
      ensures(() => false)
    }, {
      message: /postcondition/i
    })
  })
}

test.serial('contract passes', t => {
  requires(() => true)
  ensures(() => true)

  // Contract not violated
  t.pass()
})
