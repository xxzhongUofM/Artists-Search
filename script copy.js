"Access-Control-Allow-Origin: *"
fetch("./testing.json")
  .then(response => response.json())
  .then(json => console.log(json));