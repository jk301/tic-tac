// The tic-tac-t

// Selectors..
const p1Name = document.getElementById("p1-name");
const p1Score = document.getElementById("p1-score");
const p2Name = document.getElementById("p2-name");
const p2Score = document.getElementById("p2-score");

const show_turn = document.querySelector(".curr-turn");

const result_div = document.querySelector(".show-result");
const reset_butt = document.createElement("button");
reset_butt.type = "button";
const reset_butt_svg = document.createElement("img");
reset_butt_svg.src ="./icons/reset-svgrepo-com.svg";
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

    const text = document.createElement("p");
    text.textContent = "Tic-Tac";
    const player_1_name = document.createElement("input");
    player_1_name.type = "text";
    player_1_name.placeholder = "Player 1 name.";
    const player_2_name = document.createElement("input");
    player_2_name.type = "text";
    player_2_name.placeholder = "Player 2 name.";
    const submit_dialog = document.createElement("button");
    submit_dialog.type = "button";
    submit_dialog.textContent = "Start";

    name_dialog.appendChild(text);
    name_dialog.appendChild(player_1_name);
    name_dialog.appendChild(player_2_name);
    name_dialog.appendChild(submit_dialog);

    document.body.appendChild(name_dialog);
    name_dialog.showModal();

    submit_dialog.addEventListener("click", (e) => {
        player_1 = gameKeep(player_1_name.value || "Player 1");
        player_2 = gameKeep(player_2_name.value || "Player 2");

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


const grid = (() => {
    const array_cells = [...document.querySelectorAll(".array-grid .grid-cell")];
    let grid_obj = [];
    let turn_counter = 0;
    const win_cond = [
        [0, 1, 2], // top 
        [3, 4, 5], // middle
        [6, 7, 8], // bottom
        [0, 3, 6], // left 
        [1, 4, 7], // middle 
        [2, 5, 8], // right
        [0, 4, 8], // \
        [2, 4, 6], // /
    ];

    // Over the grid Result.
    const overlay = document.createElement("div");
    overlay.classList.add("array-overlay");

    const result_overlay = (wintext) => {
        const array_grid = document.querySelector(".array-grid");
        const winner_ann = document.createElement("p");
        const reset_text = document.createElement("p");

        winner_ann.textContent = wintext;
        reset_text.textContent = "for another round press the reset button >>>";

        overlay.appendChild(winner_ann);
        overlay.appendChild(reset_text);
        overlay.style.display = "flex";
        array_grid.appendChild(overlay);
    }

    // The reset button
    reset_butt.addEventListener("click", () => {
        grid_obj = [];
        if (turn_counter % 2 !== 0) {
            show_turn.textContent = "X";
            turn_counter = 0;
        } else {
            show_turn.textContent = "O";
            turn_counter = 1;
        }

        array_cells.forEach((item) => {
            item.textContent = "";
        })
        overlay.innerHTML = ""
        overlay.style.display = "none";
    })

    // "?." Will return undefined instead of Typerror when init.
    const getItemOfIndex = (index) => grid_obj.find((obj) => obj.index === index)?.item;

    // checking through the win conditions
    const winCheck = () => {
        return win_cond.find(([a,b,c]) => {
            return getItemOfIndex(a) &&
            getItemOfIndex(a) === getItemOfIndex(b) &&
            getItemOfIndex(b) === getItemOfIndex(c)
        })
    }

    array_cells.forEach((item, index) => {
        item.addEventListener("click", () => {
            if (item.textContent) return;
            if (!item.textContent && turn_counter % 2 == 0) {
                show_turn.textContent = "O";
                item.textContent = "X";
                ++turn_counter;
            } else if (!item.textContent && turn_counter % 2 != 0) {
                show_turn.textContent = "X";
                item.textContent = "O";
                ++turn_counter;
            }

            grid_obj.push({index, item : item.textContent,});
            console.log(grid_obj)
            
            const winner = winCheck();

            if (winner) {
                const getItem = getItemOfIndex(winner[0]);
                if (getItem === "X") {
                    player_1.win();
                    updateScore();
                    show_turn.textContent = "";
                    result_overlay(`${player_1.getName()} WON.`);
                    console.log(`${player_1.getName()} WON the Round!!`);
                } else if (getItem === "O") {
                    player_2.win();
                    updateScore();
                    show_turn.textContent = "";
                    result_overlay(`${player_2.getName()} WON.`);
                    console.log(`${player_2.getName()} WON the Round!!`);
                }
            } else if (grid_obj.length === 9) {
                result_overlay(`Dead game`);
                console.log("Dead game");
            }

        })

    })

})();
