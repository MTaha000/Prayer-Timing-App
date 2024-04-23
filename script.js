let country = document.querySelector("#country");
let city = document.querySelector("#city");
let year = document.querySelector("#year");
let month = document.querySelector("#month");
let day = document.querySelector("#day");

let fajrTiming = document.querySelector(".fajr");
let dhuhrTiming = document.querySelector(".dhuhr");
let asrTiming = document.querySelector(".asr");
let maghribTiming = document.querySelector(".maghrib");
let ishaTiming = document.querySelector(".isha");

let displayCountry = document.querySelector(".displayCountry");
let displayCity = document.querySelector(".displayCity");
let date = document.querySelector(".date");
let islamicDate = document.querySelector(".islamicDate");
let displayError = document.querySelector(".error");

const dataSubmit = () => {
  let countryValue = country.value;
  let cityValue = city.value;
  let yearValue = year.value;
  let monthValue = month.value;
  let dayValue = day.value;

  // Form Validation 
  let validationCountry = false;
  let validationCity = false;
  let validationYear = false;
  let validationMonth = false;
  let validationDay = false;

  if (countryValue === "") {
    country.classList.add("validation")
  } else {
    country.classList.remove("validation")
    validationCountry = true;
  }
  if (cityValue === "") {
    city.classList.add("validation")
  } else {
    city.classList.remove("validation")
    validationCity = true;
  }
  if (yearValue === "") {
    year.classList.add("validation")
  } else {
    year.classList.remove("validation")
    validationYear = true;
  }
  if (monthValue === "") {
    month.classList.add("validation")
  } else {
    month.classList.remove("validation")
    validationMonth = true;
  }
  if (dayValue === "") {
    day.classList.add("validation")
  } else {
    day.classList.remove("validation")
    validationDay = true;
  }

  function convertTimeTo12HourFormat(apiTime) {
    // Split the time string into hours and minutes
    let onlyNumbers = apiTime.split(' ')
    let timeParts = onlyNumbers[0].split(':');
    let hours = parseInt(timeParts[0]);
    let minutes = parseInt(timeParts[1]);

    // Check if it's afternoon or morning
    let period = (hours >= 12) ? 'PM' : 'AM';

    // Convert hours to 12-hour format
    hours = (hours > 12) ? hours - 12 : hours;
    hours = (hours === 0) ? 12 : hours; // 0 should be 12 in 12-hour format

    // Add leading zero to minutes if needed
    minutes = (minutes < 10) ? '0' + minutes : minutes;

    // Construct the 12-hour format time string
    let time12Hour = hours + ':' + minutes + ' ' + period;

    return time12Hour;
  }

  // API Setup 
  if (validationCountry && validationCity && validationYear && validationMonth && validationDay) {
    fetch(`https://api.aladhan.com/v1/calendarByCity/${yearValue}/${monthValue}?city=${cityValue}&country=${countryValue}method=2`)
      .then((result) => {
        return result.json();
      }).then((data) => {
        // Display Prayer Timings
        if (data.code == 200) {
          let fajr = data.data[dayValue - 1].timings.Fajr
          let dhuhr = data.data[dayValue - 1].timings.Dhuhr
          let asr = data.data[dayValue - 1].timings.Asr
          let maghrib = data.data[dayValue - 1].timings.Maghrib
          let isha = data.data[dayValue - 1].timings.Isha
          fajrTiming.innerHTML = convertTimeTo12HourFormat(fajr)
          dhuhrTiming.innerHTML = convertTimeTo12HourFormat(dhuhr)
          asrTiming.innerHTML = convertTimeTo12HourFormat(asr)
          maghribTiming.innerHTML = convertTimeTo12HourFormat(maghrib)
          ishaTiming.innerHTML = convertTimeTo12HourFormat(isha)

          // Display Date Country & City  
          displayCountry.innerHTML = countryValue.toUpperCase();
          displayCity.innerHTML = cityValue.toUpperCase();
          date.innerHTML = data.data[dayValue - 1].date.readable;
          islamicDate.innerHTML = data.data[dayValue - 1].date.hijri.date;
          console.log(data);
        } else {
          displayError.classList.add("wrong-data")
        }
      })
  }
  // After Submit Form Clear
  if (validationCountry && validationCity && validationYear && validationMonth && validationDay) {
    country.value = "";
    city.value = "";
    year.value = "";
    month.value = "";
    day.value = "";
  }

}

