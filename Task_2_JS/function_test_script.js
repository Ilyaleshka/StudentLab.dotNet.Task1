function processArray() {
    let input = document.getElementById("array-procesing-input");
    let textarea = document.getElementById("array-procesing-results");
    let array = input.value;
    array = array.split(",").map(x => Number(x));
    let results = "Max subsum = " + getMaxSubSumOn2(array);
    results += "\nMin = " + getMin(array);
    results += "\nMax = " + getMax(array);
    results += "\nMedian = " + getMedian(array.slice());
    results += "\nLongest increasing sequence = " + getLongestIncreasingSequence(array);
    results += "\nSorted (bubble) : " + BubbleSort(array.slice()).map((value) => {
        return String(value);
    }).join(",");
    results += "\nSorted (Selection) : " + SelectionSort(array.slice()).map((value) => {
        return String(value);
    }).join(",");
    results += "\nSorted (QuickSort) : " + QuickSort(array.slice(), 0, array.length).map((value) => {
        return String(value);
    }).join(",");
    results += "\nSorted (ShellSort) : " + ShellSort(array.slice()).map((value) => {
        return String(value);
    }).join(",");
    textarea.innerText = results;
}
//1,2,3,4,5,-9,6,-87,8,43,6,34,-7,9,-8,0,4,5,2,7,78,-9
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

function formateText() {
    let input = document.getElementById("text-formatter-date-input");
    let date = input.value;

    var radios = document.getElementsByName('wrap-type');
    var format;
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].type === 'radio' && radios[i].checked) {
            format = radios[i].value;
        }
    }

    let lineLengthInput = document.getElementById("text-formatter-line-length");
    let lineLength = Number(lineLengthInput.value.trim());

    let linesCountInput = document.getElementById("text-formatter-line-count");
    let linesCount = Number(linesCountInput.value.trim());

    let result = "";

    if (isNaN(lineLength) || isNaN(linesCount) || (linesCount < 0) || (lineLength < 0))
        result = "Invalid line length or line count";
    else
        result = getFormatText(date, lineLength, linesCount, format);

    let textarea = document.getElementById("text-formatter-results");
    textarea.innerText = result;
}
//calc-results
function calcAdd() {
    let val1 = document.getElementById("calc-arg1-input").value;
    let val2 = document.getElementById("calc-arg2-input").value;
    let floatFormat = document.getElementsByName("calc-format")[0].checked; //calc-format

    let result;
    try {
        result = getAdditionResult(val1, val2, floatFormat);
    } catch (e) {
        result = e;
    }
    let textarea = document.getElementById("calc-results");
    textarea.innerText = result;
}

function calcSub() {
    let val1 = document.getElementById("calc-arg1-input").value;
    let val2 = document.getElementById("calc-arg2-input").value;
    let floatFormat = document.getElementsByName("calc-format")[0].checked; //calc-format

    let result;
    try {
        result = getSubtractionResult(val1, val2, floatFormat);
    } catch (e) {
        result = e;
    }
    let textarea = document.getElementById("calc-results");
    textarea.innerText = result;
}

function calcMul() {
    let val1 = document.getElementById("calc-arg1-input").value;
    let val2 = document.getElementById("calc-arg2-input").value;
    let floatFormat = document.getElementsByName("calc-format")[0].checked; //calc-format
    let result;
    try {
        result = getMultiplicationResult(val1, val2, floatFormat);
    } catch (e) {
        result = e;
    }
    let textarea = document.getElementById("calc-results");
    textarea.innerText = result;
}

function calcDiv() {
    let val1 = document.getElementById("calc-arg1-input").value;
    let val2 = document.getElementById("calc-arg2-input").value;
    let floatFormat = document.getElementsByName("calc-format")[0].checked; //calc-format

    let result;
    try {
        result = getDivisionResult(val1, val2, floatFormat);
    } catch (e) {
        result = e;
    }
    let textarea = document.getElementById("calc-results");
    textarea.innerText = result;
}

function translateNumberSystem() {
    let num = document.getElementById("translate-number-input").value;
    let from = document.getElementById("translate-from-input").value;
    let to = document.getElementById("translate-to-input").value;

    let result;
    try {
        result = ConvertFromOneToOther(num.split(""), Number(from), Number(to)).join("");
    } catch (e) {
        result = e;
    }

    let textarea = document.getElementById("translate-results");
    textarea.innerText = result;
}



let element = document.getElementById("array-procesing-button");
element.addEventListener("click", processArray);

element = document.getElementById("date-formatter-button");
element.addEventListener("click", formateDate);

element = document.getElementById("text-formatter-button");
element.addEventListener("click", formateText);




element = document.getElementById("calc-add-button");
element.addEventListener("click", calcAdd);

element = document.getElementById("calc-sub-button");
element.addEventListener("click", calcSub);

element = document.getElementById("calc-mul-button");
element.addEventListener("click", calcMul);

element = document.getElementById("calc-div-button");
element.addEventListener("click", calcDiv);



element = document.getElementById("translate-button");
element.addEventListener("click", translateNumberSystem);


//date-formatter-button