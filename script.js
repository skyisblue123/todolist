const list = document.querySelector(".list");
const txt = document.querySelector(".txt");
const btn = document.querySelector(".btn_add");
const tab = document.querySelector(".tab");
const tabLi = document.querySelectorAll(".tab li");
const clear = document.querySelector(".clear");
const count = document.querySelector(".count");

let data = [];

//渲染
function renderData() {
  let count2 = 0;
  let str = "";
  data.forEach(function (item, index) {
    if (item.checked == "") {
      count2 += 1;
      if (toggleTab == "all" || toggleTab == "undone") {
        str += `<li >
    <label class="checkbox" for="">
    <input type="checkbox" data-num="${index}"/>
    <span>${item.content}</span>
    </label>
    <a href="#" class="delete" data-num="${index}"></a>
    </li>`;
      }
    } else if (
      (item.checked == "checked" && toggleTab == "all") ||
      (item.checked == "checked" && toggleTab == "done")
    ) {
      //在input加checked，已完成的項目會畫橫線
      str += `<li >
    <label class="checkbox" for="">
    <input type="checkbox" checked data-num="${index}"/> 
    <span>${item.content}</span>
    </label>
    <a href="#" class="delete" data-num="${index}"></a>
    </li>`;
    }
  });
  list.innerHTML = str;
  count.textContent = count2;
}

//checked值變換,影響待完成已完成的顯示項目!!!
list.addEventListener("click", function (e) {
  let num = e.target.closest("input").dataset.num;
  if (data[num].checked == "") {
    data[num].checked = "checked"; //沒打勾的打勾
    console.log("hello");
  } else if (data[num].checked == "checked") {
    data[num].checked = ""; //打勾的取消
  }
});

//定義物件格式
function add() {
  let obj = {};
  obj.content = txt.value;
  obj.checked = "";
  data.push(obj);
  renderData();
  txt.value = "";
}

//按enter新增
txt.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    add();
  }
});

//按+號新增
btn.addEventListener("click", function (e) {
  add();
});

//刪除待辦事項
list.addEventListener("click", function (e) {
  if (e.target.getAttribute("class") !== "delete") {
    return;
  }
  let num = e.target.getAttribute("data-num");
  data.splice(num, 1);
  renderData();
  return;
});

// 一鍵清除
clear.addEventListener("click", function (e) {
  let newData = [];
  console.log(data);
  data.forEach(function (item) {
    if (item.checked == "") {
      newData.push(item);
      console.log("hello");
    }
  });
  data = newData;
  renderData();
});

// 切換 tab
// active 在 html 屬性中是可以讓網頁呈現 tab 型式
// 預設為第一個 tab 為全部
let toggleTab = "all";
tab.addEventListener("click", function (e) {
  // 每次點擊 tab 清空所有 tab li 的 active
  tabLi.forEach(function (item) {
    item.setAttribute("class", "");
  });
  // 給當前點擊的 tab 添加 active
  e.target.setAttribute("class", "active");
  // 更新當前的 tab
  toggleTab = e.target.getAttribute("data-status");
  renderData();
});