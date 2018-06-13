'use strict';

/* global Util */

// eslint-disable-next-line no-unused-vars
class Repository {
  constructor(data) {
    this.data = data;
  }

  /**
   * Render the repository info to the DOM.
   * @param {HTMLElement} parent The parent element in which to render the repository.
   */
  render(parent) {
    //
    // Replace this comment with your code
    function getSelectedRepository(repositoriesSelectElement) {
        const selectedRepository = repositories.filter(repository => {
            return repository.id == Number.parseInt(repositoriesSelectElement.value);
        })[0];
        console.log('Selected repository', selectedRepository);
    
        Repository.showAdditionalInfo(selectedRepository);
    
        Contributor.getSelectedRepositoryContributors(selectedRepository); //nested it here instead of onchange 
    
        Contributor.createListItemForEachContributor(contributors);
    }
    function showAdditionalInfo(selectedRepository) {
        const repoName = document.getElementById('repoName');
        repoName.innerText = "Repository: " + selectedRepository.name;
        const forks = document.getElementById('forks');
        forks.innerText = "Forks: " + selectedRepository.forks;
        const updated = document.getElementById('updated');
        updated.innerText = "Updated: " + selectedRepository.updated_at;
    }
            ////// SIMON'S EXAMPLE.  Util.createAndAppend('div', parent, {html: 'hej'})
 
  }

  /**
   * Returns an array of contributors as a promise
   */
  fetchContributors() {
    return Util.fetchJSON(this.data.contributors_url);
  }

  /**
   * Returns the name of the repository
   */
  name() {
    return this.data.name;
  }
}