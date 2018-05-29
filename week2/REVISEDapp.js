function main() {
    fetch('https://api.github.com/orgs/HackYourFuture/repos?per_page=100')
        //.then(status())
        .then((response) => response.json())
        .then((repositories) => showRepositoriesInSelect(repositories))
        .catch((error) => console.log("Request failed", error));
}

var repositories = [];
var contributors = [];

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

    fetch(hyfContributorHttps)
        .then((response) => response.json())
        .then((contributors) => createListItemForEachContributor(contributors))
        .catch((error) => console.log("Contributor Request Failed", error))
}

function createListItemForEachContributor(contributors) {
    const list = document.getElementById("contributorList")

    while (list.hasChildNodes()) {
        list.removeChild(list.firstChild);
    }

    contributors.forEach(contributor => {

        const createListItem = document.createElement("li");
        const contributorListItems = list.appendChild(createListItem);
        contributorListItems.innerHTML = `<img width="100px" src="${contributor.avatar_url}"> 
                                            <span class="name">Name: ${contributor.login}</span> 
                                            <span class="cont">Contributions: ${contributor.contributions}</span>`;

        console.log(contributor);

    })
}



/*
// Function that makes an server request (API call) using Promise //  BUT IS IT STILL A HTTPREQUEST?
function getInfo(theUrl, callback) {
    return new Promise((resolve, reject)=> {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", theUrl, true);
        xmlHttp.onload = () => resolve(callback(xmlHttp.responseText));
        xmlHttp.onerror = () => reject(xmlHttp.statusText);
        xmlHttp.send();
    });
}
*/






/* ///////// another XMLHttp Request example ////////
var xmlHttp2= new XMLHttpRequest ();
xmlHttp2.onload= callback(XMLHttp2.responseText);
xmlHttp2.onerror=requestError;
xmlHttp2.open("get", theUrl);
xmlHttp2.send();
}

function requestError(err){
    alert("Fetch Error", err);
} */


/*    /////////// FETCH example ///////////////
function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
}

function json(response) {
  return response.json()
}

fetch('users.json')
  .then(status)
  .then(json)
  .then(function(data) {
    console.log('Request succeeded with JSON response', data);
  }).catch(function(error) {
    console.log('Request failed', error);
  }); */