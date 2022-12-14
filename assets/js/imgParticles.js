var isMobile = window.innerWidth < 500,
    density = isMobile ? 60: 100;

let reqAnimFrameId
const ParticleImageDisplayer = function (e, t, n, color, image, section) {
    "use strict";
    this.pImageConfig = {
        particles: {
            array: [],
            density: density,
            color: color,
            size: { value: 1, random: !1 },
            movement: { speed: 0.1, restless: { enabled: !1, value: 1, sync: !1 } },
            interactivity: { on_hover: { enabled: !0, action: "repulse" }, on_click: { enabled: !0, action: "big_repulse" }, on_touch: { enabled: !1, action: "repulse" }, fn_array: [] },
        },
        image: { src: { path: image, is_external: !0 }, size: { canvas_pct: 60, min_px: 10, max_px: 800 } },
        interactions: { repulse: { distance: 100, strength: 200 }, big_repulse: { distance: 300, strength: 250 }, grab: { distance: 100, line_width: 1 } },
        canvas: { el: t, w: t.offsetWidth, h: t.offsetHeight },
        functions: { particles: {}, image: {}, canvas: {}, interactivity: {}, utils: {} },
        mouse: { x: null, y: null, click_x: null, click_y: null },
    };
    const i = this.pImageConfig;
    n && Object.deepExtend(i, n),
        (i.functions.canvas.init = function () {
            (i.canvas.context = i.canvas.el.getContext("2d")),
                (i.canvas.el.width = i.canvas.w),
                (i.canvas.el.height = i.canvas.h),
                (i.canvas.aspect_ratio = i.canvas.w / i.canvas.h),
                window.addEventListener("resize", i.functions.utils.debounce(i.functions.canvas.onResize, 200));
        });
    var a = "false";
    const s = new IntersectionObserver(
        (e) => {
            e.forEach((e) => {
                a = !!e.isIntersecting;
            });
        },
        { root: null, threshold: 0, rootMargin: "0px 0px 0px 0px" }
    );
    window.addEventListener("DOMContentLoaded", (e) => {
        const t = document.querySelector(section);
        s.observe(t);
    }),
        (i.functions.canvas.onResize = function () {
            (i.canvas.w = i.canvas.el.offsetWidth),
                (i.canvas.h = i.canvas.el.offsetHeight),
                (i.canvas.el.width = i.canvas.w),
                (i.canvas.el.height = i.canvas.h),
                (i.canvas.aspect_ratio = i.canvas.w / i.canvas.h),
                (i.particles.array = []),
                i.functions.image.resize();
            const e = i.functions.canvas.getImagePixels();
            i.functions.particles.createImageParticles(e, !0);
        }),
        (i.functions.canvas.clear = function () {
            i.canvas.context.clearRect(0, 0, i.canvas.w, i.canvas.h);
        }),
        (i.functions.canvas.getImagePixels = function () {
            i.functions.canvas.clear(), i.canvas.context.drawImage(i.image.obj, i.image.x, i.image.y, i.image.obj.width, i.image.obj.height);
            const e = i.canvas.context.getImageData(i.image.x, i.image.y, i.image.obj.width, i.image.obj.height);
            return i.functions.canvas.clear(), e;
        }),
        (i.functions.image.resize = function () {
            i.image.aspect_ratio < i.canvas.aspect_ratio
                ? ((i.image.obj.height = i.functions.utils.clamp(Math.round((i.canvas.h * i.image.size.canvas_pct) / 100), i.image.size.min_px, i.image.size.max_px)),
                  (i.image.obj.width = Math.round(i.image.obj.height * i.image.aspect_ratio)))
                : ((i.image.obj.width = i.functions.utils.clamp(Math.round((i.canvas.w * i.image.size.canvas_pct) / 100), i.image.size.min_px, i.image.size.max_px)),
                  (i.image.obj.height = Math.round(i.image.obj.width / i.image.aspect_ratio))),
                (i.image.x = i.canvas.w / 2 - i.image.obj.width / 2),
                (i.image.y = i.canvas.h / 2 - i.image.obj.height / 2);
        }),
        (i.functions.image.init = function () {
            (i.image.obj = new Image()),
                i.image.obj.addEventListener("load", function () {
                    (i.image.aspect_ratio = i.image.obj.width / i.image.obj.height), i.functions.image.resize();
                    const e = i.functions.canvas.getImagePixels();
                    i.functions.particles.createImageParticles(e), i.functions.particles.animateParticles();
                }),
                (i.image.obj.src = i.image.src.path),
                i.image.src.is_external && (i.image.obj.crossOrigin = "anonymous");
        }),
        (i.functions.particles.SingleImageParticle = function (e, t) {
            (this.x = e.x),
                (this.y = e.y),
                (this.dest_x = t.x),
                (this.dest_y = t.y),
                (this.vx = (Math.random() - 0.1) * i.particles.movement.speed),
                (this.vy = (Math.random() - 0.1) * i.particles.movement.speed),
                (this.acc_x = 0),
                (this.acc_y = 0),
                (this.friction = 0.01 * Math.random() + 0.92),
                (this.restlessness = {
                    max_displacement: Math.ceil(Math.random() * i.particles.movement.restless.value),
                    x_jitter: i.functions.utils.randIntInRange(-1.8, 1.8),
                    y_jitter: i.functions.utils.randIntInRange(-0.3, 0.3),
                    on_curr_frame: !1,
                }),
                i.particles.color instanceof Array ? (this.color = i.particles.color[Math.floor(Math.random() * (i.particles.color.length + 1))]) : (this.color = i.particles.color),
                (this.radius = Math.round((i.particles.size.random ? Math.max(Math.random(), 0.5) : 1) * i.particles.size.value));
        }),
        (i.functions.particles.SingleImageParticle.prototype.draw = function () {
            (i.canvas.context.fillStyle = this.color), i.canvas.context.beginPath(), i.canvas.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, !1), i.canvas.context.fill();
        }),
        (i.functions.particles.createImageParticles = function (e, t = !1) {
            const n = Math.round(e.width / i.particles.density);
            for (let a = 0; a < e.width; a += n)
                for (let s = 0; s < e.height; s += n)
                    if (e.data[4 * (a + s * e.width) + 3] > 128) {
                        const e = { x: i.image.x + a, y: i.image.y + s },
                            n = t ? e : { x: Math.random() * i.canvas.w, y: Math.random() * i.canvas.h };
                        i.particles.array.push(new i.functions.particles.SingleImageParticle(n, e));
                    }
        }),
        (i.functions.particles.updateParticles = function () {
            for (let e of i.particles.array)
                i.particles.movement.restless.enabled && e.restlessness.on_curr_frame
                    ? i.functions.particles.jitterParticle(e)
                    : ((e.acc_x = (e.dest_x - e.x) / 500), (e.acc_y = (e.dest_y - e.y) / 500), (e.vx = (e.vx + e.acc_x) * e.friction), (e.vy = (e.vy + e.acc_y) * e.friction), (e.x += e.vx), (e.y += e.vy)),
                    i.functions.interactivity.interactWithClient(e);
        }),
        (i.functions.particles.jitterParticle = function (e) {
            (e.x += e.restlessness.x_jitter), (e.y += e.restlessness.y_jitter), Math.sqrt((e.dest_x - e.x) ** 2 + (e.dest_y - e.y) ** 2) >= i.particles.movement.restless.value && (e.restlessness.on_curr_frame = !1);
        }),
        (i.functions.particles.animateParticles = function () {
            i.functions.canvas.clear(), i.functions.particles.updateParticles();
            for (let e of i.particles.array) e.draw();
            reqAnimFrameId = requestAnimFrame(i.functions.particles.animateParticles);
        }),
        (i.functions.interactivity.repulseParticle = function (e, t) {
            const n = e.x - i.mouse.x,
                a = e.y - i.mouse.y,
                s = Math.sqrt(n * n + a * a),
                c = i.functions.utils.clamp(300 - t.strength, 10, 300);
            s <= t.distance && ((e.acc_x = (e.x - i.mouse.x) / c), (e.acc_y = (e.y - i.mouse.y) / c), (e.vx += e.acc_x), (e.vy += e.acc_y));
        }),
        (i.functions.interactivity.grabParticle = function (e, t) {
            const n = e.x - i.mouse.x,
                a = e.y - i.mouse.y;
            Math.sqrt(n * n + a * a) <= t.distance &&
                ((i.canvas.context.strokeStyle = e.color),
                (i.canvas.context.lineWidth = Math.min(t.line_width, 2 * e.radius)),
                i.canvas.context.beginPath(),
                i.canvas.context.moveTo(e.x, e.y),
                i.canvas.context.lineTo(i.mouse.x, i.mouse.y),
                i.canvas.context.stroke(),
                i.canvas.context.closePath());
        }),
        (i.functions.interactivity.onMouseMove = function (e, t, n) {
            null != i.mouse.x && null != i.mouse.y && e(n, t);
        }),
        (i.functions.interactivity.onMouseClick = function (e, t, n) {
            null != i.mouse.click_x && null != i.mouse.click_y && e(n, t);
        }),
        (i.functions.interactivity.addEventListeners = function () {
            (i.particles.interactivity.on_hover.enabled || i.particles.interactivity.on_click.enabled) &&
                (i.canvas.el.addEventListener("mousemove", function (e) {
                    let t = e.offsetX || e.clientX,
                        n = e.offsetY || e.clientY;
                    (i.mouse.x = t), (i.mouse.y = n);
                }),
                i.canvas.el.addEventListener("mouseleave", function (e) {
                    (i.mouse.x = null), (i.mouse.y = null);
                }),
                i.functions.utils.addEventActions("on_hover")),
                i.particles.interactivity.on_click.enabled &&
                    (i.canvas.el.addEventListener("mousedown", function (e) {
                        (i.mouse.click_x = i.mouse.x), (i.mouse.click_y = i.mouse.y);
                    }),
                    i.canvas.el.addEventListener("mouseup", function (e) {
                        (i.mouse.click_x = null), (i.mouse.click_y = null);
                    }),
                    i.functions.utils.addEventActions("on_click")),
                i.particles.interactivity.on_touch.enabled &&
                    (i.canvas.el.addEventListener("touchmove", function (e) {
                        let t = e.touches[0].clientX,
                            n = e.touches[0].clientY;
                        (i.mouse.x = t), (i.mouse.y = n);
                    }),
                    i.canvas.el.addEventListener("touchend", function (e) {
                        (i.mouse.x = null), (i.mouse.y = null);
                    }),
                    i.functions.utils.addEventActions("on_touch"));
        }),
        (i.functions.interactivity.interactWithClient = function (e) {
            for (let t of i.particles.interactivity.fn_array) t(e);
        }),
        (i.functions.utils.randIntInRange = function (e, t) {
            return Math.floor(Math.random() * (t - e + 1)) + e;
        }),
        (i.functions.utils.clamp = function (e, t, n) {
            return Math.min(Math.max(e, t), n);
        }),
        (i.functions.utils.debounce = function (e, t) {
            let n;
            return function (i) {
                n && clearTimeout(n), (n = setTimeout(e, t, i));
            };
        }),
        (i.functions.utils.addEventActions = function (e) {
            const t = { repulse: i.functions.interactivity.repulseParticle, big_repulse: i.functions.interactivity.repulseParticle, grab: i.functions.interactivity.grabParticle };
            let n = "on_click" === e ? i.functions.interactivity.onMouseClick : i.functions.interactivity.onMouseMove;
            if (i.particles.interactivity[e].enabled) {
                const a = t[i.particles.interactivity[e].action],
                    s = i.interactions[i.particles.interactivity[e].action],
                    c = n.bind(null, a, s);
                i.particles.interactivity.fn_array.push(c);
            }
        }),
        (i.functions.launch = function () {
            i.functions.interactivity.addEventListeners(), i.functions.canvas.init(), i.functions.image.init();
        }),
        !i.disabled && a && i.functions.launch();
};
(Object.deepExtend = function (e, t) {
    for (let n in t) t[n] && t[n].constructor && t[n].constructor === Object ? ((e[n] = e[n] || {}), arguments.callee(e[n], t[n])) : (e[n] = t[n]);
    return e;
}),
    (window.requestAnimFrame =
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (e) {
            window.setTimeout(e, 1e3 / 60);
        }),
    (window.cancelRequestAnimFrame =
        window.cancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || clearTimeout),
    (window.pImgDom = []),
    (window.particleImageDisplay = function (e, color, image, section) {
        const t = document.getElementById(e),
            n = t.getElementsByClassName("particle-image-canvas-el");
        if (n.length) for (; n.length > 0; ) t.removeChild(n[0]);
        const i = document.createElement("canvas");
        (i.className = "particle-image-canvas-el"), (i.style.width = "100%"), (i.style.height = "100%");
        const a = document.getElementById(e).appendChild(i);
        null != a && pImgDom.push(new ParticleImageDisplayer(e, a, {}, color, image, section));
    })
