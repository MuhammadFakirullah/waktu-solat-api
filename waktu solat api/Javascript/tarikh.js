function getCurrentDate() {
  const currentDate = new Date();
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  return currentDate.toLocaleDateString('ms-MY', options);
}

function getHijriDate() {
  const currentDate = new Date();
  const hijriFormatter = new Intl.DateTimeFormat('ms-MY-u-ca-islamic', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  return hijriFormatter.format(currentDate);
}

function displayDates() {
  const currentDateContainer = document.getElementById('current-date-container');
  const hijriDateContainer = document.getElementById('hijri-date-container');

  const currentDateElement = document.createElement('p');
  currentDateElement.textContent = `${getCurrentDate()}`;
  currentDateContainer.appendChild(currentDateElement);

  const hijriDateElement = document.createElement('p');
  hijriDateElement.textContent = `, ${getHijriDate()}`;
  hijriDateContainer.appendChild(hijriDateElement);
}

displayDates();