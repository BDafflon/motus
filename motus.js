var tryUser=[];
var tryWord=[];
var maxSize=5;
var word=""
var allword=[]
var maxTry=6;
var gameFini=false;
var iWord=-1;
var localStorageStat = {
    "nbPartie":0,
    "dernierMots":"plume",
    "grille":[],
    "distribution":{
        "1":0,
        "2":0,
        "3":0,
        "4":0,
        "5":0,
        "6":0
    }

}
function copyToClipboard(textToCopy) {
    // navigator clipboard api needs a secure context (https)
    if (navigator.clipboard && window.isSecureContext) {
        // navigator clipboard api method'
        return navigator.clipboard.writeText(textToCopy);
    } else {
        // text area method
        let textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        // make the textarea out of viewport
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        return new Promise((res, rej) => {
            // here the magic happens
            document.execCommand('copy') ? res() : rej();
            textArea.remove();
        });
    }
}
function share(){
	var shareString="Mot "+iWord+"\n\n"
	localStorageStat["grille"].forEach(l=>{
		l.forEach((c,i)=>{
			if(getWord().includes(c)){
				if(getWord().charAt(i)!=c)
					shareString+="🟨"
				else
					shareString+="🟩"
			}
			else{
				shareString+="⬜"
			}
		})
		shareString+="\n"
	})

     
   /* Copy the text inside the text field */
   copyToClipboard(shareString)
   .then(() => console.log('text copied !'))
   .catch(() => console.log('error'));
	alert("copier dans le presspapier")
	console.log(shareString)
}

function setObjetn(cle, objet)
{
    window.localStorage.setItem(cle, JSON.stringify(objet));
}

function getObject(cle)
{
 var valeur =  window.localStorage.getItem(cle);
 return valeur && JSON.parse(valeur);
}

function saveStat(){
    setObjetn("stats",localStorageStat);
}

function setStat(){
    var nb = getObject("stats");
    if (nb==null)
    setObjetn("stats",localStorageStat);
    else
        localStorageStat = nb;
}

function setDict(d){
    allword=d;
}
function getDict2(){
    return allword;
}

function setWord(w){
    word=w
    
}
function getWord(){
    return word;
}

function addLetter(l){
    if(tryWord.length < maxSize && gameFini==false){
        if(!['0','1','2','3','4','5','6','7','8','9'].includes(l)){
        
            var elements = document.getElementsByClassName("case"+tryUser.length+tryWord.length);
            console.log(elements)
            elements[0].innerHTML=l
            tryWord.push(l);
        }

    }
    console.log(tryWord)

}
function removeLetter(){
    
    console.log(tryWord)
    if(tryWord.length>0){
        var elements = document.getElementsByClassName("case"+tryUser.length+(tryWord.length-1));
        console.log(elements)
        elements[0].innerHTML=""
        tryWord.pop();
    }
}




function printGrid(){
    console.log(tryWord);
}


function addWord(save){
    var win = false;
    if(tryUser.length<6){
        if (tryWord.length == maxSize){
            if(allword.includes(tryWord.join(''))){
                if(save){
                    localStorageStat["grille"].push(tryWord)
                    saveStat()
                }
                win = checkWord()
                tryUser.push(tryWord);
                tryWord=[];
            }
        }
    }

    if (win || tryUser.length==6){
         
    }

    return [tryUser.length,win];

}

function gameOver(){
    console.log(word)
    for(var i=0;i<5;i++){
        var elements = document.getElementsByClassName("case"+i);
        elements[0].classList.add("okCase");      
        elements[0].innerHTML = word.charAt(i)   
    }
}

function checkWord(){
    var find=maxSize;
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
                find=find-1
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
    if (find==0)
        gameFini=true;
    
    return find==0;
    
    
}

function loadStat(){


    var nb = window.localStorage.getItem("nbPartie");
    var elements = document.getElementsByClassName("partiejouees");
    elements[0].innerHTML=nb;

    nb = window.localStorage.getItem("nbPartie1");
    elements = document.getElementsByClassName("nbPartie1");
    elements[0].innerHTML=nb;

    nb = window.localStorage.getItem("nbPartie2");
    elements = document.getElementsByClassName("nbPartie2");
    elements[0].innerHTML=nb;

    nb = window.localStorage.getItem("nbPartie3");
    elements = document.getElementsByClassName("nbPartie3");
    elements[0].innerHTML=nb;

    nb = window.localStorage.getItem("nbPartie4");
    elements = document.getElementsByClassName("nbPartie4");
    elements[0].innerHTML=nb;

    nb = window.localStorage.getItem("nbPartie5");
    elements = document.getElementsByClassName("nbPartie5");
    elements[0].innerHTML=nb;

    nb = window.localStorage.getItem("nbPartie6");
    elements = document.getElementsByClassName("nbPartie6");
    elements[0].innerHTML=nb;


}
 