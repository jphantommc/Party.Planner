const COHORT = "2502-FTB-ET-WEB-PT";
 
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/events`;


 const state = {
    parties: [],
 };
    const partiesList = document.querySelector("#partylsit");
    const partyForm = document.querySelector("#partyForm");
    partyForm.addEventListener("submit", addParty);
    partyForm.addEventListener("click", deleteParty);

    async function getParties() {
        try {
            const response = await fetch(API_URL);
            const result = await response.json();
            state.parties = result.data;
        } catch (error) {
            console.error(error);
        }
    }

    async function render() {
        await getParties();
        rendergetParties();
    }
    render();

    async function addParty(event) {
        event.preventDefault();

        const name = document.querySelector("#name").value;
        const date = new Date(document.querySelector("#date").value);
        const location = document.querySelector("#location").value;
        const description = document.querySelector("#description").value;

        const newParty = {
            name,
            date: 
            location,
            description,
        };

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newParty),
            });
            const result = await response.json();
            state.parties.push(result.data);
            renderParties();
        } catch (error) {
            console.error(error);
        }
    }

                    async function deleteParty(event) {
                        if (event.target.classList.contains("delete-button")) {
                            const partyId = event.target.dataset.id;
                            console.log(partyId);
                            try {
                                await fetch(`${API_URL}/${partyId}`, {
                                    method: "DELETE",
                                });
                                state.parties = state.parties.filter(
                                    (party) => party.id !== partyId
                                );
                                renderParties();
                            } catch (error) {
                                console.error(error);
                            }
                        }
                    }
    function renderParyList() {
        state.parties.foreach ((party) => {
            renderParty(party);
        });
    }

    function renderParty(party) {
        const li = document.createElement("li");
        li.innerHTML =  `
        <strong>${party.name}</strong><br>
        Date: ${party.date}<br>
        Location: ${party.location} <br>
        Description: ${party.description} <br>
        <button class="delete-button" data-id="${party.id}">Delete</button>
        `;
        partiesList.appendChild(li);
    }