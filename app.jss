document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');
    const views = document.querySelectorAll('.view');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetView = item.getAttribute('data-target');
            if (!targetView) return;

            // Снимаем класс active со всех кнопок навигации и экранов
            document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
            views.forEach(view => view.classList.remove('active'));

            // Активируем нужные кнопки на всех экранах
            document.querySelectorAll(`.nav-item[data-target="${targetView}"]`).forEach(nav => {
                nav.classList.add('active');
            });

            // Показываем целевой экран
            const activeView = document.getElementById(`view-${targetView}`);
            if (activeView) {
                activeView.classList.add('active');
            }
        });
    });
});
