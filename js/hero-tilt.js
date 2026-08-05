document.addEventListener('DOMContentLoaded', function () {
    var stage = document.querySelector('.hero-visual');
    var phone = document.querySelector('.phone');
    if (!stage || !phone) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(hover: none)').matches) return;

    var current = { x: 0, y: 0 };
    var target = { x: 0, y: 0 };
    var raf = null;

    function apply() {
        current.x += (target.x - current.x) * 0.12;
        current.y += (target.y - current.y) * 0.12;
        phone.style.transform =
            'rotate(-4deg) perspective(900px) rotateX(' + current.y + 'deg) rotateY(' + current.x + 'deg)';
        if (Math.abs(target.x - current.x) > 0.01 || Math.abs(target.y - current.y) > 0.01) {
            raf = requestAnimationFrame(apply);
        } else {
            raf = null;
        }
    }

    function start() {
        if (!raf) raf = requestAnimationFrame(apply);
    }

    stage.addEventListener('mousemove', function (e) {
        var rect = stage.getBoundingClientRect();
        var relX = (e.clientX - rect.left) / rect.width - 0.5;
        var relY = (e.clientY - rect.top) / rect.height - 0.5;
        target.x = relX * 16;
        target.y = relY * -12;
        start();
    });

    stage.addEventListener('mouseleave', function () {
        target.x = 0;
        target.y = 0;
        start();
    });
});
