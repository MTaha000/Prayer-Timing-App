let country = document.querySelector("#country")
let city = document.querySelector("#city")
let year = document.querySelector("#year")
let month = document.querySelector("#month")
let day = document.querySelector("#day")

let fajrTiming = document.querySelector(".fajr")
let dhuhrTiming = document.querySelector(".dhuhr")
let asrTiming = document.querySelector(".asr")
let maghribTiming = document.querySelector(".maghrib")
let ishaTiming = document.querySelector(".isha")

let displayCountry = document.querySelector(".displayCountry")
let displayCity = document.querySelector(".displayCity")
let date = document.querySelector(".date")
let islamicDate = document.querySelector(".islamicDate")

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

  // API Setup 
  if (validationCountry && validationCity && validationYear && validationMonth && validationDay) {
    fetch(`https://api.aladhan.com/v1/calendarByCity/${yearValue}/${monthValue}?city=${cityValue}&country=${countryValue}method=2`)
      .then((result) => {
        return result.json();
      }).then((data) => {
        // Display Prayer Timings
        fajrTiming.innerHTML = data.data[dayValue - 1].timings.Fajr
        dhuhrTiming.innerHTML = data.data[dayValue - 1].timings.Dhuhr
        asrTiming.innerHTML = data.data[dayValue - 1].timings.Asr
        maghribTiming.innerHTML = data.data[dayValue - 1].timings.Maghrib
        ishaTiming.innerHTML = data.data[dayValue - 1].timings.Isha

        // Display Date Country & City  
        displayCountry.innerHTML = countryValue.toUpperCase();
        displayCity.innerHTML = cityValue.toUpperCase();
        date.innerHTML = data.data[dayValue - 1].date.readable;
        islamicDate.innerHTML = data.data[dayValue - 1].date.hijri.date;
      })
  }
  // After Submit Form Clear
  country.value = "";
  city.value = "";
  year.value = "";
  month.value = "";
  day.value = "";
}

