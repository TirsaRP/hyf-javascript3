function main() {
    const HyfRepositoriesHttps = 'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';

    //const HyfRepositoriesContributors = "https://developer.github.com/v3/repos/#list-contributors"
    const angularJSContributors0 = 'https://api.github.com/repos/HackYourFuture/AngularJS/contributors';
    const tdd_gameContributors1 = 'https://api.github.com/repos/HackYourFuture/tdd-game/contributors';
    const projectContributors2 = 'https://api.github.com/repos/HackYourFuture/Project/contributors';
    const html_CSSContributors3 = 'https://api.github.com/repos/HackYourFuture/HTML-CSS/contributors';
    const nodeContributors4 = 'https://api.github.com/repos/HackYourFuture/Node.js/contributors';
    const databasesContributors5 = 'https://api.github.com/repos/HackYourFuture/databases/contributors';
    const javaScript1Contributors6 = 'https://api.github.com/repos/HackYourFuture/JavaScript1/contributors';

    getRepositories(HyfRepositoriesHttps, xhrCallback);
    getContributors(angularJSContributors0, xhrCallback2);
    getContributors(tdd_gameContributors1, xhrCallback2);
    getContributors(projectContributors2, xhrCallback2);
    getContributors(html_CSSContributors3, xhrCallback2);
    getContributors(nodeContributors4, xhrCallback2);
    getContributors(databasesContributors5, xhrCallback2);
    getContributors(javaScript1Contributors6, xhrCallback2);
    
    console.log('main!');

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
function xhrCallback2(data) {
    //console.log('data from server', data); THIS WORKS!!
    contributors = JSON.parse(data);
    console.log('parsed contributor data:', contributors);

    //showContributors(contributors);
}

function showContributors(contributors) {
    const repositoriesSelectElement = document.querySelector('#repositories');
    repositoriesSelectElement.setAttribute('onchange', "showContributors(contributors)");

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

    showAdditionalInfo(selectedRepository);

    showContributors(contributors);
}

function showAdditionalInfo(selectedRepository) {
    const repoName = document.getElementById('repoName');
    repoName.innerText = "Repository: " + selectedRepository.name;
    const forks = document.getElementById('forks');
    forks.innerText = "Forks: " + selectedRepository.forks;
    const updated = document.getElementById('updated');
    updated.innerText = "Updated: " + selectedRepository.updated_at;
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
function getContributors(theUrl, callback2) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback2(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}