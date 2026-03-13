document.addEventListener('DOMContentLoaded', () => {
  // Navigation interaction - scroll effect
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        nav.classList.add('scrolled');
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
        nav.style.padding = '0.6rem 2rem';
      } else {
        nav.classList.remove('scrolled');
        nav.style.background = 'rgba(255, 255, 255, 0.85)';
        nav.style.padding = '0.75rem 2rem';
      }
    });
  }

  // Fade-in animation for cards and sections
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Apply animation styles via JS to elements
  const animateElements = document.querySelectorAll('.card, .hero > div, .section > .container > div');

  // Inject keyframes/base transition style
  const style = document.createElement('style');
  style.textContent = `
        .fade-in-prepared {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .fade-in-visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
  document.head.appendChild(style);

  animateElements.forEach(el => {
    el.classList.add('fade-in-prepared');
    observer.observe(el);
  });

  // Filter chip interaction
  const filterChips = document.querySelectorAll('.filter-chip');
  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      console.log(`Filtering for segment: ${chip.textContent}`);
    });
  });

  // Mobile Menu Toggle
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelector('.nav-links');

  if (mobileMenu && navLinks) {
    mobileMenu.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      mobileMenu.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenu.classList.remove('active');
      });
    });
  }
});

// Modal Logic - Globally Accessible
function openEventModal(title, date, location, description, image) {
  const modal = document.getElementById('eventModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalDate = document.getElementById('modalDate');
  const modalLocation = document.getElementById('modalLocation');
  const modalDescription = document.getElementById('modalDescription');
  const modalImage = document.getElementById('modalImage');

  if (modalTitle) modalTitle.textContent = title;
  if (modalDate) modalDate.textContent = `📅 ${date}`;
  if (modalLocation) modalLocation.textContent = `📍 ${location}`;
  if (modalDescription) modalDescription.textContent = description;
  if (modalImage) modalImage.src = image;

  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scroll
  }
}

function closeEventModal() {
  const modal = document.getElementById('eventModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scroll
  }
}

// Close modal when clicking escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeEventModal();
  }
});

// Close modal when clicking outside content
window.addEventListener('click', (e) => {
  const modal = document.getElementById('eventModal');
  if (e.target === modal) {
    closeEventModal();
  }
});
function openNewsModal(title, image, description) {

document.getElementById("newsModalTitle").innerText = title;
document.getElementById("newsModalImage").src = image;
document.getElementById("newsModalDescription").innerText = description;

document.getElementById("newsModal").style.display = "flex";

}

function closeNewsModal(){
document.getElementById("newsModal").style.display = "none";
}