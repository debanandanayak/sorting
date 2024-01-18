// // function isSet(card1, card2, card3) {
// //     // Sort the cards in ascending order
// //     const cards = [card1, card2, card3].sort((a, b) => a.value.localeCompare(b.value));

// //     // Check for a pure sequence
// //     if (cards[0].suit === cards[1].suit && cards[1].suit === cards[2].suit) {
// //         if (isConsecutive(cards) || cards.some(card => card.value === 'Joker')) {
// //             return true;
// //         }
// //     }

// //     // Check for an impure sequence with a joker
// //     if (cards.some(card => card.value === 'Joker')) {
// //         // Remove the joker from the cards
// //         const nonJokerCards = cards.filter(card => card.value !== 'Joker');

// //         // Check if there are enough non-joker cards for a comparison
// //         if (nonJokerCards.length === 2) {
// //             // Check if the remaining two cards form a pure sequence
// //             if (nonJokerCards[0].suit === nonJokerCards[1].suit && isConsecutive(nonJokerCards)) {
// //                 return true;
// //             }
// //         }
// //     }

// //     return false;
// // }

// // // Helper function to check if cards are consecutive
// // function isConsecutive(cards) {
// //     return parseInt(cards[2].value) - parseInt(cards[1].value) === 1 &&
// //            parseInt(cards[1].value) - parseInt(cards[0].value) === 1;
// // }

// // // Example usage:
// // const card1 = { value: '2', suit: 'spades' };
// // const card2 = { value: '3', suit: 'spades' };
// // const card3 = { value: 'Joker', suit: 'Any' };  // Joker (optional)

// // const result = isSet(card1, card2, card3);
// // console.log(`Is it a set? ${result}`);
// function getAllArrangements(numbers) {
//     const result = []
//     const stack = [{ arr: numbers.slice(), i: 0 }]

//     while (stack.length) {
//         const { arr, i } = stack.pop()

//         if (i === arr.length - 1) {
//             result.push([...arr])
//         } else {
//             for (let j = i; j < arr.length; j++) {
//                 [arr[i], arr[j]] = [arr[j], arr[i]]
//                 stack.push({ arr: arr.slice(), i: i + 1 });
//                 [arr[i], arr[j]] = [arr[j], arr[i]] // revert the swap for backtracking
//             }
//         }
//     }

//     return result
// }

// // Numbers from 0 to 9
// const numbers = [0, 1, 2]

// // Get all arrangements
// const arrangements = getAllArrangements(numbers)

// // Print all arrangements
// arrangements.forEach(arrangement => console.log(arrangement));

let date = Date.now()
console.log(date)
let count = 0
for (let i = 0; i < 10-3; i++) {
    for (let j = 0; j < 10; j++) {
        if(j==i)continue
        for (let k = 0; k < 10; k++) {
            if(k==i || k==j) continue
            count++
        }

    }

}

console.log("End",count*6)