// The tic-tac-t

// Selectors..
const p1Name = document.getElementById("p1-name");
const p1Score = document.getElementById("p1-score");

const p2Name = document.getElementById("p2-name");
const p2Score = document.getElementById("p2-score")

const result_div = document.querySelector(".show-result");

const reset_butt = document.createElement("button");
reset_butt.type = "button";
const reset_butt_svg = document.createElement("img");
reset_butt_svg.src ="./icons/reset-svgrepo-com.svg"
reset_butt.appendChild(reset_butt_svg);

result_div.appendChild(reset_butt);

// This FF here is used for storing score & name (private & separate)
const gameKeep = (name) => {
    let score = 0;
    const setScore = () => `Score : ${score}`;
    const getScore = () => score;
    const setName = () => `Name : ${name}`;
    const getName = () => name;
    const win = () => {
        ++score;
    };
    
    return {
        win,
        setScore,
        setName,
        getScore,
        getName,
    }
}
// score update
const updateScore = () => {
    p1Score.textContent = player_1.setScore();
    p2Score.textContent = player_2 .setScore();
}

let player_1 = '';
let player_2 = '';

// The dialog.
const dialog = (() => {
    const name_dialog = document.createElement("dialog");
    name_dialog.classList.add("start-dialog");

    const player_1_name = document.createElement("input");
    player_1_name.type = "text";
    player_1_name.placeholder = "Player 1 name.";
    const player_2_name = document.createElement("input");
    player_2_name.type = "text";
    player_2_name.placeholder = "Player 2 name.";
    const submit_dialog = document.createElement("button");
    submit_dialog.type = "button"
    submit_dialog.textContent = "Start";

    name_dialog.appendChild(player_1_name);
    name_dialog.appendChild(player_2_name);
    name_dialog.appendChild(submit_dialog);

    document.body.appendChild(name_dialog);
    name_dialog.showModal();

    submit_dialog.addEventListener("click", (e) => {
        player_1 = gameKeep(player_1_name.value);
        player_2 = gameKeep(player_2_name.value);

        p1Name.textContent = player_1.setName();
        p1Score.textContent = player_1.setScore();
        p2Name.textContent = player_2.setName();
        p2Score.textContent = player_2.setScore();        

        name_dialog.style.display = "none";
        name_dialog.close();    
    })
    return {
        player_1_name,
        player_2_name,
    }
})();

