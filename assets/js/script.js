const $randomNumberContainer = document.querySelector("#random-number"),
    $randomNumberContainer2 = document.querySelector("#random-number2"),
    $btnSwitch = document.querySelector("#btn-switch"),
    $btnGenerate = document.querySelector("#btn-generate"),
    $btnGenerate2 = document.querySelector("#btn-generate2"),
    $btnClear = document.querySelector("#btn-clear"),
    $btnClear2 = document.querySelector("#btn-clear2"),
    $btnRestart = document.querySelector("#btn-restart"),
    $btnTest = document.querySelector("#btn-test"),
    $btnTest2 = document.querySelector("#btn-test2"),
    $timeRecord = document.querySelector("#time-record"),
    $digitRecallGameContainer = document.querySelector(".main__content-container.digit-recall-game"),
    $reversedDigitRecallGameContainer = document.querySelector(".main__content-container.reversed-digit-recall-game"),
    $superRecallCulusGameContainer = document.querySelector(".main__content-container.super-recall-culus-game"),
    $textArea1 = document.querySelector("#txt1"),
    $textArea2 = document.querySelector("#txt2"),
    $figureCounterSpan = document.querySelector("#figure-counter"),
    $attemptCounterSpan = document.querySelector("#attempt-counter"),
    $timeSpan = document.querySelector("#time"),
    $tBody = document.querySelector("#table tbody"),
    // $btnDigitClose = document.querySelector("#btn-digit-close"),
    $digitContainer = document.querySelector("#digits")

const $digitAmountInput = document.querySelector("#digit-amount"),
    $digitAmountInput2 = document.querySelector("#digit-amount2"),
    $figureAmountInput = document.querySelector("#figure-amount"),
    $attemptAmountInput = document.querySelector("#attempt-amount"),
    $flashModeInput = document.querySelector("#flash-mode"),
    $speed = document.querySelector("#speed"),
    $btnSave = document.querySelector("#btn-save"),
    $btnSave2 = document.querySelector("#btn-save2")

let hours = 0, minutes = 0, seconds = 0,
    winLossTrackerArray = [],
    figureCounter = 0, attemptCounter = 0


let randomFigureString = "",
    recalledFigureString = "",
    started = false,
    gameIndex = 0,
    timeRecord = localStorage.getItem("time")

let left1 = 0, left2 = 0, matrixSize

let restarted = false

let digitAmount,
    digitAmount2,
    figureAmount,
    attemptAmount,
    speed,
    flashMode

