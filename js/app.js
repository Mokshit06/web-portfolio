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

window.addEventListener('load', () => {
  const theme = localStorage.getItem('theme');
  if (theme === 'light') {
    btnToggle.classList.add('fa-sun-o');
    btnToggle.style.padding = '4px 3.8px';
    btnToggle.classList.remove('fa-moon-o');
    document.querySelector('body').classList.add(theme);
  }
});

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  links.forEach(link => {
    link.classList.toggle('fade');
  });
  hamburger.classList.toggle('toggle');
});

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

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    const regex = /\/#[\w+]+/;
    const title = link.href.match(regex)[0].slice(2);
    document.title = `${
      title[0].toUpperCase() + title.slice(1)
    } | Mokshit Jain`;
  });
});

function validateName() {
  if (name.value === '') {
    name.classList.add('invalid');
    submitBtn.disabled = true;
  } else {
    name.classList.remove('invalid');
    submitBtn.disabled = false;
  }
}

function validateEmail() {
  const re = /^([A-Za-z0-9\_\-.]+)@([A-Za-z0-9]+)\.([a-z]{2,5})$/;

  if (!re.test(email.value)) {
    email.classList.add('invalid');
    submitBtn.disabled = true;
  } else {
    email.classList.remove('invalid');
    submitBtn.disabled = false;
  }
}

function validateMessage() {
  if (msg.value === '') {
    msg.classList.add('invalid');
    submitBtn.disabled = true;
  } else {
    msg.classList.remove('invalid');
    submitBtn.disabled = false;
  }
}

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
