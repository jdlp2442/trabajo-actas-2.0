document.getElementById('loginForm').addEventListener('submit', async function (event) {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const myHeaders = {
    "Content-Type": "application/json"
  };

  const raw = JSON.stringify({
    "username": username,
    "password": password
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  try {
    const response = await fetch("http://localhost/actas/api/login.php", requestOptions);

    if (response.status === 401) {
      const result = await response.json();
      if (result.message === "invalid authentication") {
        alert("Credenciales inválidas. Por favor, intente de nuevo.");
      }
    } else if (response.status === 200) {
      const result = await response.json();
      if (result.access_token) {
        localStorage.setItem("token", result.access_token);
        window.location.href = 'usuarios.html';
      }
    } else {
      throw new Error('Error inesperado');
    }
  } catch (error) {
    console.error('Error:', error);
    localStorage.removeItem("token");
    alert("Error de conexión. Por favor, intente de nuevo más tarde.");
  }
});
