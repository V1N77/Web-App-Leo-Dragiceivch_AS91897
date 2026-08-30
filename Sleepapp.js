    // Function used to save sleep data to local storage
    function SaveSleep() {
        // Gets the values from the input boxes
        const date = document.getElementById("SleepDate").value;
        const start = document.getElementById("SleepStart").value;
        const end = document.getElementById("SleepEnd").value;

        // Asks User to fill in all boxes if they are empty
        if (!date || !start || !end) {
            alert("Please enter the date and both sleep times.");
            return;
        }

        // Used to load previous locally saved data when reopened
        let SleepHistory = JSON.parse(localStorage.getItem("SleepHistory")) || [];

        // Bundles previous information into a single object called "SleepEntry" to be saved 
        const SleepEntry = {
            date: date,
            start: start,
            end: end
        };

        // Adds the new record at the top of the Sleep History list
        SleepHistory.unshift(SleepEntry);

        // Saves the updated history to local storage
        localStorage.setItem("SleepHistory", JSON.stringify(SleepHistory));

        alert("Sleep record saved.");

        // Clears the input boxes after saving the data to local storage
        document.getElementById("SleepDate").value = "";
        document.getElementById("SleepStart").value = "";
        document.getElementById("SleepEnd").value = "";
    }

    // Function to display sleep history on the History page in an organised table format
    function DisplaySleepHistory() {
        // Searches HTML file for elemnt with the ID "SleepHistory" to display the sleep history
        const HistoryContainer = document.getElementById("SleepHistory");

        // If can't find the element with the ID "SleepHistory", exit the function
        if (!HistoryContainer) {
            return;
        }

        // Get saved history from the local storage from previous inputs if none exist, create an empty array
        const SleepHistory = JSON.parse(localStorage.getItem("SleepHistory")) || [];

        // Clears the page otherwise the sleep history will be displayed multiple times when the page is refreshed
        HistoryContainer.innerHTML = "";

        // If the user hasn't saved any sleep records yet, display a message             
        if (SleepHistory.length === 0) {
            HistoryContainer.innerHTML = "<p>No sleep records yet.</p>";
            return;
        }

        // Create a row for every sleep record
    SleepHistory.forEach(function(entry, index) {

        // Convert the start and end times into minutes
        const StartParts = entry.start.split(":");
        const EndParts = entry.end.split(":");
        const StartMinutes =
            Number(StartParts[0]) * 60 + Number(StartParts[1]);
        const EndMinutes =
            Number(EndParts[0]) * 60 + Number(EndParts[1]);

        // Calculate the duration
        let DurationMinutes = EndMinutes - StartMinutes;

        // If the end time is earlier than the start time,
        // the sleep continued into the next day
        if (DurationMinutes < 0) {
            DurationMinutes += 24 * 60;
        }

        // Convert total minutes into hours and minutes
        const Hours = Math.floor(DurationMinutes / 60);
        const Minutes = DurationMinutes % 60;

        // Create a new row
        const row = document.createElement("div");
        row.classList.add("sleep-row");

        row.innerHTML = `
            <span>${entry.date}</span>
            <span>${entry.start} - ${entry.end}</span>
            <span>${Hours} hours ${Minutes} minutes</span>
            <button class="delete-button" onclick="DeleteSleep(${index})">
                Delete
            </button>
        `;

        HistoryContainer.appendChild(row);
    });
}

// Function used to save personal information to local storage
function SavePersonalInformation() {

    // Gets the values selected by the user
    const Age = document.getElementById("Age").value;
    const Employment = document.getElementById("Employment").value;
    const Schedule = document.getElementById("Schedule").value;
    const Activity = document.getElementById("Activity").value;
    const SchoolWork = document.getElementById("SchoolWork").value;
    const SleepEnvironment = document.getElementById("SleepEnvironment").value;
    const SleepQuality = document.getElementById("SleepQuality").value;

    // Creates an object containing the personal information
    const PersonalInformation = {
        age: Age,
        employment: Employment,
        schedule: Schedule,
        activity: Activity,
        schoolWork: SchoolWork,
        sleepEnvironment: SleepEnvironment,
        sleepQuality: SleepQuality
    };

    // Saves the information to local storage
    localStorage.setItem(
        "PersonalInformation",
        JSON.stringify(PersonalInformation)
    );

    // Lets the user know the information has been saved
    alert("Personalised information saved.");
}

//Tells the function to display the sleep history when the page loads
DisplaySleepHistory();

