window.onload = function() {
    fetch("http://localhost:5000/7.json", { method: "GET" })
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        document.getElementById("json").innerHTML = JSON.stringify(data);
    });

    fetch("http://localhost:5000/7.xml", { method: "GET" })
    .then((response) => {
        return response.text();
    })
    .then((data) => {
        document.getElementById("xml").innerHTML = data;
        console.log('xml fetched');
    });
}