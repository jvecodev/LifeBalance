const mensagem = document.getElementById('mensagem');

function mostrarMensagemBemVindo() {
    fetch('/api/cadastrar', {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        console.log('Resposta da API:', response);
        if (!response.ok) {
            throw new Error('Erro ao buscar o usuário');
        }
        return response.json();
    })
    .then(data => {
        console.log('Dados recebidos:', data);
        mensagem.innerHTML = `Bem-vindo, ${data.nome}`;  
    })
    .catch(error => {
        console.error('Erro ao buscar usuário:', error);
        mensagem.innerHTML = 'Erro ao buscar informações do usuário.';
        
    });
}

document.querySelectorAll('ul a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
    });
});
});

// Efeito de rolagem para o topo do site 
document.querySelector('.lenguage div').addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

mostrarMensagemBemVindo();
