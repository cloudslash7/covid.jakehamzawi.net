document.forms["search"].elements["searchBox"].focus();
async function getCountryData() {
    const url = "https://api.covid19api.com/countries";
    return fetch(url)
        .then(response => {
            return response.json();
        }).catch(error => {
            console.log(error);
            return error;
        })
}

async function getCountryNames() {
    getCountryData().then(response => {
        let countryNames = new Array();
        for (let i = 0; i < response.length; i++) {
            countryNames.push(response[i].Country);
        }
        $( "#searchBox").autocomplete({
            source: countryNames,
            minLength: 2,
            delay: 500
        })
        return countryNames;
    })
    .catch(error => console.log(error))
}


function getData() {
    getCountryNames().then(response => {
        document.getElementById("submit").addEventListener("click", event => {
            console.log("test")
            event.preventDefault();
            const value = document.getElementById("searchBox").value;
            if (value === "") return;
            console.log(response);
            console.log(countries.find(item => item.Country === "Ukraine"));
            const url = "https://https://api.covid19api.com/country/south-africa/status/confirmed?from=2020-03-01T00:00:00Z&to=2020-04-01T00:00:00Z";
        })
    })
    .catch(error => console.log(error))
}
