// The tic-tac-t

const main_container = document.querySelector(".main-container");

const result_div = document.querySelector(".show-result");

const reset_butt = document.createElement("button");
const reset_butt_svg = document.createElement("img");
reset_butt_svg.src ="./icons/reset-svgrepo-com.svg"
reset_butt.appendChild(reset_butt_svg);

const result_announce = document.createElement("p");
result_announce.classList.add("result-ann");
//result_announce.textContent = "Junaid khan wins!!";

result_div.appendChild(reset_butt);
result_div.appendChild(result_announce);