const stockRoom = {
  "dyson-1": 0,
  "dyson-2": 5,
  "dyson-3": 9,
  "dyson-4": 3,
  "dyson-5": 6,
  "dyson-6": 4,
};

document.querySelectorAll(".offers__card").forEach((card) => {
  const productId = card.dataset.id; // Более современный способ записи getAttribute('data-id')
  const stock = stockRoom[productId];

  // Если товара 0 ИЛИ его вообще нет в базе (undefined)
  if (stock === 0 || stock === undefined) {
    const status = card.querySelector(".offers__status-available");
    const btn = card.querySelector(".offers__add-to-cart-btn");
    const controls = card.querySelector(".offers__quantity-controls");
    const qtyValue = card.querySelector(".offers__qty-value");

    if (status) status.classList.add("offers__status-available--unavailable");

    // if (btn) {
    //   btn.disabled = true;
    //   btn.textContent = "Нет в наличии";
    // }

    if (controls) {
      controls.style.opacity = "0.5";
      controls.style.pointerEvents = "none";
    }

    if (qtyValue) qtyValue.textContent = "0";
  }
});
