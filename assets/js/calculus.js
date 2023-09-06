
// (() => {
    let $td,
        timeout = true,
        result


    const timer = function () { time1 = setInterval(getTime2, 10) }
    const $timeSpan2 = document.querySelector(".super-recall-culus-game .main__time"),
        $btnHint = document.querySelector("#btn-hint"),
        $operationContainer = document.querySelector(".main__operation")

    const operation = {
        0:"+",
        1:"-",
        2:"x",
        3:"/"
    }
    function clearXs() {
        if(!timeout) return

        const $tdList = document.querySelectorAll("td")
        $tdList.forEach(td => {
            td.textContent = "X"
            td.classList.remove("white-text")
        })
    }

    function performOperation() {

        let a = Math.round(Math.random() * 100) + 1,
            b = Math.round(Math.random() * 100) + 1,
            randomOption = Math.round(Math.random() * 3)
        
        switch (randomOption) {
            case 0:
                result = a + b
                break
            case 1:
                result = a - b
                break
            case 2:
                result = a * b
                break

            case 3:
                result = Math.round((a / b) * 10) / 10
                break
        }

        $operationContainer.innerHTML = `<div>
            <span class="main__operation-value">${a}</span>
            <span class="main__operation-symbol">${operation[randomOption]}</span>
            <span class="main__operation-value">${b}</span>
        </div> <input class="main__operation-input" type="text" maxlength="7" placeholder="Type the result">`

        document.querySelector(".main__operation-input").onkeypress = (e) => {
            let pattern = /[\d.-]/,
            length = e.target.value.split("").length
        
            if(e.key === "." && e.target.value.includes(".") || e.key === "-" &&  e.target.value.includes("-"))
                e.preventDefault()

            if(e.key === "." && length === 0)
                e.preventDefault()

                if(e.key === "-" && length > 0)
                    e.preventDefault()

            if(!pattern.test(e.key)) 
                e.preventDefault()
        }
    }



    function getTime2() {
        $timeSpan2.textContent = `${getFormattedDigits(seconds)} seg`
        seconds--

        if (seconds === -1) {
            clearInterval(time1)
            const $parent = $timeSpan2.parentElement
            $parent.classList.add("d-none")
            $btnHint.classList.remove("d-none")
            performOperation()
            timeout = true
            clearXs()
        }
    }

    function getFormattedDigits(timeDigit) {
        if (timeDigit < 10)
            return `0${timeDigit}`

        return timeDigit
    }

    window.onclick = (e) => {
        const $calculationContainer = document.querySelector(".main__calculation")

        if (e.target.matches("td")) {
            if(!timeout) return
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
            clearXs()
        }

        if (e.target.matches(".super-recall-culus-game .main__btn.generate")) {
            if (!picked) {
                alert("Pick a matrix size")
                return
            }

            if (started) {
                clearInterval(time1)
            }

            started = true
            timeout = false
            const $parent = $timeSpan2.parentElement
            $parent.classList.remove("d-none")
            $btnHint.classList.add("d-none")
            $timeSpan2.textContent = "60 seg"
            seconds = 60
            timer()


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
            if (!timeout) return

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
                    clearXs()
                    return
                }
            }

            clearXs()
            alert("Congratulations!")
            started = true
            timeout = false
            const $parent = $timeSpan2.parentElement
            $parent.classList.remove("d-none")
            $btnHint.classList.add("d-none")
            $timeSpan2.textContent = `60 seg`


        }

        if (e.target.matches("[data-matrix-size]")) {
            const $btnList = document.querySelectorAll("[data-matrix-size]")

            $btnList.forEach(btn => btn.classList.remove("blue-button"))

            e.target.classList.add("blue-button")
            matrixSize = parseInt(e.target.getAttribute("data-matrix-size"))

            picked = true
        }

  

        if (e.target.matches("#btn-hint")) {
            $calculationContainer.classList.remove("d-none")
            performOperation()
        }

        if(e.target.matches(".main__btn.accept"))
        {
            let value = parseInt(document.querySelector(".main__operation-input").value)
            if(value === result)
            {
                $calculationContainer.classList.add("d-none")
                const $tdList = document.querySelectorAll("td")

                $tdList.forEach(td => td.textContent = td.dataset.number)

                timeout = false
                const $parent = $timeSpan2.parentElement
                $parent.classList.remove("d-none")
                $btnHint.classList.add("d-none")
                seconds = 60
                timer()
            }
            else{
                alert("Try it again😥!")
            }
        }

        if (e.target.matches(".main__btn.cancel")) {
            $calculationContainer.classList.add("d-none")
        }

    }

    
// })()
