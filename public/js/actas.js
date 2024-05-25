document.getElementById('actaForm').addEventListener('submit', async function (event) {
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
    const response = await axios.get('http://localhost/actas/api?table=register&id=x&action=0', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const records = response.data;
    const loadDiv = document.getElementById('load');
    loadDiv.innerHTML = '';

    records.forEach(record => {
      loadDiv.innerHTML += `
          <div class="user-card">
            <h2>Acta</h2>
            <div class="form-container">
                <div>
                    <div class="input-group">
                        <label for="date">Fecha reunion:</label>
                        <input id="${record.idregister}date" type="date" value="${record.date}" />
                      </div>
                      <div class="input-group">
                        <label for="startHour">Hora inicio:</label>
                        <input id="${record.idregister}startHour" type="time" value="${record.startHour}" />
                      </div>
                      <div class="input-group">
                        <label for="finishHour">Hora finalizacion:</label>
                        <input id="${record.idregister}finishHour" type="time" value="${record.finishHour}" />
                      </div>
                      <div class="input-group">
                        <label for="assistants">Asistentes:</label>
                        <input id="${record.idregister}assistants" type="number" value="${record.assistants}" />
                      </div>
                </div>
                <div>
                    <div class="input-group">
                        <label for="matters">Asunto reunion:</label>
                        <input id="${record.idregister}matters" type="text" value="${record.matters}" />
                      </div>
                      <div class="input-group">
                        <label for="develop">Desarrollo reunion</label>
                        <input id="${record.idregister}develop" type="text"  value="${record.develop}" />
                      </div>
                      <div class="input-group">
                        <label for="commitments">Compromisos</label>
                        <input id="${record.idregister}commitments" type="text"  value="${record.commitments}" />
                      </div>
                      <div class="input-group">
                        <label for="responsible">Responsable:</label>
                        <input id="${record.idregister}responsible" type="text" value="${record.responsible}" />
                      </div>
                </div>
            </div>
            
            <div class="card-buttons">
              <button onclick="put('${record.idregister}')">Editar acta</button>
              <button onclick="del('${record.idregister}')">Eliminar acta</button>
            </div>
          </div>
        `;
    });
  } catch (error) {
    console.error('Error al cargar los registros:', error);
  }
};

const post = async () => {
  const data = {
    date: document.getElementById('date').value,
    startHour: document.getElementById('startHour').value,
    finishHour: document.getElementById('finishHour').value,
    assistants: document.getElementById('assistants').value,
    matters: document.getElementById('matters').value,
    develop: document.getElementById('develop').value,
    commitments: document.getElementById('commitments').value,
    responsible: document.getElementById('responsible').value,
  };

  try {
    await axios.post('http://localhost/actas/api/?table=register', data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    alert('Acta agregada exitosamente');
    window.location.reload();
  } catch (error) {
    alert('Error al agregar acta: ' + error.message);
  }
};

const del = async (idregister) => {
  try {
    await axios.delete(`http://localhost/actas/api?table=register&id=${idregister}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    alert('Acta eliminada exitosamente');
    window.location.reload();
  } catch (error) {
    alert('Error al eliminar acta: ' + error.message);
  }
};

const put = async (idregister) => {
  const data = {
    date: document.getElementById(`${idregister}date`).value,
    startHour: document.getElementById(`${idregister}startHour`).value,
    finishHour: document.getElementById(`${idregister}finishHour`).value,
    assistants: document.getElementById(`${idregister}assistants`).value,
    matters: document.getElementById(`${idregister}matters`).value,
    develop: document.getElementById(`${idregister}develop`).value,
    commitments: document.getElementById(`${idregister}commitments`).value,
    responsible: document.getElementById(`${idregister}responsible`).value,
  };

  try {
    await axios.put(`http://localhost/actas/api?table=register&id=${idregister}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    alert('Acta editada exitosamente');
    window.location.reload();
  } catch (error) {
    alert('Error al editar acta: ' + error.message);
  }
};
