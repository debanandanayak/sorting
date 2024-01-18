import { rank } from './constants.js'


export function isValidSequence(_card1, _card2, _card3) {
    const result = { result: false, arrangement: 'sequence', cards: [_card1, _card2, _card3] }
    const card1 = { ..._card1, value: rank[_card1.value] }
    const card2 = { ..._card2, value: rank[_card2.value] }
    const card3 = { ..._card3, value: rank[_card3.value] }
    if(card1.suit==='A'){
        if(card2.value===13 && card3.value===12)
    }
    if (card1.value === 'Joker') {
        result.result = card2.value + 1 === card3.value && card2.suit === card3.suit
    } else if (card2.value === 'Joker') {
        result.result = card1.value + 2 === card3.value && card1.suit === card3.suit
    } else if (card3.value === 'Joker') {
        result.result = card1.value + 1 === card2.value && card1.suit === card2.suit
    } else if (card1.value + 1 === card2.value && card2.value === card3.value - 1 && card1.suit === card2.suit && card2.suit === card3.suit) {
        result.result = true
    }
    return result
}

console.log(isValidSequence({ value: '5', suit: 'Clubs' }, { value: 'Joker', suit: 'Joker' },
    { value: '7', suit: 'Clubs' }))

//   const cards = _cards.map(e=>({...e,value:rank[e.value]}))
//   const values = new Set()
//   const suits = new Set()
//   let hasJoker = false
//   cards.sort((a,b)=>a.value-b.value)
//   const result =  {result:false,arrangement:'sequence',cards}
//   cards.forEach(card => {
//     values.add(+card.value)
//     suits.add(card.suit)
//     if(card.value==='Joker') hasJoker = true
//   })
//   if (values.size !== 3) return result
//   const valueArray = Array.from(values)
//   if (valueArray[0] + 1 === valueArray[1] && hasJoker) return {...result,result:true}
//   if (valueArray[0] + 1 === valueArray[1]===valueArray[2]-1) return {...result,result:true}
//   return result