import { getLps } from './getLps.js'

export default function getMatchIndex(str, pattern) {
    const lps = getLps(pattern)
    let first = 0, second = 0
    while (first < str.length && second < pattern.length) {
        if (str[first] === pattern[second]) {
            first++
            second++
        } else {
            if (second == 0) first++
            else {
                second = lps[second - 1]
            }
        }

    }
    if (second == pattern.length) {
        return first - second
    }
    return -1
}
