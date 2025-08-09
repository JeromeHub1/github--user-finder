//DOM Elements
const inputUser = document.getElementById('inputUser');
const searchBtn = document.getElementById('searchBtn');

//Display DOM Elements
const userDisplay = document.getElementById('display');
const nameE1 = document.getElementById('name');
const bioE1 = document.getElementById('bio');
const reposE1 = document.getElementById('repos');
const followersE1 = document.getElementById('followers');
const followingE1 = document.getElementById('following');

const errorMsg = document.getElementById('errorMsg');
const loader = document.getElementById('loader');
const themeToggle = document.getElementById('themeToggle');

//theme toggle
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  if (document.body.classList.contains('dark')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
});

window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }
});

searchBtn.addEventListener('click', async () => {
  const username = inputUser.value.trim();
  if (!username) {
    errorMsg.textContent = 'Please enter a username!';
    errorMsg.style.color = 'crimson';
    return;
  }
  
  try {
    loader.textContent = '⏳';
    const res = await fetch(`https://api.github.com/users/${username}`);
    if (!res.ok) throw new Error('User not found');
    const data = await res.json();
    const { avatar_url, name, bio, public_repos, followers, following, login } = data;

    userDisplay.innerHTML = `
      <img class="avatar" src="${avatar_url}" alt="${login}">
      <h2 class="user-name">${name || login}</h2>
      <p class="bio">Bio: ${bio || 'No bio available'}</p>
      <p class="repos">Public repos: ${public_repos}</p>
      <p class="followers">Followers: ${followers}</p>
      <p class="following">Following: ${following}</p> 
    `;
  } catch (error) {
    userDisplay.style.display = 'none';
    loader.textContent = '';
    errorMsg.textContent = error.message;
  } finally {
    loader.style.display = 'none';
  }
});