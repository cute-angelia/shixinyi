var clientWidth = window.innerWidth;
var clientHeight = window.innerHeight;
var gardenCtx, gardenCanvas, garden;

function initGarden() {
    var loveHeart = document.getElementById("loveHeart");
    var gardenEl = document.getElementById("garden");
    var code = document.getElementById("code");
    var content = document.getElementById("content");

    if (!gardenEl || !gardenEl.getContext) return;

    gardenCanvas = gardenEl;
    gardenCanvas.width = loveHeart.clientWidth || 670;
    gardenCanvas.height = loveHeart.clientHeight || 625;
    gardenCtx = gardenCanvas.getContext("2d");
    gardenCtx.globalCompositeOperation = "lighter";
    garden = new Garden(gardenCtx, gardenCanvas);

    content.style.width = ((loveHeart.clientWidth || 670) + (code.clientWidth || 440)) + "px";
    content.style.height = Math.max(loveHeart.clientHeight || 625, code.clientHeight || 400) + "px";
    content.style.marginTop = Math.max((window.innerHeight - content.clientHeight) / 2, 10) + "px";
    content.style.marginLeft = Math.max((window.innerWidth - content.clientWidth) / 2, 10) + "px";

    setInterval(function() {
        garden.render();
    }, Garden.options.growSpeed);
}

if (document.readyState === "loading") {
    window.addEventListener("DOMContentLoaded", initGarden);
} else {
    initGarden();
}

window.addEventListener("resize", function() {
    var b = window.innerWidth;
    var a = window.innerHeight;
    if (b !== clientWidth || a !== clientHeight) {
        clientWidth = b;
        clientHeight = a;
        var loveHeart = document.getElementById("loveHeart");
        var code = document.getElementById("code");
        var content = document.getElementById("content");
        if (loveHeart && code && content) {
            content.style.marginTop = Math.max((window.innerHeight - content.clientHeight) / 2, 10) + "px";
            content.style.marginLeft = Math.max((window.innerWidth - content.clientWidth) / 2, 10) + "px";
        }
        adjustWordsPosition();
    }
});

function getHeartPoint(c) {
    var b = c / Math.PI;
    var a = 19.5 * (16 * Math.pow(Math.sin(b), 3));
    var d = -20 * (13 * Math.cos(b) - 5 * Math.cos(2 * b) - 2 * Math.cos(3 * b) - Math.cos(4 * b));
    return new Array(offsetX + a, offsetY + d);
}

function startHeartAnimation() {
    var c = 50;
    var d = 10;
    var b = new Array();
    var a = setInterval(function() {
        var h = getHeartPoint(d);
        var e = true;
        for (var f = 0; f < b.length; f++) {
            var g = b[f];
            var j = Math.sqrt(Math.pow(g[0] - h[0], 2) + Math.pow(g[1] - h[1], 2));
            if (j < Garden.options.bloomRadius.max * 1.3) {
                e = false;
                break;
            }
        }
        if (e) {
            b.push(h);
            garden.createRandomBloom(h[0], h[1]);
        }
        if (d >= 30) {
            clearInterval(a);
            showMessages();
        } else {
            d += 0.2;
        }
    }, c);
}

function typewriter(element) {
    if (typeof element === "string") {
        element = document.querySelector(element);
    }
    if (!element) return;
    var str = element.innerHTML;
    var progress = 0;
    element.innerHTML = "";
    element.style.display = "block";
    var timer = setInterval(function() {
        var current = str.substr(progress, 1);
        if (current === "<") {
            progress = str.indexOf(">", progress) + 1;
        } else {
            progress++;
        }
        element.innerHTML = str.substring(0, progress) + (progress & 1 ? "_" : "");
        if (progress >= str.length) {
            clearInterval(timer);
            element.innerHTML = str;
        }
    }, 75);
}

function timeElapse(c) {
    var now = new Date();
    var f = Math.floor((now.getTime() - c.getTime()) / 1000);
    if (f < 0) f = 0;
    var g = Math.floor(f / (3600 * 24));
    f = f % (3600 * 24);
    var b = Math.floor(f / 3600);
    if (b < 10) {
        b = "0" + b;
    }
    f = f % 3600;
    var d = Math.floor(f / 60);
    if (d < 10) {
        d = "0" + d;
    }
    f = f % 60;
    if (f < 10) {
        f = "0" + f;
    }
    var a = '<span class="digit">' + g + '</span> days <span class="digit">' + b + '</span> hours <span class="digit">' + d + '</span> minutes <span class="digit">' + f + "</span> seconds";
    var clock = document.getElementById("elapseClock");
    if (clock) {
        clock.innerHTML = a;
    }
}

function fadeIn(element, duration, callback) {
    if (typeof element === "string") {
        element = document.querySelector(element);
    }
    if (!element) return;
    element.style.opacity = "0";
    element.style.display = "block";
    var start = Date.now();
    var timer = setInterval(function() {
        var elapsed = Date.now() - start;
        var progress = Math.min(elapsed / duration, 1);
        element.style.opacity = progress;
        if (progress >= 1) {
            clearInterval(timer);
            if (typeof callback === "function") {
                callback();
            }
        }
    }, 20);
}

function showMessages() {
    adjustWordsPosition();
    fadeIn(document.getElementById("messages"), 5000, function() {
        showLoveU();
    });
}

function adjustWordsPosition() {
    var words = document.getElementById("words");
    var gardenEl = document.getElementById("garden");
    if (words && gardenEl) {
        words.style.position = "absolute";
        words.style.top = (gardenEl.offsetTop + 195) + "px";
        words.style.left = (gardenEl.offsetLeft + 70) + "px";
    }
}

function adjustCodePosition() {
    var code = document.getElementById("code");
    var gardenEl = document.getElementById("garden");
    if (code && gardenEl) {
        code.style.marginTop = ((gardenEl.clientHeight - code.clientHeight) / 2) + "px";
    }
}

function showLoveU() {
    fadeIn(document.getElementById("loveu"), 3000);
}
