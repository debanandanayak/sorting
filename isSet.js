export function isValidSet(cards) {
  const values = new Set()
  const suits = new Set()
  let hasJoker = false
  cards.forEach(card => {
    values.add(card.value)
    suits.add(card.suit)
    if (card.value === 'Joker') hasJoker = true
  })
  if (values.size === 1 && suits.size === 3) {
    return true
  }

  if (suits.size === 3 && values.size === 2 && hasJoker) return true
  return false
}

export function isSet(card1,card2,card3){
  let result = false
  if(card1.value==='Joker'){
    result = card2.value===card3.value
  }else if(card2.value==='Joker'){
    console.log("checking");
    result = card1.value===card3.value
  }else if(card3.value==='Joker'){
    result = card2.value===card1.value
  }
  else{
    if(card1.suit!==card2.suit && card2.suit!==card3.suit && card1.value===card2.value && card3.value===card2.value) result = true
  }
  return {result,arrangement:'set',cards:[card1,card2,card3]}
}
const cards = [{ value: 'Joker', suit: 'Joker' },
{ value: '5', suit: 'Diamonds' },
{ value: '5', suit: 'Clubs' }]
console.log(isSet(cards[0],cards[1],cards[2]));