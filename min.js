// 主题切换功能
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.querySelector('.theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // 从本地存储中获取主题设置
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
    } else if (prefersDarkScheme.matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        let targetTheme = 'light';
        
        if (!currentTheme || currentTheme === 'light') {
            targetTheme = 'dark';
        }
        
        document.documentElement.setAttribute('data-theme', targetTheme);
        localStorage.setItem('theme', targetTheme);
    });
});

// 在 DOM 加载前执行
  (function() {
    const theme = localStorage.getItem('theme') || 
                  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
  })();

// iMessage 效果
document.addEventListener('DOMContentLoaded', () => {
    const targets = document.querySelectorAll('.bubble, .interstitial, .single-image');
    
    // 检查是否找到目标元素
    if (targets.length === 0) {
        console.warn('未找到iMessage目标元素');
        return;
    }

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                entry.target.classList.toggle("visible", entry.isIntersecting)
            })
        },
        { threshold: .2 }
    );

    targets.forEach(target => {
        observer.observe(target);
    });

    // 清理函数
    window.addEventListener('unload', () => {
        targets.forEach(target => {
            observer.unobserve(target);
        });
        observer.disconnect();
    });
});
