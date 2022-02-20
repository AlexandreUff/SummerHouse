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

const Formulario = take('form');

const checkCPF = take('#no-cpf-usuario');
const checkRG = take('#no-rg-usuario');

const clearButton = take('#clear-button');
const btnEnviar = take('#btn-submit');

let contadorSlider = 0;

/* Talvez esta função seja desabilitada */
function mensagemDeNaoPreenchimento(inp,mensagem){
    const msgErro = document.createElement('small');
    msgErro.classList.add('input-error');

    if(inp.nextSibling.nodeName !== msgErro.nodeName){
        msgErro.innerHTML = mensagem;
        inp.after(msgErro);
    }
}

function verificaPreenchimentoFormulario(){

    const inputNome = take('#nome-usuario');
    const inputSobrenome = take('#sobrenome-usuario');
    const inputNasc = take('#nasc-usuario');
    const inputCPF = take('#cpf-usuario');
    const inputRG = take('#rg-usuario');
    const inputEmail = take('#email-usuario');
    const inputPws = take('#psw-usuario');
    const inputRpPws = take('#rp-psw-usuario');


    if(inputNome.value && inputSobrenome.value && inputNasc.value
        && (inputCPF.value || inputCPF.disabled) && (inputRG.value || inputRG.disabled) && inputEmail.value
        && inputPws.value && inputRpPws.value /* && (inputPws.value === inputRpPws.value) */){
        
        console.log('Preenchido');

        if(inputPws.value !== inputRpPws.value){
            btnEnviar.disabled = true
            mensagemDeNaoPreenchimento(inputRpPws, 'As senhas estão diferentes.');
        } else {
            btnEnviar.disabled = false
        }
    } else {
        btnEnviar.disabled = true
        /* mensagemDeNaoPreenchimento(inputNome); */
    }
}

Formulario.addEventListener('change', verificaPreenchimentoFormulario);

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
    btnEnviar.disabled = true
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