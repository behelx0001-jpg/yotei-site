const resultsDiv = document.getElementById("results");
const roleFilter = document.getElementById("roleFilter");

const listings = [
    {role: "buyer", title: "Квартира у Києві"},
    {role: "seller", title: "Продається будинок у Львові"},
    {role: "landlord", title: "Здаю офіс в Одесі"},
    {role: "tenant", title: "Шукаю квартиру в Харкові"},
];

function showResults() {
    const role = roleFilter.value;
    const filtered = listings.filter(item => item.role === role);
    resultsDiv.innerHTML = filtered.map(item => `<p>${item.title}</p>`).join('');
}

roleFilter.addEventListener("change", showResults);

// Показать по умолчанию
showResults();