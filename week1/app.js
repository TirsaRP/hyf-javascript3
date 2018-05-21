function main() {
    const HyfRepositoriesHttps = 'https://api.github.com/orgs/HackYourFuture/repos';

    getRepositories(HyfRepositoriesHttps, xhrCallback);
    //createSelectElement();

    console.log('main!');

}
var repositories = [];

// Callback that handles response from server (when i get the data)
function xhrCallback(data) {
    //console.log('data from server', data);
    repositories = JSON.parse(data);
    console.log('parsed data:', repositories);

    showRepositoriesInSelect(repositories);
}

function showRepositoriesInSelect(repositories) {
    const repositoriesSelectElement = document.querySelector('#repositories');
    repositoriesSelectElement.setAttribute('onchange', "getSelectedRepository(this)");

    repositories.forEach(repository => {
        const optionElement = document.createElement('option');
        optionElement.setAttribute('value', repository.id);
        optionElement.innerText= repository.name;

        repositoriesSelectElement.appendChild(optionElement);
    });
}

function getSelectedRepository(repositoriesSelectElement){
        const selectedRepository = repositories.filter(repository => {
            return repository.id == Number.parseInt(repositoriesSelectElement.value);
        })[0];
        console.log('Selected repository', selectedRepository);
}

// Function that makes an server request (API call)
function getRepositories(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}



/*function createSelectorDiv(){
let selectorDiv= document.createElement("div");
selectorDiv.setAttribute("id","selectorBox");
document.getElementById("root").appendChild(selectorDiv)
}
createSelectorDiv();

function createRepoDescriptionDiv(){

}

function contributorListDiv(){

} */
