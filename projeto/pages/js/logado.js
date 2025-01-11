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
            formMetas.style.display = 'block';
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
            metaElement.classList.add('m2');
            metaElement.innerHTML = `

            
                <p>${meta.descricao}</p>
                <button class="check" data-id="${meta.id_meta}">
                    <i class="bi bi-patch-check-fill"></i>
                </button>

            
            `;
            metasContainer.appendChild(metaElement);
        });

        
        document.querySelectorAll('.check').forEach(button => {
            button.addEventListener('click', (event) => {
                const metaId = event.currentTarget.getAttribute('data-id'); 
                concluirMeta(metaId, event);
            });
        });
        
    })
    .catch(error => {
        console.error('Erro ao obter as metas:', error);
    });
}

function concluirMeta(metaId, event) {
    event.preventDefault(); 

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

// registrar imc 

const formImc = document.getElementById('form-imc');
const resultado = document.getElementById('resultado');
const registrarImc = document.querySelector('#calcular');

registrarImc.addEventListener('click', (event) => {
    event.preventDefault();

    const peso = document.getElementById('peso').value;
    const altura = document.getElementById('altura').value;

    if (!peso || !altura) {
        alert('Preencha todos os campos!');
        return;
    }

    const imc = {
        Peso: parseFloat(peso),
        Altura: parseFloat(altura),
        imc: (peso / ((altura / 100) ** 2)).toFixed(2),
    };

    fetch('/api/caracteristica', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Certifique-se de que o token está definido
        },
        body: JSON.stringify(imc),
    })
        .then(response => response.json())
        .then(data => {
            console.log('IMC registrado com sucesso:', data);

            const imcValue = parseFloat(imc.imc);
            let mensagem = '';
            let cor = '';

            // Classificação do IMC
            if (imcValue < 18.5) {
                mensagem = `Seu IMC é ${imc.imc}. Você está abaixo`;
                cor = 'orange';
            } else if (imcValue >= 18.5 && imcValue <= 24.9) {
                mensagem = `Seu IMC é ${imc.imc}. Você está saudável.`;
                cor = 'green';
            } else if (imcValue >= 25) {
                mensagem = ` Seu IMC é ${imc.imc}. Você está acima do peso.`;
                cor = 'red';
            }

            // Exibir mensagem e alterar cor
            resultado.innerHTML = mensagem;
            resultado.style.color = cor;
            resultado.style.backgroundColor = 'white';
            resultado.style.border = `2px solid ${cor}`;
            resultado.style.borderRadius = '20px';
            resultado.style.padding = '10px';
            resultado.style.marginTop = '10px';


        })
        .catch(error => {
            console.error('Erro ao registrar IMC:', error);
            resultado.innerHTML = 'Erro ao registrar IMC';
            resultado.style.color = 'red';
        });
});


document.getElementById('registrarAtividade').addEventListener('click', (event) => {
    event.preventDefault();

    const atividade = document.getElementById('activity').value;
    const data = document.getElementById('date').value;

    if (!atividade || !data) {
        alert('Preencha todos os campos!');
        return;
    }

    const atividadeObj = {
        atividade: atividade,
        data_treino: data,
    };

    // Enviar a nova atividade para o backend
    fetch('/api/atividades', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(atividadeObj),
    })
    .then(response => response.json())
    .then(() => {
        console.log('Atividade registrada com sucesso');

            atualizarGraficoGerais(); // Atualiza gráficos gerais (por semana e por mês)
            atualizarGraficoAtividades(atividade, 'semana'); 
            
    })
    .catch(error => {
        console.error('Erro ao registrar atividade:', error);
    });
});
// Função para calcular a semana do mês para uma data específica
function calcularSemanaDoMes(data) {
    const primeiroDiaDoMes = new Date(data.getFullYear(), data.getMonth(), 1); // Primeiro dia do mês
    const diffTime = data - primeiroDiaDoMes; // Diferença em milissegundos
    const dias = Math.floor(diffTime / (1000 * 60 * 60 * 24)); // Convertendo para dias
    return Math.floor(dias / 7); // Dividido por 7 para encontrar a semana
}

// Função para contar as atividades por semana (últimas 4 semanas)
function contarAtividadesPorSemana(atividades) {
    const semanas = [0, 0, 0, 0]; // Contagem para as 4 últimas semanas
    atividades.forEach(atividade => {
        const dataAtividade = new Date(atividade.data_treino);
        const semana = calcularSemanaDoMes(dataAtividade);
        if (semana >= 0 && semana < 4) {
            semanas[semana] += 1; // Incrementa a contagem da semana correspondente
        }
    });
    return semanas;
}

// Função para contar as atividades por mês
function contarAtividadesPorMes(atividades) {
    const meses = new Array(12).fill(0); // Contagem para os 12 meses
    atividades.forEach(atividade => {
        const dataAtividade = new Date(atividade.data_treino);
        const mes = dataAtividade.getMonth(); // 0 é Janeiro, 1 é Fevereiro, etc.
        meses[mes] += 1; // Incrementa a contagem do mês correspondente
    });
    return meses;
}


// Função para atualizar gráficos gerais de mês e semana
function atualizarGraficoGerais() {
    fetch('/api/atividades', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
    .then(response => response.json())
    .then(data => {
        const atividades = data.atividades;

        const atividadesPorSemana = contarAtividadesPorSemana(atividades); 
        const atividadesPorMes = contarAtividadesPorMes(atividades); 

        // Atualizando os gráficos de atividades por semana
        chartSemana.data.datasets[0].data = atividadesPorSemana;
        chartSemana.update();

        // Atualizando os gráficos de atividades por mês
        chartMes.data.datasets[0].data = atividadesPorMes;
        chartMes.update();
    })
    .catch(error => {
        console.error('Erro ao obter atividades:', error);
    });
}

function atualizarGraficoAtividades(tipo, periodo) {
    fetch(`/api/atividades-contagem?tipo=${tipo}&periodo=${periodo}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
    .then(response => response.json())
    .then(data => {
        const atividadesPorTipo = data.atividades; // Agora 'atividades' é um objeto com as contagens

        const labels = Object.keys(atividadesPorTipo);
        const dataValues = Object.values(atividadesPorTipo);

        // Atualizar o gráfico de atividades por tipo
        const ctxAtividades = document.getElementById('graficoAtividades').getContext('2d');
        
        // Se o gráfico já foi inicializado, apenas atualize os dados
        if (window.chartAtividades) {
            window.chartAtividades.data.datasets[0].data = dataValues;
            window.chartAtividades.update();
        } else {
            // Inicializando o gráfico de atividades por tipo
            window.chartAtividades = new Chart(ctxAtividades, {
                type: 'bar',
                data: {
                    labels: ['ciclismo', 'musculacao', 'corrida', 'natacao', 'outros'],
                    datasets: [{
                        label: 'Contagem de Atividades',
                        data: dataValues,
                        backgroundColor: 'rgba(54, 235, 54, 0.6)',
                        borderColor: 'rgba(54, 235, 54, 0.6)',
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
        }
    })
    .catch(error => {
        console.error('Erro ao obter contagem de atividades:', error);
    });
}


document.addEventListener('DOMContentLoaded', () => {
    const ctxSemana = document.getElementById('graficoSemana').getContext('2d');
    const ctxMes = document.getElementById('graficoMes').getContext('2d');

    // Inicializando os gráficos
    chartSemana = new Chart(ctxSemana, {
        type: 'bar',
        data: {
            labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
            datasets: [{
                label: 'Atividades Realizadas',
                data: [0, 0, 0, 0], // Inicialmente sem dados
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

    chartMes = new Chart(ctxMes, {
        type: 'bar',
        data: {
            labels: [
                'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
            ],
            datasets: [{
                label: 'Atividades Realizadas',
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Inicialmente sem dados
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                borderColor: 'rgba(255, 99, 132, 1)',
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

    // Carregar gráficos de atividades gerais (por semana e por mês)
    atualizarGraficoGerais();

    // Exemplo para carregar contagem de musculação por semana
    atualizarGraficoAtividades('musculacao', 'semana');
});

// Efeito de rolagem para o topo do site 
document.querySelector('.lenguage div').addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});





