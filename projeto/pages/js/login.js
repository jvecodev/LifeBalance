async function realizarLogin(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    if (!email || !senha) {
        alert('Preencha todos os campos');
        return;
    }

    const response = await fetch('https://life-balance-server.vercel.app/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha })
    });

    if (response.status === 200) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        console.log('token:', data.token);
        location.href = 'index.html';
    } else if(email === '' || senha === '') {
        alert('Por favor, preencha todos os campos');
    }
    else {
        alert('Email ou senha incorretos');
    }
}

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
