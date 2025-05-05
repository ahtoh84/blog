// 主题管理器
const ThemeManager = {
    // 主题类型
    themes: {
        LIGHT: 'light',
        DARK: 'dark'
    },

    // 初始化
    init() {
        try {
            // 检查localStorage可用性
            if (!this.isStorageAvailable()) {
                console.warn('localStorage不可用，主题偏好将不会被保存');
            }

            // 设置初始主题
            this.applyInitialTheme();
            
            // 绑定主题切换事件
            this.bindThemeToggle();
        } catch (error) {
            console.error('主题初始化失败:', error);
        }
    },

    // 检查localStorage可用性
    isStorageAvailable() {
        try {
            localStorage.setItem('test', 'test');
            localStorage.removeItem('test');
            return true;
        } catch (e) {
            return false;
        }
    },

    // 获取系统主题偏好
    getSystemTheme() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches
            ? this.themes.DARK
            : this.themes.LIGHT;
    },

    // 获取保存的主题
    getSavedTheme() {
        return this.isStorageAvailable()
            ? localStorage.getItem('theme')
            : null;
    },

    // 设置主题
    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        if (this.isStorageAvailable()) {
            localStorage.setItem('theme', theme);
        }
    },

    // 应用初始主题
    applyInitialTheme() {
        const savedTheme = this.getSavedTheme();
        const initialTheme = savedTheme || this.getSystemTheme();
        this.setTheme(initialTheme);
    },

    // 切换主题
    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === this.themes.DARK
            ? this.themes.LIGHT
            : this.themes.DARK;
        this.setTheme(newTheme);
    },

    // 绑定主题切换事件
    bindThemeToggle() {
        const themeToggle = document.querySelector('.theme-toggle');
        if (!themeToggle) {
            console.warn('未找到主题切换按钮');
            return;
        }

        themeToggle.addEventListener('click', () => this.toggleTheme());
    }
};

// 在DOM加载完成后初始化主题管理器
document.addEventListener('DOMContentLoaded', () => {
    ThemeManager.init();
});
