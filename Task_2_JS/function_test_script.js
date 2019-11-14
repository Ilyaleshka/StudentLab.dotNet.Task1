
let selectElement;

selectElement = document.getElementById('date-day');
for (let i = 1; i < 32; i++) {
    let optionElement = document.createElement('option');
    optionElement.innerHTML = String(i);
    selectElement.append(optionElement);
}

selectElement = document.getElementById('date-month');
for (let i = 1; i < 13; i++) {
    let  optionElement = document.createElement('option');
    optionElement.innerHTML = String(i);
    selectElement.append(optionElement);
}

selectElement = document.getElementById('date-year');
for (let i = 1920; i < 2120; i++) {
    let  optionElement = document.createElement('option');
    optionElement.innerHTML = String(i);
    selectElement.append(optionElement);
}


function processArray() {
    let input = document.getElementById("array-procesing-input");
    let textarea = document.getElementById("array-procesing-results");
    let array = input.value;
    array = array.split(",").map(x => Number(x));
    let results = "Max subsum = " + imports.arrayProcessor.getMaxSubSumOn2(array);
    results += "\nMin = " + imports.arrayProcessor.getMin(array);
    results += "\nMax = " + imports.arrayProcessor.getMax(array);
    results += "\nMedian = " + imports.arrayProcessor.getMedian(array.slice());
    results += "\nLongest increasing sequence = " + imports.arrayProcessor.getLongestIncreasingSequence(array);
    results += "\nSorted (bubble) : " + imports.arraySorter.bubbleSort(array.slice()).map((value) => {
        return String(value);
    }).join(",");
    results += "\nSorted (Selection) : " + imports.arraySorter.selectionSort(array.slice()).map((value) => {
        return String(value);
    }).join(",");
    results += "\nSorted (QuickSort) : " + imports.arraySorter.quickSort(array.slice(), 0, array.length).map((value) => {
        return String(value);
    }).join(",");
    results += "\nSorted (ShellSort) : " + imports.arraySorter.shellSort(array.slice()).map((value) => {
        return String(value);
    }).join(",");
    textarea.innerText = results;
}
//1,2,3,4,5,-9,6,-87,8,43,6,34,-7,9,-8,0,4,5,2,7,78,-9
/*
function formateDate() {
    let input = document.getElementById("date-formatter-date-input");
    let date = input.value;
    input = document.getElementById("date-formatter-format-input");
    let format = input.value;

    let results = "";
    let shorttime, longtime, fromnow;
    try {
        if (format.trim() == "") {
            shorttime = imports.dateFormatter.getShortDate(date.trim());
            longtime = imports.dateFormatter.getLongDate(date.trim());
            fromnow = imports.dateFormatter.fromNow(date.trim());
        } else {
            shorttime = imports.dateFormatter.getShortDate(date.trim(), format.trim());
            longtime = imports.dateFormatter.getLongDate(date.trim(), format.trim());
            fromnow = imports.dateFormatter.fromNow(date.trim(), format.trim());
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
*/

function formateDateImpl2() {
    let day = +(document.getElementById('date-day').value);
    let month = +(document.getElementById('date-month').value);
    let year = +(document.getElementById('date-year').value);

    input = document.getElementById("date-formatter-format-input");
    let format = input.value;
    let result = "";

    let date = new Date(year, month - 1, day, 12);
    try {

        if ((date.getDate() != day) || (date.getFullYear() != year) || (date.getMonth() != (month - 1))) {
            throw "This date does not exist";
        }

        if (format.trim() !== "") {
            result = imports.dateFormatter.formateDate(date, format);
        } else
            result = imports.dateFormatter.formateDate(date);

        result += "\n" + imports.dateFormatter.yearsFromNow(date);
    } catch (e) {
        result = String(e);
    }

    let textarea = document.getElementById("date-formatter-results");
    textarea.innerText = result;
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
        result = imports.textFormatter.getFormatText(date, lineLength, linesCount, format);

    let textarea = document.getElementById("text-formatter-results");
    textarea.innerText = result;
}


function calcAdd() {
    let val1 = document.getElementById("calc-arg1-input").value;
    let val2 = document.getElementById("calc-arg2-input").value;
    let floatFormat = document.getElementsByName("calc-format")[0].checked;

    let result;
    try {
        result = imports.calculator.getAdditionResult(val1, val2, floatFormat);
    } catch (e) {
        result = e;
    }
    let textarea = document.getElementById("calc-results");
    textarea.innerText = result;
}

function calcSub() {
    let val1 = document.getElementById("calc-arg1-input").value;
    let val2 = document.getElementById("calc-arg2-input").value;
    let floatFormat = document.getElementsByName("calc-format")[0].checked;

    let result;
    try {
        result = imports.calculator.getSubtractionResult(val1, val2, floatFormat);
    } catch (e) {
        result = e;
    }
    let textarea = document.getElementById("calc-results");
    textarea.innerText = result;
}

function calcMul() {
    let val1 = document.getElementById("calc-arg1-input").value;
    let val2 = document.getElementById("calc-arg2-input").value;
    let floatFormat = document.getElementsByName("calc-format")[0].checked;
    let result;
    try {
        result = imports.calculator.getMultiplicationResult(val1, val2, floatFormat);
    } catch (e) {
        result = e;
    }
    let textarea = document.getElementById("calc-results");
    textarea.innerText = result;
}

function calcDiv() {
    let val1 = document.getElementById("calc-arg1-input").value;
    let val2 = document.getElementById("calc-arg2-input").value;
    let floatFormat = document.getElementsByName("calc-format")[0].checked;

    let result;
    try {
        result = imports.calculator.getDivisionResult(val1, val2, floatFormat);
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
        result = imports.numberConverter.ConvertFromOneToOther(num.split(""), Number(from), Number(to)).join("");
    } catch (e) {
        result = e;
    }

    let textarea = document.getElementById("translate-results");
    textarea.innerText = result;
}



let element = document.getElementById("array-procesing-button");
element.addEventListener("click", processArray);

element = document.getElementById("date-formatter-button");
element.addEventListener("click", formateDateImpl2);

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