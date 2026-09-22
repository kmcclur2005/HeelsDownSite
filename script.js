/* ==========================================================================
   Heels Down, Eyes Up LLC - Interactive Functionality
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }

  // Category Filtering
  const filterButtons = document.querySelectorAll('.filter-btn');
  const ponyCards = document.querySelectorAll('.pony-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Set active tab button
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      ponyCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || filterValue === category) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // Set Current Year in Footer
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});

// Photo Lightbox Modal
function openLightbox(imageSrc, captionText) {
  const modal = document.getElementById('lightboxModal');
  const img = document.getElementById('lightboxImage');
  const caption = document.getElementById('lightboxCaption');

  if (modal && img) {
    img.src = imageSrc;
    caption.textContent = captionText || '';
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeLightbox(event) {
  // Prevent closing when clicking on the image itself
  if (event.target.tagName === 'IMG') return;

  const modal = document.getElementById('lightboxModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

// Pre-select Pony in Contact Form
function setInquirySubject(ponyName) {
  const select = document.getElementById('ponyInterest');
  if (select) {
    for (let i = 0; i < select.options.length; i++) {
      if (select.options[i].text.includes(ponyName)) {
        select.selectedIndex = i;
        break;
      }
    }
  }
}

// Form Submission Handler (Netlify Forms via AJAX POST)
function handleFormSubmit(event) {
  event.preventDefault();
  
  const form = event.target;
  const formData = new FormData(form);
  const statusDiv = document.getElementById('formStatus');
  const submitBtn = form.querySelector('button[type="submit"]');

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending Inquiry...';
  }

  fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(formData).toString()
  })
  .then(() => {
    if (statusDiv) {
      statusDiv.className = 'form-status success';
      statusDiv.textContent = `Thank you! Your inquiry has been sent successfully. We will get back to you shortly.`;
      statusDiv.style.display = 'block';
    }
    form.reset();
  })
  .catch((error) => {
    if (statusDiv) {
      statusDiv.className = 'form-status error';
      statusDiv.textContent = `Thank you! Your inquiry draft is ready. You can also reach us directly on Instagram @heelsdowntexas!`;
      statusDiv.style.display = 'block';
    }
  })
  .finally(() => {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Inquiry';
    }
  });
}
