(() => {
    let $td

    function clear() {
        const $tdList = document.querySelectorAll("td")
        $tdList.forEach(td => {
            td.textContent = "X"
            td.classList.remove("white-text")
        })
    }

    const time = function () { timer = setInterval(getTime, 1000) }
    const $timeSpan = document.querySelector(".super-recall-culus-game .main__time"),
    $btnHint = document.querySelector("#btn-hint")

    function getTime() {
        seconds--
        
        $timeSpan.textContent = `${getFormattedDigits(seconds)} seg`

        if (seconds === 0) {
            clearInterval(timer)
            const $parent = $timeSpan.parentElement
            $parent.classList.add("d-none")
            $btnHint.classList.remove("d-none")
            clear()
        }
    }

    function getFormattedDigits(timeDigit) {
        if (timeDigit < 10)
            return `0${timeDigit}`

        return timeDigit
    }

    window.onclick = (e) => {

        if (e.target.matches("td")) {
            $digitContainer.style.display = "flex"
            $td = e.target
        }

        if (e.target.matches(".main__digits button:not([class='main__x'] button)")) {
            $td.textContent = e.target.textContent
            $td.classList.add("white-text")
            $digitContainer.style.display = "none"
        }

        if (e.target.matches("#btn-digit-close")) {
            $digitContainer.style.display = "none"
        }

        if (e.target.matches(".super-recall-culus-game .main__btn.clear")) {
            clear()
        }

        if (e.target.matches(".super-recall-culus-game .main__btn.generate")) {
            if (!started) {
                alert("Pick a matrix size")
                return
            }

            const $parent = $timeSpan.parentElement
            $parent.classList.remove("d-none")
            $btnHint.classList.add("d-none")
            seconds = 60
            time()

            $tBody.innerHTML = ""
            for (let row = 0; row < matrixSize; row++) {
                let html = `<tr>`
                for (let column = 0; column < matrixSize; column++) {
                    let randomNumber = getRandomNumber()
                    html += `<td data-number="${randomNumber}">${randomNumber}</td>`
                }
                html += `</tr>`
                $tBody.innerHTML += html
            }
        }

        if (e.target.matches(".super-recall-culus-game .main__btn.test")) {
            const $tdList = document.querySelectorAll("td")

            for (const td of $tdList) {
                if (td.textContent === "X") {
                    alert("Fill all the squares!")
                    return
                }
            }


            for (const td of $tdList) {
                if (td.dataset.number !== td.textContent) {
                    alert("Try it again😥")
                    clear()
                    return
                }
            }

            clear()
            alert("Congratulations!")


        }

        if (e.target.matches("[data-matrix-size]")) {
            const $btnList = document.querySelectorAll("[data-matrix-size]")

            $btnList.forEach(btn => btn.classList.remove("blue-button"))

            e.target.classList.add("blue-button")
            matrixSize = parseInt(e.target.getAttribute("data-matrix-size"))

            started = true
        }

    }
})()
