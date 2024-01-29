function fetchPrayerTimes() {
    const apiUrl1 = 'https://api.aladhan.com/v1/hijriCalendar/1437/4?latitude=3.2647&longitude=102.4459&method=2';
    const apiUrl2 = 'https://api.aladhan.com/v1/hijriCalendar/1437/4?latitude=4.4721&longitude=101.3801&method=2';
    const apiUrl3 = 'https://api.aladhan.com/v1/hijriCalendar/1437/4?latitude=3.3411&longitude=101.8399&method=2';
    const apiUrl4 = 'https://api.aladhan.com/v1/hijriCalendar/1437/4?latitude=3.9374&longitude=102.3620&method=2';
    const apiUrl5 = 'https://api.aladhan.com/v1/hijriCalendar/1437/4?latitude=3.8168&longitude=103.3317&method=2';
  
    // Use Promise.all() to fetch data from all APIs simultaneously
    Promise.all([
        fetch(apiUrl1),
        fetch(apiUrl2),
        fetch(apiUrl3),
        fetch(apiUrl4),
        fetch(apiUrl5),
    ])
    .then((responses) => {
        // Check if all responses are successful
        const allResponsesOk = responses.every((response) => response.ok);
  
        if (!allResponsesOk) {
            throw new Error('One or more network responses were not ok');
        }
  
        // Parse the response data as JSON
        const promises = responses.map((response) => response.json());
  
        // Resolve all promises in the array and continue processing the data
        return Promise.all(promises);
    })
    .then((dataArray) => {
        // dataArray contains the parsed JSON data from all APIs
        const data1 = dataArray[0];
        const data2 = dataArray[1];
        const data3 = dataArray[2];
        const data4 = dataArray[3];
        const data5 = dataArray[4];
  
        // Process the data and display prayer times for each location
        displayPrayerTimes(data1, 'prayer-times-container1');
        displayPrayerTimes(data2, 'prayer-times-container2');
        displayPrayerTimes(data3, 'prayer-times-container3');
        displayPrayerTimes(data4, 'prayer-times-container4');
        displayPrayerTimes(data5, 'prayer-times-container5');
    })
    .catch((error) => {
        console.error('Error fetching prayer times:', error);
    });
  }
  
  function displayPrayerTimes(data, containerId) {
    const prayerTimesContainer = document.getElementById(containerId);
    prayerTimesContainer.innerHTML = ''; // Clear previous data
  
    // Check if the 'data' object and 'data' array are defined
    if (data && data.data && Array.isArray(data.data)) {
        const prayerTimes = data.data[0].timings;
  
        // Prayer names and corresponding API keys
        const prayers = [
            { name: 'Subuh', key: 'Fajr' },
            { name: 'Zohor', key: 'Dhuhr' },
            { name: 'Asar', key: 'Asr' },
            { name: 'Maghrib', key: 'Maghrib' },
            { name: 'Isya\'', key: 'Isha' },
        ];
  
        // Create an HTML table to display the prayer times
        let prayerTimesTable = '<table><tr>';
  
        // Add prayer names in the first row (header row)
        prayers.forEach((prayer) => {
            prayerTimesTable += `<th>${prayer.name}</th>`;
        });
  
        prayerTimesTable += '</tr><tr>';
  
        // Add prayer times in the second row
        prayers.forEach((prayer) => {
            const time = prayerTimes[prayer.key].split(' ');
            const prayerTime = time[0]; // Extract only the time part
            prayerTimesTable += `<td>${prayerTime}</td>`;
        });
  
        prayerTimesTable += '</tr></table>';
  
        // Append the table to the container
        prayerTimesContainer.innerHTML = prayerTimesTable;
    } else {
        // Handle the case when 'data' or 'data' is undefined or not an array
        prayerTimesContainer.textContent = 'Prayer times data not available or in an unexpected format.';
    }
  }
  
  // Call fetchPrayerTimes() immediately when the page loads
  fetchPrayerTimes();