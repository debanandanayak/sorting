import { getLps } from './getLps.js'

export default function getMinChar(str){
    let _str = str+'$'+str.split('').reverse().join('')
    const lps = getLps(_str)
    return str.length-lps[_str.length-1]
}