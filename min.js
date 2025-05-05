// 主题管理模块
const ThemeManager = {
    init() {
        this.themeToggle = document.querySelector('.theme-toggle');
        if (!this.themeToggle) return;
        
        // 初始化主题
        const savedTheme = localStorage.getItem('theme');
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        const initialTheme = savedTheme || systemTheme;
        
        this.setTheme(initialTheme);
        this.bindEvents();
    },

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    },

    bindEvents() {
        this.themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            this.setTheme(newTheme);
        });
    }
};

// iMessage 效果管理模块
const MessageEffectManager = {
    init() {
        this.targets = document.querySelectorAll('.bubble, .interstitial, .single-image');
        if (!this.targets.length) return;

        this.observer = new IntersectionObserver(
            this.handleIntersection.bind(this),
            { threshold: 0.2 }
        );

        this.observeTargets();
    },

    handleIntersection(entries) {
        entries.forEach(entry => {
            entry.target.classList.toggle("visible", entry.isIntersecting);
        });
    },

    observeTargets() {
        this.targets.forEach(target => {
            this.observer.observe(target);
        });
    },

    cleanup() {
        if (this.observer) {
            this.targets.forEach(target => {
                this.observer.unobserve(target);
            });
            this.observer.disconnect();
        }
    }
};

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    ThemeManager.init();
    MessageEffectManager.init();
});

// 清理
window.addEventListener('unload', () => {
    MessageEffectManager.cleanup();
});
