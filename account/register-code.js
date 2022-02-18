//Função(ões) básica(s):
function take(query){
    return document.querySelector(query)
}

const wrt = console.log

/* Script da página */
const slider = take('.slider');
const prevSlide = take('#prev-slide');
const nextSlide = take('#next-slide');
const mostradorSlide = take('.buttons-slide small');
const checkCPF = take('#no-cpf-usuario');
const checkRG = take('#no-rg-usuario');
const clearButton = take('#clear-button');

let contadorSlider = 0;

function checkDocs(){

    const inputDisabled = take(`#${this.getAttribute('refer')}`);

    if(this.checked){
        inputDisabled.disabled = true
    } else {
        inputDisabled.disabled = false
    }
}

checkCPF.addEventListener('change',checkDocs);
checkRG.addEventListener('change',checkDocs);

clearButton.addEventListener('click',()=>{
    const inputCPF = take('#cpf-usuario');
    const inputRG = take('#rg-usuario');
    inputCPF.disabled = false
    inputRG.disabled = false
});

function moveSlide(num,tipo){
    slider.classList.remove(`position-${num+(tipo)}`);
    slider.classList.add(`position-${num}`);

    mostradorSlide.innerHTML = `(${num+1}/3)`;
}

nextSlide.onclick = (e)=>{
    e.preventDefault()
    contadorSlider++

    moveSlide(contadorSlider,-1);

    if(contadorSlider===2){
        nextSlide.setAttribute('disabled','disabled');
    } else if(contadorSlider>0){
        prevSlide.removeAttribute('disabled');
    }
}

prevSlide.onclick = (e)=>{
    e.preventDefault()
    contadorSlider--

    moveSlide(contadorSlider,1);

    if(contadorSlider===0){
        prevSlide.setAttribute('disabled','disabled')
    } else if(contadorSlider<2){
        nextSlide.removeAttribute('disabled');
    }
}