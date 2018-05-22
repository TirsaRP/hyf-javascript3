function main() {
    const HyfRepositoriesHttps = 'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';

    const HyfRepositoriesContributors = "https://developer.github.com/v3/repos/#list-contributors"

    getRepositories(HyfRepositoriesHttps, xhrCallback);


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
        optionElement.innerText = repository.name;

        repositoriesSelectElement.appendChild(optionElement);
    });
}

function getSelectedRepository(repositoriesSelectElement) {
    const selectedRepository = repositories.filter(repository => {
        return repository.id == Number.parseInt(repositoriesSelectElement.value);
    })[0];
    console.log('Selected repository', selectedRepository);

    const repoName = document.getElementById('repoName');
    repoName.innerText = "Repository: " + selectedRepository.name;
    const forks = document.getElementById('forks');
    forks.innerText = "Forks: " + selectedRepository.forks;
    const updated = document.getElementById('updated');
    updated.innerText = "Updated: " + selectedRepository.updated_at;

    //forEach(contributor_url, listItem){
    const list = document.getElementById("contributorList")
    const createListItem = document.createElement("li");
    const contributorListItems = list.appendChild(createListItem);
    contributorListItems.innerText = selectedRepository.contributors_url
    //}
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