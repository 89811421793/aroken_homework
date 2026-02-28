const bag = document.querySelector(".header__bag");

document.querySelectorAll(".offers__card").forEach((card) => {
  const group = card.querySelector(".offers__quantity-controls");
  const [minus, plus] = group.querySelectorAll(".offers__qty-btn");
  const val = group.querySelector(".offers__qty-value");
  const addBtn = card.querySelector(".offers__add-to-cart-btn");

  minus.disabled = parseInt(val.textContent) <= 0;

  // добавить или убавить товар
  group.addEventListener("click", (e) => {
    const btn = e.target.closest(".offers__qty-btn");
    if (!btn) return;

    let count = parseInt(val.textContent);
    btn === plus ? count++ : count > 0 && count--;

    val.textContent = count;
    minus.disabled = count <= 0;
  });

  // перенос в кошелек и очистка спана
  addBtn.addEventListener("click", () => {
    const count = parseInt(val.textContent);
    if (count <= 0) return;

    // перенос в шапку (любое набранное число)
    const current = parseInt(bag.getAttribute("data-count") || 0);
    bag.setAttribute("data-count", current + count);
    bag.classList.add("header__bag--full");

    // Сброс в 0 после добавления
    val.textContent = 0;
    minus.disabled = true;
  });
});
