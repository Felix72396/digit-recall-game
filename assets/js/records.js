

function checkRecord()
{
    let {length} = winLossTrackerArray
    if(length >= 600)
    {
        let array = winLossTrackerArray.slice(right1, length + right1 - 1),
        recalledFigureCount = array.filter(bit => bit === 1).length

        right1++

        if(!localStorage.getItem("10min_record"))
        {
            localStorage.setItem("10min_record", recalledFigureCount)
            showRecord()
        }
        else{
            let previousRecord = JSON.parse(localStorage.getItem("10min_record"))

            console.log(previousRecord, typeof previousRecord, "  ", recalledFigureCount, array.filter(o=> o===1), seconds)
            if(recalledFigureCount > previousRecord)
            {
                localStorage.setItem("10min_record", recalledFigureCount)
                showRecord()
            }
        }
    }

    if(length >= 3600)
    {
        let array = winLossTrackerArray.slice(right2, length + right2 - 1),
        recalledFigureCount = array.filter(bit => bit === 1).length

        right2++

        if(!localStorage.getItem("1hour_record"))
        {
            localStorage.setItem("1hour_record", recalledFigureCount)
            showRecord()
        }
        else{
            let previousRecord = JSON.parse(localStorage.getItem("1hour_record"))

            if(recalledFigureCount > previousRecord)
            {
                localStorage.setItem("1hour_record", recalledFigureCount)
                showRecord()
            }
        }
    }
}

function showRecord()
{
    const $10minRecord = document.querySelector("#min-record"),
    $1hourRecord = document.querySelector("#hour-record")

    let record1 = localStorage.getItem("10min_record"),
        record2 = localStorage.getItem("1hour_record")

    $10minRecord.textContent = record1 || 0

    $1hourRecord.textContent = record2 || 0
}

showRecord()

function checkTimeRecord()
{
    if(!timeRecord)
    {
        localStorage.setItem("time", timeString)
    }
    else{
        let regex = /\d{2}/g

        let digits = timeRecord.match(regex)
        digits = digits.map(d => parseInt(d))
    
        let sum1 = (digits[0] * 3600) + (digits[1] * 60) + digits[2]
    
        digits = timeString.match(regex)
        digits = digits.map(d => parseInt(d))
    
        let sum2 = (digits[0] * 3600) + (digits[1] * 60) + digits[2]

        console.log("sum1", sum1, timeRecord, "sum2", sum2, timeString)
        if(sum1 > sum2)
        {
            localStorage.setItem("time", timeString)
            $timeRecord.textContent = timeString
        }
    }

    
}