/**
 * @param {number} num
 * @return {string}
 */
var numberToWords = function(num) {
  const places = [1000000000, 1000000, 1000, 100, 10, 1]

  let w = f(num, places, 0)
  return w
};
const placeWords = ['Billion', 'Million', 'Thousand', 'Hundred', 'Ten', 'One']
const twoDigitWords = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen', 'Twenty']
const wordsWithZero = ['Ten', 'Twenty', 'Thirty', 'Fourty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety']
function f(num, places, current) {
  if (current >= places.length || num === 0) {
    return ''
  }
  if (num <= 19) return twoDigitWords[num]
  if (num < 100 && num % 10 == 0) return wordsWithZero[Math.floor(num / 10) - 1]
  if (num < 100) return wordsWithZero[Math.floor(num / 10) - 1] + " " + twoDigitWords[num % 10]
  let n = Math.floor(num / places[current])
  if (n === 0) return f(num, places, current + 1)
  return f(n, places, current + 1) + " " + placeWords[current] + " " + f(num % places[current], places, current)
}

console.log(numberToWords(1234567000))
