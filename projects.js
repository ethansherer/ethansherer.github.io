async function getAllRepos() {
    const token = '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'
    const response = await fetch('https://api.github.com/user/repos?per_page=100', {
      headers: {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github.v3+json'
      }
    });
  
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
  
    const repos = await response.json();
    console.log(repos)

    const repoData = repos.map(repo => ({
        name: repo.name,
        private: repo.private,
        html_url: repo.html_url,
        description: repo.description || 'No description provided',
        updated_at: repo.updated_at,
        homepage: repo.homepage || 'None'
      }));

      repoData.forEach(function(repo){
        const myDiv = document.getElementById("repositories")
        const newSection = document.createElement('section')
        const newAnchor = document.createElement('a')
        const newParagraph = document.createElement('p')
        const newParagraph1 = document.createElement('p')

        if (repo.homepage === 'None') {
            newAnchor.href = `${repo.html_url}`;
        } else {
            newAnchor.href = `${repo.homepage}`
        }
        newAnchor.target = '_blank';
        newAnchor.innerHTML = `<h2>${repo.name}</h2>`;
        newSection.appendChild(newAnchor)

        newParagraph.textContent = `${repo.description}`
        newSection.appendChild(newParagraph)

        const dateString = Date(repo.updated_at)
        newParagraph1.textContent = `Last Updated: ${dateString}`
        newSection.appendChild(newParagraph1)

        newSection.classList.add('section');
        myDiv.appendChild(newSection)

      })
    }

getAllRepos().catch(console.error)
