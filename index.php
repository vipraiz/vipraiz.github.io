<?php
$tiles = [
  'A' => 2,
  'B' => 4,
  'C' => 1,
  'D' => 3,
  'E' => 5,
  'F' => 2,
  'G' => 1,
  'H' => 3,
  'I' => 2,
  'J' => 3,
  'K' => 3,
  'L' => 3,
  'M' => 2,
  'N' => 3,
  'O' => 2,
  'P' => 3,
  'Q' => 1,
  'R' => 3,
  'S' => 2,
  'T' => 1,
  'U' => 8,
  'V' => 9,
  'W' => 4,
  'X' => 1
];
?>

<!DOCTYPE html>
<html lang="ru">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Каркассон - счётчик тайлов</title>
  <link rel="icon" href="favicon.ico">
  <link rel="stylesheet" href="css/normalize.css">
  <link rel="stylesheet" href="css/main.css">
</head>

<body>
  <header>
    <div class="container">
      <div class="header-wrapper">
        <div class="tile-amount">
          Тайлов осталось: <span>71</span>
        </div>
        <div class="top-probabilities d-none" data-after="0 тайлов">
          <div class="summed-probability"><span>0.00</span>%</div>
          <div class="summed-probability-you"><span>0.00</span>%</div>
        </div>
      </div>
    </div>
  </header>
  <main>
    <div class="container">
      <div class="control">
        <div class="control-item">
          <input type="checkbox" id="show-probabilities">
          <label for="show-probabilities">Показывать вероятности</label>
        </div>
        <div class="control-item d-none">
          <div class="control-item">
            <input type="checkbox" id="sum-probabilities-checkbox">
            <label for="sum-probabilities-checkbox">Суммирование вероятностей</label>
          </div>
          <button class="reset-selection-btn" disabled>Сбросить выделение</button>
        </div>
        <div class="control-item d-none">
          <label for="num_players">Количество игроков: </label>
          <select name="num_players" id="num_players">
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </select>
        </div>
        <div class="control-item d-none">
          <label for="probabilities_for">Показывать вероятности для: </label>
          <select name="probabilities_for" id="probabilities_for">
            <option value="-1">активного игрока</option>
            <option value="0">1-ого игрока</option>
            <option value="1">2-ого игрока</option>
          </select>
        </div>
        <div class="control-item d-none tooltips">
          <div class="active_player">Активный игрок: <span>1</span></div>
          <div class="tooltip-tile-probability-you tooltip">
            Вероятность того, что активный игрок вытянет хотя бы один тайл такого типа
          </div>
          <div class="tooltip-tile-probability tooltip">
            Вероятность того, что тайл такого типа будет вытянут следующим
          </div>
        </div>
      </div>
      <div class="tiles">
        <?php
        foreach ($tiles as $name => $amount) {
        ?>
          <div id="tile-<?= $name ?>" class="tile">
            <div class="tile-probabilities__wrapper">
              <div class="tile-probabilities d-none">
                <div class="tile-probability-you">
                  <span>?</span>%
                </div>
                <div class="tile-probability">
                  <span>?</span>%
                </div>
              </div>
              <input type="checkbox" class="tile-checkbox d-none">
            </div>
            <div class="tile-clickable" tabindex="0">
              <div class="tile-image first_edition tile-image--<?= $name ?>"></div>
              <div class="tile-counter"><span max="<?= $amount ?>"><?= $amount ?></span>/<?= $amount ?></div>
            </div>
          </div>
        <?php
        }
        ?>
      </div>
      <div class="history">
        <h5>История</h5>
        <button class="back-btn" disabled>Назад</button>
        <div class="history__tiles tiles"></div>
      </div>
    </div>
  </main>
  <script src="js/main.js"></script>
</body>

</html>