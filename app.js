const menuArea = document.getElementById("menuArea");
const totalCountEl = document.getElementById("totalCount");
const submitBtn = document.getElementById("submitOrderBtn");

let cart = [];

function renderMenu() {
  menuArea.innerHTML = "";

  menuData.forEach((cat) => {
    const block = document.createElement("div");
    block.className = "category-block";

    const title = document.createElement("h2");
    title.className = "category-title";
    title.textContent = cat.category;

    const list = document.createElement("div");
    list.className = "menu-list";

    cat.items.forEach((item) => {
      const row = document.createElement("div");
      row.className = "menu-row";

      const name = document.createElement("div");
      name.className = "item-name";
      name.textContent = item;

      const btn = document.createElement("button");
      btn.textContent = "追加";
      btn.className = "qty-btn";

      btn.onclick = () => {
        cart.push({
          name: item
        });
        updateCart();
      };

      row.appendChild(name);
      row.appendChild(btn);
      list.appendChild(row);
    });

    block.appendChild(title);
    block.appendChild(list);
    menuArea.appendChild(block);
  });
}

function updateCart() {
  totalCountEl.textContent = cart.length;
}

submitBtn.onclick = async () => {
  if (cart.length === 0) return;

  try {
    await firebaseAddDoc(
      firebaseCollection(firebaseDb, "orders"),
      {
        items: cart,
        course: "飲み放題",
        createdAt: firebaseServerTimestamp()
      }
    );

    alert("注文完了！");
    cart = [];
    updateCart();
  } catch (e) {
    alert("エラー");
    console.error(e);
  }
};

renderMenu();