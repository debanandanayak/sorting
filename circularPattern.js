import getMatchIndex from './getMatchIndex.js'

export default function hasMatch(str,pattern){
    let _str =  str+str
    const result = getMatchIndex(_str,pattern)
    return result>=0?true:false

}