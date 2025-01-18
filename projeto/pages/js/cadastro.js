
function cadastrar() {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    if (nome && email && senha) {
        const usuario = { nome, email, senha };

        fetch('https://life-balance-server.vercel.app/api/cadastrar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(usuario)
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(data => { throw new Error(data.message || 'Erro ao cadastrar'); });
            }
            return response.json();
        })
        .then(data => {
            console.log('Usuário cadastrado com sucesso', data);
            location.href = 'login.html';
        })
        .catch(error => {
            console.error('Erro ao cadastrar usuário', error);
            alert('Erro ao cadastrar. Tente novamente.');
        });
    } else {
        alert('Preencha todos os campos');
    }
}

