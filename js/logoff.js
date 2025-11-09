async function logoff() {
    const resposta = await fetch("../php/logoff.php");
    localStorage.clear();
    window.location.href = "../login/index.html";
}

const botaoLogoff = document.getElementById('logoff');

botaoLogoff.addEventListener('click', (event) => {
    event.preventDefault();
    logoff();
});