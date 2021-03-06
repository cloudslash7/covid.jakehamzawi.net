function getCountries() {
    const url = "http://localhost:3000/proxy/countries";
    fetch(url)
        .then(response => {
            return response.json();
        }).then(json => {
            let countries = new Array();
            for (let i = 0; i < json.length; i++) {
                countries.push(json[i].Country);
            }
            countries = countries.sort((a, b) => a.localeCompare(b));
            for (let i = 0; i < countries.length; i++) {
                let add = "";
                let currentCountry = countries[i];
                if (i == 0) {
                    let div;
                    div = document.createElement("div");
                    div.classList.add("letter");
                    div.setAttribute("id", currentCountry.charAt(0))
                    document.getElementById("countries").appendChild(div);
                    let header = document.createElement("h2");
                    let countryName = document.createTextNode(currentCountry.charAt(0));
                    header.appendChild(countryName);
                    div.appendChild(header);
                    document.getElementById("countries").appendChild(div);
                }
                else {
                    let previousCountry = countries[i - 1];
                    if (previousCountry.charAt(0) != currentCountry.charAt(0)) {
                        let div;
                        div = document.createElement("div");
                        div.classList.add("letter");
                        div.setAttribute("id", currentCountry.charAt(0))
                        document.getElementById("countries").appendChild(div);
                        let header = document.createElement("h2");
                        let countryName = document.createTextNode(currentCountry.charAt(0));
                        header.appendChild(countryName);
                        div.appendChild(header);
                        document.getElementById("countries").appendChild(div);
                    }
                }
                let para = document.createElement("p");
                let countryName = document.createTextNode(currentCountry);
                para.appendChild(countryName);
                para.classList.add("country");
                console.log(countryName);
                document.getElementById(currentCountry.charAt(0)).appendChild(para);
            }
        }).catch(error => {
            console.log(error);
        })
}
