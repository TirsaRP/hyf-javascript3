function main() {
    const HyfRepositoriesHttps = 'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';
    console.log('main!');
    var HyfContributorHttps = null;

    getRepositories(HyfRepositoriesHttps, xhrCallback);
    console.log(HyfContributorHttps);
}
var repositories = [];
var contributors = [];

// Callback that handles response from server (when i get the data)
function xhrCallback(data) {
    //console.log('data from server', data);
    repositories = JSON.parse(data);
    console.log('parsed repository data:', repositories);

    showRepositoriesInSelect(repositories);
}
function xhrCallbackContributors(data) {
    //console.log('data from server', data); THIS WORKS!!
    contributors = JSON.parse(data);
    console.log('parsed contributor data:', contributors);

    showContributors(contributors);
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

function showContributors(contributors) {
    // const repositoriesSelectElement = document.querySelector('#repositories');
    // repositoriesSelectElement.setAttribute('onchange', "showContributors(contributors)");

    contributors.forEach(contributor => {
        const list = document.getElementById("contributorList")
        const createListItem = document.createElement("li");
        const contributorListItems = list.appendChild(createListItem);
        contributorListItems.innerText = contributor.login;

        const listOfContributions = document.getElementById("numberOfContributions");
        const createContributionItem = document.createElement("li");
        const contributionItems = listOfContributions.appendChild(createContributionItem);
        contributionItems.innerText = contributor.contributions;

        console.log(contributor);
    })
}

function getSelectedRepository(repositoriesSelectElement) {
    const selectedRepository = repositories.filter(repository => {
        return repository.id == Number.parseInt(repositoriesSelectElement.value);
    })[0];
    console.log('Selected repository', selectedRepository);

    showAdditionalInfo(selectedRepository);

    //showContributors(contributors); //showContributorsInDIV

    getSelectedRepositoryContributors(selectedRepository);
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
    HyfContributorHttps = selectedRepository.contributors_url;
    console.log(HyfContributorHttps);
    getContributors(HyfContributorHttps, xhrCallbackContributors)
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

// Function that makes an server request (API call)
function getContributors(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
} 
