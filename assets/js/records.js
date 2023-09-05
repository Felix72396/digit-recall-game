

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
        right = length + left - 1

    if (length < 600) {
        let array = winLossTrackerArray.slice(left, right),
        recalledFigureCount = array.filter(bit => bit === 1).length
        setRecord("10min_record", recalledFigureCount)
        
    }

    if (length >= 600) {
        let array = winLossTrackerArray.slice(left, right),
            recalledFigureCount = array.filter(bit => bit === 1).length
        setRecord("10min_record", recalledFigureCount)
        left++
    }
}

function showRecord() {
    const $10minRecord = document.querySelector("#min-record")

    let record = localStorage.getItem("10min_record")

    $10minRecord.textContent = record || 0


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

      
        if (sum1 > sum2) {
            console.log("sum1", sum1, timeRecord, "sum2", sum2, timeString)
            localStorage.setItem("time", timeString)
            timeRecord = timeString
        }
        
    }

    $timeRecord.textContent = timeRecord || "00:00:00"

}