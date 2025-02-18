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
    const btnSair = document.getElementById('sair-pt');
    const btnSairEn = document.getElementById('sair-en');


    let userData = {
        nome: '',
        email: '',
        senha: ''
    };

    const token = localStorage.getItem('token');

    function carregarPerfil() {
        if (!token) {
            alert('Usuário não autenticado. Faça login novamente.');
            window.open('login.html', '_self');
            return;
        }

        fetch('https://life-balance-server.vercel.app/api/perfil', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar perfil do usuário');
            }
            return response.json();
        })
        .then(data => {
            if (data.usuario) {
                userData = {
                    nome: data.usuario.nome,
                    email: data.usuario.email,
                    senha: ''
                };

                document.getElementById('nome-value').textContent = data.usuario.nome;
                document.getElementById('nome-value-en').textContent = data.usuario.nome;
                document.getElementById('email-value').textContent = data.usuario.email;
                document.getElementById('email-value-en').textContent = data.usuario.email;
            }
        })
        .catch(error => {
            console.error('Erro ao carregar perfil:', error);
            alert('Erro ao carregar os dados do perfil. Faça login novamente.');
            location.href = 'login.html';
        });
    }


    function sairConta() {
        console.log('Tentativa de excluir a conta iniciada.');
    
        if (!token) {
            alert('Usuário não autenticado. Faça login novamente.');
            location.href = 'login.html';
            return;
        }
    
        fetch('https://life-balance-server.vercel.app/api/perfil', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
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
            location.href = 'index.html';
        })
        .catch(error => {
            console.error('Erro ao excluir a conta:', error);
            alert('Erro ao excluir a conta. Tente novamente mais tarde.');
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
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(userData),
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Usuário atualizado com sucesso') {
                console.log('Dados salvos com sucesso!');
                saveBtn.style.display = 'none';
                senhaFormContainer.style.display = 'none';
            } else {
                console.error('Erro inesperado:', data);
            }
        })
        .catch(error => console.error('Erro ao salvar dados:', error));
    });

    btnPt.addEventListener('click', () => alterarIdioma('pt'));
    btnEn.addEventListener('click', () => alterarIdioma('en'));

    if (btnSair) {
        btnSair.addEventListener('click', sairConta);
    }
    if (btnSairEn) {
        btnSairEn.addEventListener('click', sairConta);
    }
    
});
