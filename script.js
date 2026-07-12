// Language State
let currentLang = localStorage.getItem('portfolio_lang') || 'en';

// I18n function
function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('portfolio_lang', lang);
    
    // Update button text
    const toggleBtn = document.getElementById('lang-toggle');
    if (toggleBtn) toggleBtn.innerText = lang === 'en' ? 'EN / pt' : 'en / PT';

    // Update all static i18n elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (typeof translations !== 'undefined' && translations[lang][key]) {
            el.innerText = translations[lang][key];
        }
    });

    // Update project dynamic data if on project page
    if (typeof updateProjectPageText === 'function') {
        updateProjectPageText();
    }
}

// Language Toggle Listener
document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('lang-toggle');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            setLanguage(currentLang === 'en' ? 'pt' : 'en');
            // If on home page, reload repos to translate default descriptions
            if (document.getElementById('repos-container') && typeof loadGithubRepos === 'function') {
                loadGithubRepos();
            }
        });
    }
    setLanguage(currentLang);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Offset for fixed navbar
                behavior: 'smooth'
            });
        }
    });
});

// Scroll Reveal Animations
const revealElements = document.querySelectorAll('.reveal');

const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Stop observing once revealed if you only want it to animate once
            // observer.unobserve(entry.target); 
        }
    });
};

const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

revealElements.forEach(el => {
    revealObserver.observe(el);
});

// Initial check for elements already in view on load
setTimeout(() => {
    revealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            el.classList.add('active');
        }
    });
}, 100);

// Fetch GitHub Repositories
function loadGithubRepos() {
    const reposContainer = document.getElementById('repos-container');
    if (reposContainer) {
        fetch('https://api.github.com/users/chspDEV/repos?sort=updated&per_page=6')
            .then(response => response.json())
            .then(repos => {
                reposContainer.innerHTML = ''; // clear loading text
                
                const myRepos = repos.filter(repo => !repo.fork).slice(0, 6);
                
                if (myRepos.length === 0) {
                    const noReposText = typeof translations !== 'undefined' ? (currentLang === 'en' ? 'No repositories found.' : 'Nenhum repositório encontrado no momento.') : 'No repos.';
                    reposContainer.innerHTML = `<p class="loading-text">${noReposText}</p>`;
                    return;
                }

                myRepos.forEach(repo => {
                    const card = document.createElement('a');
                    card.href = repo.html_url;
                    card.target = '_blank';
                    card.className = 'repo-card';
                    
                    const defaultDesc = typeof translations !== 'undefined' ? translations[currentLang]['github_desc_default'] : 'An interesting project.';
                    
                    card.innerHTML = `
                        <div class="repo-header">
                            <h3 class="repo-title"><i class='bx bx-book-bookmark'></i> ${repo.name}</h3>
                        </div>
                        <p class="repo-desc">${repo.description || defaultDesc}</p>
                        <div class="repo-footer">
                            ${repo.language ? `<span><i class='bx bx-code-alt'></i> ${repo.language}</span>` : ''}
                            <span><i class='bx bx-star'></i> ${repo.stargazers_count}</span>
                            <span><i class='bx bx-git-repo-forked'></i> ${repo.forks_count}</span>
                        </div>
                    `;
                    reposContainer.appendChild(card);
                });
            })
            .catch(err => {
                console.error('Error fetching repos:', err);
                const errorText = typeof translations !== 'undefined' ? translations[currentLang]['error_repos'] : 'Error loading.';
                reposContainer.innerHTML = `<p class="loading-text">${errorText}</p>`;
            });
    }
}

// Call on init
loadGithubRepos();

// Project Page Data Loader
const urlParams = new URLSearchParams(window.location.search);
const projectId = urlParams.get('id');
const projectContent = document.getElementById('project-content');
let activeProjectData = null;

function updateProjectPageText() {
    if (!activeProjectData) return;
    
    document.title = `${activeProjectData[`title_${currentLang}`] || activeProjectData.title_en} - Portfólio`;
    document.getElementById('proj-title').innerText = activeProjectData[`title_${currentLang}`];
    document.getElementById('proj-period').innerText = activeProjectData[`period_${currentLang}`];
    
    document.getElementById('proj-intro').innerText = activeProjectData[`intro_${currentLang}`];
    document.getElementById('proj-exp').innerText = activeProjectData[`experience_${currentLang}`];
    document.getElementById('proj-learn').innerText = activeProjectData[`learnings_${currentLang}`];
}

if (projectId && projectContent) {
    if (typeof projectsData !== 'undefined') {
        const project = projectsData[projectId];
        
        if (project) {
            activeProjectData = project;
            document.getElementById('loading-state').style.display = 'none';
            projectContent.style.display = 'block';
            
            document.getElementById('proj-image').src = project.image;
            document.getElementById('proj-image').alt = project.title_en;
            document.getElementById('proj-link').href = project.itch_link;
            
            updateProjectPageText();
        } else {
            document.getElementById('loading-state').style.display = 'none';
            document.getElementById('error-state').style.display = 'block';
        }
    } else {
        const errorLoadText = typeof translations !== 'undefined' ? translations[currentLang]['error_proj'] : 'Error loading project.';
        document.getElementById('loading-state').innerText = errorLoadText;
    }
}
