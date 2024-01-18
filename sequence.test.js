import { isValidSequence } from './isValidSequence.js'
import test, { it, describe } from 'node:test'
import assert from 'node:assert'
describe('test for sequence', () => {

    it('1.should be a sequence', () => {
        const result = isValidSequence({ value: '4', suit: 'Clubs' },
        { value: '5', suit: 'Clubs' },
        { value: '6', suit: 'Clubs' })
        assert.equal(result.result, true)
    })
    it('2.should be a sequence', () => {
        const result = isValidSequence({ value: 'J', suit: 'Diamonds' },
        { value: 'K', suit: 'Diamonds' },
        { value: 'Q', suit: 'Diamonds' })
        assert.equal(result.result, false)
    })
    it('3.should be a sequence', () => {
        const result = isValidSequence({ value: 'J', suit: 'Clubs' },
        { value: 'Q', suit: 'Clubs' },
        { value: 'Joker', suit: 'Joker' })
        assert.equal(result.result, true)
    })
    it('4.should be a sequence', () => {
        const result = isValidSequence({ value: '10', suit: 'Clubs' },
        { value: 'J', suit: 'Clubs' },
        { value: 'Joker', suit: 'Joker' })
        assert.equal(result.result, true)
    })

    it('5.should not be a sequence', () => {
        const result = isValidSequence({ value: 'J', suit: 'Diamonds' },
        { value: '10', suit: 'Diamonds' },
        { value: '9', suit: 'Clubs' })
        assert.equal(result.result, false)
    })
})