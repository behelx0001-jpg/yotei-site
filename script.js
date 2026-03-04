const operation = document.getElementById("operation").value;
const type = document.getElementById("type").value;
const city = document.getElementById("city").value.toLowerCase();
const priceFrom = document.getElementById("priceFrom").value;
const priceTo = document.getElementById("priceTo").value;
const roomsFrom = document.getElementById("roomsFrom").value;
const roomsTo = document.getElementById("roomsTo").value;
const area = document.getElementById("area").value;
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

const properties = [
    {
        operation: "Купити",
        type: "Квартира",
        city: "Київ",
        price: 95000,
        rooms: 2,
        area: 60,
        title: "2-кімнатна квартира в центрі Києва",
        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"
    },
    {
        operation: "Орендувати",
        type: "Квартира",
        city: "Львів",
        price: 800,
        rooms: 1,
        area: 40,
        title: "1-кімнатна квартира у Львові",
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688"
    },
    {
        operation: "Купити",
        type: "Будинок",
        city: "Київ",
        price: 180000,
        rooms: 4,
        area: 150,
        title: "Будинок з садом",
        image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb"
    }
];

document.querySelector(".search-btn").addEventListener("click", function () {

    const operation = document.querySelectorAll("select")[0].value;
    const type = document.querySelectorAll("select")[1].value;
    const city = document.querySelectorAll("input")[0].value.toLowerCase();
    const priceFrom = document.querySelectorAll("input")[1].value;
    const priceTo = document.querySelectorAll("input")[2].value;
    const roomsFrom = document.querySelectorAll("input")[3].value;
    const roomsTo = document.querySelectorAll("input")[4].value;
    const area = document.querySelectorAll("input")[5].value;

    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    const filtered = properties.filter(p =>
        p.operation === operation &&
        p.type === type &&
        (city === "" || p.city.toLowerCase().includes(city)) &&
        (priceFrom === "" || p.price >= priceFrom) &&
        (priceTo === "" || p.price <= priceTo) &&
        (roomsFrom === "" || p.rooms >= roomsFrom) &&
        (roomsTo === "" || p.rooms <= roomsTo) &&
        (area === "" || p.area >= area)
    );

    if (filtered.length === 0) {
        resultsDiv.innerHTML = "<p style='margin-top:20px;'>Нічого не знайдено 😔</p>";
        return;
    }

    filtered.forEach(p => {
        resultsDiv.innerHTML += `
            <div class="card">
                <img src="${p.image}">
                <div class="card-info">
                    <h3>${p.title}</h3>
                    <p>📍 ${p.city}</p>
                    <p>🏠 ${p.rooms} кімнати</p>
                    <p>📐 ${p.area} м²</p>
                    <p>💰 ${p.price} $</p>
                </div>
            </div>
        `;
    });
});

