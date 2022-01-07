var tryUser=[];
var tryWord=[];
var maxSize=5;
var word=""


function readTextFile(file)
{
    fetch(file).then(response => response.text())
    .then(text => console.log(text))

}

function setWord(w){
    word=w
}
function getWord(){
    return word;
}

function addLetter(l){
    if(tryWord.length < maxSize){
        
        var elements = document.getElementsByClassName("case"+tryUser.length+tryWord.length);
        console.log(elements)
        elements[0].innerHTML=l
        tryWord.push(l);

    }
    console.log(tryWord)

}
function removeLetter(){
    
    console.log(tryWord)
    var elements = document.getElementsByClassName("case"+tryUser.length+tryWord.length);
        console.log(elements)
        elements[0].innerHTML=""
        tryWord.pop();

}




function printGrid(){
    console.log(tryWord);
}


function addWord(){
    
    if(tryUser.length<6){
        if (tryWord.length == maxSize){
            checkWord()
            tryUser.push(tryWord);
            tryWord=[];
        }
    }
    return tryUser.length;

}

function checkWord(){
    tryWord.forEach((l ,i)=> {
        if(getWord().includes(l)){
            if(getWord().charAt(i)!=tryWord[i]){
                var elements = document.getElementsByClassName("K"+l);
                elements[0].classList.add("notok");

                var elements = document.getElementsByClassName("case"+tryUser.length+i);
                elements[0].classList.add("notokCase");
                console.log("IN",elements)
            }
            else{
                var elements = document.getElementsByClassName("K"+l);
                elements[0].classList.remove("notok");
                elements[0].classList.add("ok");

                var elements = document.getElementsByClassName("case"+tryUser.length+i);
                elements[0].classList.remove("notokCase");
                elements[0].classList.add("okCase");
                console.log("IN",elements)
            }
            
        }
        else{
            var elements = document.getElementsByClassName("K"+l);
            elements[0].classList.add("error");
            var elements = document.getElementsByClassName("case"+tryUser.length+i);
            elements[0].classList.add("errorCase");


                console.log("IN",elements)
        }
        
    });
    
    
}
 