
$timeRecord.textContent = timeRecord || "00:00:00"

function showXs() {
    if (!started) return
    if (gameIndex === 1 && flashMode) return

    $randomNumberContainer.innerHTML = ""
    $randomNumberContainer2.innerHTML = ""

    let length = gameIndex === 0 ? digitAmount : digitAmount2

    for (let index = 0; index < length; index++) {
        if (gameIndex === 0) $randomNumberContainer.innerHTML += "X "
        else $randomNumberContainer2.innerHTML += "X ";
    }
}

showXs()


$randomNumberContainer.onmouseout = showXs
$randomNumberContainer2.onmouseout = showXs

$randomNumberContainer.onmouseover = () => {
    if (!started) return
    let html = showRandomFigure()
    $randomNumberContainer.innerHTML = html
}

$randomNumberContainer2.onmouseover = () => {
    if (!started) return
    if (gameIndex === 1 && flashMode) return
    let html = showRandomFigure()
    $randomNumberContainer2.innerHTML = html
}



function generateRandomFigure(length) {
    randomFigureString = ""
    for (let index = 0; index < length; index++) {
        let randomNumber = getRandomNumber()
        randomFigureString += randomNumber
    }
}

function showRandomFigure() {
    if (randomFigureString === "") return
    let html = ""
    for (let index = 0; index < randomFigureString.length; index++) {
        html += `<span class="main__random-digit">${randomFigureString[index]}</span>`
    }

    return html

}

function getRandomNumber() {
    return Math.floor(Math.random() * (9 + 0)) + 0
}

$btnSwitch.onclick = () => {

    if ($btnSwitch.textContent === "GO TO REVERSED DIGIT RECALL GAME") {
        $digitRecallGameContainer.style.display = "none"
        $reversedDigitRecallGameContainer.style.display = "block"
        $btnSwitch.textContent = "GO TO DIGIT RECALL GAME"
        gameIndex = 1
    }
    else {
        $digitRecallGameContainer.style.display = "block"
        $reversedDigitRecallGameContainer.style.display = "none"
        $btnSwitch.textContent = "GO TO REVERSED DIGIT RECALL GAME"
        gameIndex = 0
    }
}

$btnGenerate.onclick = () => {
    generateRandomFigure(digitAmount)

    let html = showRandomFigure()
    $randomNumberContainer.innerHTML = html
    if (!started) {
        time()
        started = true
    }

}

$btnGenerate2.onclick = () => {
    clear()

    generateRandomFigure(digitAmount2)


    if (flashMode) {
        if (!started) {
            let milliseconds = 1000 / speed,
                index = 0

            started = true
            time2 = setInterval(() => {
                $randomNumberContainer2.innerHTML = `<span class="main__random-digit reversed">${randomFigureString[index++]}</span>`

                if (index === digitAmount2) {
                    clearInterval(time2)
                    started = false
                    index = 0
                }
            }, milliseconds)

        }


    }
    else {
        let html = showRandomFigure()
        $randomNumberContainer2.innerHTML = html
    }
}

function clear()
{
    recalledFigureString = ""
    $textArea1.value = ""
    $textArea2.value = ""
    showRecalledFigure()
}

$btnClear.onclick = clear

$btnClear2.onclick = clear


function restart()
{
    if (!started) return

    if (!restart) {
        let ok = confirm("Are you sure you want to restart?")
        if (!ok) return
    }
    else {
        restart = false
    }


    clearInterval(time1)

    showXs()
    hours = 0
    minutes = 0
    seconds = 0
    figureCounter = 0
    started = false

    $timeSpan.textContent = `${getFormattedDigits(hours)}:${getFormattedDigits(minutes)}:${getFormattedDigits(seconds)}`
    $figureCounterSpan.textContent = `0/${figureAmount}`
    $textArea1.value = ""
    $textArea2.value = ""
    spansTemplate = ""
    recalledFigureString = ""
    randomFigureString = ""
    winLossTrackerArray = []
    showRecalledFigure()
}

$btnRestart.onclick = restart



$textArea1.oninput = () => recalledFigureString = $textArea1.value
$textArea2.oninput = () => recalledFigureString = $textArea2.value

$btnTest.onclick = () => {

    if (recalledFigureString === "") return

    if (randomFigureString === recalledFigureString) {
        recalledFigureString = ""
        showRecalledFigure()

        attemptCounter++
        if (attemptCounter === attemptAmount) {
            winLossTrackerArray.push(1)
            checkRecord()

            attemptCounter = 0
            figureCounter++

            $btnGenerate.click()
        }

        $figureCounterSpan.textContent = `${figureCounter}/${figureAmount}`
        $attemptCounterSpan.textContent = `${attemptCounter}/${attemptAmount}`

        if (figureCounter === figureAmount) {
            checkTimeRecord()

            alert("Congratulations!")
            restart = true

            restart()
        }

    }
    else {
        alert("Try it again 😥")
    }

    clear()
}

$btnTest2.onclick = () => {
    if (recalledFigureString === "") return

    let reversedFigureString = randomFigureString.split("").reverse().join("")

    console.log(reversedFigureString, recalledFigureString)

    if (reversedFigureString === recalledFigureString) {
        recalledFigureString = ""
        showRecalledFigure()

        alert("Congratulations!")

        $btnGenerate2.click()

        restart = false


    }
    else {
        alert("Try it again 😥")
    }
    clear()

}

window.onkeyup = (e) => {

    let pattern = /Backspace|[\dsgcrt]/



    if (gameIndex === 0) {
        if (e.key == "s") {
            $btnSave2.click()
        }

        if (!pattern.test(e.key) || started === false && e.key !== "g")
            return

        switch (e.key) {
            case "g":

                $btnGenerate.click()
                break

            case "c":
                clear()
                break

            case "r":
                restart()
                break

            case "t":
                $btnTest.click()
                break

            case "Backspace":
                if (recalledFigureString !== "")
                    recalledFigureString = recalledFigureString.slice(0, -1)
                break

            default:
                if (recalledFigureString.length < digitAmount) {
                    recalledFigureString += e.key
                }

        }

        showRecalledFigure()
    }
    else if (gameIndex === 1) {

        if (e.key == "s") {
            $btnSave2.click()
        }

        pattern = /Backspace|[\dgct]/
        if (!pattern.test(e.key) && started) return

        switch (e.key) {
            case "g":

                $btnGenerate2.click()
                break

            case "c":
                $btnClear2.click()
                break

            case "t":
                $btnTest2.click()
                break

            case "Backspace":
                if (recalledFigureString !== "")
                    recalledFigureString = recalledFigureString.slice(0, -1)
                break

            default:
                if (recalledFigureString.length < digitAmount2) {
                    recalledFigureString += e.key
                }
                break

        }
        showRecalledFigure()

    }
}

function showRecalledFigure() {
    const $inputContainer = gameIndex === 0 ? document.querySelector("#input-container") : document.querySelector("#input-container2")
    $inputContainer.innerHTML = ""
    let len = recalledFigureString.split("").length

    for (let index = 0; index < len; index++) {
        $inputContainer.innerHTML += `<span class="main__random-digit">${recalledFigureString[index]}</span>`
    }

}
