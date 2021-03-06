document.forms["search"].elements["searchBox"].focus();
document.getElementById("submit").addEventListener("click", event => {
    getCovidData();
    event.preventDefault();
});
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
async function getCountryData() {
    const url = "http://localhost:3000/proxy/countries";
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
    }).catch(error => console.log(error))
}

function getCovidData() {
    getCountryData().then(json => {
        let countryNames = new Array();
        for (let i = 0; i < json.length; i++) {
            countryNames.push(json[i].Country);
        }
        const value = document.getElementById("searchBox").value;
        if (value === "") return;
        let targetIndex = countryNames.findIndex(name => name === value);
        let targetSlug = json[targetIndex].Slug;
        const url = "http://localhost:3000/proxy/total/country/" + targetSlug;
        fetch(url)
            .then(response => {
                return response.json();
            }).then(json => {
                document.getElementById("covidData").innerHTML = "";
                let header = document.createElement("h2");
                header.classList.add("header");
                console.log(json);
                header.appendChild(document.createTextNode(json[0].Country));
                document.getElementById("covidData").appendChild(header);
                let totalCases = numberWithCommas(json[json.length - 1].Confirmed);
                let totalDeaths = numberWithCommas(json[json.length - 1].Deaths);
                let totalRecovered = numberWithCommas(json[json.length - 1].Recovered);
                let totalActive = numberWithCommas(json[json.length - 1].Active);
                let casesInWeek = numberWithCommas((json[json.length - 1].Confirmed - json[json.length - 8].Confirmed));
                let deathsInWeek = numberWithCommas((json[json.length - 1].Deaths - json[json.length - 8].Deaths));
                let textArray = new Array();
                textArray.push(document.createTextNode("Total cases: " + totalCases));
                textArray.push(document.createTextNode("Total deaths: " + totalDeaths));
                textArray.push(document.createTextNode("Total recovered: " + totalRecovered));
                textArray.push(document.createTextNode("Total active cases: " + totalActive));
                textArray.push(document.createTextNode("Cases this week: " + casesInWeek));
                textArray.push(document.createTextNode("Deaths this week: " + deathsInWeek));
                
                for (let i = 0; i < textArray.length; i++) {
                    let dataPoint = document.createElement("h4");
                    dataPoint.classList.add("dataPoint");
                    dataPoint.appendChild(textArray[i]);
                    document.getElementById("covidData").appendChild(dataPoint);
                }      
            }).catch(error => console.log(error));

    }).catch(error => console.log(error))
}

function getWorldData() {
    let url = "http://localhost:3000/proxy/summary";
    fetch(url)
        .then(response => {
            return response.json();
        }).then(json => {
            document.getElementById("covidData").innerHTML = "";
            let header = document.createElement("h2");
            header.classList.add("header");
            header.appendChild(document.createTextNode("World"));
            document.getElementById("covidData").appendChild(header);
            let globalData = json.Global;
            let totalCases = numberWithCommas(globalData.TotalConfirmed);
            let totalDeaths = numberWithCommas(globalData.TotalDeaths);
            let totalRecovered = numberWithCommas(globalData.TotalRecovered);
            let textArray = new Array();
            textArray.push(document.createTextNode("Total cases: " + totalCases));
            textArray.push(document.createTextNode("Total deaths: " + totalDeaths));
            textArray.push(document.createTextNode("Total recovered: " + totalRecovered));
            for (let i = 0; i < textArray.length; i++) {
                let dataPoint = document.createElement("h4");
                dataPoint.classList.add("dataPoint");
                dataPoint.appendChild(textArray[i]);
                document.getElementById("covidData").appendChild(dataPoint);
            }
        }).catch(error => console.log(error));
}
