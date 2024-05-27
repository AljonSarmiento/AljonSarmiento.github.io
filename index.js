const btnLike1 = document.getElementById("btnLike1");
const count1 = document.getElementById("count1");
const btnLike2 = document.getElementById("btnLike2");
const count2 = document.getElementById("count2"); 

function countLike1() {
  let likeCounts = parseInt(count1.value) + 1;
  count1.textContent = likeCounts.toString();
}

function countLike2() {
  let likeCounts = parseInt(count2.value) + 1;
  count2.textContent = likeCounts.toString();
}

const btnDLike1 = document.getElementById("btnDLike1");
const countD1 = document.getElementById("countD1"); 
const btnDLike2 = document.getElementById("btnDLike2");
const countD2 = document.getElementById("countD2"); 

function countDLike1() {
  let likeCounts = parseInt(countD1.value) + 1;
  countD1.textContent = likeCounts.toString();
}

function countDLike2() {
  let likeCounts = parseInt(countD2.value) + 1;
  countD2.textContent = likeCounts.toString();
}

btnLike1.addEventListener("click", countLike1);
btnLike2.addEventListener("click", countLike2);
btnDLike1.addEventListener("click", countDLike1);
btnDLike2.addEventListener("click", countDLike2);


