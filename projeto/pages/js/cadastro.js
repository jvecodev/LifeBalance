function cadastrar(){
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const idade = document.getElementById('idade').value;
    const senha = document.getElementById('senha').value;

    if (nome && email && idade && senha){
        const usuario = {
            nome: nome,
            email: email,
            idade: idade,
            senha: senha
        }
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        usuarios.push(usuario);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        fetch('/api/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        })
        .then(response => response.json())
        .then(data => {
            console.log('usuario cadastrado com sucessop', data);

            window.open('login.html', '_blank');
        })
        .catch(error => {
            console.log('erro ao cadastrar usuario', error);
            alert('Preencha todos os campos');
        });

       

    } else{
        alert('Preencha todos os campos');
    }

}