import { isValidSet } from './isSet.js'
import test, { it, describe } from 'node:test'
import assert from 'node:assert'
describe('test for set', () => {

    it('1.should be a set', () => {
        const cards = [{ value: '5', suit: 'Clubs' },
        { value: '5', suit: 'Diamonds' },
        { value: '5', suit: 'Spades' }]
        const result = isValidSet(cards)
        assert.equal(result, true)
    })
    it('2.should not be a set', () => {
        const cards = [{ value: '5', suit: 'Clubs' },
        { value: '5', suit: 'Clubs' },
        { value: '5', suit: 'Spades' }]
        const result = isValidSet(cards)
        assert.equal(result, false)
    })
    it('3.should not be a set', () => {
        const cards = [{ value: '5', suit: 'Heart' },
        { value: '5', suit: 'Clubs' },
        { value: '5', suit: 'Spades' }]
        const result = isValidSet(cards)
        assert.equal(result, true)
    })

    it('4.(Joker)should be a set', () => {
        const cards = [{ value: 'Joker', suit: 'Joker' },
        { value: '5', suit: 'Clubs' },
        { value: '5', suit: 'Spades' }]
        const result = isValidSet(cards)
        assert.equal(result, true)
    })
    it('5.(Joker) should not be a set', () => {
        const cards = [{ value: 'Joker', suit: 'Joker' },
        { value: '5', suit: 'Clubs' },
        { value: '6', suit: 'Spades' }]
        const result = isValidSet(cards)
        assert.equal(result, false)
    })

    it('6.(Joker) should not be a set', () => {
        const cards = [{ value: 'Joker', suit: 'Joker' },
        { value: '5', suit: 'Clubs' },
        { value: '5', suit: 'Clubs' }]
        const result = isValidSet(cards)
        assert.equal(result, false)
    })
})