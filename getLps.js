export function getLps(str) {
  const lps = new Array(str.length)
  lps[0] = 0
  let prefix = 0, suffix = 1

  while (suffix < lps.length) {
    if (str[prefix] === str[suffix]) {
      lps[suffix] = prefix + 1
      suffix++
      prefix++
    } else {
      if (prefix == 0) {
        lps[suffix] = 0
        suffix++
      } else {
        prefix = lps[prefix - 1]
      }
    }
  }
  return lps

}
