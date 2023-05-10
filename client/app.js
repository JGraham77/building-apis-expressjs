const chirpsRow = document.getElementById('chirps');
const userInput = document.getElementById('user');
const chirpInput = document.getElementById('chirp');
const addButton = document.getElementById('add');
const saveButton = document.getElementById('save');

let idToEdit = null;

addButton.addEventListener('click', newChirp);

function getChirps() {
    fetch('/api/chirps')
        .then(res => res.json())
        .then(data => {
            chirpsRow.innerHTML = "";

            data.forEach(chirp => {
                const chirpCol = document.createElement('div');
                chirpCol.className = 'col-12 col-md-4 my-2';

                const chirpCard = document.createElement('div');
                chirpCard.className = 'card p-3 shadow-lg'

                const chirpUser = document.createElement('div');
                chirpUser.innerHTML = `<div class='card-title'><h1>${chirp.chirpUser}</h1><p>${chirp.chirp}</p></div>`

                const deleteButton = document.createElement('button');
                deleteButton.className = 'btn btn-danger m-1';
                deleteButton.textContent = 'X';

                deleteButton.addEventListener('click', function () {
                    const wantsToDelete = confirm("Are you sure you want to delete chirp?");
                    if (!wantsToDelete) return;

                    fetch(`/api/chirps/${chirp.id}`, {
                        method: 'DELETE'
                    })
                        .then(res => res.json())
                        .then(data => {
                            getChirps();
                        })
                });

                const editButton = document.createElement('button');
                editButton.className = 'btn btn-info m-1';
                editButton.textContent = 'Edit';

                editButton.addEventListener('click', function () {
                    addButton.hidden = true;
                    saveButton.hidden = false;
                    idToEdit = chirp.id;
                    userInput.value = chirp.user;
                    chirpInput.value = chirp.chirp;

                    saveButton.removeEventListener('click', fireUpdate);
                    saveButton.addEventListener('click', fireUpdate);
                });

                chirpCard.appendChild(chirpUser);
                chirpCard.appendChild(editButton);
                chirpCard.appendChild(deleteButton);
                chirpCol.appendChild(chirpCard);
                chirpsRow.appendChild(chirpCol);
            });
        });
}

function fireUpdate() {
    fetch(`/api/chirps/${idToEdit}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: userInput.value, chirp: chirpInput.value })
    })
        .then(res => res.json())
        .then(data => {
            idToEdit = null;
            addButton.hidden = false;
            saveButton.hidden = true;
            userInput.value = "";
            chirpInput.value = "";

            getChirps()
        });
}

function newChirp() {
    const user = userInput.value;
    const chirp = chirpInput.value;

    if (!user || !chirp) return;

    fetch('/api/chirps', {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ user, chirp })
    })
        .then(res => res.json())
        .then(data => {
            userInput.value = "";
            chirpInput.value = "";

            getChirps()
        })
}

getChirps();