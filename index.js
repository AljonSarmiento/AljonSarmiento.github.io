const btnLike1 = document.getElementById("btnLike1");
const count1 = document.getElementById("count1");

function countLike1() {
  let likeCounts = parseInt(count1.value) + 1;
  count1.textContent = likeCounts.toString();
}

btnLike1.addEventListener("click", countLike1);
