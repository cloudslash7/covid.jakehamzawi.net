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
            $( "#searchBox").autocomplete({
                source: countries,
                minLength: 2,
                delay: 500
            });
        }).catch(error => {
            console.log(error);
        })
}