'use strict';

/* global Util */

// eslint-disable-next-line no-unused-vars
class Contributor {
  constructor(data) {
    this.data = data;
  }

  /**
   * Render the contributor info to the DOM.
   * @param {HTMLElement} contributorList The parent element in which to render the contributor.
  */
  render(contributorList) {
    // Replace this comment with your code
    function getSelectedRepositoryContributors(selectedRepository) {
        openModal();
        var hyfContributorHttps = selectedRepository.contributors_url;
    
        fetch(hyfContributorHttps)
            .then((response) => response.json())
            .then(function (data) {
                contributors = data;
                createListItemForEachContributor(contributors)
                closeModal()
            })
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
            contributorListItems.innerHTML = `<img width="100px" src="${contributor.avatar_url}" alt="contributor image"> 
                                                <span class="name">Name: ${contributor.login}</span> 
                                                <span class="cont">Contributions: ${contributor.contributions}</span>`;
        })
    }
  }
}