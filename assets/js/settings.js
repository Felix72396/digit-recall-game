const $digitAmountInput = document.querySelector("#digit-amount"),
$digitAmountInput2 = document.querySelector("#digit-amount2"),
$figureAmountInput = document.querySelector("#figure-amount"),
$attemptAmountInput = document.querySelector("#attempt-amount"),
$flashModeInput = document.querySelector("#flash-mode"),
$speed = document.querySelector("#speed"),
$btnSave = document.querySelector("#btn-save"),
$btnSave2 = document.querySelector("#btn-save2")

const setting = JSON.parse(localStorage.getItem("setting")) || {},
setting2 = JSON.parse(localStorage.getItem("setting2")) || {}

let saved = false
if(Object.keys(setting).length > 0)
{
    $digitAmountInput.value = setting.digit_amount
    $figureAmountInput.value = setting.figure_amount
    $attemptAmountInput.value = setting.attempt_amount
}

if(Object.keys(setting2).length > 0)
{
    $digitAmountInput2.value = setting2.digit_amount
    $speed.value = setting2.speed
    $flashModeInput.checked = setting2.flash_mode
    if(!setting2.flash_mode) $speed.disabled = true
    else $speed.disabled = false
}

$flashModeInput.onchange = () => {
    if($flashModeInput.checked) $speed.disabled = false
    else $speed.disabled = true
}

$btnSave.onclick = () => {
    if(started)
    {
        let ok = confirm("Saving will automatically restart all your current progress. Are you sure you want to continue?")
        if(!ok) return
    }

    setting.digit_amount = parseInt($digitAmountInput.value)
    setting.figure_amount = parseInt($figureAmountInput.value)
    setting.attempt_amount = parseInt($attemptAmountInput.value)

    localStorage.setItem("setting", JSON.stringify(setting))

    $figureCounterSpan.textContent = `0/${setting.figure_amount||0}`
    $attemptCounterSpan.textContent = `0/${setting.attempt_amount||0}`

    alert(`Setting Saved!`)

    saved = true
    $btnRestart.click()
}


$btnSave2.onclick = () => {
    setting2.digit_amount = parseInt($digitAmountInput2.value)
    setting2.speed = parseInt($speed.value)
    setting2.flash_mode = $flashModeInput.checked

    if(!setting2.flash_mode) $speed.disabled = true
    else $speed.disabled = false
    localStorage.setItem("setting2", JSON.stringify(setting2))
    alert(`Setting Saved!`)
}







