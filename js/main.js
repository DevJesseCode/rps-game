const player = {
    options: [],
    picked: document.querySelector(".picked.player"),
    played: false,
};
const score = {
    player: document.querySelector("#player-score"),
    cpu: document.querySelector("#cpu-score"),
    scoreline: [0, 0],
};;
const cpuOptions = ["rock", "paper", "scissors"];
const cpuLogic = () => {
    const cpuPlayed = Math.floor(Math.random() * 3);
    const playerPlayed = cpuOptions.indexOf(player.played);
    document.querySelector(".picked.cpu").src = `./img/${cpuOptions[cpuPlayed]}.png`
    let cpuSuper = (cpuPlayed + 1) % 3;
    let playerSuper = (playerPlayed + 1) % 3;
    if (playerPlayed === cpuSuper) {
        score.scoreline[0]++;
        score.player.textContent = score.scoreline[0];
        if (score.scoreline[0] === 3) win("player");
    } else if (cpuPlayed === playerSuper) {
        score.scoreline[1]++;
        score.cpu.textContent = score.scoreline[1];
        if (score.scoreline[1] === 3) win("cpu")
    }
    player.played = false;
};
const win = who => {
    switch (who) {
        case "cpu":
            document.querySelector(".score").innerHTML = "CPU win";
            setTimeout(() => { location.reload() }, 1500);
            break;
        case "player":
            document.querySelector(".score").innerHTML = "Player win";
            setTimeout(() => { location.reload() }, 1500);
            break;
        default:
            console.log("Invalid argument");
            break;
    }
}
document.querySelectorAll(".option").forEach(element => {
    if (element.classList.contains("player")) player.options.push(element);
});
player.options.forEach(option => {
    option.addEventListener("mousemove", (e) => {
        if (!player.played) {
            player.picked.src = e.target.src;
        };
    });
    option.addEventListener("click", (e) => {
        if (!player.played) {
            player.picked.src = e.target.src;
        };
        if (e.target.classList.contains("rock")) {
            player.played = "rock"
        } else if (e.target.classList.contains("paper")) {
            player.played = "paper"
        } else if (e.target.classList.contains("scissors")) {
            player.played = "scissors"
        };
        cpuLogic();
    })
});