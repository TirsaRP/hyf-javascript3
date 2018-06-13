'use strict';

/* global Util, Repository, Contributor */
const HYF_REPOS_URL = 'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';

let repositories = [];
let contributors = [];

class App {
    constructor(url) {
        this.initialize(url);
    }

    /**
     * Initialization
     * @param {string} url The GitHub URL for obtaining the organization's repositories.
     */
    async initialize(url) {
        try {
            const repositories = await Util.fetchJSON(url);  //repos= JSON object?
            this.repositories = repositories.map(repo => new Repository(repo));     // this.repos = repo array?

            this.render(repositories);   // I CHANGED this.repositories.render() to this.render()

        } catch (error) {
            this.renderError(error);
        }
    }
    // Add code here to initialize your app
    // 1. Create the fixed HTML elements of your page
    // 2. Make an initial XMLHttpRequest using Util.fetchJSON() to populate your <select> element

    //const root = document.getElementById('root');  


    //MY CODE HERE....

    render() {
        const repositoriesSelectElement = document.querySelector('#repositories');
        repositoriesSelectElement.addEventListener('change', event => this.getSelectedRepository(event))
        repositories.forEach(repository => {
            const optionElement = document.createElement('option');
            optionElement.setAttribute('value', repository.id);
            optionElement.innerText = repository.name;

            repositoriesSelectElement.appendChild(optionElement);
        });
        if (this.selectedRepository) {
            this.selectedRepository.render(document.querySelector('.repo'))
        }
    }
    getSelectedRepository(event) {
        const repositoriesSelectElement = event.target;
        const selectedRepository = repositories.filter(repository => {
            return repository.id == Number.parseInt(repositoriesSelectElement.value);
        })[0];
        console.log('Selected repository', selectedRepository);

        const displayRepository = new Repository(selectedRepository);
        displayRepository.showAdditionalInfo(selectedRepository);

        this.getSelectedRepositoryContributors(selectedRepository); //nested it here instead of onchange 

        //this.createListItemForEachContributor(contributors);
    }

    getSelectedRepositoryContributors(selectedRepository) {
        openModal();
        let hyfContributorHttps = selectedRepository.contributors_url;

        try {
            contributors = await Util.fetchJSON(hyfContributorHttps);  //repos= JSON object?
            this.contributors = contributors.map(contributor => new Contributor(contributor));     // this.repos = repo array?

            this.render(contributors);   // I CHANGED this.repositories.render() to this.render()
            createListItemForEachContributor(contributors)
            closeModal()
        } catch (error) {
            this.renderError(error);
        }
    }

    /**
     * Render an error to the DOM.
     * @param {Error} error An Error object describing the error.
     */
    renderError(error) {
        // Replace this comment with your code
        if (error) {
            console.log(error.message)
        }
    }


function createAndAppend(name, parent, options = {}) {          //MOVED FROM INDEX.JS
    const elem = document.createElement(name);
    parent.appendChild(elem);
    Object.keys(options).forEach((key) => {
        const value = options[key];
        if (key === 'html') {
            elem.innerHTML = value;
        } else {
            elem.setAttribute(key, value);
        }
    });
    return elem;
}

function fetchJSON(url, cb) {       //MOVED HERE FROM INDEX.JS
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.onload = () => {
        if (xhr.status < 400) {
            cb(null, xhr.response);
        } else {
            cb(new Error(`Network error: ${xhr.status} - ${xhr.statusText}`));
        }
    };
    xhr.onerror = () => cb(new Error('Network request failed'));
    xhr.send();
}

function main(url) {          //MOVED HERE FROM INDEX.JS
    fetchJSON(url, (err, data) => {
        const root = document.getElementById('root');
        if (err) {
            createAndAppend('div', root, { html: err.message, class: 'alert-error' });
        } else {
            createAndAppend('pre', root, { html: JSON.stringify(data, null, 2) });
        }
    });
}

function openModal() {
    document.getElementById('modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

window.onload = () => new App(HYF_REPOS_URL); //main(HYF_REPOS_URL); 

