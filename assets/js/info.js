const $figureCounterSpan = document.querySelector("#figure-counter"),
$attemptCounterSpan = document.querySelector("#attempt-counter"),
$timeSpan = document.querySelector("#time")

let hours = 0, minutes = 0, seconds = 0,
winLossTrackerArray = [],
figureCounter = 0, attemptCounter = 0


$figureCounterSpan.textContent = `0/${setting.figure_amount}`
$attemptCounterSpan.textContent = `0/${setting.attempt_amount}`

const time = function(){time1 = setInterval(getTime, 1000)}
let timeString = ""

function getTime()
{
    seconds++;
    winLossTrackerArray.push(0)
    checkRecord()

    if(seconds === 60)
    {
        seconds = 0
        minutes++
    }

    if(minutes === 60)
    {
        minutes = 0
        hours++;
    }

    if(hours === 12)
        hours = 0

    timeString = `${getFormattedDigits(hours)}:${getFormattedDigits(minutes)}:${getFormattedDigits(seconds)}`
    $timeSpan.textContent = timeString
}

function getFormattedDigits(timeDigit)
{
    if(timeDigit < 10) 
        return `0${timeDigit}`

    return timeDigit
}