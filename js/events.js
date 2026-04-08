const API_KEY = "JYG3CHGX54ZZZ3GKSP";
let allEvents = [];

async function getEvents() {
    try {
        const response = await fetch(
            `https://www.eventbriteapi.com/v3/events/search/?q=college&location.address=Tulsa&token=${API_KEY}`
        );

        const data = await response.json();

        // Check if events exist
        if (!data.events) {
            console.log("No events found");
            return;
        }

        // Format the events for display
        allEvents = data.events.map(event => ({
            name: event.name.text,
            date: event.start.local,
            url: event.url
        }));

        displayEvents(allEvents);
    } catch (error) {
        console.error("Error fetching events:", error);
    }
}

// Function to display events on the page
function displayEvents(events) {
    const container = document.getElementById("events-container");
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

// Fetch events when page loads
getEvents();