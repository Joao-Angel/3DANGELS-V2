// Alternar menu no celular
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    const btn = document.querySelector('.menu-toggle');
    navLinks.classList.toggle('active');
    if (btn) btn.setAttribute('aria-expanded', navLinks.classList.contains('active'));
}

// Rolagem suave ao clicar nos links
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const navLinks = document.getElementById('navLinks');
        navLinks.classList.remove('active');

        const alvo = document.querySelector(this.getAttribute('href'));
        if (alvo) {
            alvo.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animação ao rolar a página
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (reduceMotion) {
    document.querySelectorAll('.fade-in').forEach(function (el) {
        el.classList.add('visible');
    });
} else {
    document.querySelectorAll('.fade-in').forEach(function (element) {
        observer.observe(element);
    });
}

// Destacar link ativo no menu
window.addEventListener('scroll', () => {
    let atual = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const topo = section.offsetTop;
        if (scrollY >= (topo - 100)) {
            atual = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === atual) {
            link.classList.add('active');
        }
    });
});

// Carrossel da galeria
const track = document.getElementById('carouselTrack');
const dotsContainer = document.getElementById('carouselDots');
const counterEl = document.getElementById('carouselCounter');

if (track && dotsContainer) {
    const imgs = track.querySelectorAll('img');
    const total = imgs.length;
    if (total === 0) {
        /* vazio */
    } else {
    let atual = 0;

    function getVisiveis() {
        return window.innerWidth <= 768 ? 1 : 3;
    }

    function getSlideStep() {
        if (!imgs[0]) return 0;
        const gap = parseFloat(window.getComputedStyle(track).columnGap || window.getComputedStyle(track).gap) || 0;
        return imgs[0].offsetWidth + gap;
    }

    function reconstruirDots() {
        const vis = getVisiveis();
        dotsContainer.innerHTML = '';
        const totalDots = Math.ceil(total / vis);
        for (let i = 0; i < totalDots; i++) {
            const dot = document.createElement('button');
            dot.type = 'button';
            dot.classList.add('dot');
            if (vis === 1) {
                dot.setAttribute('aria-label', 'Ver foto ' + (i + 1) + ' de ' + total);
            } else {
                dot.setAttribute('aria-label', 'Ver imagens ' + (i * vis + 1) + ' a ' + Math.min((i + 1) * vis, total));
            }
            dot.addEventListener('click', function () {
                irPara(i);
            });
            dotsContainer.appendChild(dot);
        }
        if (atual > total - vis) atual = Math.max(0, total - vis);
        atualizarDots();
        atualizarContador();
    }

    function atualizarDots() {
        const vis = getVisiveis();
        const dotIndex = Math.min(Math.floor(atual / vis), Math.ceil(total / vis) - 1);
        document.querySelectorAll('.carousel-dots .dot').forEach(function (d, i) {
            d.classList.toggle('active', i === dotIndex);
        });
    }

    function atualizarContador() {
        if (!counterEl) return;
        const vis = getVisiveis();
        if (vis !== 1) {
            counterEl.textContent = '';
            counterEl.hidden = true;
            return;
        }
        counterEl.hidden = false;
        var fotoAtual = Math.min(atual + 1, total);
        counterEl.textContent = 'Foto ' + fotoAtual + ' de ' + total;
    }

    function scrollParaAtual(smooth) {
        const step = getSlideStep();
        if (!step) return;
        track.scrollTo({ left: atual * step, behavior: smooth ? 'smooth' : 'auto' });
        atualizarDots();
        atualizarContador();
    }

    function irPara(index) {
        const vis = getVisiveis();
        atual = index * vis;
        if (atual >= total) atual = Math.max(0, total - vis);
        scrollParaAtual(true);
    }

    window.moverCarrossel = function (direcao) {
        const vis = getVisiveis();
        atual += direcao * vis;
        if (atual < 0) atual = 0;
        if (atual >= total) atual = Math.max(0, total - vis);
        scrollParaAtual(true);
    };

    function sincronizarPeloScroll() {
        const step = getSlideStep();
        if (!step) return;
        const vis = getVisiveis();
        var idx = Math.round(track.scrollLeft / step);
        idx = Math.max(0, Math.min(idx, total - vis));
        if (idx !== atual) {
            atual = idx;
            atualizarDots();
            atualizarContador();
        }
    }

    var scrollTick = null;
    track.addEventListener('scroll', function () {
        if (scrollTick) cancelAnimationFrame(scrollTick);
        scrollTick = requestAnimationFrame(sincronizarPeloScroll);
    });

    window.addEventListener('resize', function () {
        clearTimeout(window._carouselResizeT);
        window._carouselResizeT = setTimeout(function () {
            reconstruirDots();
            scrollParaAtual(false);
        }, 150);
    });

    reconstruirDots();
    scrollParaAtual(false);
    }
}