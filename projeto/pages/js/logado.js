const mensagem = document.getElementById('mensagem');
const btnPt = document.getElementById('btn-pt');
const btnEn = document.getElementById('btn-en');
const pt = document.querySelectorAll('[data-lang="pt"]');
const en = document.querySelectorAll('[data-lang="en"]');


const formMetas = document.getElementById('form-metas');
const btnMetas = document.getElementById('edit-metas');
const registrarMetas = document.getElementById('registrar');
const cancelarMetas = document.getElementById('cancel');
const msgMetas = document.getElementById('msg-mestas');

btnMetas.addEventListener('click', () => {
    console.log('Botão de determinar objetivo clicado');
    formMetas.style.display = 'block'; // Mostra o formulário
    msgMetas.innerHTML = ''; // Limpa mensagens anteriores
});



// Função para cancelar o registro de metas
cancelarMetas.addEventListener('click', (event) => {
    event.preventDefault(); // Previne comportamento padrão do botão
    formMetas.style.display = 'none'; // Fecha o formulário
    
});

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

const token = localStorage.getItem('token');

registrarMetas.addEventListener('click', (event) => {
    event.preventDefault();

    const inputMeta = document.getElementById('meta').value;

    if (inputMeta) {
        
        const metas = {
            descricao: inputMeta,
            data_criacao: new Date().toISOString().split('T')[0], 
        };

        fetch('/api/metas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(metas), 
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao registrar meta');
            }
            return response.json();
        })
        .then(data => {
            console.log('Meta registrada com sucesso', data);
            formMetas.style.display = 'none';
            msgMetas.innerHTML = 'Meta registrada com sucesso';
            exibirMetas(); 
        })
        .catch(error => {
            console.error('Erro ao registrar meta:', error);
            msgMetas.innerHTML = 'Erro ao registrar meta';
        });
    } else {
        msgMetas.innerHTML = 'Por favor, insira uma meta válida';
    }
});

// Função para abrir o formulário ao clicar no botão "Determine seus objetivos"
btnMetas.addEventListener('click', () => {
    console.log('Botão de determinar objetivo clicado');
    formMetas.style.display = 'block'; // Mostra o formulário
    msgMetas.innerHTML = ''; // Limpa mensagens anteriores
});



// Função para cancelar o registro de metas
cancelarMetas.addEventListener('click', (event) => {
    event.preventDefault(); // Previne comportamento padrão do botão
    formMetas.style.display = 'none'; // Fecha o formulário
    
});

// Função para obter as metas cadastradas e exibi-las
function exibirMetas() {
    fetch('/api/metas', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Coloque o token de autenticação aqui
        },
    })
    .then(response => response.json())
    .then(data => {
        const metasContainer = document.getElementById('metascontainer'); // Onde as metas serão exibidas
        metasContainer.innerHTML = ''; // Limpa as metas anteriores

        data.metas.forEach(meta => {
            const metaElement = document.createElement('div');
            metaElement.classList.add('meta');
            metaElement.innerHTML = `

            
                <p>${meta.descricao}</p>
                <button class="check" data-id="${meta.id_meta}"><i class="bi bi-check-square-fill"></i></button>
            
            `;
            metasContainer.appendChild(metaElement);
        });

        // Adiciona o evento de clique para marcar a meta como concluída
        document.querySelectorAll('.check').forEach(button => {
            button.addEventListener('click', (event) => {
                const metaId = event.target.getAttribute('data-id');
                concluirMeta(metaId, event);
            });
        });
    })
    .catch(error => {
        console.error('Erro ao obter as metas:', error);
    });
}

// Função para deletar a meta do banco de dados quando marcada como concluída
function concluirMeta(metaId, event) {
    event.preventDefault();  // Previne o comportamento padrão (caso seja um formulário ou outro evento)

    fetch(`/api/metas/${metaId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao excluir meta');
        }
        console.log('Meta concluída com sucesso');
        exibirMetas(); // Atualiza a lista de metas
    })
    .catch(error => {
        console.error('Erro ao excluir meta:', error);
    });
}


exibirMetas();


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
        
        const nomeUsuario = data.nome;

        const mensagem = document.getElementById('mensagem');
        const msg = document.getElementById('msg');

        mensagem.innerHTML = `Bem-vindo <span style="color: blue;">${nomeUsuario}</span>`;  
        msg.innerHTML = `Welcome <span style="color: blue;">${nomeUsuario}</span>`;
    })
    .catch(error => {
        console.error('Erro ao buscar usuário:', error);

        const mensagem = document.getElementById('mensagem');
        mensagem.innerHTML = 'Erro ao buscar informações do usuário.';
        mensagem.style.color = 'red'; 
    });
}



mostrarMensagemBemVindo();

document.querySelectorAll('ul a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
    });
});
});



const ctx = document.getElementById('graficoProgresso').getContext('2d');
new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
        datasets: [{
            label: 'Atividades Realizadas',
            data: [2, 3, 4, 1],
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: { beginAtZero: true }
        }
    }
});

// Efeito de rolagem para o topo do site 
document.querySelector('.lenguage div').addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});





