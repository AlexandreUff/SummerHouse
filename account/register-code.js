(function(){    //Todo o código é executado a partir de uma função autoinvocada (com excessão do console.log)
    
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

const nascUsuario = take('#nasc-usuario');
const checkCPF = take('#no-cpf-usuario');
const checkRG = take('#no-rg-usuario');

const clearButton = take('#clear-button');
const btnEnviar = take('#btn-submit');

let contadorSlider = 0;

/* Talvez esta função seja desabilitada */
function mensagemDeNaoPreenchimento(inp,mensagem = ''){
    const msgErro = document.createElement('small');
    msgErro.classList.add('input-error');

    if(inp.nextSibling.nodeName !== msgErro.nodeName){
        msgErro.innerHTML = mensagem;
        inp.after(msgErro);
    }
}

function testaDataDeNascimento(valor){

    function dataConversor(data){ //Esta função converte a data de string para uma array com inteiros e ajusta o mês para funcionar corretamente com o Date();
        let novaData = data.value.split('-');
        novaData = novaData.map(v =>{
            return +v;
        })

        return new Date(novaData);
    }

    const hoje = new Date();
    let dataNasc = dataConversor(valor);

    const diferenca = hoje.getTime() - dataNasc.getTime();

    if(diferenca < 568080000000){ //Este valor é correspondente a exatos 18 anos em "Times".
        mensagemDeNaoPreenchimento(valor, 'Menores de 18 anos não podem registrar-se.');
        return false
    } else {
        if(valor.nextSibling.nodeName === 'SMALL'){
            valor.nextSibling.remove();
        }
        return true
    }
};

function testaRegrasDePreenchimento(...dado){

    function verifica(info){
        if(!info.teste){
            mensagemDeNaoPreenchimento(info.campo, info.msgErro);
            return false;
        } else {
            if(info.campo.nextSibling.nodeName === 'SMALL'){
                info.campo.nextSibling.remove();
            }

            return true;
        }
    }

    const dados = dado;

    if(dados.every(d => verifica(d) === true)){
        return true;
    } else {
        return false;
    }
};

function verificaPreenchimentoFormulario(){

    const inputNome = take('#nome-usuario');
    const inputSobrenome = take('#sobrenome-usuario');
    const inputNasc = take('#nasc-usuario');
    const inputCPF = take('#cpf-usuario');
    const inputRG = take('#rg-usuario');
    const inputEmail = take('#email-usuario');
    const inputPws = take('#psw-usuario');
    const inputRpPws = take('#rp-psw-usuario');

    /* const testeNome = {campo: inputNome,teste: inputNome.value.length > 0, msgErro: 'O campo Nome não foi preenchido.'};
    const testeSobrenome = {campo: inputSobrenome,teste: inputSobrenome.value.length > 0, msgErro: 'O campo Sobrenome não foi preenchido.'};
    const testeNasc = {campo: inputNasc, teste: testaDataDeNascimento(inputNasc), msgErro: 'Apenas menores de 18 anos podem regitrar-se.'};
    const testeCPF = {campo: inputCPF,teste: inputCPF.value || inputCPF.disabled, msgErro: 'O campo CPF não foi preenchido. Caso você seja estrangeiro e não possua CPF, marque a opção abaixo.'};
    const testeRG = {campo: inputRG,teste: inputRG.value || inputRG.disabled, msgErro: 'O campo RG não foi preenchido. Caso você seja estrangeiro e não possua RG, marque a opção abaixo.'};
    const testeEmail = {campo: inputEmail,teste: inputEmail.value.length > 0, msgErro: 'O campo E-mail não foi preenchido.'};
    const testeSenha = {campo: inputRpPws,teste: inputPws.value === inputRpPws.value, msgErro: 'As senhas estão diferentes.'};
     */

    if(inputNome.value && inputSobrenome.value && inputNasc.value
        && (inputCPF.value || inputCPF.disabled) && (inputRG.value || inputRG.disabled) && inputEmail.value
        && inputPws.value && inputRpPws.value){
        
            const testeSenha = {campo: inputRpPws,teste: inputPws.value === inputRpPws.value, msgErro: 'As senhas estão diferentes.'};
            const testeNasc = {campo: inputNasc, teste: testaDataDeNascimento(inputNasc), msgErro: 'Apenas menores de 18 anos podem regitrar-se.'};

            if(testaRegrasDePreenchimento(testeSenha,testeNasc) === true){ //Aqui é feita uma condicional com os inputs para testar se são verdadeiros e a mensagem para um eventual erro
                btnEnviar.disabled = false
            } else {
                btnEnviar.disabled = true
            }
    } else {
        btnEnviar.disabled = true
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

/* nascUsuario.addEventListener('change',function(){

    function dataConversor(data){ //Esta função converte a data de string para uma array com inteiros e ajusta o mês para funcionar corretamente com o Date();
        let novaData = data.value.split('-');
        novaData = novaData.map(v =>{
            return +v;
        })
        

        return new Date(novaData);
    }

    const hoje = new Date();
    let dataNasc = dataConversor(this);

    const diferenca = hoje.getTime() - dataNasc.getTime();

    if(diferenca < 568080000000){ //Este valor é correspondente a exatos 18 anos em "Times".
        mensagemDeNaoPreenchimento(this, 'Menores de 18 anos não podem registrar-se.');
        btnEnviar.disabled = true
    } else {
        if(this.nextSibling.nodeName === 'SMALL'){
            this.nextSibling.remove();
        }
    }
}) */

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
        nextSlide.setAttribute('disabled','');
    } else if(contadorSlider>0){
        prevSlide.removeAttribute('disabled');
    }
}

prevSlide.onclick = (e)=>{
    e.preventDefault()
    contadorSlider--

    moveSlide(contadorSlider,1);

    if(contadorSlider===0){
        prevSlide.setAttribute('disabled','');
    } else if(contadorSlider<2){
        nextSlide.removeAttribute('disabled');
    }
  }

})();


console.log(`
    Olá!

    *Tecnologias usadas:
    - HTML;
    - CSS;
    - Javascript;
    - Bootstrap;
    - SASS/SCSS.

    *Objetivo da página:
    - Página de login de um hotel responsiva com um link para registro no site.

    *Funcionalidades objetivas e técnicas:
    - A página tem como finalidade a simulação um formulário de login e um link para uma outra página (do mesmo site, obviamente) para registrar-se no hotel;
    - Para cada load da página de login, há uma alteração randômica de até 4 imagens do plano de fundo que se apresentam com um mesmo efeito e com a temática do estabelecimento;
    - Na página de registro do hotel, há um outro formulário com um slider que contém os inputs de preenchimento com os dados do usuário (Essas requisições do formulário não tentam imitar a de um Hotel mesmo);
    - O botão de confirmação só sai do modo "disabled" quando todos os campos são corretamente preenchidos;
    - Os campos, em sua maioria, possuem apenas um bloqueio "singelo" padrão dos inputs HTML para impedir que o usuário insira informações errôneas no formulário;
    - Já os campos de Data de Nascimento e Senha/Repetir Senha possuem uma mensagem de alerta para caso sejam preenchidos indevidamente;
    - O campo de Data de Nascimento bloqueia o Confirmar e emite uma alerta caso a idade do inscrito seja menor que 18 anos;
    - O campo de Repetir Senha bloqueia o Confirmar e emite uma alerta caso a seu preenchimento seja diferente do Senha.

    *Considerações importantes:
    - Apesar do bootstrap oferecer um slider(carousel) com recursos já predefinidos; para a finalidade deste projeto, não foi muito conveniente e exigiria alterações que, no fim, acabariam dando mais trabalho tornando preferível, portanto, implementar um slider próprio.
    
    `
);