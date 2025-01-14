const menuToggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");

document.querySelector('#menu-toggle').addEventListener('click', () => {
    document.querySelector('.menu').classList.toggle('active');
});


const menuItems = document.querySelectorAll(".list");

menuItems.forEach((item) => {
    item.addEventListener("click", () => {
        menu.classList.remove("active");
    });
});



document.querySelectorAll('ul a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
    });
});
});

document.querySelector('.lenguage div').addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});


const btnPt = document.getElementById('btn-pt');
const btnEn = document.getElementById('btn-en');
const pt = document.querySelectorAll('[data-lang="pt"]');
const en = document.querySelectorAll('[data-lang="en"]');

btnPt.addEventListener('click', () => {
    pt.forEach(element => {
        element.style.display = 'block';
    });
    en.forEach(element => {
        element.style.display = 'none';
    });
});

btnEn.addEventListener('click', () => {
    pt.forEach(element => {
        element.style.display = 'none';
    });
    en.forEach(element => {
        element.style.display = 'block';

    });
});


const iconesAtividades = document.getElementById('iconesAtividades');
const modalAtividades = document.getElementById('modalAtividades');
const fecharModalAtividades = document.getElementById('fecharModalAtividades');

iconesAtividades.addEventListener('click', () => {
    modalAtividades.style.display = 'flex';
});
fecharModalAtividades.addEventListener('click', () => {
    modalAtividades.style.display = 'none';
});


const iconesIMC = document.getElementById('iconesIMC');
const modalIMC = document.getElementById('modalIMC');
const fecharModalIMC = document.getElementById('fecharModalIMC');

iconesIMC.addEventListener('click', () => {
    modalIMC.style.display = 'flex';
});
fecharModalIMC.addEventListener('click', () => {
    modalIMC.style.display = 'none';
});


const iconesProgresso = document.getElementById('iconesProgresso');
const modalProgresso = document.getElementById('modalProgresso');
const fecharModalProgresso = document.getElementById('fecharModalProgresso');

iconesProgresso.addEventListener('click', () => {
    modalProgresso.style.display = 'flex';
});
fecharModalProgresso.addEventListener('click', () => {
    modalProgresso.style.display = 'none';
});
