function take(query){
    return document.querySelector(query);
}

const bodyEffect = take('body');

bodyEffect.style.backgroundPosition = 'center bottom';

let i = Math.floor(Math.random() * (4 - 0)) + 0;
bodyEffect.classList.add(`bg-fundo${i}`);