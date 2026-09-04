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

    // --- ЛОГИКА ПРОФИЛЯ И LOCALSTORAGE ---
    const profileForm = document.getElementById('profile-form');
    const nameInput = document.getElementById('user-name');
    const gradeInput = document.getElementById('user-grade');
    const countryInput = document.getElementById('user-country');
    const headerTitle = document.querySelector('#view-home .screen-header h1');

    // 1. Загружаем сохранённые данные при старте
    function loadProfile() {
        const savedName = localStorage.getItem('user_name') || 'Алия';
        const savedGrade = localStorage.getItem('user_grade') || '10 класс';
        const savedCountry = localStorage.getItem('user_country') || 'Казахстан';

        if (nameInput) nameInput.value = savedName;
        if (gradeInput) gradeInput.value = savedGrade;
        if (countryInput) countryInput.value = savedCountry;
        
        // Обновляем приветствие на главной
        if (headerTitle) headerTitle.textContent = `Привет, ${savedName} 👋`;
    }

    // 2. Сохраняем новые данные по клику на кнопку
    if (profileForm) {
        profileForm.addEventListener('submit', (e) => {
            e.preventDefault();

            localStorage.setItem('user_name', nameInput.value);
            localStorage.setItem('user_grade', gradeInput.value);
            localStorage.setItem('user_country', countryInput.value);

            // Обновляем приветствие
            if (headerTitle) headerTitle.textContent = `Привет, ${nameInput.value} 👋`;

            alert('Профиль успешно сохранен!');
        });
    }

    // Вызываем загрузку при старте
    loadProfile();
});     
    });
});
