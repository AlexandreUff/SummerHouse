(function(){ //Todo o código é executado a partir de uma função autoinvocada (com excessão do console.log)

function take(query){
    return document.querySelector(query);
}

const bodyEffect = take('body');

bodyEffect.style.backgroundPosition = 'center bottom';

let i = Math.floor(Math.random() * (4 - 0)) + 0;
bodyEffect.classList.add(`bg-fundo${i}`);

})();

console.log(`
    Olá!

    *Tecnologias usadas:
    - HTML;
    - CSS;
    - Javascript;
    - Bootstrap;
    - SASS/SCSS

    *Objetivo da página:
    - Página de login de um hotel responsiva com um link para registro no site.

    *Funcionalidades objetivas e técnicas:
    - A página tem como finalidade a simulação um formulário de login e um link para uma outra página (do mesmo site, obviamente) para registrar-se no hotel;
    - Para cada load da página de login, há uma alteração randômica de até 4 imagens do plano de fundo que se apresentam com um mesmo efeito e com a temática do estabelecimento;
    - Na página de registro do hotel, há um outro formulário com um slider que contém os inputs de preenchimento com os dados do usuário (Essas requisições do formulário não tentam imitar a de um Hotel mesmo);
    - O botão de confirmação só sai do modo "disabled" quando todos os campos são preenchidos;
    - Os campos possuem apenas um bloqueio "singelo" padrão dos inputs HTML para impedir que o usuário insira informações errôneas no formulário;
    - 

    *Considerações importantes:
    - Apesar do bootstrap oferecer um slider(carousel) com recursos já predefinidos; para a finalidade deste projeto, não foi muito conveniente e exigiria alterações que, no fim, acabariam dando mais trabalho tornando preferível, portanto, implementar um slider próprio.
    
    `
);