const ranks = ['ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king']
const suits = ['spades', 'hearts', 'diamonds', 'clubs']

function createCard(value, suit) {
    return { value, suit }
}

function randomCard() {
    const value = ranks[Math.floor(Math.random() * ranks.length)]
    const suit = suits[Math.floor(Math.random() * suits.length)]
    return createCard(value, suit)
}

function randomHand(hl) {
    const h = []
    while (hl > 0) {
        h.push(randomCard())
        hl--
    }
    return h
}

function lreversed(arr) {
    return [...arr].reverse()
}

function rankOf(card) {
    return card.value
}

function nextRankOf(card) {
    if (card.value === 'king') return 'god'
    return ranks[ranks.indexOf(card.value) + 1]
}

function suitOf(card) {
    return card.suit
}

function scoreOf(card) {
    if (['jack', 'queen', 'king'].includes(rankOf(card))) {
        return 10
    } else if (rankOf(card) === 'ace') {
        return 1
    } else {
        return ranks.indexOf(rankOf(card)) + 1
    }
}

function trialScore(t) {
    return t[0]
}
const cards = [{ value: 'jack', suit: 'diamonds' }, { value: 'queen', suit: 'diamonds' },
{ value: 'king', suit: 'diamonds' },
{ value: '5', suit: 'hearts' },{ value: '5', suit: 'spades' },{ value: '5', suit: 'diamonds' },
{ value: '2', suit: 'diamonds' },

{ value: '3', suit: 'diamonds' },
{ value: '8', suit: 'hearts' },
{ value: '4', suit: 'diamonds' },]
function verboseAutomatch(L) {
    console.log("=============================================================")
    const result = automatchIter([], [], L, 0)
    console.log("input: ", L)
    console.log("")
    console.log("automatch matched score: ", result[0])
    console.log("")
    console.log("automatch sequences: ")
    for (const seq of result[2]) {
        console.log(seq)
    }
    console.log("------------------------------------------------------------")
    console.log("automatch groups: ")
    for (const run of result[1]) {
        console.log(run)
    }
    console.log("------------------------------------------------------------")
}

function automatch(L) {
    return automatchIter([], [], L, 0)
}

function automatchIter(sets, runs, free, score) {
    if (free.length === 0) {
        return [score, sets, runs]
    }

    let maxScore = score
    let maxKey = [score, sets, runs]

    // Sequence matching
    let l = [...free].sort((u, v) => (suits.indexOf(v.suit) * 20 + ranks.indexOf(v.value)) - (suits.indexOf(u.suit) * 20 + ranks.indexOf(u.value)))
    let streakStart = 0
    let streakScore = 0

    for (let i = 0; i < l.length; i++) {
        if (!(i > 0 && suitOf(l[i - 1]) === suitOf(l[i]) && nextRankOf(l[i]) === rankOf(l[i - 1]))) {
            streakStart = i
            streakScore = 0
        }

        streakScore += scoreOf(l[i])
        const streakLength = i - streakStart + 1

        if (streakLength >= 3) {
            const trial = automatchIter(sets, runs.concat([lreversed(l.slice(streakStart, i + 1))]), l.slice(0, streakStart).concat(l.slice(i + 1)), score + streakScore)

            if (trialScore(trial) > maxScore) {
                maxScore = trialScore(trial)
                maxKey = trial
            }
        }
    }

    // Set matching
    l = [...free].sort((u, v) => ranks.indexOf(v.value) - ranks.indexOf(u.value))
    streakStart = 0
    streakScore = 0

    for (let i = 0; i < l.length; i++) {
        if (!(i > 0 && rankOf(l[i - 1]) === rankOf(l[i]))) {
            streakStart = i
            streakScore = 0
        }

        streakScore += scoreOf(l[i])
        const streakLength = i - streakStart + 1

        if (streakLength === 5) {
            streakLength = 0
            streakScore = scoreOf(l[i])
        }

        if ([3, 4].includes(streakLength)) {
            const trial = automatchIter(sets.concat([lreversed(l.slice(streakStart, i + 1))]), runs, l.slice(0, streakStart).concat(l.slice(i + 1)), score + streakScore)

            if (trialScore(trial) > maxScore) {
                maxScore = trialScore(trial)
                maxKey = trial
            }
        }
    }

    return maxKey
}

// Example usage:
const input = randomHand(10)
verboseAutomatch(input)


// const ranks = ['ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king'];
// const suits = ['spades', 'hearts', 'diamonds', 'clubs'];

// function createCard(value, suit, isJoker = false) {
//     return { value, suit, isJoker };
// }

// function randomCard() {
//     const isJoker = Math.random() < 0.05; // Assuming 5% chance of a joker
//     if (isJoker) {
//         return createCard('joker', 'joker', true);
//     }
//     const value = ranks[Math.floor(Math.random() * ranks.length)];
//     const suit = suits[Math.floor(Math.random() * suits.length)];
//     return createCard(value, suit);
// }

// function randomHand(hl) {
//     const h = [];
//     while (hl > 0) {
//         h.push(randomCard());
//         hl--;
//     }
//     return h;
// }

// function lreversed(arr) {
//     return [...arr].reverse();
// }

// function rankOf(card) {
//     return card.value;
// }

// function nextRankOf(card) {
//     if (card.value === 'king') return 'god';
//     return ranks[ranks.indexOf(card.value) + 1];
// }

// function suitOf(card) {
//     return card.suit;
// }

// function scoreOf(card) {
//     if (card.isJoker) {
//         return 0; // Adjust joker scoring as needed
//     } else if (['jack', 'queen', 'king'].includes(rankOf(card))) {
//         return 10;
//     } else if (rankOf(card) === 'ace') {
//         return 1;
//     } else {
//         return ranks.indexOf(rankOf(card)) + 1;
//     }
// }

// function trialScore(t) {
//     return t[0];
// }

// function verboseAutomatch(L) {
//     console.log("=============================================================");
//     const result = automatchIter([], [], L, 0);
//     console.log("input: ", L);
//     console.log("");
//     console.log("automatch matched score: ", result[0]);
//     console.log("");
//     console.log("automatch sequences: ");
//     for (const seq of result[2]) {
//         console.log(seq);
//     }
//     console.log("------------------------------------------------------------");
//     console.log("automatch groups: ");
//     for (const run of result[1]) {
//         console.log(run);
//     }
//     console.log("------------------------------------------------------------");
// }

// function automatch(L) {
//     return automatchIter([], [], L, 0);
// }

// function automatchIter(sets, runs, free, score) {
//     if (free.length === 0) {
//         return [score, sets, runs];
//     }

//     let maxScore = score;
//     let maxKey = [score, sets, runs];

//     // Sequence matching
//     let l = [...free].sort((u, v) => (suits.indexOf(v.suit) * 20 + ranks.indexOf(v.value)) - (suits.indexOf(u.suit) * 20 + ranks.indexOf(u.value)));
//     let streakStart = 0;
//     let streakScore = 0;

//     for (let i = 0; i < l.length; i++) {
//         if (!(i > 0 && suitOf(l[i - 1]) === suitOf(l[i]) && nextRankOf(l[i]) === rankOf(l[i - 1]))) {
//             streakStart = i;
//             streakScore = 0;
//         }

//         streakScore += scoreOf(l[i]);
//         const streakLength = i - streakStart + 1;

//         if (streakLength >= 3) {
//             const trial = automatchIter(sets, runs.concat([lreversed(l.slice(streakStart, i + 1))]), l.slice(0, streakStart).concat(l.slice(i + 1)), score + streakScore);

//             if (trialScore(trial) > maxScore) {
//                 maxScore = trialScore(trial);
//                 maxKey = trial;
//             }
//         }
//     }

//     // Set matching
//     l = [...free].sort((u, v) => ranks.indexOf(v.value) - ranks.indexOf(u.value));
//     streakStart = 0;
//     streakScore = 0;

//     for (let i = 0; i < l.length; i++) {
//         if (!(i > 0 && rankOf(l[i - 1]) === rankOf(l[i]))) {
//             streakStart = i;
//             streakScore = 0;
//         }

//         streakScore += scoreOf(l[i]);
//         const streakLength = i - streakStart + 1;

//         if (streakLength === 5) {
//             streakLength = 0;
//             streakScore = scoreOf(l[i]);
//         }

//         if ([3, 4].includes(streakLength)) {
//             const trial = automatchIter(sets.concat([lreversed(l.slice(streakStart, i + 1))]), runs, l.slice(0, streakStart).concat(l.slice(i + 1)), score + streakScore);

//             if (trialScore(trial) > maxScore) {
//                 maxScore = trialScore(trial);
//                 maxKey = trial;
//             }
//         }
//     }

//     return maxKey;
// }

// // Example usage:
// const input = randomHand(10);
// verboseAutomatch(input);
