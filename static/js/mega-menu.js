document.addEventListener('DOMContentLoaded', function () {

  const headerBox   = document.querySelector('.center-logo-box');
  const navbar      = document.querySelector('.topnav');
  const megaMenus   = document.querySelectorAll('.mega-menu');
  const offcanvasEl = document.getElementById('offcanvasNavbar');
  const tagline     = document.getElementById('mobileTagline');

  let headerHidden = false;

  const offcanvasInstance = offcanvasEl
      ? bootstrap.Offcanvas.getOrCreateInstance(offcanvasEl)
      : null;

  // =====================================
  // CONTROL REAL DEL TAGLINE
  // =====================================
  function setTagline(show){
    if(!tagline) return;
    tagline.classList.toggle('show', show);
  }

  // =====================================
  // CERRAR TODAS LAS VENTANAS FLOTANTES
  // =====================================
  function closeAllPopups() {
    // Mega menus
    megaMenus.forEach(menu => menu.classList.remove('show'));

    // Offcanvas
    if (offcanvasInstance && offcanvasEl.classList.contains('show')) {
      offcanvasInstance.hide();
    }

    // Modales
    document.querySelectorAll('.modal.show').forEach(modal => {
      const instance = bootstrap.Modal.getOrCreateInstance(modal);
      instance.hide();
    });

    updateHeaderState();
  }

  // =====================================
  // TOGGLE BURGER
  // =====================================
  const toggler = document.querySelector('.navbar-toggler');
  if (toggler) {
    toggler.addEventListener('click', closeAllPopups);
  }

  if(offcanvasEl && toggler){
    offcanvasEl.addEventListener('show.bs.offcanvas', () => toggler.classList.add('open'));
    offcanvasEl.addEventListener('hide.bs.offcanvas', () => toggler.classList.remove('open'));
  }

  // =====================================
  // CERRAR OFFCANVAS SI ABRIMOS UN MODAL
  // =====================================
  document.addEventListener('click', e => {
    if (e.target.closest('[data-bs-toggle="modal"]') && offcanvasInstance && offcanvasEl.classList.contains('show')) {
      offcanvasInstance.hide();
    }
  });

  // =====================================
  // CONTROL DEL HEADER
  // =====================================
  function updateHeaderState() {
    const scrollY = window.scrollY;
    const headerHeight = headerBox.offsetHeight;
    const hiddenAmount = Math.min(scrollY, headerHeight);

    headerBox.style.transform = `translateY(-${hiddenAmount}px)`;
    navbar.style.position = scrollY >= headerHeight ? 'sticky' : 'relative';
    navbar.style.top = scrollY >= headerHeight ? '0' : '';

    headerHidden = hiddenAmount >= headerHeight - 2;

    setTagline(window.innerWidth < 992 && headerHidden);
  }

  function hideHeaderInstant() {
    if (window.innerWidth >= 992) return;

    const headerHeight = headerBox.offsetHeight;
    if (window.scrollY < headerHeight) {
      window.scrollTo({ top: headerHeight, behavior: "auto" });
      headerBox.style.transform = `translateY(-${headerHeight}px)`;
      navbar.style.position = 'sticky';
      navbar.style.top = '0';
      headerHidden = true;
      setTagline(true);
    }
  }

  // =====================================
  // MEGA MENUS
  // =====================================
  function closeAllMegaMenus() {
    megaMenus.forEach(menu => menu.classList.remove('show'));
    updateHeaderState();
  }

  function openMegaMenu(id) {
    hideHeaderInstant();
    const menu = document.getElementById(id);
    if (!menu) return;

    menu.style.position = window.innerWidth < 992 ? 'fixed' : 'absolute';
    menu.style.top = window.innerWidth < 992 ? navbar.offsetHeight + 'px' : '100%';

    menu.classList.add('show');
    setTagline(true);
  }

  window.toggleMegaMenu = function(id, event) {
    if (event) { event.preventDefault(); event.stopPropagation(); }

    if (offcanvasInstance && offcanvasEl.classList.contains('show')) {
      offcanvasEl.addEventListener('hidden.bs.offcanvas', function handler() {
        offcanvasEl.removeEventListener('hidden.bs.offcanvas', handler);
        openMegaMenu(id);
      });
      offcanvasInstance.hide();
      return;
    }

    const menu = document.getElementById(id);
    if (!menu) return;

    menu.classList.contains('show') ? closeAllMegaMenus() : (closeAllMegaMenus(), openMegaMenu(id));
  };

  // =====================================
  // BOTONES DE CIERRE DE MEGA MENUS
  // =====================================
  megaMenus.forEach(menu => {
    const closeBtn = menu.querySelector('.mega-close');
    if (closeBtn) closeBtn.addEventListener('click', () => { menu.classList.remove('show'); updateHeaderState(); });
  });

  // =====================================
  // CLICK FUERA DE MEGA MENUS
  // =====================================
  document.addEventListener('click', e => {
    if (!e.target.closest('.top')) closeAllMegaMenus();
  });

  // =====================================
  // SCROLL
  // =====================================
  window.addEventListener('scroll', updateHeaderState);

  // =====================================
  // ESTADO INICIAL
  // =====================================
  updateHeaderState();

});
