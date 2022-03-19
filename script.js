import { answers, wordList} from '/arr.js'

const game = document.getElementById('game');
var grid = [];
function createGrid(){
    for(let i = 0; i < 6; i++){
        var letters = [];
        var div = document.createElement('div');
        div.id = `row${i}`;
        div.className = 'row';
        game.appendChild(div);
        for(let i = 0; i < 5; i++){
            let letterBox = document.createElement('div');
            letterBox.id = `letter${i}`;
            letterBox.className = 'letter';
            letters.push(letterBox);
            div.appendChild(letterBox);
        }
        grid.push(letters);
    }
}

createGrid();

var currentRow = 0;
var letterNumber = 0;

function addLetter(input){
    if(letterNumber < 5){
        grid[currentRow][letterNumber].innerHTML = input;
        letterNumber++;
    }
}
function clearLetter(e){
    if(e.key == "Backspace"){
        if(letterNumber > 0) letterNumber = letterNumber - 1;
        grid[currentRow][letterNumber].innerHTML = '';
    }
}

function typeLetter(e){
    if(e.keyCode > 64 && e.keyCode < 91 || e.keyCode > 96 && e.keyCode < 123){
        let letter = e.key.toUpperCase();
        addLetter(letter);
    }
}

function turnLettersToWord(){
    var wordArr = [];
    for(let i = 0; i < 5; i++){
        wordArr.push(grid[currentRow][i].innerHTML);
    }
    let word = wordArr.toString().replace(/,/g, '').toLowerCase();
    return word;
}

function letterCount(word){
    let letters = new Object
    for(let i = 0; i < word.length; i++){
        if(letters[word[i]] == undefined) letters[word[i]] = 1
        else{
            letters[word[i]] = letters[word[i]]+1
        }
    }
    return letters
}

function getAllIndexes(arr, val) {
    let indexes = [], i;
    for(i = 0; i < arr.length; i++)
        if (arr[i] === val)
            indexes.push(i);
    return indexes;
}

function getIndexOfCorrectAnswers(answer, word){
    let indexes = [], j;
    for(j = 0; j < answer.length; j++)
        if(answer[j] == word[j])
            indexes.push(j);
    return indexes
}

const day = new Date()

const date1 = new Date('6/16/2021')
var date2 = new Date(`${day.getMonth()+1}/${day.getDate()}/${day.getFullYear()}`)

var Difference_In_Time = date2.getTime() - date1.getTime();
var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

var wotd = answers[Difference_In_Days]

function checkWord(e){
    if(e.key == 'Enter'){
        if(!grid[currentRow][0].innerHTML == '' && !grid[currentRow][1].innerHTML == '' && !grid[currentRow][2].innerHTML == '' && !grid[currentRow][3].innerHTML == '' && !grid[currentRow][4].innerHTML == ''){
            let word = turnLettersToWord();
            if(word == wotd){
                for(let i = 0; i < 5; i++){
                    grid[currentRow][i].classList.add('correct');
                }
            }
            else if(wordList.includes(word) || answers.includes(word)){
                let answer = wotd.split('');
                let ltrCntAnsw = letterCount(answer)
                let ltrCntWord = letterCount(word)
                for(let i = 0; i < answer.length; i++){
                    if(answer[i] == word[i]){
                        grid[currentRow][i].classList.add('correct');
                        if(grid[currentRow][i].classList.contains('contains')) grid[currentRow][i].classList.remove('contains')
                    }
                    else if(answer.includes(word[i])){
                        let wordCount = ltrCntWord[word[i]]
                        let answerCount = ltrCntAnsw[word[i]]
                        let goodAnswersCount = getIndexOfCorrectAnswers(answer, word)
                        if (wordCount == answerCount) grid[currentRow][i].classList.add('contains');
                        else {
                            let indexes = getAllIndexes(word, word[i])
                            let diff = wordCount - answerCount - goodAnswersCount
                            if(diff < 0){
                                grid[currentRow][i].classList.add('contains');
                            }else
                            for(let j = 0; j < diff; j++){
                                if(!grid[currentRow][indexes[j]].classList.contains('contains') && !grid[currentRow][indexes[j]].classList.contains('correct')){
                                    grid[currentRow][indexes[j]].classList.add('contains');
                                }
                            }
                        }
                    }else grid[currentRow][i].classList.add('incorrect');
                }
                for(let i = 0; i < 5; i++){
                    if(!grid[currentRow][i].classList.contains('correct') && !grid[currentRow][i].classList.contains('incorrect') && !grid[currentRow][i].classList.contains('contains')) grid[currentRow][i].classList.add('incorrect');
                }
                currentRow++;
                letterNumber = 0;
            }
        }
    }
}

addEventListener('keypress', typeLetter)
addEventListener('keydown', clearLetter)
addEventListener('keydown', checkWord)