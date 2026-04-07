(function () {
    var btn = document.querySelector('.back-to-top');
    if (!btn) return;

    var threshold = 400;

    function update() {
        var show = window.scrollY > threshold;
        btn.classList.toggle('is-visible', show);
        btn.setAttribute('aria-hidden', show ? 'false' : 'true');
        btn.tabIndex = show ? 0 : -1;
    }

    update();
    window.addEventListener('scroll', update, { passive: true });
})();
