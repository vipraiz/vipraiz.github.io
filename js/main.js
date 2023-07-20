const probabilityCheckbox = document.querySelector("#show-probabilities");
const sumProbabilitiesCheckbox = document.querySelector(
  "#sum-probabilities-checkbox"
);
const summedProbability = document.querySelector(".summed-probability span");
const tilesElement = document.querySelector(".tiles");
const tiles = tilesElement.querySelectorAll(".tile");
const tileAmountElement = document.querySelector(".tile-amount span");
const tilesHistoryElement = document.querySelector(".history__tiles");
const resetSelectionBtn = document.querySelector('.reset-selection-btn');
const backBtn = document.querySelector(".back-btn");

probabilityCheckbox.addEventListener("change", (event) => {
  const tileProbabilityElements =
    tilesElement.querySelectorAll(".tile-probability");
  if (event.currentTarget.checked) {
    caclProbabilities();
    sumProbabilitiesCheckbox.parentNode.parentNode.classList.remove("d-none");
    tileProbabilityElements.forEach((el) => {
      el.classList.remove("d-none");
    });
  } else {
    summedProbability.parentNode.classList.add("d-none");
    sumProbabilitiesCheckbox.checked = false;
    sumProbabilitiesCheckbox.parentNode.parentNode.classList.add("d-none");
    tileProbabilityElements.forEach((el) => {
      el.classList.add("d-none");
    });
    foo();
  }
});

const tileProbabilityElements = tilesElement.querySelectorAll(".tile-checkbox");

sumProbabilitiesCheckbox.addEventListener("change", (event) => {
  if (event.currentTarget.checked) {
    summedProbability.parentNode.classList.remove("d-none");
    tileProbabilityElements.forEach((el) => {
      el.classList.remove("d-none");
    });
  } else {
    summedProbability.parentNode.classList.add("d-none");
    foo();
  }
});

let tile_amount = 71;
let tile_last;
let count_checked = 0;

tilesElement.addEventListener("click", (event) => {
  const parent_element = event.target.parentElement;
  const tile = parent_element.parentElement;

  if (event.target.classList.contains("tile-checkbox")) {
    if (event.target.checked) {
      event.target.closest('.tile').classList.add('tile--selected');
      count_checked++;
      sumProbabilities();
      if (count_checked == 1) {
        resetSelectionBtn.removeAttribute('disabled');
        summedProbability.parentNode.classList.remove("d-none");
      }
    } else {
      event.target.closest('.tile').classList.remove('tile--selected');
      count_checked--;
      if (count_checked == 0) {
        resetSelectionBtn.setAttribute('disabled', 'disabled');
      }
      sumProbabilities();
    }
  }

  if (tile.classList.contains("tile--over")) return;

  if (parent_element.classList.contains("tile-clickable")) {
    if(tile_amount == 71) {
      backBtn.removeAttribute('disabled');
    }
    if (tile_amount < 71) {
      tile_last.classList.remove("tile--last");
    }
    tile_last = parent_element;
    tile_last.classList.add("tile--last");

    const tile_counter = parent_element.querySelector(".tile-counter span");
    if (tile_counter.textContent > 0) {
      tile_counter.textContent = tile_counter.textContent - 1;
      tileAmountElement.textContent = tile_amount -= 1;
      tile_counter.parentElement.classList.add("italic");
      const image = document.createElement("div");
      const name = tile.id.slice(-1);
      image.classList.add('tile-image', 'first_edition', `tile-image--${name}`);
      image.setAttribute("name", name);
      tilesHistoryElement.prepend(image);
      if (tile_counter.textContent == 0) {
        tile.classList.add("tile--over");
        parent_element.removeAttribute("tabindex");
      }
      if (probabilityCheckbox.checked) {
        caclProbabilities();
      }
      if (sumProbabilitiesCheckbox.checked) {
        sumProbabilities();
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

function sumProbabilities() {
  let sum = 0;
  tiles.forEach((tile) => {
    if (tile.querySelector(".tile-checkbox").checked) {
      sum += Number(tile.querySelector(".tile-counter span").textContent);
    }
  });
  summedProbability.parentNode.classList.remove("d-none");
  summedProbability.textContent = tile_amount > 0 ? ((sum / tile_amount) * 100).toFixed(2) : '0.00';
  summedProbability.parentNode.setAttribute(
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
      if(tile_amount == 71) {
        backBtn.setAttribute('disabled', 'disabled');
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
      caclProbabilities();
    }
    if (sumProbabilitiesCheckbox.checked) {
      sumProbabilities();
    }
  }
});

function foo(hide = false) {
  count_checked = 0;
  resetSelectionBtn.setAttribute('disabled', 'disabled');
  summedProbability.textContent = "0.00";
  summedProbability.parentNode.setAttribute("data-after", "0 тайлов");
  tileProbabilityElements.forEach((el) => {
    el.closest('.tile').classList.remove('tile--selected');
    el.checked = false;
    if (typeof hide == "boolean") {
      el.classList.add("d-none");
    }
  });
}

function caclProbabilities() {
  if (tile_amount == 0) return;
  tiles.forEach((tile) => {
    const tileProbability = tile.querySelector(".tile-probability span");
    const tileCounter = tile.querySelector(".tile-counter span");
    tileProbability.textContent = (
      (tileCounter.textContent / tile_amount) *
      100
    ).toFixed(2);
  });
}

function declOfNum(number, words) {
  return words[
    number % 100 > 4 && number % 100 < 20
      ? 2
      : [2, 0, 1, 1, 1, 2][number % 10 < 5 ? Math.abs(number) % 10 : 5]
  ];
}
