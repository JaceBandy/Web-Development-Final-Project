const API_KEY = "JYG3CHGX54ZZZ3GKSP";
const container = document.getElementById("events-container");
const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("searchBtn");

// Fetch events from Eventbrite based on query
async function getEvents(query = "college") {
    try {
        const response = await fetch(
            `https://www.eventbriteapi.com/v3/events/search/?q=${encodeURIComponent(query)}&location.address=Tulsa&token=${API_KEY}`
        );
        const data = await response.json();

        if (!data.events || data.events.length === 0) {
            container.innerHTML = "<p>No events found.</p>";
            return;
        }

        const allEvents = data.events.map(event => ({
            name: event.name.text,
            date: event.start.local,
            url: event.url
        }));

        displayEvents(allEvents);
    } catch (error) {
        console.error("Error fetching events:", error);
        container.innerHTML = "<p>Unable to fetch events.</p>";
    }
}

// Display events
function displayEvents(events) {
    container.innerHTML = "";

    events.forEach(event => {
        container.innerHTML += `
            <div class="col-md-4 mb-3">
                <div class="card p-3">
                    <h5>${event.name}</h5>
                    <p>${event.date}</p>
                    <a href="${event.url}" target="_blank" class="btn btn-sm btn-primary">More Info</a>
                    <button onclick="saveEvent('${event.name}')" class="btn btn-sm btn-success mt-2">Save</button>
                </div>
            </div>
        `;
    });
}

// Search button click
searchBtn.addEventListener("click", (e) => {
    e.preventDefault(); // prevent form submit/reload
    const query = searchInput.value.trim();
    if (query !== "") {
        getEvents(query);
    }
});

// Initial fetch on page load
getEvents();