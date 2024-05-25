document.getElementById('userForm').addEventListener('submit', async function (event) {
  event.preventDefault();
  await post();
});

const token = localStorage.getItem('token');

window.addEventListener('DOMContentLoaded', () => {
  validateToken();
  load();
});

const cerrarSesion = () => {
  localStorage.removeItem('token');
  window.location.href = 'login.html';
};

const validateToken = async () => {
  if (!token) {
    window.location.href = 'login.html';
    return;
  }

  try {
    const response = await axios.get('http://localhost/actas/api?validateToken=true', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = response.data;

    if (Object.keys(data).length > 0) {
      localStorage.removeItem('token');
      window.location.href = 'login.html';
    }
  } catch (error) {
    console.error('Error al validar el token:', error);
    localStorage.removeItem('token');
    window.location.href = 'login.html';
  }
};

const load = async () => {
  try {
    const response = await axios.get('http://localhost/actas/api?table=user&id=x&action=0', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const users = response.data;
    const container = document.getElementById('container');
    container.innerHTML = '';

    users.forEach(user => {
      container.innerHTML += `
          <div class="user-card">
            <h2>Usuario</h2>
            <div>
              <label for="name">Name:</label>
              <input id="${user.name}name2" type="text" value="${user.name}" />
            </div>
            <div>
              <label for="username">Username:</label>
              <input id="${user.username}username" type="text" value="${user.username}" />
            </div>
            <div>
              <label for="password">Password:</label>
              <input id="${user.username}password" type="text" value="${user.password_hash}" />
            </div>
            <div class="card-buttons">
              <button onclick="put('${user.username}username', '${user.id}', '${user.username}password', '${user.name}name2')">Editar</button>
              <button onclick="del('${user.username}')">Eliminar</button>
            </div>
          </div>
        `;
    });
  } catch (error) {
    console.error('Error:', error);
  }
};

const del = async username => {
  try {
    await axios.delete(`http://localhost/actas/api?table=user&id=${username}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    alert('Exito');
    window.location.reload();
  } catch (error) {
    alert('Error: ' + error.message);
  }
};

const post = async () => {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const name = document.getElementById('name').value;

  const data = {
    name: name,
    username: username,
    password_hash: password,
  };

  try {
    await axios.post('http://localhost/actas/api/?table=user', data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    alert('Usuario creado exitosamente');
    window.location.reload();
  } catch (error) {
    alert('Error: ' + error.message);
  }
};

const put = async (usernameId, userId, passwordId, nameId) => {
  const username = document.getElementById(usernameId).value;
  const password = document.getElementById(passwordId).value;
  const name = document.getElementById(nameId).value;

  const data = {
    name: name,
    username: username,
    password_hash: password,
  };

  try {
    await axios.put(`http://localhost/actas/api?table=user&id=${userId}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    alert('Usuario actualizado exitosamente');
    window.location.reload();
  } catch (error) {
    alert('Error: ' + error.message);
  }
};
