const responseDiv = document.getElementById('response');
const queryInput = document.getElementById('queryInput');
const querySubmit = document.getElementById('query');

const xhttp = new XMLHttpRequest();

const endpoint = 'https://backend-eaf1.onrender.com/'
const make_route = 'make'
const add_route = 'add';
const get_route = 'patients/'
const params = '?request='
const get = "GET";
const post = "POST";
const select = "SELECT";
const insert = "INSERT";

function myFunc() {
  xhttp.open(post, endpoint + make_route, true);
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (xhttp.readyState === 4) {
      if (xhttp.status === 200) {
        const response = JSON.parse(xhttp.responseText);
        console.log(response);
      }
    }
  };
}

function getQuery() {
  const queryValue = queryInput.value;
  const words = queryValue.split(" ");
  if (words[0] === select) {
    xhttp.open(get, endpoint + get_route + params + queryValue, true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
      if (xhttp.readyState === 4) {
        if (xhttp.status === 200) {
          const response = JSON.parse(xhttp.responseText);
          console.log(response);
          responseDiv.innerText = JSON.stringify(response, null, 2);
        } else {
          responseDiv.innerText = 'Error: ' + xhttp.statusText;
        }
      }
    };
  } else if (words[0] === insert) {
    const data = {
      request: queryValue
    };
    xhttp.open(post, endpoint + add_route, true);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.send(JSON.stringify(data));
    xhttp.onreadystatechange = function () {
      if (xhttp.readyState === 4) {
        if (xhttp.status === 200) {
          const response = JSON.parse(xhttp.responseText);
          console.log(response);
          responseDiv.innerText = JSON.stringify(response, null, 2);
        } else {
          responseDiv.innerText = 'Error: ' + xhttp.statusText;
        }
      }
    };
  } else if (words.length > 0) {
    console.log("Not Query word", words.length)
  } else {
    console.log("No words Entered")
  }

}