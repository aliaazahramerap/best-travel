// Main interactions. Edit package data in index.html and styles in css/style.css.
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.textContent = isOpen ? '×' : '☰';
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.textContent = '☰';
}));

document.getElementById('year').textContent = new Date().getFullYear();

const countryInput = document.getElementById('countryInput');
const countryPages = {
  turkey: 'turkey.html',
  japan: 'japan.html',
  india: 'india.html',
  nepal: 'nepal.html'
};

function openCountryPage() {
  const countryPage = countryPages[countryInput.value];
  if (countryPage) {
    window.location.href = countryPage;
  }
}

countryInput.addEventListener('change', openCountryPage);

document.getElementById('searchForm').addEventListener('submit', event => {
  event.preventDefault();
  if (countryInput.value) {
    openCountryPage();
    return;
  }

  document.getElementById('hidden-gems').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

document.getElementById('newsletterForm').addEventListener('submit', event => {
  event.preventDefault();
  document.getElementById('newsletterMessage').textContent = 'Thank you! This demo form is not connected to an email system yet.';
  event.target.reset();
});

document.getElementById('contactForm').addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(event.target);
  const subject = encodeURIComponent('Travel enquiry from ' + data.get('name'));
  const body = encodeURIComponent(
    'Name: ' + data.get('name') + '\\nEmail: ' + data.get('email') +
    '\\nDestination: ' + data.get('destination') + '\\n\\nTrip details:\\n' + data.get('message')
  );
  document.getElementById('contactMessage').textContent = 'Opening your email app to send your enquiry...';
  window.location.href = `mailto:contact@besttravel.com?subject=${subject}&body=${body}`;
});
