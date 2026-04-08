const API_KEY = "JYG3CHGX54ZZZ3GKSP";
const container = document.getElementById("events-container");
const searchInput = document.getElementById("search");
const locationInput = document.getElementById("location"); 
const searchBtn = document.getElementById("searchBtn");

// FETCH EVENTS FROM EVENTBRITE
async function getEvents(query = "college", location = "Tulsa") {
    try {
        container.innerHTML = `<div class="text-center my-4">Loading events...</div>`;

        const response = await fetch(
            `https://www.eventbriteapi.com/v3/events/search/?q=${encodeURIComponent(query)}&location.address=${encodeURIComponent(location)}&expand=venue&token=${API_KEY}`
        );
        const data = await response.json();

        if (!data.events || data.events.length === 0) {
            container.innerHTML = `<p class="text-center">No events found near "${location}".</p>`;
            return;
        }

        const allEvents = data.events.map(event => ({
            name: event.name.text,
            date: new Date(event.start.local).toLocaleString(),
            url: event.url,
            venue: event.venue?.name || "No venue info"
        }));

        displayEvents(allEvents);

    } catch (error) {
        console.error("Error fetching events:", error);
        container.innerHTML = "<p class='text-center text-danger'>Unable to fetch events.</p>";
    }
}

// DISPLAY EVENTS
function displayEvents(events) {
    container.innerHTML = "";

    events.forEach(event => {
        container.innerHTML += `
            <div class="col-md-4 mb-3" role="listitem">
                <div class="card h-100 p-3">
                    <h5>${event.name}</h5>
                    <p><strong>Date:</strong> ${event.date}</p>
                    <p><strong>Venue:</strong> ${event.venue}</p>
                    <a href="${event.url}" target="_blank" class="btn btn-sm btn-primary" aria-label="More info about ${event.name}">More Info</a>
                    <button onclick="saveEvent('${event.name}')" class="btn btn-sm btn-success mt-2" aria-label="Save ${event.name} to favorites">Save</button>
                </div>
            </div>
        `;
    });
}

// SAVE FAVORITES TO LOCALSTORAGE
function saveEvent(eventName) {
    let saved = JSON.parse(localStorage.getItem("events")) || [];

    if (!saved.includes(eventName)) {
        saved.push(eventName);
    }

    localStorage.setItem("events", JSON.stringify(saved));
    alert(`Saved "${eventName}" to favorites!`);
}

// SEARCH BUTTON EVENT
searchBtn.addEventListener("click", (e) => {
    e.preventDefault(); // prevent page reload
    const query = searchInput.value.trim() || "college";
    const location = locationInput.value.trim() || "Tulsa";
    getEvents(query, location);
});

// INITIAL FETCH
getEvents();