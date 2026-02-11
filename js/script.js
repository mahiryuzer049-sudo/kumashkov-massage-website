// ============================================
// PRELOADER & INITIALIZATION
// ============================================

window.addEventListener('load', () => {
    const loaderLine = document.getElementById('loader-progress');
    loaderLine.style.width = '100%';
    
    setTimeout(() => {
        document.getElementById('preloader').style.opacity = '0';
        document.getElementById('preloader').style.visibility = 'hidden';
    }, 800);
    
    initLivingStatus();
    console.log("Alpha Gamma Beta Prime: System Ready.");
});

// ============================================
// CUSTOM CURSOR
// ============================================

const cursorDot = document.querySelector('.cursor-dot');
const cursorCircle = document.querySelector('.cursor-circle');
const spotlight = document.getElementById('spotlight');
const interactiveEls = document.querySelectorAll('.interactive-el');

let mouseX = 0, mouseY = 0, circleX = 0, circleY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    if (window.matchMedia("(pointer: fine)").matches) {
        cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
        spotlight.style.setProperty('--x', mouseX + 'px');
        spotlight.style.setProperty('--y', mouseY + 'px');
    }
});

function animateCursor() {
    const speed = 0.15;
    circleX += (mouseX - circleX) * speed;
    circleY += (mouseY - circleY) * speed;
    
    if (window.matchMedia("(pointer: fine)").matches) {
        cursorCircle.style.transform = `translate3d(${circleX}px, ${circleY}px, 0) translate(-50%, -50%)`;
    }
    
    requestAnimationFrame(animateCursor);
}
animateCursor();

interactiveEls.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
});

// ============================================
// SCROLL REVEAL ANIMATION
// ============================================

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));

// ============================================
// BODY SCANNER ZONES
// ============================================

const zoneData = {
    'head': {
        title: 'Шум в голове',
        med: 'Церебральный ангиоспазм / Хронический стресс',
        desc: 'Чувствуете, как мысли не дают покоя даже в тишине? Тяжесть в висках — это сигнал о перегрузке. Позвольте мне вернуть вам ясность и тишину.',
        msg: 'Павел, чувствую сильное ментальное напряжение, нужна перезагрузка.'
    },
    'neck': {
        title: 'Груз на плечах',
        med: 'Гипертонус трапеции / "Офисный синдром"',
        desc: 'Здесь скапливается всё, что вы несете на себе. Плечи стремятся к ушам, защищаясь от мира. Мы мягко опустим этот груз, и вы снова начнете дышать.',
        msg: 'Павел, шея и плечи "каменные", хочу легкости.'
    },
    'shoulders': {
        title: 'Эмоциональный щит',
        med: 'Миофасциальный зажим / Психосоматика',
        desc: 'Когда мы сдерживаем эмоции, "камень" ложится именно сюда. Это ваша броня. Я помогу растопить этот лед, чтобы вы могли расслабиться по-настоящему.',
        msg: 'Павел, чувствую зажимы в лопатках и плечах.'
    },
    'back': {
        title: 'Потеря опоры',
        med: 'Люмбалгия / Спазм глубоких мышц',
        desc: 'Поясница — это ваш центр безопасности. Если здесь холодно или тянет — значит, телу не хватает чувства защищенности. Мы вернем тепло и уверенность.',
        msg: 'Павел, беспокоит поясница, не хватает ощущения опоры.'
    },
    'legs': {
        title: 'Земное притяжение',
        med: 'Лимфостаз / Отечность',
        desc: 'Ощущение, что к ногам привязали гири. Усталость от каблуков или статики мешает летать. Лимфодренаж вернет легкость каждому вашему шагу.',
        msg: 'Павел, тяжесть в ногах, нужен лимфодренаж.'
    }
};

let currentZoneMsg = '';
let typeInterval;

function showZoneInfo(zone, el) {
    if (navigator.vibrate) navigator.vibrate(10);
    
    document.querySelectorAll('.active-point').forEach(z => z.classList.remove('selected'));
    el.classList.add('selected');
    
    const data = zoneData[zone];
    currentZoneMsg = data.msg;
    
    document.getElementById('zone-title').innerText = data.title;
    document.getElementById('zone-med').innerText = data.med;
    
    const descEl = document.getElementById('zone-desc');
    descEl.innerText = '';
    const fullText = data.desc;
    let i = 0;
    
    clearInterval(typeInterval);
    
    const popup = document.getElementById('zone-popup');
    popup.style.transform = 'translateY(0)';
    
    typeInterval = setInterval(() => {
        descEl.innerText += fullText.charAt(i);
        i++;
        if (i > fullText.length - 1) clearInterval(typeInterval);
    }, 20);
}

function hideZoneInfo() {
    const popup = document.getElementById('zone-popup');
    popup.style.transform = 'translateY(120%)';
    document.querySelectorAll('.active-point').forEach(z => z.classList.remove('selected'));
    clearInterval(typeInterval);
}

function bookZone() {
    if (navigator.vibrate) navigator.vibrate(20);
    
    const btn = document.querySelector('#zone-popup button[onclick="bookZone()"]');
    const originalText = btn.innerText;
    btn.innerText = "Перехожу в чат...";
    btn.classList.add('bg-champagne', 'text-void');
    btn.classList.remove('bg-white/5');
    
    const phone = "79990000000";
    const text = encodeURIComponent(currentZoneMsg);
    
    setTimeout(() => {
        window.location.href = `https://wa.me/${phone}?text=${text}`;
        
        setTimeout(() => {
            btn.innerText = originalText;
            btn.classList.remove('bg-champagne', 'text-void');
            btn.classList.add('bg-white/5');
        }, 1000);
    }, 800);
}

// ============================================
// RITUAL STEP CHANGER
// ============================================

function changeRitualStep(step) {
    if (navigator.vibrate) navigator.vibrate(10);
    
    document.querySelectorAll('.step-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`step-btn-${step}`).classList.add('active');
    
    document.querySelectorAll('[id^="ritual-step-"]').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.pointerEvents = 'none';
    });
    
    const activeStep = document.getElementById(`ritual-step-${step}`);
    setTimeout(() => {
        activeStep.style.opacity = '1';
        activeStep.style.transform = 'translateY(0)';
        activeStep.style.pointerEvents = 'auto';
    }, 50);
    
    const progress = document.getElementById('ritual-progress');
    if(step === 1) progress.style.width = '25%';
    if(step === 2) progress.style.width = '50%';
    if(step === 3) progress.style.width = '75%';
    if(step === 4) progress.style.width = '100%';
}

// ============================================
// VIBRATE & RIPPLE EFFECTS
// ============================================

document.querySelectorAll('.btn-vibrate').forEach(btn => {
    btn.addEventListener('click', () => {
        if (navigator.vibrate) navigator.vibrate(15);
    });
});

document.addEventListener('click', function(e) {
    const target = e.target.closest('.ripple-container');
    if (target) {
        const circle = document.createElement('span');
        const diameter = Math.max(target.clientWidth, target.clientHeight);
        const radius = diameter / 2;
        const rect = target.getBoundingClientRect();
        
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${e.clientX - rect.left - radius}px`;
        circle.style.top = `${e.clientY - rect.top - radius}px`;
        circle.classList.add('ripple');
        
        const existingRipple = target.querySelector('.ripple');
        if (existingRipple) existingRipple.remove();
        
        target.appendChild(circle);
    }
});

// ============================================
// WHATSAPP LINK HANDLER
// ============================================

document.addEventListener('click', function(e) {
    const target = e.target.closest('.whatsapp-link');
    if (target) {
        e.preventDefault();
        
        const originalText = target.innerText;
        const originalWidth = target.offsetWidth;
        
        target.style.width = `${originalWidth}px`;
        target.style.justifyContent = 'center';
        target.style.textAlign = 'center';
        target.innerText = "Перехожу в чат...";
        target.classList.add('animate-pulse');
        
        setTimeout(() => {
            window.location.href = target.href;
            
            setTimeout(() => {
                target.innerText = originalText;
                target.style.width = '';
                target.style.justifyContent = '';
                target.style.textAlign = '';
                target.classList.remove('animate-pulse');
            }, 1000);
        }, 800);
    }
});

// ============================================
// LIVING STATUS ANIMATION
// ============================================

function initLivingStatus() {
    const statusContainer = document.getElementById('status-container');
    const typingContainer = document.getElementById('typing-container');
    
    if (!statusContainer || !typingContainer) return;
    
    function showTyping() {
        statusContainer.style.opacity = '0';
        statusContainer.style.transform = 'translateY(-10px)';
        
        setTimeout(() => {
            typingContainer.style.opacity = '1';
            typingContainer.style.transform = 'translateY(-50%)';
        }, 200);
        
        setTimeout(showOnline, 2500 + Math.random() * 1500);
    }
    
    function showOnline() {
        typingContainer.style.opacity = '0';
        typingContainer.style.transform = 'translateY(10px) translateY(-50%)';
        
        setTimeout(() => {
            statusContainer.style.opacity = '1';
            statusContainer.style.transform = 'translateY(0)';
        }, 200);
    }
    
    setInterval(() => {
        if (Math.random() > 0.3) {
            showTyping();
        }
    }, 10000);
}

// ============================================
// ANALYTICS TRACKING
// ============================================

document.querySelectorAll('[data-analytics]').forEach(el => {
    el.addEventListener('click', () => {
        console.log(`Analytics Event: ${el.getAttribute('data-analytics')}`);
    });
});
