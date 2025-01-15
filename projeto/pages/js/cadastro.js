
function cadastrar() {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    if (nome && email && senha) {
        const usuario = { nome, email, senha };

        fetch('https://lifebalance-server.vercel.app//api/cadastrar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(usuario)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Usuário cadastrado com sucesso', data);
            window.open('login.html', '_blank');
        })
        .catch(error => {
            console.log('Erro ao cadastrar usuário', error);
            alert('Erro ao cadastrar. Tente novamente.');
        });
    } else {
        alert('Preencha todos os campos');
    }
}
