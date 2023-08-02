const probabilityCheckbox = document.querySelector("#show-probabilities");
const sumProbabilitiesCheckbox = document.querySelector(
  "#sum-probabilities-checkbox"
);
const summedProbability = document.querySelector(".summed-probability span");
const summedProbabilityYou = document.querySelector(
  ".summed-probability-you span"
);
const tilesElement = document.querySelector(".tiles");
const tiles = tilesElement.querySelectorAll(".tile");
const tileAmountElement = document.querySelector(".tile-amount span");
const tilesHistoryElement = document.querySelector(".history__tiles");
const resetSelectionBtn = document.querySelector(".reset-selection-btn");
const backBtn = document.querySelector(".back-btn");
const tooltips = document.querySelector(".tooltips");
const numPlayersElement = document.querySelector("#num_players");
const probabilitiesForElement = document.querySelector("#probabilities_for");
const activePlayerElement = document.querySelector(".active_player span");

let num_of_tiles = 71;
let remains_to_pull = [36, 35, 0, 0, 0, 0];
let numOfPlayers = 2;
let active_player_id = 0;
let probabilities_for = 0;

numPlayersElement.addEventListener("change", () => {
  if (numPlayersElement.value < 2 || numPlayersElement.value > 6) return;
  numOfPlayers = Number(numPlayersElement.value);
  bar();
  caclProbabilities(probabilities_for);
  sumProbabilities(probabilities_for);
  probabilitiesForElement.innerHTML = '<option value="-1">активного игрока</option>';
  for(let i = 0; i < numOfPlayers; i++) {
    const opt = document.createElement("option");
    opt.value = i;
    opt.textContent = i + 1 + '-ого игрока';
    probabilitiesForElement.appendChild(opt);  
  }
  probabilities_for = active_player_id;
});

probabilitiesForElement.addEventListener("change", () => {
  if (probabilitiesForElement.value < -1 || probabilitiesForElement.value > 5) return;
  probabilities_for = probabilitiesForElement.value == -1 ? null : Number(probabilitiesForElement.value);
  caclProbabilities(probabilities_for);
  sumProbabilities(probabilities_for);
});

function bar() {
  for (let i = 0; i < 6; i++) {
    if (i >= numOfPlayers) {
      remains_to_pull[i] = 0;
      continue;
    }
    remains_to_pull[i] =
      Math.floor(num_of_tiles / numOfPlayers) +
      (i < num_of_tiles % numOfPlayers ? 1 : 0);
  }
}

probabilityCheckbox.addEventListener("change", (event) => {
  const tileProbabilityElements = tilesElement.querySelectorAll(
    ".tile-probabilities"
  );
  if (event.currentTarget.checked) {
    caclProbabilities(probabilities_for);
    sumProbabilitiesCheckbox.parentNode.parentNode.classList.remove("d-none");
    numPlayersElement.parentNode.classList.remove("d-none");
    probabilitiesForElement.parentNode.classList.remove('d-none');
    tooltips.classList.remove("d-none");
    tileProbabilityElements.forEach((el) => {
      el.classList.remove("d-none");
    });
  } else {
    summedProbability.parentNode.parentNode.classList.add("d-none");
    sumProbabilitiesCheckbox.checked = false;
    sumProbabilitiesCheckbox.parentNode.parentNode.classList.add("d-none");
    numPlayersElement.parentNode.classList.add("d-none");
    probabilitiesForElement.parentNode.classList.add("d-none");
    tooltips.classList.add("d-none");
    tileProbabilityElements.forEach((el) => {
      el.classList.add("d-none");
    });
    foo();
  }
});

const tileProbabilityElements = tilesElement.querySelectorAll(".tile-checkbox");

sumProbabilitiesCheckbox.addEventListener("change", (event) => {
  if (event.currentTarget.checked) {
    summedProbability.parentNode.parentNode.classList.remove("d-none");
    tileProbabilityElements.forEach((el) => {
      el.classList.remove("d-none");
    });
  } else {
    summedProbability.parentNode.parentNode.classList.add("d-none");
    foo();
  }
});

let tile_amount = num_of_tiles;
let tile_last;
let count_checked = 0;

tilesElement.addEventListener("click", (event) => {
  const parent_element = event.target.parentElement;
  const tile = parent_element.parentElement;

  if (event.target.classList.contains("tile-checkbox")) {
    if (event.target.checked) {
      event.target.closest(".tile").classList.add("tile--selected");
      count_checked++;
      sumProbabilities(probabilities_for);
      if (count_checked == 1) {
        resetSelectionBtn.removeAttribute("disabled");
        summedProbability.parentNode.classList.remove("d-none");
      }
    } else {
      event.target.closest(".tile").classList.remove("tile--selected");
      count_checked--;
      if (count_checked == 0) {
        resetSelectionBtn.setAttribute("disabled", "disabled");
      }
      sumProbabilities(probabilities_for);
    }
  }

  if (tile.classList.contains("tile--over")) return;

  if (parent_element.classList.contains("tile-clickable")) {
    // if (tile_amount == num_of_tiles) {
    //   backBtn.removeAttribute("disabled");
    // }
    backBtn.removeAttribute("disabled");
    numPlayersElement.setAttribute("disabled", "disabled");
    if (tile_amount < num_of_tiles) {
      tile_last.classList.remove("tile--last");
    }
    tile_last = parent_element;
    tile_last.classList.add("tile--last");

    const tile_counter = parent_element.querySelector(".tile-counter span");
    if (tile_counter.textContent > 0) {
      tile_counter.textContent = tile_counter.textContent - 1;
      tileAmountElement.textContent = tile_amount -= 1;
      remains_to_pull[active_player_id]--;
      if (active_player_id < numOfPlayers - 1) {
        active_player_id++;
      } else {
        active_player_id = 0;
      }
      activePlayerElement.textContent = active_player_id + 1;

      tile_counter.parentElement.classList.add("italic");
      const image = document.createElement("div");
      const name = tile.id.slice(-1);
      image.classList.add("tile-image", "first_edition", `tile-image--${name}`);
      image.setAttribute("name", name);
      tilesHistoryElement.prepend(image);
      if (tile_counter.textContent == 0) {
        tile.classList.add("tile--over");
        parent_element.removeAttribute("tabindex");
      }
      if (probabilityCheckbox.checked) {
        caclProbabilities(probabilities_for);
      }
      if (sumProbabilitiesCheckbox.checked) {
        sumProbabilities(probabilities_for);
      }
    }
  }
});

tilesElement.addEventListener("keyup", (event) => {
  if (event.target.classList.contains("tile-clickable")) {
    event.preventDefault();
    if (event.keyCode === 13) {
      event.target.firstElementChild.click();
    }
  }
});

function sumProbabilities(for_player_id = null) {
  let sum = 0;
  tiles.forEach((tile) => {
    if (tile.querySelector(".tile-checkbox").checked) {
      sum += Number(tile.querySelector(".tile-counter span").textContent);
    }
  });
  summedProbability.parentNode.classList.remove("d-none");
  summedProbability.textContent =
    tile_amount > 0 ? ((sum / tile_amount) * 100).toFixed(2) : "0.00";
  // summedProbabilityYou.textContent = (
  //   (1 - (numOfPlayers - 1) / (Math.pow(2, sum) + numOfPlayers - 2)) *
  //   100
  // ).toFixed(2);

  for_player_id = for_player_id ?? active_player_id;
  let diff = 1;
  for (
    let i = remains_to_pull[for_player_id],
      m = tile_amount - sum,
      k = tile_amount;
    i > 0;
    i--, k--, m--
  ) {
    diff *= m / k;
  }

  summedProbabilityYou.textContent = ((1 - diff) * 100).toFixed(2);
  summedProbability.parentNode.parentNode.setAttribute(
    "data-after",
    `${sum} ${declOfNum(sum, ["тайл", "тайла", "тайлов"])}`
  );
}

resetSelectionBtn.addEventListener("click", foo);

backBtn.addEventListener("click", () => {
  if (tilesHistoryElement.hasChildNodes()) {
    tile_last.classList.remove("tile--last");

    let name = tilesHistoryElement.firstChild.getAttribute("name");
    let tile = tilesElement.querySelector(`#tile-${name}`);

    const tile_counter = tile.querySelector(".tile-counter span");
    tile.classList.remove("tile--over");
    tile.setAttribute("tabindex", 0);
    const max_value = tile_counter.getAttribute("max");
    if (tile_counter.textContent < max_value) {
      tile_counter.textContent = Number(tile_counter.textContent) + 1;
      tileAmountElement.textContent = tile_amount += 1;
      if (active_player_id > 0) {
        active_player_id--;
      } else {
        active_player_id = numOfPlayers - 1;
      }
      remains_to_pull[active_player_id]++;
      activePlayerElement.textContent = active_player_id + 1;

      if (tile_amount == num_of_tiles) {
        backBtn.setAttribute("disabled", "disabled");
      }
      if (tile_amount == num_of_tiles) {
        numPlayersElement.removeAttribute("disabled");
      }
      if (tile_counter.textContent == max_value) {
        tile_counter.parentElement.classList.remove("italic");
      }
    }

    tilesHistoryElement.removeChild(tilesHistoryElement.children[0]);

    if (tilesHistoryElement.hasChildNodes()) {
      name = tilesHistoryElement.firstChild.getAttribute("name");
      tile = tilesElement.querySelector(`#tile-${name}`);

      tile_last = tile;
      tile_last.classList.add("tile--last");
    }

    if (probabilityCheckbox.checked) {
      caclProbabilities(probabilities_for);
    }
    if (sumProbabilitiesCheckbox.checked) {
      sumProbabilities(probabilities_for);
    }
  }
});

function foo(hide = false) {
  count_checked = 0;
  resetSelectionBtn.setAttribute("disabled", "disabled");
  summedProbability.textContent = "0.00";
  summedProbabilityYou.textContent = "0.00";
  summedProbability.parentNode.parentNode.setAttribute(
    "data-after",
    "0 тайлов"
  );
  tileProbabilityElements.forEach((el) => {
    el.closest(".tile").classList.remove("tile--selected");
    el.checked = false;
    if (typeof hide == "boolean") {
      el.classList.add("d-none");
    }
  });
}

function caclProbabilities(for_player_id = null) {
  if (tile_amount == 0) {
    tiles.forEach((tile) => {
      const tileProbability = tile.querySelector(".tile-probability span");
      const tileProbabilityYou = tile.querySelector(
        ".tile-probability-you span"
      );
      tileProbability.textContent = "0.00";
      tileProbabilityYou.textContent = "0.00";
    });
  } else {
    tiles.forEach((tile) => {
      const tileProbability = tile.querySelector(".tile-probability span");
      const tileProbabilityYou = tile.querySelector(
        ".tile-probability-you span"
      );
      const tileCounter = tile.querySelector(".tile-counter span");
      tileProbability.textContent = (
        (tileCounter.textContent / tile_amount) *
        100
      ).toFixed(2);
      // tileProbabilityYou.textContent = (
      //   (1 -
      //     (numOfPlayers - 1) /
      //       (Math.pow(2, tileCounter.textContent) + numOfPlayers - 2)) *
      //   100
      // ).toFixed(2);

      for_player_id = for_player_id ?? active_player_id;
      let diff = 1;
      for (
        let i = remains_to_pull[for_player_id],
          m = tile_amount - tileCounter.textContent,
          k = tile_amount;
        i > 0;
        i--, k--, m--
      ) {
        diff *= m / k;
      }

      tileProbabilityYou.textContent = ((1 - diff) * 100).toFixed(2);
      // tileProbabilityYou.textContent = (36 / num_of_tiles * 100).toFixed(2);
    });
  }
}

function declOfNum(number, words) {
  return words[
    number % 100 > 4 && number % 100 < 20
      ? 2
      : [2, 0, 1, 1, 1, 2][number % 10 < 5 ? Math.abs(number) % 10 : 5]
  ];
}
