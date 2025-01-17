document.addEventListener('DOMContentLoaded', () => {
    const nomePt = document.getElementById('nome-pt');
    const nomeEn = document.getElementById('nome-en');
    const emailPt = document.getElementById('email-pt');
    const emailEn = document.getElementById('email-en');
    const senhaPt = document.getElementById('senha-pt');
    const senhaEn = document.getElementById('senha-en');
    const saveBtn = document.getElementById('save-btn');
    const editSenhaBtn = document.getElementById('edit-senha-btn');
    const editSenhaBtnEn = document.getElementById('edit-senha-btn-en');
    const senhaFormContainer = document.getElementById('senha-form-container');
    const senhaForm = document.getElementById('senha-form');
    const cancelarSenhaBtn = document.getElementById('cancelar-senha-btn');
    const btnPt = document.getElementById('btn-pt');
    const btnEn = document.getElementById('btn-en');

    let userData = {
        nome: '',
        email: '',
        senha: ''
    };

  

    const btnSair = document.getElementById('sair-pt');
    const btnSairEn = document.getElementById('sair-en');
    
    // Adicione verificações para evitar erros caso os elementos não sejam encontrados
    if (btnSair) {
        btnSair.addEventListener('click', sairConta);
    }
    
    if (btnSairEn) {
        btnSairEn.addEventListener('click', sairConta);
    }
    

    const token = localStorage.getItem('token');
    
    function sairConta() {
        console.log('Botão de sair clicado');
        if (!token) {
            alert('Usuário não autenticado. Faça login novamente.');
            window.open('login.html', '_self');
            return;
        }
    
        fetch('hhttps://life-balance-server.vercel.app/api/perfil', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao excluir a conta');
            }
            return response.json();
        })
        .then(data => {
            console.log('Conta excluída com sucesso:', data);
            localStorage.removeItem('token');
            window.open('index.html', '_self');
        })
        .catch(error => {
            console.error('Erro ao excluir a conta:', error);
            alert('Erro ao excluir a conta. Tente novamente mais tarde.');
        });
    }
    
    // Adiciona os eventos de clique nos botões de logout
    btnSair.addEventListener('click', sairConta);
    btnSairEn.addEventListener('click', sairConta);
    

    function carregarPerfil() {
        fetch('https://life-balance-server.vercel.app/api/perfil')
            .then(response => response.json())
            .then(data => {
                if (data.usuario) {
                    userData = {
                        nome: data.usuario.nome,
                        email: data.usuario.email,
                        senha: data.usuario.senha
                    };

                    document.getElementById('nome-value').textContent = data.usuario.nome;
                    document.getElementById('nome-value-en').textContent = data.usuario.nome;
                    document.getElementById('email-value').textContent = data.usuario.email;
                    document.getElementById('email-value-en').textContent = data.usuario.email;
                }
            })
            .catch(error => console.error('Erro ao carregar perfil:', error));
    }

    function editarCampo(campo, lang) {
        const campoValue = document.getElementById(`${campo}-value${lang === 'en' ? '-en' : ''}`);
        const valorOriginal = userData[campo];

        const input = document.createElement('input');
        input.type = campo === 'senha' ? 'password' : 'text';
        input.value = valorOriginal;
        campoValue.textContent = '';
        campoValue.appendChild(input);

        input.focus();

        input.addEventListener('blur', () => {
            if (input.value !== valorOriginal) {
                userData[campo] = input.value;
                campoValue.textContent = input.value;
                saveBtn.style.display = 'inline-block';
            } else {
                campoValue.textContent = valorOriginal;
            }
        });
    }

    function alterarIdioma(idioma) {
        const elementosPt = document.querySelectorAll('[data-lang="pt"]');
        const elementosEn = document.querySelectorAll('[data-lang="en"]');

        if (idioma === 'pt') {
            elementosPt.forEach(element => element.style.display = 'block');
            elementosEn.forEach(element => element.style.display = 'none');
        } else {
            elementosPt.forEach(element => element.style.display = 'none');
            elementosEn.forEach(element => element.style.display = 'block');
        }
    }

    carregarPerfil();

    nomePt.addEventListener('click', () => editarCampo('nome', 'pt'));
    nomeEn.addEventListener('click', () => editarCampo('nome', 'en'));
    emailPt.addEventListener('click', () => editarCampo('email', 'pt'));
    emailEn.addEventListener('click', () => editarCampo('email', 'en'));
    senhaPt.addEventListener('click', () => editarCampo('senha', 'pt'));
    senhaEn.addEventListener('click', () => editarCampo('senha', 'en'));

    saveBtn.addEventListener('click', () => {
        fetch('https://life-balance-server.vercel.app/api/perfil', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(userData),
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Usuário atualizado com sucesso') {
                console.log('Dados salvos com sucesso!');
                saveBtn.style.display = 'none';
                senhaFormContainer.style.display = 'none'; 
                console.error('Erro inesperado:', data);
            }
        })
        .catch(error => console.error('Erro ao salvar dados:', error));
    });


    editSenhaBtn.addEventListener('click', () => {
        senhaFormContainer.style.display = 'block';
    });
    editSenhaBtnEn.addEventListener('click', () => {
        senhaFormContainer.style.display = 'block';
    });

    cancelarSenhaBtn.addEventListener('click', () => {
        senhaFormContainer.style.display = 'none';
    });

    senhaForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const novaSenha = document.getElementById('nova-senha').value;
        const confirmarSenha = document.getElementById('confirmar-senha').value;

        if (novaSenha !== confirmarSenha) {
            alert('As senhas não coincidem');
            return;
        }

        userData.senha = novaSenha;

        fetch('https://life-balance-server.vercel.app/api/perfil', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(userData),
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Usuário atualizado com sucesso') {
                console.log('Senha alterada com sucesso!');
                senhaFormContainer.style.display = 'none'; 
            } else {
                console.error('Erro inesperado:', data);
            }
        })
        .catch(error => console.error('Erro ao salvar dados:', error));
    });


    btnPt.addEventListener('click', () => alterarIdioma('pt'));
    btnEn.addEventListener('click', () => alterarIdioma('en'));
});
