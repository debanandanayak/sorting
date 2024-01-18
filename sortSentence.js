const cards = [
    { value: '5', suit: 'hearts' },
    { value: '9', suit: 'hearts' },
    { value: '3', suit: 'clubs' },
    { value: '9', suit: 'hearts' },
    { value: 'J', suit: 'clubs' },
    { value: 'A', suit: 'clubs' },
    { value: '9', suit: 'hearts' },
    { value: 'Q', suit: 'diamonds' },
    { value: '10', suit: 'diamonds' },
    { value: '4', suit: 'hearts' }
  ]
  const ranks = {
    2:2,
    3:1,
    4:4,
    5:5,
    6:6,
    7:7,
    8:8,
    9:9,
    10:10,
    J:11,
    Q:12,
    K:13,
    A:14
  }
  function getRank(value){
    return ranks[value]
  }
  cards.sort((a,b)=>getRank(a.value)-getRank(b.value))
//   cards.sort((a,b)=>a.suit-b.suit)
  console.log(cards);