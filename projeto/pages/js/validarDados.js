function validarSenha(senha) {
    const senhaMin = 6;
    const senhaMax = 12;
    const senhaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,12}$/;

    if (senha.length < senhaMin) {
        alert(`A senha é muito curta. Deve ter pelo menos ${senhaMin} caracteres.`);
        return false;
    } else if (senha.length > senhaMax) {
        alert(`A senha é muito longa. Deve ter no máximo ${senhaMax} caracteres.`);
        return false;
    } else if (!senhaRegex.test(senha)) {
        alert('A senha deve conter pelo menos:\n- Uma letra maiúscula\n- Uma letra minúscula\n- Um número');
        return false;
    }
    return true;
}

function validarEmail(email) {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.trim() === '') {
        alert('O campo de e-mail não pode estar vazio.');
        return false;
    } else if (!regexEmail.test(email)) {
        alert('Formato de e-mail inválido. Certifique-se de usar o formato: exemplo@dominio.com');
        return false;
    }
    return true;
}

function validarIdade(idade) {
    if (!Number.isInteger(idade) || isNaN(idade)) {
        alert('A idade deve ser um número inteiro.');
        return false;
    } else if (idade < 0) {
        alert('A idade não pode ser negativa.');
        return false;
    } else if (idade > 150) {
        alert('Idade inválida. Insira uma idade realista.');
        return false;
    }
    return true;
}

function validarNome(nome) {
    const nomeRegex = /^[a-zA-Zà-úÀ-Ú\s]+$/; 

    if (nome.trim() === '') {
        alert('O nome não pode estar vazio.');
        return false;
    } else if (nome.length < 3) {
        alert('O nome deve ter pelo menos 3 caracteres.');
        return false;
    } else if (nome.length > 50) {
        alert('O nome não pode exceder 50 caracteres.');
        return false;
    } else if (!nomeRegex.test(nome)) {
        alert('O nome só pode conter letras e espaços.');
        return false;
    }
    return true;
}


function validarFormulario() {
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const idade = parseInt(document.getElementById("idade").value, 10);

    if (!validarNome(nome)) return false;
    if (!validarEmail(email)) return false;
    if (!validarSenha(senha)) return false;
    if (!validarIdade(idade)) return false;

    alert("Formulário validado com sucesso!");
    return true;
}
