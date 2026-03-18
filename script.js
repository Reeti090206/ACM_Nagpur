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
function openEventModal(title, date, location, desc, extra, image, emoji) {
    document.getElementById("modalTitle").innerText = title;
    document.getElementById("modalDate").innerText = "📅 " + date;
    document.getElementById("modalLocation").innerText = "📍 " + location;
    document.getElementById("modalDescription").innerText = desc;

    const container = document.getElementById("modalImageContainer");

    // If image exists → show image
    if (image && image.trim() !== "") {
        container.innerHTML = `
            <img src="${image}" 
                 alt="${title}" 
                 style="width:100%; height:300px; object-fit:cover;">
        `;
    } 
    // Else → show emoji fallback
    else {
        container.innerHTML = `
            <div style="width:100%; height:300px; display:flex; align-items:center; justify-content:center; background:linear-gradient(135deg,#667eea,#764ba2); font-size:3rem; color:white;">
                ${emoji || "📌"}
            </div>
        `;
    }

    document.getElementById("eventModal").classList.add("active");
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
