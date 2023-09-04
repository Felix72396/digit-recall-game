

function setRecord(itemName, recalledFigureCount) {
    if (!localStorage.getItem(itemName)) {
        localStorage.setItem(itemName, recalledFigureCount)
        showRecord()
    }
    else {
        let previousRecord = JSON.parse(localStorage.getItem(itemName))

        if (recalledFigureCount > previousRecord) {
            localStorage.setItem(itemName, recalledFigureCount)
            showRecord()
        }
    }
}

function checkRecord() {
    let { length } = winLossTrackerArray,
        right = length + left1 - 1

    if (length < 600) {
        let array = winLossTrackerArray.slice(left1, right),
        recalledFigureCount = array.filter(bit => bit === 1).length
        setRecord("10min_record", recalledFigureCount)
        
    }

    if(length < 2700)
    {
        right = length + left2 - 1
        let array = winLossTrackerArray.slice(left2, right),
            recalledFigureCount = array.filter(bit => bit === 1).length
            setRecord("45min_record", recalledFigureCount)
    }

    if (length >= 600) {
        let array = winLossTrackerArray.slice(left1, right),
            recalledFigureCount = array.filter(bit => bit === 1).length
        setRecord("10min_record", recalledFigureCount)
        left1++


    }

    if (length >= 2700) {
        right = length + left2 - 1
        let array = winLossTrackerArray.slice(left2, right),
            recalledFigureCount = array.filter(bit => bit === 1).length
            setRecord("45min_record", recalledFigureCount)

        left2++

    }
}

function showRecord() {
    const $10minRecord = document.querySelector("#min-record"),
        $1hourRecord = document.querySelector("#forty-five-min-record")

    let record1 = localStorage.getItem("10min_record"),
        record2 = localStorage.getItem("45min_record")

    $10minRecord.textContent = record1 || 0

    $1hourRecord.textContent = record2 || 0

}

showRecord()

function checkTimeRecord() {
    if (!timeRecord) {
        timeRecord = timeString
        localStorage.setItem("time", timeRecord)
    }
    else {
        let regex = /\d{2}/g

        let digits = timeRecord.match(regex)
        digits = digits.map(d => parseInt(d))

        let sum1 = (digits[0] * 3600) + (digits[1] * 60) + digits[2]

        digits = timeString.match(regex)
        digits = digits.map(d => parseInt(d))

        let sum2 = (digits[0] * 3600) + (digits[1] * 60) + digits[2]

        // console.log("sum1", sum1, timeRecord, "sum2", sum2, timeString)
        if (sum1 > sum2) {
            localStorage.setItem("time", timeString)
            $timeRecord.textContent = timeString
        }
        
    }

    $timeRecord.textContent = timeRecord || "00:00:00"

}