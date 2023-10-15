const responseDiv = document.getElementById('response');
function myFunc(){
    const names = ['Sara Brown', 'John Smith', 'Elon Musk'];
    const dateOfBirths = ['1901-01-01', '1941-01-01', '1999-01-01'];

    names.forEach((name, index) => {
        console.log(name)
        const data = JSON.stringify({ name, dateOfBirth: dateOfBirths[index] });
        console.log(data);
        const xhttp = new XMLHttpRequest();
        xhttp.open('POST', 'http://localhost:3000/insert', true);
        xhttp.setRequestHeader('Content-Type', 'application/json');
        
        xhttp.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
              const response = JSON.parse(xhr.responseText);
              console.log(response);
            }
          };
          xhttp.send(data);
    });
};