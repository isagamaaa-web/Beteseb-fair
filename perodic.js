  (function() {
    "use strict";
    // --- elements ---
    const img = document.getElementById('periodic-img');
    const stage = document.getElementById('imageStage');
    const zoomInBtn = document.getElementById('zoomInBtn');
    const zoomOutBtn = document.getElementById('zoomOutBtn');
    const resetBtn = document.getElementById('resetBtn');
    const zoomDisplay = document.getElementById('zoomDisplay');
    const loadingMsg = document.getElementById('loadingMsg');
    const reloadLink = document.getElementById('reloadLink');

    // --- settings ---
    const MIN_SCALE = 0.5;
    const MAX_SCALE = 3.5;
    const STEP = 0.15;

    let currentScale = 1.0;

    // --- load / error handling ---
    function showLoading(show) {
      if (loadingMsg) loadingMsg.style.display = show ? 'block' : 'none';
    }

    function handleImageError() {
      showLoading(false);
      // show friendly error inside stage (if not already)
      if (!document.querySelector('.error-message')) {
        const errDiv = document.createElement('div');
        errDiv.className = 'error-message';
        errDiv.textContent = '⚠️ Image unavailable — check connection. Still works offline?';
        stage.appendChild(errDiv);
      }
    }

    // image loading
    if (img) {
      showLoading(true);
      if (img.complete && img.naturalWidth > 0) {
        showLoading(false);
      } else {
        img.addEventListener('load', () => showLoading(false));
        img.addEventListener('error', handleImageError);
      }
    }

    // --- zoom logic ---
    function setScale(newScale) {
      newScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, newScale));
      if (Math.abs(newScale - currentScale) < 0.001) return;
      currentScale = newScale;
      if (img) {
        img.style.transform = `scale(${currentScale})`;
      }
      zoomDisplay.textContent = Math.round(currentScale * 100) + '%';
    }

    function zoomIn() { setScale(currentScale + STEP); }
    function zoomOut() { setScale(currentScale - STEP); }
    function resetScale() { setScale(1.0); }

    // --- event listeners (buttons) ---
    if (zoomInBtn) zoomInBtn.addEventListener('click', (e) => { e.preventDefault(); zoomIn(); });
    if (zoomOutBtn) zoomOutBtn.addEventListener('click', (e) => { e.preventDefault(); zoomOut(); });
    if (resetBtn) resetBtn.addEventListener('click', (e) => { e.preventDefault(); resetScale(); });

    // --- keyboard shortcuts (global, but not when typing) ---
    document.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === '+' || e.key === '=') { e.preventDefault(); zoomIn(); }
      else if (e.key === '-' || e.key === '_') { e.preventDefault(); zoomOut(); }
      else if (e.key === '0' || e.key === 'Escape') { e.preventDefault(); resetScale(); }
    });

    // --- mouse wheel (zoom) ---
    stage.addEventListener('wheel', (e) => {
      e.preventDefault();
      if (e.deltaY < 0) zoomIn();
      else zoomOut();
    }, { passive: false });

    // --- DRAG TO PAN (when zoomed > 1) ---
    let isDragging = false;
    let startX, startY, scrollLeftStart, scrollTopStart;

    stage.addEventListener('mousedown', (e) => {
      if (currentScale > 1.0) {
        isDragging = true;
        stage.style.cursor = 'grabbing';
        // record starting point relative to stage
        startX = e.pageX - stage.offsetLeft;
        startY = e.pageY - stage.offsetTop;
        scrollLeftStart = stage.scrollLeft;
        scrollTopStart = stage.scrollTop;
        e.preventDefault();
      }
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging || currentScale <= 1.0) return;
      e.preventDefault();
      const x = e.pageX - stage.offsetLeft;
      const y = e.pageY - stage.offsetTop;
      const walkX = (x - startX) * 2.2;   // smooth pan speed
      const walkY = (y - startY) * 2.2;
      stage.scrollLeft = scrollLeftStart - walkX;
      stage.scrollTop = scrollTopStart - walkY;
    });

    window.addEventListener('mouseup', () => {
      if (isDragging) {
        isDragging = false;
        stage.style.cursor = 'grab';
      }
    });

    stage.addEventListener('mouseleave', () => {
      if (isDragging) {
        isDragging = false;
        stage.style.cursor = 'grab';
      }
    });

    // cursor style
    stage.style.cursor = 'grab';

    // --- touch pan (one finger) & pinch (two fingers) ---
    let touchStartDist = 0;
    let touchStartScale = currentScale;
    let touchPanActive = false;
    let touchStartX = 0, touchStartY = 0, touchScrollLeft = 0, touchScrollTop = 0;

    stage.addEventListener('touchstart', (e) => {
      if (e.touches.length === 2) {
        // pinch
        const t1 = e.touches[0], t2 = e.touches[1];
        touchStartDist = Math.hypot(t2.pageX - t1.pageX, t2.pageY - t1.pageY);
        touchStartScale = currentScale;
        e.preventDefault();
      } else if (e.touches.length === 1 && currentScale > 1.0) {
        // one-finger pan
        touchPanActive = true;
        touchStartX = e.touches[0].pageX - stage.offsetLeft;
        touchStartY = e.touches[0].pageY - stage.offsetTop;
        touchScrollLeft = stage.scrollLeft;
        touchScrollTop = stage.scrollTop;
        e.preventDefault();
      }
    });

    stage.addEventListener('touchmove', (e) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        const t1 = e.touches[0], t2 = e.touches[1];
        const currentDist = Math.hypot(t2.pageX - t1.pageX, t2.pageY - t1.pageY);
        const scaleDiff = (currentDist - touchStartDist) * 0.008;  // sensitivity
        let newScale = touchStartScale + scaleDiff;
        newScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, newScale));
        setScale(newScale);
      } else if (e.touches.length === 1 && touchPanActive && currentScale > 1.0) {
        e.preventDefault();
        const x = e.touches[0].pageX - stage.offsetLeft;
        const y = e.touches[0].pageY - stage.offsetTop;
        const dx = (x - touchStartX) * 2.2;
        const dy = (y - touchStartY) * 2.2;
        stage.scrollLeft = touchScrollLeft - dx;
        stage.scrollTop = touchScrollTop - dy;
      }
    });

    stage.addEventListener('touchend', (e) => {
      if (e.touches.length < 2) {
        touchStartDist = 0;
      }
      if (e.touches.length === 0) {
        touchPanActive = false;
      }
    });

    // --- reload link (just reloads page, simplest way to retry image) ---
    reloadLink.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.reload();
    });

    // --- double-click zoom in (optional, but nice) ---
    stage.addEventListener('dblclick', (e) => {
      e.preventDefault();
      zoomIn();
    });

    // initial display
    setScale(1.0);
  })();