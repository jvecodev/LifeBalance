async function realizarLogin (event){
    event.preventDefault();
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    const response = await fetch('/api/login/usuario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, senha})
    });

    if (!email || !senha){
        alert('Preencha todos os campos');
        return;
    }
    else if (response.status === 200){
        const data = await response.json();
        localStorage.setItem('token', data.token);
        window.open('home.html', '_self');
    }
    else{
        alert('Email ou senha incorretos');
    }
}