const container = document.getElementById("events-container");

function displayEvents(events) {
    container.innerHTML = "";

    events.forEach(event => {
        container.innerHTML += `
            <div class="col-md-4">
                <div class="card p-3">
                    <h5>${event.name}</h5>
                    <p>${event.date}</p>
                </div>
            </div>
        `;
    });
}