var exist = function(board, word) {
    for(let row=0;row<board.length;row++){
        for(let col=0;col<board.length;col++){
            const set = new Set()
            if(solve(board,word,row,col,0,set)){
                return true
            }
        }
    }
    return false
};

function solve(board,word,row,col,i,set){
    const key = `${row}${col}`
    if(set.has(key)) return false
    if(i===word.length){
        console.log(set);
        return true
    }
    const inBound = row>=0 && col>=0 && row<board.length && col<board[0].length
    if(!inBound) return false
    if(board[row][col]!==word[i]) return false
    set.add(key)
    return (solve(board,word,row,col+1,i+1,set) ||
    solve(board,word,row+1,col,i+1,set) ||
    solve(board,word,row-1,col,i+1,set) ||
    solve(board,word,row,col-1,i+1,set))
}

console.log(exist([["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]],"ABCB"));
console.log(exist([["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]],"SEE"));
console.log(exist([["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]],"ABCCED"));