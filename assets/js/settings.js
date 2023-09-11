const setting = JSON.parse(localStorage.getItem("setting")) || {game1:{}, game2:{}}

function isEmpty(obj) {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            return false;
        }
    }
    return true;
}
if (!isEmpty(setting.game1)) {
    $digitAmountInput.value = setting.game1.digit_amount
    $figureAmountInput.value = setting.game1.figure_amount
    $attemptAmountInput.value = setting.game1.attempt_amount
}

if (!isEmpty(setting.game2)) {
    $digitAmountInput2.value = setting.game2.digit_amount
    $speed.value = setting.game2.speed
    $flashModeInput.checked = setting.game2.flash_mode
    if (!setting.game2.flash_mode) $speed.disabled = true
    else $speed.disabled = false
}





function updateSettings()
{
    digitAmount = parseInt($digitAmountInput.value)
    digitAmount2 = parseInt($digitAmountInput2.value)
    figureAmount = parseInt($figureAmountInput.value)
    attemptAmount = parseInt($attemptAmountInput.value)
    speed = parseFloat($speed.value)

    flashMode = $flashModeInput.checked
    if ($flashModeInput.checked) 
    $speed.disabled = false
else  $speed.disabled = true

    $textArea1.maxLength = digitAmount
    $textArea2.maxLength = digitAmount2
}

updateSettings()

$digitAmountInput.onchange = updateSettings

$digitAmountInput2.onchange = updateSettings

$figureAmountInput.onchange = updateSettings

$attemptAmountInput.onchange = updateSettings

$speed.onchange = updateSettings

$flashModeInput.onchange = updateSettings

$btnSave.onclick = () => {
    if (started) {
        let ok = confirm("Saving will automatically restart all your current progress. Are you sure you want to continue?")
        if (!ok) return
    }


    updateSettings()

    setting.game1.digit_amount = parseInt(digitAmount)
    setting.game1.figure_amount = parseInt(figureAmount)
    setting.game1.attempt_amount = parseInt(attemptAmount)

    localStorage.setItem("setting", JSON.stringify(setting))

    $figureCounterSpan.textContent = `0/${figureAmount || 0}`
    $attemptCounterSpan.textContent = `0/${attemptAmount || 0}`

    localStorage.removeItem("10min_record")
    localStorage.removeItem("time")

    $timeRecord.textContent = "00:00:00"
    const $10minRecord = document.querySelector("#min-record")
    $10minRecord.textContent = 0

    alert(`Setting Saved!`)

    restarted = true
    restart()
}


$btnSave2.onclick = () => {
    updateSettings()

    setting.game2.digit_amount = digitAmount2
    setting.game2.speed = speed
    setting.game2.flash_mode = flashMode

    if (!flashMode) $speed.disabled = true
    else $speed.disabled = false
    localStorage.setItem("setting", JSON.stringify(setting))
    alert(`Setting Saved!`)
}







