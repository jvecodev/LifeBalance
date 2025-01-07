document.addEventListener('DOMContentLoaded', () => {
    const nomeSpan = document.getElementById('nome');
    const emailSpan = document.getElementById('email');
    const senhaSpan = document.getElementById('senha');
    const nomeValue = document.getElementById('nome-value');
    const emailValue = document.getElementById('email-value');
    const senhaValue = document.getElementById('senha-value');
    const saveBtn = document.getElementById('save-btn');

    // Variáveis para armazenar os dados do usuário
    let userData = {
        nome: '',
        email: '',
        senha: ''
    };

    // Função para carregar os dados do usuário
    function carregarPerfil() {
        fetch('/api/perfil')
            .then(response => response.json())
            .then(data => {
                if (data.usuario) {
                    userData = {
                        nome: data.usuario.nome,
                        email: data.usuario.email1,
                        senha: '********'
                    };

                    nomeValue.textContent = data.usuario.nome;
                    emailValue.textContent = data.usuario.email1;
                }
            })
            .catch(error => console.error('Erro ao carregar perfil:', error));
    }

    // Função para editar os dados diretamente
    function editarCampo(campo) {
        // Salvar o valor original antes de editar
        const valorOriginal = userData[campo];

        // Criar o campo de input
        const input = document.createElement('input');
        input.type = campo === 'senha' ? 'password' : 'text';
        input.value = valorOriginal;
        input.setAttribute('class', 'editable');

        // Substituir o valor exibido pelo input
        const campoValue = document.getElementById(`${campo}-value`);
        campoValue.textContent = ''; // Limpa o conteúdo do span
        campoValue.appendChild(input); // Adiciona o input ao lugar do span

        input.focus();

        // Quando o input perde o foco, salvar o novo valor
        input.addEventListener('blur', () => {
            if (input.value !== valorOriginal) {
                userData[campo] = input.value;
                campoValue.textContent = input.value;
                saveBtn.style.display = 'inline-block'; // Exibir o botão de salvar
            } else {
                campoValue.textContent = valorOriginal;
            }
        });

        // Remover o evento de pressionamento de Enter
        input.removeEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                input.blur();
            }
        });
    }

    // Carregar os dados assim que a página carregar
    carregarPerfil();

    // Eventos de clique para edição dos dados
    nomeSpan.addEventListener('click', () => editarCampo('nome'));
    emailSpan.addEventListener('click', () => editarCampo('email'));
    senhaSpan.addEventListener('click', () => editarCampo('senha'));

    // Salvar as edições quando o botão "Salvar" for clicado
    saveBtn.addEventListener('click', () => {
        fetch('/api/perfil', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Usuário atualizado com sucesso') {
                alert('Dados atualizados com sucesso!');
                saveBtn.style.display = 'none'; // Esconder o botão de salvar após a edição
                carregarPerfil(); // Recarregar os dados atualizados após salvar
            }
        })
        .catch(error => console.error('Erro ao salvar dados:', error));
    });
});
