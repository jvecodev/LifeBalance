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
    formMetas.style.display = 'block';
    msgMetas.innerHTML = ''; 
});

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




cancelarMetas.addEventListener('click', (event) => {
    event.preventDefault();
    formMetas.style.display = 'none'; 
    
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

        fetch('https://life-balance-beige.vercel.app//api/metas', {
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
    formMetas.style.display = 'block'; 
    msgMetas.innerHTML = '';
});




cancelarMetas.addEventListener('click', (event) => {
    event.preventDefault();
    formMetas.style.display = 'none'; 
    
});



function exibirMetas() {
    fetch('https://life-balance-beige.vercel.app//api/metas', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, 
        },
    })
    .then(response => response.json())
    .then(data => {
        const metasContainer = document.getElementById('metascontainer'); 
        metasContainer.innerHTML = '';

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

    fetch(`https://life-balance-beige.vercel.app//api/metas/${metaId}`, {
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
        exibirMetas(); 
    })
    .catch(error => {
        console.error('Erro ao excluir meta:', error);
    });
}



exibirMetas();




function mostrarMensagemBemVindo() {
    fetch('https://life-balance-beige.vercel.app//api/cadastrar', {
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

    fetch('https://life-balance-beige.vercel.app//api/caracteristica', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, 
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

    fetch('https://life-balance-beige.vercel.app//api/atividades', {
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
            atualizarListaAtividades();
            atualizarGraficoGerais();
           
        })
        .catch(error => {
            console.error('Erro ao registrar atividade:', error);
        });
});

function verificarMudancaDeMes() {
    const mesAtual = new Date().getMonth();

   
    if (mesAtual !== localStorage.getItem('ultimoMes')) {
        localStorage.setItem('ultimoMes', mesAtual); 
        atualizarListaAtividades(); 
    }
}


setInterval(verificarMudancaDeMes, 24 * 60 * 60 * 1000);


document.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.getItem('ultimoMes')) {
        localStorage.setItem('ultimoMes', new Date().getMonth());
    }
    atualizarListaAtividades();
});


function atualizarListaAtividades() {
    fetch('https://life-balance-beige.vercel.app//api/atividades', {
        headers: {
            'Authorization': `Bearer ${token}`, 
        },
    })
    .then(response => response.json())
    .then(data => {
        const atividades = data.atividades;

      
        const contador = {};
        atividades.forEach(atividade => {
            const mesAtividade = new Date(atividade.data_treino).getMonth();
            const mesAtual = new Date().getMonth();
            if (mesAtividade === mesAtual) {
                contador[atividade.atividade] = (contador[atividade.atividade] || 0) + 1;
            }
        });

     
        const resumoMes = document.getElementById('resumo-mes');
        const mesAtual = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });
        resumoMes.innerHTML = `<h3>Atividades de ${mesAtual}</h3>`;

        if (Object.keys(contador).length === 0) {
            resumoMes.innerHTML += '<p>Nenhuma atividade realizada neste mês.</p>';
        } else {
            const contadorHtml = Object.entries(contador)
                .map(([atividade, total]) => `<p><strong>${atividade}:</strong> ${total} vez(es)</p>`)
                .join('');
            resumoMes.innerHTML += `<div class="contador-atividades">${contadorHtml}</div>`;
        }

       
        const listaAtividades = document.getElementById('lista-atividades');
        listaAtividades.innerHTML = '';

        const atividadesDoMes = atividades.filter(atividade => {
            const mesAtividade = new Date(atividade.data_treino).getMonth();
            return mesAtividade === new Date().getMonth();
        });

        if (atividadesDoMes.length === 0) {
            listaAtividades.innerHTML = '<p>Nenhuma atividade registrada neste mês.</p>';
            return;
        }

        atividadesDoMes.forEach(atividade => {
            const atividadeElemento = document.createElement('div');
            atividadeElemento.classList.add('atividade-item');
            atividadeElemento.innerHTML = `
                <p><strong>Atividade:</strong> ${atividade.atividade}</p>
                <p><strong>Data:</strong> ${new Date(atividade.data_treino).toLocaleDateString()}</p>
            `;
            listaAtividades.appendChild(atividadeElemento);
        });
    })
    .catch(error => console.error('Erro ao atualizar lista de atividades:', error));
}


document.addEventListener('DOMContentLoaded', () => {
    atualizarListaAtividades();
});

document.addEventListener('DOMContentLoaded', () => {
    atualizarListaAtividades();
});




document.addEventListener('DOMContentLoaded', () => {
    atualizarListaAtividades();
});


document.addEventListener('DOMContentLoaded', atualizarListaAtividades);
function atualizarContagemMensal() {
    fetch('https://life-balance-beige.vercel.app//api/atividades-mensais', {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
        .then(response => response.json())
        .then(data => {
            const contagem = document.getElementById('contagem-mensal');
            contagem.innerHTML = '';

            data.atividadesMensais.forEach(item => {
                const linha = document.createElement('p');
                linha.textContent = `${item.atividade}: ${item.total} vezes`;
                contagem.appendChild(linha);
            });
        })
        .catch(error => console.error('Erro ao buscar contagem mensal:', error));
}


document.addEventListener('DOMContentLoaded', atualizarContagemMensal);


let ultimoMes = new Date().getMonth();

const coresSemana = [
    'rgba(54, 162, 235, 0.6)', 
    'rgba(255, 99, 132, 0.6)', 
    'rgba(75, 192, 192, 0.6)', 
    'rgba(153, 102, 255, 0.6)' 
];

function verificarMudancaDeMes() {
    const mesAtual = new Date().getMonth();
    if (mesAtual !== ultimoMes) {
        ultimoMes = mesAtual;
        resetarGrafico(); 
    }
}

function resetarGrafico() {
    
    chartSemana.data.datasets[0].data = [0, 0, 0, 0];
    chartSemana.update();
    chartMes.data.datasets[0].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    chartMes.update();
}

function calcularSemanaDoMes(data) {
    const primeiroDiaDoMes = new Date(data.getFullYear(), data.getMonth(), 1); 
    const ultimoDiaDoMes = new Date(data.getFullYear(), data.getMonth() + 1, 0)

   
    const diffTime = data - primeiroDiaDoMes;
    const dias = Math.floor(diffTime / (1000 * 60 * 60 * 24)); 

  
    const totalDiasNoMes = Math.floor((ultimoDiaDoMes - primeiroDiaDoMes) / (1000 * 60 * 60 * 24));

   
    const semana = Math.floor(dias / 7);
    if (semana >= 4) {
        return 3; 
    }
    return semana;
}

function contarAtividadesPorSemana(atividades) {
    const semanas = [0, 0, 0, 0]; 
    atividades.forEach(atividade => {
        const dataAtividade = new Date(atividade.data_treino);
        const semana = calcularSemanaDoMes(dataAtividade);
        if (semana >= 0 && semana < 4) {
            semanas[semana] += 1;
        }
    });
    return semanas;
}

function contarAtividadesPorMes(atividades) {
    const meses = new Array(12).fill(0); 
    atividades.forEach(atividade => {
        const dataAtividade = new Date(atividade.data_treino);
        const mes = dataAtividade.getMonth(); 
        meses[mes] += 1; 
    });
    return meses;
}


function atualizarGraficoGerais() {
    fetch('https://life-balance-beige.vercel.app//api/atividades', {
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

       
        atualizarGraficoSemana(atividadesPorSemana);

       
        chartMes.data.datasets[0].data = atividadesPorMes;
        chartMes.update();
    })
    .catch(error => {
        console.error('Erro ao obter atividades:', error);
    });
}

function atualizarGraficoSemana(atividadesPorSemana) {
    chartSemana.data.datasets[0].data = atividadesPorSemana;

   
    atividadesPorSemana.forEach((_, index) => {
        chartSemana.data.datasets[0].backgroundColor[index] = coresSemana[index];
    });

    chartSemana.update();
}

document.addEventListener('DOMContentLoaded', () => {
    const ctxSemana = document.getElementById('graficoSemana').getContext('2d');
    const ctxMes = document.getElementById('graficoMes').getContext('2d');

    chartSemana = new Chart(ctxSemana, {
        type: 'bar',
        data: {
            labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
            datasets: [{
                label: 'Atividades Realizadas',
                data: [0, 0, 0, 0], 
                backgroundColor: coresSemana,
                borderColor: coresSemana,
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
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Atividades Realizadas',
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
                backgroundColor: 'rgba(255, 0, 55, 0.6)',
                borderColor: 'rgb(255, 0, 55)',
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

   
    atualizarGraficoGerais();

    
    verificarMudancaDeMes();
});


let mesAtual = new Date().getMonth();

setInterval(() => {
    const novoMes = new Date().getMonth();
    if (novoMes !== mesAtual) {
        mesAtual = novoMes;
        atualizarListaAtividades();
        atualizarContagemMensal();
        atualizarGraficoGerais();
        
    }
}, 3600000); 




document.querySelector('.lenguage div').addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});





