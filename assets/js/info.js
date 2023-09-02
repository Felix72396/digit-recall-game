$figureCounterSpan.textContent = `0/${figureAmount||"X"}`
$attemptCounterSpan.textContent = `0/${attemptAmount||"X"}`

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