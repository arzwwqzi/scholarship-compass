document.addEventListener('DOMContentLoaded', () => {
    // Находим все кнопки навигации
    const navItems = document.querySelectorAll('.nav-item');
    const views = document.querySelectorAll('.view');

    function switchTab(targetView) {
        if (!targetView) return;

        // Скрываем все экраны
        views.forEach(view => {
            view.classList.remove('active');
        });

        // Снимаем активный класс со всех кнопок
        navItems.forEach(nav => {
            nav.classList.remove('active');
        });

        // Показываем нужный экран
        const activeView = document.getElementById(`view-${targetView}`);
        if (activeView) {
            activeView.classList.add('active');
        }

        // Подсвечиваем активные кнопки
        document.querySelectorAll(`.nav-item[data-target="${targetView}"]`).forEach(nav => {
            nav.classList.add('active');
        });
    }

    // Вешаем событие клика на каждую кнопку навигации
    document.addEventListener('click', (e) => {
        const navItem = e.target.closest('.nav-item');
        if (navItem) {
            const target = navItem.getAttribute('data-target');
            if (target) {
                switchTab(target);
            }
        }
    });
});
