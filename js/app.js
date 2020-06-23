const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links li');
const btnToggle = document.querySelector('#modeToggle i');
const submitBtn = document.querySelector('.form-btn');
const email = document.querySelector('.email input');
const name = document.querySelector('.name input');
const msg = document.querySelector('.message textarea');
const form = document.querySelector('.contact-form');

email.addEventListener('blur', validateEmail);
name.addEventListener('blur', validateName);
msg.addEventListener('blur', validateMessage);

// Get theme
window.addEventListener('load', () => {
  const theme = localStorage.getItem('theme');
  if (theme === 'light') {
    btnToggle.classList.add('fa-sun-o');
    btnToggle.style.padding = '4px 3.8px';
    btnToggle.classList.remove('fa-moon-o');
    document.querySelector('body').classList.add(theme);
  }
});

// Navbar
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  links.forEach(link => {
    link.classList.toggle('fade');
  });
  hamburger.classList.toggle('toggle');
});

// Get projects
(async () => {
  const header = document.querySelector('#projects .header');
  header.insertAdjacentHTML('afterend', await getProjects());
})();

// Light to Dark theme
btnToggle.addEventListener('click', () => {
  if (btnToggle.classList.contains('fa-moon-o')) {
    btnToggle.classList.add('fa-sun-o');
    btnToggle.style.padding = '4px 3.8px';
    btnToggle.classList.remove('fa-moon-o');
    localStorage.setItem('theme', 'light');
  } else {
    btnToggle.classList.add('fa-moon-o');
    btnToggle.classList.remove('fa-sun-o');
    btnToggle.style.padding = '4px 5px';
    localStorage.clear();
  }
  document.querySelector('body').classList.toggle('light');
});

// Change the title according to the link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    const regex = /\/#[\w+]+/;
    const title = link.href.match(regex)[0].slice(2);
    document.title = `${
      title[0].toUpperCase() + title.slice(1)
    } | Mokshit Jain`;
  });
});

// Validate the name field
function validateName() {
  if (name.value === '') {
    name.classList.add('invalid');
    submitBtn.disabled = true;
  } else {
    name.classList.remove('invalid');
    checkInput();
  }
}

// Validate the email field
function validateEmail() {
  const re = /^([A-Za-z0-9\_\-.]+)@([A-Za-z0-9]+)\.([a-z]{2,5})$/;

  if (!re.test(email.value)) {
    email.classList.add('invalid');
    submitBtn.disabled = true;
  } else {
    email.classList.remove('invalid');
    checkInput();
  }
}

// Validate the message field
function validateMessage() {
  if (msg.value === '') {
    msg.classList.add('invalid');
    submitBtn.disabled = true;
  } else {
    msg.classList.remove('invalid');
    checkInput();
  }
}

// Check if any input is empty
function checkInput() {
  const totalValues = [name.value, msg.value, email.value];

  const invalidInput = totalValues.some(value => value === '');

  if (invalidInput === true) {
    submitBtn.disabled = true;
  } else {
    submitBtn.disabled = false;
  }
}

// Form submit
form.addEventListener('submit', e => {
  e.preventDefault();
  const service_id = 'sendgrid';
  const template_id = 'template_pRfyRCPc';
  submitBtn.innerHTML = 'Sending...';
  emailjs.sendForm(service_id, template_id, form).then(
    () => {
      form.reset();
      submitBtn.innerHTML = 'Sent';
      setTimeout(() => {
        submitBtn.innerHTML = '<i class="fa fa-paper-plane"></i>&nbsp;Submit';
      }, 2000);
    },
    err => {
      form.reset();
      submitBtn.innerHTML = 'Error';
      submitBtn.classList.add('error');
      setTimeout(() => {
        submitBtn.innerHTML = '<i class="fa fa-paper-plane"></i>&nbsp;Submit';
        submitBtn.classList.remove('error');
      }, 2000);
      console.log(err);
    }
  );
});

// Get projects from json
async function getProjects() {
  const projectsJson = await fetch('projects.json');
  const projects = await projectsJson.json();
  let html = '';
  projects.forEach(project => {
    const { name, info, image, demoLink, githubLink, languages } = project;

    html += `
      <div class="project-cover">
        <div class="project">
          <div class="info-bg">
            <div class="project-info">
              <h2>${name}</h2>
              <p>${info}</p>
              <div class="project-links">
              ${
                demoLink
                  ? `<a href="https://${demoLink}.com" class="demo" target="_blank" rel="noopener noreferrer">Live
                  Demo</a>`
                  : ''
              }
                <a href="https://github.com/Mokshit06/${githubLink}" target="_blank" class="github" rel="noopener noreferrer"><i
                    class="fa fa-github"></i></a>
              </div>
            </div>
          </div>
          <div class="img-container">
            <div class="img" style="background-image: url('../assets/images/${image}.webp')"></div>
            <div class="languages">
              ${languages
                .map(language => `<i class="${language}"></i>`)
                .join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  });

  return html;
}
