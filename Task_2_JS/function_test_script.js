function processArray() {
    let input = document.getElementById("array-procesing-input");
    let textarea = document.getElementById("array-procesing-results");
    let array = input.value;
    array = array.split(",").map(x => Number(x));
    let results = "Max subsum = " + getMaxSubSumOn2(array);
    results += "\nMin = " + getMin(array);
    results += "\nMax = " + getMax(array);
    results += "\nMedian = " + getMedian(array);
    results += "\nLongest increasing sequence = " + getLongestIncreasingSequence(array);
    textarea.innerText = results;
}

function formateDate() {
    let input = document.getElementById("date-formatter-date-input");
    let date = input.value;
    input = document.getElementById("date-formatter-format-input");
    let format = input.value;

    let results = "";
    let shorttime, longtime, fromnow;
    try {
        if (format.trim() == "") {
            shorttime = getShortDate(date.trim());
            longtime = getLongDate(date.trim());
            fromnow = fromNow(date.trim());
        } else {
            shorttime = getShortDate(date.trim(), format.trim());
            longtime = getLongDate(date.trim(), format.trim());
            fromnow = fromNow(date.trim(), format.trim());
        }
        results = "Short format : " + shorttime;
        results += "\nLong format : " + longtime;
        results += "\nFrom now : " + fromnow;
    } catch (e) {
        results = String(e);
    }


    let textarea = document.getElementById("date-formatter-results");
    textarea.innerText = results;
}

let element = document.getElementById("array-procesing-button");
element.addEventListener("click", processArray);

element = document.getElementById("date-formatter-button");
element.addEventListener("click", formateDate);
//date-formatter-button