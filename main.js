(() => {
  document.addEventListener("DOMContentLoaded", () => {
    let all_cards = document.getElementsByClassName("card");
    let first_card = "";
    const APP = document.getElementById("pairs");
    function startGame(countCard) {
      const HEADER = document.createElement("h1");
      const MAIN = document.createElement("main");
      const BUTTON = document.createElement("a");
      const TIMER = document.createElement("h2");
      HEADER.textContent = "Пары";
      MAIN.classList.add("game");
      MAIN.id = "game";
      BUTTON.textContent = "Сыграть заново";
      BUTTON.href = "#";
      BUTTON.id = "newgame";
      BUTTON.classList.add("btn");
      TIMER.textContent = "осталось 60 секунд";
      TIMER.classList.add("timer");
      TIMER.id = "timer";
      for (let i = 0; countCard > i; i++) {
        let itm = document.createElement("div");
        itm.classList.add("card");
        itm.classList.add("hidden");
        itm.id = String(i + 1);
        let div = document.createElement("div");
        itm.append(div);
        MAIN.append(itm);
      }
      return {
        HEADER,
        MAIN,
        BUTTON,
        TIMER,
      };
    }
    let content = startGame(16);
    APP.append(content.HEADER);
    APP.append(content.TIMER);
    APP.append(content.MAIN);
    APP.append(content.BUTTON);
    function createNumbersArray(count) {
      let arrNumbers = [];
      for (let i = 1; i < count + 1; i++) {
        arrNumbers.push(i);
        arrNumbers.push(i);
      }
      return arrNumbers;
    }
    function shuffle(arr) {
      arr.sort(() => Math.random() - 0.5);
      return arr;
    }
    let sortedArr = createNumbersArray(8);
    let mixedArr = shuffle(sortedArr);
    function refresh() {
      mixedArr = shuffle(sortedArr);
      for (var i = 0; i < all_cards.length; i++) {
        all_cards[i].innerHTML = "<div>" + mixedArr[i].toString() + "</div>";
        all_cards[i].classList.add("hidden");
      }
    }
    refresh();

    let time = 60;
    let container = document.getElementById("game");
    let timer = document.getElementById("timer");
    let newgame = document.getElementById("newgame");
    let intervalId;
    function remove_newgame() {
      this.style.opacity = 0;
      newgame.removeEventListener("click", remove_newgame);
      refresh();
    }
    const timeFn = () => {
      intervalId = setInterval(() => {
        time--;
        timer.textContent = `осталось ${time} секунд`;
        if (time <= 0) {
          newgame.style.opacity = 1;
          newgame.addEventListener("click", remove_newgame);
          clearInterval(intervalId);
          time = 60;
          newgame.addEventListener("click", timeFn);
        }
      }, 1000);
      container.removeEventListener("click", timeFn);
    };
    container.addEventListener("click", timeFn);
    for (var i = 0; i < all_cards.length; i++) {
      all_cards[i].addEventListener("click", function () {
        if (!this.classList.contains("hidden")) {
          return false;
        }
        if (first_card == "") {
          first_card = this.id;
          this.classList.remove("hidden");
        } else {
          this.classList.remove("hidden");
          if (
            this.textContent == document.getElementById(first_card).textContent
          ) {
            first_card = "";
          } else {
            setTimeout(() => {
              document.getElementById(first_card).classList.add("hidden");
              this.classList.add("hidden");
              first_card = "";
            }, 150);
          }
          let hidden_cards = document.getElementsByClassName("hidden");
          if (hidden_cards.length == 0) {
            newgame.style.opacity = 1;

            clearInterval(intervalId);
            time = 60;
            newgame.addEventListener("click", timeFn);
            newgame.addEventListener("click", remove_newgame);
            timer.textContent = `осталось ${time} секунд`;
            refresh();
          }
        }
      });
    }
  });
})();
