// 1. ДАННЫЕ ПРОГРАММ
const opportunities = [
    {
        id: 1,
        title: "Международная олимпиада по математике",
        targetGrade: "10 класс",
        country: "Казахстан"
    },
    {
        id: 2,
        title: "Летняя экологическая программа",
        targetGrade: "10 класс",
        country: "Казахстан"
    }
];

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

// 3. ОБНОВЛЕНИЕ MATCH %
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

// 4. ПЕРЕКЛЮЧЕНИЕ ЭКРАНОВ И ИНИЦИАЛИЗАЦИЯ
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
});
