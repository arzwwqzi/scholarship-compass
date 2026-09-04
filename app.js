// 1. ДАННЫЕ ПРОГРАММ
const opportunities = [
    {
        id: 1,
        title: "Международная олимпиада по математике",
        type: "Олимпиады",
        format: "Онлайн",
        targetGrade: "10 класс",
        country: "Казахстан",
        deadline: "3 дня",
        icon: "🎓",
        bgColor: "#E8E0FF"
    },
    {
        id: 2,
        title: "Летняя экологическая программа",
        type: "Летние школы",
        format: "Офлайн",
        targetGrade: "10 класс",
        country: "Казахстан",
        deadline: "5 дней",
        icon: "🌿",
        bgColor: "#E8F5E9"
    },
    {
        id: 3,
        title: "Грант на обучение FLEX (США)",
        type: "Обмен",
        format: "Офлайн",
        targetGrade: "9-10 класс",
        country: "Казахстан",
        deadline: "12 дней",
        icon: "✈️",
        bgColor: "#E6F0FF"
    }
];

// Хранилище сохранённых ID возможностей
let savedOppIds = JSON.parse(localStorage.getItem("savedOppIds")) || [];

// 2. РАСЧЁТ MATCH %
function calculateMatch(opp, userProfile) {
    let score = 50;

    if (!userProfile.grade && !userProfile.country) return 75;

    if (userProfile.grade && opp.targetGrade.toLowerCase().includes(userProfile.grade.toLowerCase())) {
        score += 30;
    }

    if (userProfile.country && userProfile.country.toLowerCase().includes(opp.country.toLowerCase())) {
        score += 20;
    }

    return Math.min(score, 99);
}

// 3. ОБНОВЛЕНИЕ МАТЧЕЙ
function updateMatchPercentages() {
    const userProfile = {
        grade: localStorage.getItem("userGrade") || "",
        country: localStorage.getItem("userCountry") || ""
    };

    const matchBadges = document.querySelectorAll(".match");
    matchBadges.forEach((badge, index) => {
        if (opportunities[index]) {
            const percent = calculateMatch(opportunities[index], userProfile);
            badge.textContent = `${percent}%`;
        }
    });
}

// 4. РЕНДЕР СОХРАНЁННЫХ КАРТОЧЕК
function renderSavedOpportunities() {
    const savedContainer = document.querySelector("#view-saved .screen-content");
    if (!savedContainer) return;

    const savedItems = opportunities.filter(opp => savedOppIds.includes(opp.id));

    if (savedItems.length === 0) {
        savedContainer.innerHTML = `
            <div style="text-align: center; color: #8E8E93; margin-top: 40px;">
                <p style="font-size: 40px; margin-bottom: 10px;">🔖</p>
                <p style="font-weight: 600;">У вас пока нет сохранённых программ</p>
                <p style="font-size: 13px; margin-top: 4px;">Нажмите на закладку у любой программы, чтобы добавить её сюда</p>
            </div>
        `;
        return;
    }

    const userProfile = {
        grade: localStorage.getItem("userGrade") || "",
        country: localStorage.getItem("userCountry") || ""
    };

    savedContainer.innerHTML = savedItems.map(opp => `
        <div class="opportunity-card" data-id="${opp.id}">
            <div class="opp-icon" style="background:${opp.bgColor}">${opp.icon}</div>
            <div class="opp-info">
                <div class="opp-title">${opp.title}</div>
                <div class="opp-tags">
                    <span class="tag">${opp.format}</span>
                    <span class="tag">${opp.targetGrade}</span>
                </div>
            </div>
            <div class="opp-right">
                <span class="match">${calculateMatch(opp, userProfile)}%</span>
                <button class="save-btn active" data-id="${opp.id}" style="color: #FF3B30;">🔖</button>
            </div>
        </div>
    `).join("");

    attachSaveListeners();
}

// 5. ОБРАБОТКА ИЗБРАННОГО
function attachSaveListeners() {
    const saveBtns = document.querySelectorAll(".save-btn");
    saveBtns.forEach(btn => {
        const id = Number(btn.getAttribute("data-id")) || 1;
        
        if (savedOppIds.includes(id)) {
            btn.classList.add("active");
            btn.style.opacity = "1";
        } else {
            btn.classList.remove("active");
            btn.style.opacity = "0.5";
        }

        btn.onclick = (e) => {
            e.stopPropagation();
            toggleSave(id);
        };
    });
}

function toggleSave(id) {
    if (savedOppIds.includes(id)) {
        savedOppIds = savedOppIds.filter(savedId => savedId !== id);
    } else {
        savedOppIds.push(id);
    }

    localStorage.setItem("savedOppIds", JSON.stringify(savedOppIds));
    attachSaveListeners();
    renderSavedOpportunities();
}

// 6. ПОИСК И ФИЛЬТРАЦИЯ
function setupSearch() {
    const searchInputs = document.querySelectorAll(".search-box input");
    searchInputs.forEach(input => {
        input.addEventListener("input", (e) => {
            filterCards(e.target.value.toLowerCase());
        });
    });
}

function filterCards(query) {
    const cards = document.querySelectorAll(".opportunity-card, .deadline-card");
    cards.forEach(card => {
        const title = card.querySelector(".opp-title, h3")?.textContent.toLowerCase() || "";
        if (title.includes(query)) {
            card.style.display = "flex";
        } else {
            card.style.display = "none";
        }
    });
}

// 7. НАЖАТИЕ НА КАТЕГОРИИ
function setupCategories() {
    const categoryItems = document.querySelectorAll(".cat-item");
    categoryItems.forEach(item => {
        item.addEventListener("click", () => {
            // Извлекаем название категории (без иконки/эмодзи)
            let categoryText = item.textContent.trim().replace(/^[\s\S]*?\s/, '');
            
            if (categoryText === "Ещё" || !categoryText) return;

            // 1. Переключаем на экран Каталога
            const catalogNavBtn = document.querySelector('.bottom-nav .nav-item[data-target="catalog"]');
            if (catalogNavBtn) catalogNavBtn.click();

            // 2. Вставляем название категории в поиск Каталога и фильтруем
            const catalogSearchInput = document.querySelector("#view-catalog .search-box input");
            if (catalogSearchInput) {
                catalogSearchInput.value = categoryText;
                filterCards(categoryText.toLowerCase());
            }
        });
    });
}

// 8. ИНИЦИАЛИЗАЦИЯ И НАВИГАЦИЯ
document.addEventListener("DOMContentLoaded", () => {
    const navItems = document.querySelectorAll(".bottom-nav .nav-item");
    const views = document.querySelectorAll(".view");

    navItems.forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            const target = item.getAttribute("data-target");

            navItems.forEach(i => i.classList.remove("active"));
            views.forEach(v => v.classList.remove("active"));

            item.classList.add("active");

            const targetView = document.getElementById(`view-${target}`);
            if (targetView) {
                targetView.classList.add("active");
            }

            if (target === "saved") {
                renderSavedOpportunities();
            }
        });
    });

    // Загрузка профиля
    const nameInput = document.getElementById("user-name");
    const gradeInput = document.getElementById("user-grade");
    const countryInput = document.getElementById("user-country");

    if (nameInput) nameInput.value = localStorage.getItem("userName") || "";
    if (gradeInput) gradeInput.value = localStorage.getItem("userGrade") || "";
    if (countryInput) countryInput.value = localStorage.getItem("userCountry") || "";

    // Сохранение профиля
    const profileForm = document.getElementById("profile-form");
    if (profileForm) {
        profileForm.addEventListener("submit", (e) => {
            e.preventDefault();

            localStorage.setItem("userName", nameInput.value);
            localStorage.setItem("userGrade", gradeInput.value);
            localStorage.setItem("userCountry", countryInput.value);

            alert("Профиль успешно сохранён!");
            updateMatchPercentages();
        });
    }

    updateMatchPercentages();
    attachSaveListeners();
    setupSearch();
    setupCategories();
    renderSavedOpportunities();
});
