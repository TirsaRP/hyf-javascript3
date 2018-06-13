'use strict';

/* global Util, Repository, Contributor */

class App {
    constructor(url) {
        this.initialize(url);
    }

    /**
     * Initialization
     * @param {string} url The GitHub URL for obtaining the organization's repositories.
     */
    async initialize(url) {

        // Add code here to initialize your app
        // 1. Create the fixed HTML elements of your page
        // 2. Make an initial XMLHttpRequest using Util.fetchJSON() to populate your <select> element

        const header  = document.getElementById('header');  //root=> header 


        //MY CODE HERE....
        var repositories = [];
        var contributors = [];

        function showRepositoriesInSelect(repositories) {
            const repositoriesSelectElement = document.querySelector('#repositories');
            repositoriesSelectElement.setAttribute('onchange', "getSelectedRepository(this)", true);    //{passive: true} violation in console.log

            repositories.forEach(repository => {
                const optionElement = document.createElement('option');
                optionElement.setAttribute('value', repository.id);
                optionElement.innerText = repository.name;

                repositoriesSelectElement.appendChild(optionElement);
                //header.appendChild(repositoriesSelectElement)
            });
        }       //  ...TO HERE

        try {
            // ...
            Util.fetchJSON(url)    // I ADDED 

            const repos = await Util.fetchJSON(url);  //repos= object
            this.repos = repos.map(repo => new Repository(repo));     // this.repos = array 

            this.repos[0].render(header);   // I ADDED 
            // ...
        } catch (error) {
            this.renderError(error);
        }
    }

    /**
     * Fetch contributor information for the selected repository and render the
     * repo and its contributors as HTML elements in the DOM.
     * @param {number} index The array index of the repository.
     */
    async fetchContributorsAndRender(index) {
        try {
            const repo = this.repos[index];
            const contributors = await repo.fetchContributors();

            const container = document.getElementById('container');
            // Erase previously generated inner HTML from the container div
            container.innerHTML = '';

            const leftDiv = Util.createAndAppend('div', container);
            const rightDiv = Util.createAndAppend('div', container);

            const contributorList = Util.createAndAppend('ul', rightDiv);

            repo.render(leftDiv);

            contributors
                .map(contributor => new Contributor(contributor))
                .forEach(contributor => contributor.render(contributorList));
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

const HYF_REPOS_URL = 'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';

window.onload = () => new App(HYF_REPOS_URL); //main(HYF_REPOS_URL); 
