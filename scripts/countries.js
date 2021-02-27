function getCountries() {
    const url = "https://api.covid19api.com/countries";
    fetch(url)
        .then(response => {
            return response.json();
        }).then(json => {
            let countries = new Array();
            for (let i = 0; i < json.length; i++) {
                countries.push(json[i].Country);
            }
            countries = countries.sort((a, b) => a.localeCompare(b));
            console.log(countries);
            for (let i = 0; i < countries.length; i++) {
                let add = "";
                let currentCountry = countries[i];
                if (i == 0) {
                    add += "<div class='container' id='" + currentCountry.charAt(0) + "'><h2>" + currentCountry.charAt(0) + "</h2>";
                }
                else {
                    let previousCountry = countries[i - 1];
                    if (previousCountry.charAt(0) != currentCountry.charAt(0)) {
                        add += "<div class='container' id='" + currentCountry.charAt(0) + "'><h2>" + currentCountry.charAt(0) + "</h2>";
                    }
                }
                add += "<p class='country'>" + currentCountry + "</p>";
                if (add.charAt(0) == '<') {
                    add += "</div>";
                }
                document.getElementById("countries").innerHTML += add;
            }
        }).catch(error => {
            console.log(error);
        })
}
