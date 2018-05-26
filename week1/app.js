function main() {
    const HyfRepositoriesHttps = 'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';
    
    getInfo(HyfRepositoriesHttps, xhrCallback); 
}

var repositories = [];
var contributors = [];

// Callback that handles response from server (when i get the data, parse it)
function xhrCallback(data) {
    repositories = JSON.parse(data);
    console.log('parsed repository data:', repositories);

    showRepositoriesInSelect(repositories);
}

function xhrCallbackContributors(data) {
    contributors = JSON.parse(data);
    console.log('parsed contributor data:', contributors);

    createListItemForEachContributor(contributors);
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

function createListItemForEachContributor(contributors) {
    const list = document.getElementById("contributorList")
    
    while( list.hasChildNodes()){
        list.removeChild(list.firstChild);
    }

    contributors.forEach(contributor => {
    
        const createListItem = document.createElement("li");
        const contributorListItems = list.appendChild(createListItem);
        contributorListItems.innerHTML = `<img width="100px" src="${contributor.avatar_url}"> 
                                            <span class="name">Name: ${contributor.login}</span> 
                                            <span class="cont">Contributions: ${contributor.contributions}</span>`;

        console.log(contributor);

        //create function to replace each list item with every selected repository
    })
}

function getSelectedRepository(repositoriesSelectElement) {
    const selectedRepository = repositories.filter(repository => {
        return repository.id == Number.parseInt(repositoriesSelectElement.value);
    })[0];
    console.log('Selected repository', selectedRepository);

    showAdditionalInfo(selectedRepository);

    getSelectedRepositoryContributors(selectedRepository); //nested it here instead of onchange 

    createListItemForEachContributor(contributors);
}

function showAdditionalInfo(selectedRepository) {
    const repoName = document.getElementById('repoName');
    repoName.innerText = "Repository: " + selectedRepository.name;
    const forks = document.getElementById('forks');
    forks.innerText = "Forks: " + selectedRepository.forks;
    const updated = document.getElementById('updated');
    updated.innerText = "Updated: " + selectedRepository.updated_at;
}

function getSelectedRepositoryContributors(selectedRepository) {
    var hyfContributorHttps = selectedRepository.contributors_url;          //WHERE THE MAGIC HAPPENS!
    console.log(hyfContributorHttps);
    getInfo(hyfContributorHttps, xhrCallbackContributors)
}

// Function that makes an server request (API call)
function getInfo(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}