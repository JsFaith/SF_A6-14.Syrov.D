const numDivs = 36;
const maxHits = 10;

let hits = 0;
let firstHitTime = 0;
let fails = 0;

function round() {
  $("#button-start").addClass("d-none");  
  $("#button-reload").removeClass("d-none");
  $(".miss").removeClass("miss");
  let divSelector = randomDivId();
  $(divSelector).addClass("target");
  if (hits === 1) {
    firstHitTime = getTimestamp();
  }
  if (hits < maxHits) {
    $(divSelector).text(hits + 1);
  }
  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {
  $(".game-field").hide();
  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);
  $("#win-message").removeClass("d-none");
  $("#button-reload").removeClass("d-none");
  $("#button-start").addClass("d-none"); 
  let score = hits - fails;
  $("#totalScore").text(score);
  $("#totalFails").text(fails);
}

function handleClick(event) {
  if ($(event.target).hasClass("target")) {
    hits = hits + 1;
    $(event.target).removeClass("target");
    $(event.target).text("");    
    round();
  }
  else {
    $(event.target).addClass('miss');
    fails = fails + 1;
  }
}

function init() {
  $("#button-start").click(round);
  $(".game-field").click(handleClick);
  $("#button-reload").click(function() {
    location.reload();
  });
}

$(document).ready(init);
