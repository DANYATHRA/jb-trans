/**
 * JB TRANS - Cold Chain Logistics & Commercial Transport
 * Interactive Application Engine
 * Operations Contact: Senthil (+91 99437 23777)
 * GSTIN: 33AHHPA4958K1Z9
 */

document.addEventListener('DOMContentLoaded', () => {
  initMagicCursor();
  initMobileNav();
  initGstCopy();
  initProfileModal();
  initNavScrollSpy();
});

/* ==========================================================================
   1. Magic Cursor (Smooth Follower)
   ========================================================================== */
function initMagicCursor() {
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring || window.innerWidth < 1080) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;
  });

  function renderRing() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;
    requestAnimationFrame(renderRing);
  }
  renderRing();

  const interactives = document.querySelectorAll('a, button, input, select, textarea, .contract-card, .service-box');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => {
      ring.style.width = '54px';
      ring.style.height = '54px';
      ring.style.backgroundColor = 'rgba(0, 102, 204, 0.15)';
      ring.style.borderColor = 'rgba(0, 102, 204, 0.8)';
    });
    el.addEventListener('mouseleave', () => {
      ring.style.width = '36px';
      ring.style.height = '36px';
      ring.style.backgroundColor = 'transparent';
      ring.style.borderColor = 'var(--brand-blue)';
    });
  });
}

/* ==========================================================================
   2. Mobile Navigation Drawer
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const closeBtn = document.getElementById('menuCloseBtn');
  const navMenu = document.getElementById('navMenu');

  if (!navMenu) return;

  const openMenu = () => navMenu.classList.add('active');
  const closeMenu = () => navMenu.classList.remove('active');

  if (toggleBtn) toggleBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  navMenu.querySelectorAll('.nav-link, .btn-header-call, .btn-header-whatsapp').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

/* ==========================================================================
   3. Copy GST Number with Visual Feedback
   ========================================================================== */
function initGstCopy() {
  const gstBtn = document.getElementById('copyGstBtn');
  if (!gstBtn) return;

  gstBtn.addEventListener('click', () => {
    const gstNumber = '33AHHPA4958K1Z9';
    navigator.clipboard.writeText(gstNumber).then(() => {
      const originalHTML = gstBtn.innerHTML;
      gstBtn.innerHTML = `Copied! <i class="fa-solid fa-check"></i>`;
      gstBtn.style.background = '#10b981';
      gstBtn.style.color = '#ffffff';

      setTimeout(() => {
        gstBtn.innerHTML = originalHTML;
        gstBtn.style.background = '';
        gstBtn.style.color = '';
      }, 2000);
    });
  });
}

/* ==========================================================================
   5. PDF Profile Modal & Print
   ========================================================================== */
function initProfileModal() {
  const modal = document.getElementById('profileModal');

  window.openProfileModal = () => {
    if (modal) modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closeProfileModal = () => {
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  window.printCompanyProfile = () => {
    window.openProfileModal();
    setTimeout(() => {
      window.print();
    }, 350);
  };

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      window.closeProfileModal();
    }
  });
}

/* ==========================================================================
   6. Navigation ScrollSpy
   ========================================================================== */
function initNavScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links-list .nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}
