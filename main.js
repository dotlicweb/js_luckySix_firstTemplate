let luckySix = document.querySelector('#luckysix');
let sveLopticeDiv = luckySix.querySelector('.loptice');
let compDiv = luckySix.querySelector('.compresult');
let myDiv = luckySix.querySelector('.myresult');
let compBrojevi = luckySix.querySelectorAll('.compizvucenibroj');
let dobijeniBrojeviDiv = luckySix.querySelector('.dobijeniBrojevi');
let izaberiLopticeDiv = document.querySelector('#izaberiLoptice');
let prikaziVremeDiv = document.querySelector('#prikaziVreme');
let vremeParagraf = prikaziVremeDiv.querySelector('.vreme');
let sviDobijeniBrojevi = document.querySelector('#sviDobijeniBrojevi');
let pitajZaNovuIgru;


let izabranaLoptica = '';
let izabraneLoptice = [];

let sveLoptice = [];
let mojeLoptice = [];
let compLoptice = [];

let text;
let text2 = '';
let userNum = '';
let ml = [];
let cl = [];
let clSplice = '';


let compNumbersDifferent = [];
let myNumbersDifferent = [];
let filteredArr; // za brojeve da ne vraca iste

let indexIzvucenogBroja;

let counter = 35;
let mojeLopticeCounter = 0;
let vremePocetka = 5;

let one;
let cn;


function izaberiLopticu() {
    sviDobijeniBrojevi.style.display = 'none';
    izabranaLoptica+= `<h3>Izaberite 6 loptica (brojeva)</h3>`
    for (let i = 1; i < 49; i++) {
        izabranaLoptica += `<p class="loptica izabranaLoptica">${i}</p>`;
    }
    izaberiLopticeDiv.innerHTML = izabranaLoptica;
    izabraneLoptice = izaberiLopticeDiv.querySelectorAll('.izabranaLoptica');
    for (let i = 0; i < izabraneLoptice.length; i++) {
        izabraneLoptice[i].addEventListener('click', selectMe);
    }
}
izaberiLopticu();
function selectMe() {
    this.setAttribute('class', 'loptica active');

   mojeLoptice[mojeLopticeCounter] = {
       value: parseInt(this.innerHTML)
   }
   mojeLopticeCounter++;
   if(mojeLopticeCounter === 6) {
    izaberiLopticeDiv.style.display = 'none';
    prikaziVremeDiv.style.display = 'flex';
    prikaziVremeDiv.innerHTML = `<p class="vreme">Igra pocinje za ${vremePocetka}</p>`
       let loop = setInterval(function () {
        vremePocetka--;
        prikaziVremeDiv.innerHTML = `<p class="vreme">Igra pocinje za ${vremePocetka}</p>`
        if(vremePocetka === 0) {
            clearInterval(loop);
            createAllNumbers();
            showUserNumbers();
            prikaziVremeDiv.style.display = 'none';
            luckySix.style.display = 'flex';
        }
       },1000);
        
   }
   
}    



function colorOneNumber(indexIzvucenogBroja) {
    let loop = setInterval(function () {
        counter--;
        one = indexIzvucenogBroja.value.splice(0, 1);
        text = {
            value: one,
            background: ''
        }
        colorNumbers();
        showComputerNumbers(text);
        showUpdateSviBrojevi(text);
        if (counter === 0) {
            clearInterval(loop);
        }
    }, 1000);
    showUserUpdateNumbers(text);
}

function createAllNumbers() {
    for (let i = 1; i < 49; i++) {
        text = {
            value: i,
            background:'loptica'
        }
       
        text2 += `<p class="${text.background}">${text.value}</p>`;
        sveLoptice.push(text);
    }
    check();

    sveLopticeDiv.innerHTML = text2;
}
function showComputerNumbers(text) {
    compDiv.innerHTML += `<p class="loptica ${text.background}">${text.value}</p>`;
}

function showUpdateSviBrojevi(text) {
    text2 = '';

    sveLoptice.filter(function (el) {
        if(el.value === parseInt(text.value)) {
            el.background = text.background
        }
    })

    for (let i = 0; i < sveLoptice.length; i++) {

        text = {
            value: sveLoptice[i].value,
            background:sveLoptice[i].background
        }
        text2 += `<p class="loptica ${text.background}">${text.value}</p>`;
    }
    sveLopticeDiv.innerHTML = text2;
    
}


function compLength() {
    for (let i = 0; i < 1; i++) {
        cn = Math.ceil(Math.random() * 48);
        if (compLoptice.length < 35) {
            compLoptice.push({
                value: cn
            })
        }
    }

     filteredArr = compLoptice.reduce((acc, current) => {
        let x = acc.find(item => item.value === current.value);
        if (!x) {
        return acc.concat([current]);
        } else {
        return acc;
        }
    }, []);

    compLoptice = filteredArr;
    if(compLoptice.length !== 35) {
        compLength()
    }    

}

function showUserNumbers() {
    for (let i = 0; i < mojeLoptice.length; i++) {
        myDiv.innerHTML += `<p class="loptica">${mojeLoptice[i].value}</p>`;
    }
}
function showUserUpdateNumbers() {
  
    for (let i = 0; i < mojeLoptice.length; i++) {
        ml.push(mojeLoptice[i].value)
    }
    for (let i = 0; i < compLoptice.length; i++) {
        cl.push(compLoptice[i].value)
    }
    let loop = setInterval(function () {
        clSplice = cl.splice(0,1)
        if(cl.length === 0) {
            setTimeout(showAllDobijeneBrojeve,2000);
            clearInterval(loop);
        }
        
        for (let i = 0; i < sveLoptice.length; i++) {
            if(clSplice.indexOf(ml[i]) !== -1){
                userNum += `<p class="loptica ${text.background}">${ml[i]}</p>`;
            }
        }
        
       dobijeniBrojeviDiv.innerHTML = userNum;
        
    },1001);


}

function check() {
    compLength();
    compLoptice.filter(function (loptica) {
        compNumbersDifferent.push(loptica.value);
    });

    indexIzvucenogBroja = {
        value: compNumbersDifferent,
        background: ''
    };


    colorOneNumber(indexIzvucenogBroja);
}

function colorNumbers() {
    if (text.value < 9) {
        text.background = 'red';
    } else if (text.value > 8 && text.value < 17) {
        text.background = 'blue';
    } else if (text.value > 16 && text.value < 25) {
        text.background = 'green';
    } else if (text.value > 24 && text.value < 33) {
        text.background = 'orange';
    } else if (text.value > 32 && text.value < 41) {
        text.background = 'cadetblue';
    } else if (text.value > 40 && text.value < 49) {
        text.background = 'tomato';
    } else {
        text.background = 'loptica';
    }
}

function showAllDobijeneBrojeve() {
    luckySix.style.display = 'none';
    sviDobijeniBrojevi.style.display = 'flex';

    sviDobijeniBrojevi.innerHTML = `<div class="container">
        <div class="row">
            <h3>Vasi dobijeni brojevi: </h3>
            <h4>${userNum}</h4>
        </div>
            <h3>Da li zelite ponovo da igrate?</h3>
            <p class="pitaj">Da</p>
            <p class="pitaj">Ne</p>
        </div>`;

    pitajZaNovuIgru = sviDobijeniBrojevi.querySelectorAll('.pitaj');
    startAgrain(pitajZaNovuIgru);
}

function startAgrain(pitajZaNovuIgru) {
   for (let i = 0; i < pitajZaNovuIgru.length; i++) {
        pitajZaNovuIgru[i].addEventListener('click', startAgainOrNot);
    }
}

function startAgainOrNot() {
    if(this.innerHTML === "Da") {
        location.reload();
        izaberiLopticu();
        izaberiLopticeDiv.style.display = 'flex';
    } else {
        sviDobijeniBrojevi.style.display = 'none';
        alert(`Hvala Vam na druzenju :)
        Vidimo se ponovo.`);
    }
};
