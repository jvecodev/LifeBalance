function validarDadosSenha(){
    const senha = document.getElementById("senha").value;
    const senhaMin = 6;
    const senhaMax = 12;
    const senhaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,12}$/;

    const alertas ={
        'usuario ': alertaUsuario
    }

    if (senha.length < senhaMin || senha.length > senhaMax){
        alert('A senha deve ter entre 6 e 12 caracteres');
        return false;
    }
    else if (!senhaRegex.test(senha)){
        alert('A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula e um número');
        return false;
    }
    return true;


}

function validarEmail(email) {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!regexEmail.test(email)){
        alert('Email inválido');
        return false;
    }

    return true;
  }

function validarIdade(idade){
    if (idade > 150 || idade < 0){
        alert('Não precisa mentir caboclo veio');
        return false;
    }
    return true;
}

function validarNome(nome){
    if (nome.length < 3 || nome.length > 50){
        alert('O nome deve ter entre 3 e 50 caracteres');
        return false;
    }
    return true;
}