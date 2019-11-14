/*
    1.	Array Processing Tool
    a.	Sub Sum
    На входе массив чисел, например: arr = [1, -2, 3, 4, -9, 6].
    Задача — найти непрерывный подмассив arr,
    сумма элементов которого максимальна.
    Функция должна возвращать только эту сумму.

    Написать два решения, сложность O(n2) и O(n).
    b.	Search
    Написать функционал поиска минимального, максимального,
    медианного значения в массиве.
    c.	Selection Task
    Написать функционал поиска возрастающей последовательности
    максимальной длины в исходном массиве.

*/


function getMaxSubSumOn2(array) {
    let bufMaxSum = 0;
    let currSum = 0;
    for (let i = 0; i < array.length; i++) {
        currSum = 0;
        for (let j = i; j < array.length; j++) {
            currSum += array[j];
            if (bufMaxSum < currSum) {
                bufMaxSum = currSum
            }
        }
    }
    return bufMaxSum;
}

function getMaxSubSumOn(array) {
    let currSum = 0;
    let maxSum = 0;

    for (let i = 0; i < array.length; i++) {
        if ((i == 0)) {
            currSum = array[i];
            continue;
        }

        if (currSum + array[i] < currSum) {
            if (maxSum < currSum)
                maxSum = currSum;
        }

        currSum += array[i];
        if (currSum < array[i])
            currSum = array[i];
    }

    return (currSum > maxSum) ? currSum : maxSum;
}

let testArgs = [
    [-1, 2, 3, -9],
    [2, -1, 2, 3, -9],
    [-1, 2, 3, -9, 11],
    [-2, -1, 1, 2],
    [100, -9, 2, -3, 5],
    [1, 2, 3],
    [-1, -2, -3],
    [0, 5, 7, -7, 5, -3, 8, 4, -10, 5, 3, 65, -4, 6, 0, -7, 6, 3, -8, -1, 5, 11, 3]
];

function getMin(array) {
    // throw
    // Operations priority is incorrect, `!` has higher priority than `===`
    if ((!(array.constructor === Array)) && (array.length == 0))
        throw "argument isn't array";

    let min = array[0];
    for (let i = 1; i < array.length; i++) {
        if (array[i] < min)
            min = array[i];
    }
    return min;
}

function getMax(array) {
    if ((!(array.constructor === Array)) && (array.length == 0))
        throw "argument isn't array";

    let min = array[0];
    for (let i = 1; i < array.length; i++) {
        if (array[i] > min)
            min = array[i];
    }
    return min;
}

function getMedian(array) {
    function compare(a, b) {
        if (a > b) return 1; // если первое значение больше второго
        if (a == b) return 0; // если равны
        if (a < b) return -1; // если первое значение меньше второго
    }


    if ((!(array.constructor === Array)) && (array.length == 0))
        throw "argument isn't array";


    let len = array.length;
    array.sort(compare);
    if ((len % 2) === 0)
        return ((array[len / 2] + array[(len / 2) - 1]) / 2);
    else
        return array[(len - 1) / 2];
}

function getLongestIncreasingSequence(array) {
    if ((!(array.constructor === Array)) && (array.length == 0))
        return;

    let maxLenght = 0;
    let startIndex = 0;
    let endIndex = 0;

    let bufMaxLenght = 1;
    let bufStartIndex = 0;
    let bufEndIndex = 0;

    for (let i = 1; i < array.length; i++) {
        if (array[i] > array[i - 1]) {
            bufMaxLenght++;
            bufEndIndex++;
        } else {
            if (bufMaxLenght > maxLenght) {
                maxLenght = bufMaxLenght;
                startIndex = bufStartIndex;
                endIndex = bufEndIndex;
            }
            bufMaxLenght = 1;
            bufStartIndex = i;
            bufEndIndex = i;
        }

        if (bufMaxLenght > maxLenght) {
            maxLenght = bufMaxLenght;
            startIndex = bufStartIndex;
            endIndex = bufEndIndex;
        }
    }

    return array.slice(startIndex, endIndex + 1);
}

var arrayProcessor = {
    getMaxSubSumOn2: getMaxSubSumOn2,
    getMaxSubSumOn: getMaxSubSumOn,
    getMin: getMin,
    getMax: getMax,
    getMedian: getMedian,
    getLongestIncreasingSequence: getLongestIncreasingSequence
}

/*
    Разработать объект для форматирования дат
    (объект содержащий набор функций). Объект
    должен позволять обрабатывать входные данные
    в виде строки или в виде числа (ticks, ms).
    Объект должен поддерживать возможность передачи
    внутрь формата для разбора исходной строки
    и построения выходной строки.
*/

let dateTestArgs = [
    "01012000", "31102011", "20130431", "2013-04-31"
]

let dateTestArgsFormats = [
    null, null, "YYYYMMDD", "YYYY-MM-DD"
]


// It should work differently
// You pass date object and get string
// let date = new Date('21-11-2019');
// let str = formatDate(date, 'YYYYMMDD')
// result is `20191121`
function countSymbols(str, symbol) {
    let smblArray = str.split("");
    smblArray = smblArray.filter((smbl) => smbl === symbol);
    return smblArray.length;
}

function formateDate(date, format = "DDMMYYYY") {
    let dayFormatType = countSymbols(format, "D");
    let monthFormatType = countSymbols(format, "M");
    let yearFormatType = countSymbols(format, "Y");


    let day = formatDay(date.getDate(), dayFormatType);
    let month = formatMonth(date.getMonth(), monthFormatType);
    let year = formatYear(date.getFullYear(), yearFormatType);

    let dayTargetStr = "D".repeat(dayFormatType);
    let dayIndex = format.indexOf(dayTargetStr);

    if (dayIndex != -1) {
        format = format.split("");
        format.splice(dayIndex, dayFormatType);
        format = format.join("");
        format = format.slice(0, dayIndex) + day + format.slice(dayIndex);
    }

    let yearTargetStr = "Y".repeat(yearFormatType);
    let yearIndex = format.indexOf(yearTargetStr);

    if (yearIndex != -1) {
        format = format.split("");
        format.splice(yearIndex, yearFormatType);
        format = format.join("");
        format = format.slice(0, yearIndex) + year + format.slice(yearIndex);
    }

    let monthTargetStr = "M".repeat(monthFormatType);
    let monthIndex = format.indexOf(monthTargetStr);

    if (monthIndex != -1) {
        format = format.split("");
        format.splice(monthIndex, monthFormatType);
        format = format.join("");
        format = format.slice(0, monthIndex) + month + format.slice(monthIndex);
    }

    return format;
}

function formatDay(day, formatType) {
    if (formatType == 2) {
        return (String(day)).padStart(2, '0');
    } else {
        throw new Error("Unknown format");
    }
}

function formatMonth(month, formatType) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    if (formatType == 2) {
        return (String(month + 1)).padStart(2, '0');
    } else if (formatType == 3) {
        return (months[month]).slice(0, 3);
    } else if (formatType == 4) {
        return months[month];
    } else {
        throw new Error("Unknown format");
    }
}

function formatYear(year, formatType) {
    if (formatType == 2) {
        return (String(year % 100)).padStart(2, '0');
    } else if (formatType == 4) {
        return String(year);
    } else {
        throw new Error("Unknown format");
    }
}


function yearsFromNow(date) {
    let fromDate = date;
    let currDate = Date.now();
    let dateDiff = new Date(currDate - fromDate);
    if (dateDiff != undefined) {
        let year = String(dateDiff.getFullYear() - 1970);
        if (year >= 0)
            return year + " years ago";
        else
            return "after " + Math.abs(year) + " years";
    } else
        return "incorrect args"
}

function getFormatDate(dateAsString, format = "DDMMYYYY") {
    let day = "";
    let month = "";
    let year = "";

    if (dateAsString.length != format.length)
        throw "Format and date length is different";

    for (let i = 0; i < dateAsString.length; i++) {
        switch (format[i]) {
            case "D":
                day += dateAsString[i];
                break;
            case "M":
                month += dateAsString[i];
                break;
            case "Y":
                year += dateAsString[i];
                break;
        }
    }

    let result = new Date(Number(year), Number(month) - 1, Number(day), 12);

    if ((result.getDate() != Number(day)) || (result.getFullYear() != Number(year)) || (result.getMonth() != (Number(month) - 1))) {
        throw "This date does not exist";
    }

    return result;
}

function getShortDate(dateAsString, format = "DDMMYYYY") {
    let date = getFormatDate(dateAsString, format);
    let day = String(date.getDate());
    let month = String(date.getMonth() + 1);
    let year = String(date.getFullYear());
    month = month.padStart(2, '0');
    day = day.padStart(2, '0');
    return day + "-" + month + "-" + year;
}

function getLongDate(dateAsString, format = "DDMMYYYY") {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let date = getFormatDate(dateAsString, format);
    if (date != undefined) {
        let day = String(date.getDate());
        let month = months[date.getMonth()];
        let year = String(date.getFullYear());
        month = month.padStart(2, '0');
        day = day.padStart(2, '0');
        return day + " " + month + " " + year;
    } else
        return "incorrect args"
}

function fromNow(dateAsString, format = "DDMMYYYY") {
    let fromDate = getFormatDate(dateAsString, format);
    let currDate = Date.now();
    let date = new Date(currDate - fromDate);
    if (date != undefined) {
        let year = String(date.getFullYear() - 1970);
        return year + " years ago";
    } else
        return "incorrect args"
}

var dateFormatter = {
    getShortDate: getShortDate,
    getLongDate: getLongDate,
    fromNow: fromNow,
    formateDate: formateDate,
    yearsFromNow: yearsFromNow,
}

/*
    Написать функцию обработчика входного текста.
    Функция должна принимать на вход строку,
    максимальный размер строки (опционально),
    максимальное количество строк (опционально),
    тип форматирования (“перенос по слову”,
    “перенос по символу”, “перенос по предложению”,
    “переносов нет” - опционально).
*/


function splice(sourceString, start, delCount, newSubStr) {
    return sourceString.slice(0, start) + newSubStr + sourceString.slice(start + Math.abs(delCount));
}

const WORD_FORMAT = "WORD";
const SYMBOL_FORMAT = "SYMBOL";
const SENTENCE_FORMAT = "SENTENCE";

function getFormatText(sourceString, maxLineSize = 0, maxLineCount = 0, formatType = "WORD") {

    let result = "";
    switch (formatType) {
        case WORD_FORMAT:
            result = wordFormat(sourceString, maxLineSize, maxLineCount)
            break;

        case SYMBOL_FORMAT:
            result = symbolFormat(sourceString, maxLineSize, maxLineCount)
            break;

        case SENTENCE_FORMAT:
            result = sentenceFormat(sourceString, maxLineSize, maxLineCount)
            break;
    }
    return result;
    //symbolFormat(sourceString, maxLineSize, maxLineCount)
}

function wordFormat(sourceString, maxLineSize = 0, maxLineCount = 0) {
    let lineWordsCount = 0;
    let currLineSize = 1;
    let currLineCount = 1;
    let i = 0;

    while (i < sourceString.length) {

        if (sourceString[i] == " ") {
            if ((maxLineSize == 0) || (((currLineSize + 1) <= maxLineSize) && (currLineSize <= maxLineSize))) {
                currLineSize++;
            } else {
                lineWordsCount = 0;
                sourceString = splice(sourceString, i, 0, '\n');
                currLineSize = 1;
                currLineCount++;
                i++;
                if ((maxLineCount != 0) && (currLineCount > maxLineCount)) {
                    sourceString = sourceString.slice(0, i - 1);
                    break;
                }
            }
            i++;
            continue;
        }

        if (sourceString[i] == "\n") {
            currLineSize = 1;
            currLineCount++;
            lineWordsCount = 0;
            i++
            if ((maxLineCount != 0) && (currLineCount > maxLineCount)) {
                sourceString = sourceString.slice(0, i - 1);
                break;
            }
            continue;
        }

        let j = i;
        while ((j + 1 < sourceString.length) && (sourceString[j + 1] != "\n") && (sourceString[j + 1] != " ")) {
            let buf = sourceString[j];
            j++;
        }

        if (maxLineSize == 0) {
            currLineSize += j - i + 1;
            i = j;
            i++
            lineWordsCount++;
            continue;
        }

        if (((currLineSize + (j - i) <= maxLineSize) || (lineWordsCount == 0))) {
            lineWordsCount++;
            currLineSize += j - i + 1;
            i = j;
            i++;
            continue;
        }

        if ((currLineSize + (j - i) > maxLineSize) && (currLineSize != 0)) {
            sourceString = splice(sourceString, i, 0, '\n');
            currLineSize = 1;
            currLineCount++;
            lineWordsCount = 0;
            i++;
            if ((maxLineCount != 0) && (currLineCount > maxLineCount)) {
                sourceString = sourceString.slice(0, i - 1);
                break;
            }
        }

        i++;
    }
    return sourceString;
}

function symbolFormat(sourceString, maxLineSize = 0, maxLineCount = 0) {
    let currLineSize = 1;
    let currLineCount = 1;
    let i = 0;
    while (i < sourceString.length) {

        if (sourceString[i] == "\n") {
            currLineSize = 1;
            currLineCount++;
            i++
            if ((maxLineCount != 0) && (currLineCount > maxLineCount)) {
                sourceString = sourceString.slice(0, i - 1);
                break;
            }
            continue;
        }

        if ((maxLineSize == 0) || ((currLineSize + 1) <= maxLineSize)) {
            currLineSize++;
        } else {
            sourceString = splice(sourceString, i, 0, '\n');
            currLineSize = 1;
            currLineCount++;
            if ((maxLineCount != 0) && (currLineCount > maxLineCount)) {
                sourceString = sourceString.slice(0, i - 1);
                break;
            }
            i++;
        }
        i++;
    }
    return sourceString;
}

function sentenceFormat(sourceString, maxLineSize = 0, maxLineCount = 0) {
    let lineWordsCount = 0;
    let currLineSize = 1;
    let currLineCount = 1;
    let i = 0;

    while (i < sourceString.length) {

        if (sourceString[i] == "\n") {
            currLineSize = 1;
            currLineCount++;
            lineWordsCount = 0;
            i++
            if ((maxLineCount != 0) && (currLineCount > maxLineCount)) {
                sourceString = sourceString.slice(0, i - 1);
                break;
            }
            continue;
        }

        let j = i;
        while ((j < sourceString.length) && (sourceString[j] != "\n") && (sourceString[j] != ".")) {
            let buf = sourceString[j];
            j++;
        }

        if (maxLineSize == 0) {
            currLineSize += j - i + 1;
            i = j;
            i++
            lineWordsCount++;
            continue;
        }

        if (((currLineSize + (j - i) <= maxLineSize) || (lineWordsCount == 0))) {
            lineWordsCount++;
            currLineSize += j - i + 1;
            i = j;
            i++;
            continue;
        }

        if ((currLineSize + (j - i) > maxLineSize) && (currLineSize != 0)) {
            sourceString = splice(sourceString, i, 0, '\n');
            currLineSize = 1;
            currLineCount++;
            lineWordsCount = 0;
            i++;
            if ((maxLineCount != 0) && (currLineCount > maxLineCount)) {
                sourceString = sourceString.slice(0, i - 1);
                break;
            }
        }

        i++;
    }
    return sourceString;
}

var textFormatter = {
    getFormatText: getFormatText,
}


//------------------------------------------------------------------------------
/*
    4.	String calculator
    Разработать объект содержащий набор методов для выполнения функций
    калькулятора над числами передаваемыми в строковом представлении.
    Методы должны позволять работать как в целочисленном, так и вещественном формате.
*/

function parseCalculatorArgs(num1, num2, floatFormat) {
    let var1, var2;

    if (!floatFormat) {
        var1 = parseInt(num1, 10);
        var2 = parseInt(num2, 10);
    } else {
        var1 = parseFloat(num1);
        var2 = parseFloat(num2);
    }

    if (isNaN(var1) || isNaN(var2))
        throw "Invalid arguments";

    return {
        var1,
        var2
    }
}


function getAdditionResult(num1, num2, floatFormat = false) {

    let {
        var1,
        var2
    } = parseCalculatorArgs(num1, num2, floatFormat);

    return var1 + var2;
}

function getMultiplicationResult(num1, num2, floatFormat = false) {

    let {
        var1,
        var2
    } = parseCalculatorArgs(num1, num2, floatFormat);

    return var1 * var2;
}

function getSubtractionResult(num1, num2, floatFormat = false) {

    let {
        var1,
        var2
    } = parseCalculatorArgs(num1, num2, floatFormat);

    return var1 - var2;
}

function getDivisionResult(num1, num2, floatFormat = false) {

    let {
        var1,
        var2
    } = parseCalculatorArgs(num1, num2, floatFormat);

    if (var2 === 0)
        throw "Division by zero";

    return var1 / var2;
}

var calculator = {
    getAdditionResult: getAdditionResult,
    getMultiplicationResult: getMultiplicationResult,
    getSubtractionResult: getSubtractionResult,
    getDivisionResult: getDivisionResult
}


//------------------------------------------------------------------------------
/*
    5.Реализовать 4 различных сортирповки массива
*/

function bubbleSort(sourceArray) {
    if ((!sourceArray.constructor === Array) && (sourceArray.length == 0))
        return "argument isn't array";

    let end = false;
    for (let i = 0; i < sourceArray.length; i++) {
        if (end)
            break;

        end = true;

        for (let j = 0; j < (sourceArray.length - 1) - i; j++) {
            if (sourceArray[j] < sourceArray[j + 1]) {
                let buf = sourceArray[j];
                sourceArray[j] = sourceArray[j + 1];
                sourceArray[j + 1] = buf;
                end = false;
            }
        }
    }

    return sourceArray;
}

function selectionSort(sourceArray) {
    if ((!sourceArray.constructor === Array) && (sourceArray.length == 0))
        throw "argument isn't array";

    for (let i = 0; i < sourceArray.length; i++) {
        let max = sourceArray[i];
        let index = i;
        for (let j = i + 1; j < sourceArray.length; j++) {
            if (sourceArray[j] > max) {
                max = sourceArray[j];
                index = j;
            }
        }
        let buf = sourceArray[i];
        sourceArray[i] = sourceArray[index];
        sourceArray[index] = buf;
    }

    return sourceArray;
}


function quickSort(sourceArray, left, right) {
    let l = left;
    let r = right;

    if (r - l <= 1) return;

    let t = (l + (r - l) / 2)
    let mid = sourceArray[Math.floor(l + (r - l) / 2)];
    let ll = l,
        rr = r - 1;

    while (ll <= rr) {
        while (sourceArray[ll] > mid) ll++;
        while (sourceArray[rr] < mid) rr--;
        if (ll <= rr) {
            let buf = sourceArray[ll];
            sourceArray[ll] = sourceArray[rr];
            sourceArray[rr] = buf;
            ll++;
            rr--;
        }
    }
    if (l < rr) {
        quickSort(sourceArray, l, rr + 1);
    }
    if (ll < r) {
        quickSort(sourceArray, ll, r);
    }

    return sourceArray;
}

function shellSort(sourceArray) {
    let step, i, j, tmp;
    let size = sourceArray.length;
    for (step = Math.floor(size / 1.7); step >= 1; step = Math.floor(step / 1.7)) {
        for (i = step; i < size; i++) {
            let temp = sourceArray[i];
            for (j = i;
                (j >= step) && (temp > sourceArray[j - step]); j -= step) {
                sourceArray[j] = sourceArray[j - step];
            }
            sourceArray[j] = temp;
        }
    }
    return sourceArray;
}

var arraySorter = {
    bubbleSort: bubbleSort,
    selectionSort: selectionSort,
    quickSort: quickSort,
    shellSort: shellSort
}

//------------------------------------------------------------------------------

/*
    6.НАписать функцию конвертации чисел из одной сс в другую
*/

let numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F']

function ConvertFromDecimalToOther(numArray, digit) {

    let num = Number(numArray.join(""));
    let number = "";

    let remainder;

    while (num >= digit) {
        remainder = num % digit;
        number = number + numbers[remainder];
        num = Math.floor(num / digit);
    }

    number = number + numbers[num];
    let result = String(number).split("").reverse();
    return result;
}

function ConvertToDecimal(num, digit) {
    let res = 0;

    for (let i = num.length - 1; i >= 0; --i) {
        let j = num.length - 1 - i;
        res += numbers.indexOf(num[i]) * Math.pow(digit, j);
    }

    let bufres = String(res);

    return bufres.split("");
}

function ConvertFromOneToOther(num, from, to) {

    if (typeof (to) !== typeof (5))
        throw new Error("Invalid args");
    if ((from <= 1) || (from > 16) || (to <= 1) || (to > 16))
        throw new Error("Invalid args");


    let decimal = ConvertToDecimal(num, from);
    return ConvertFromDecimalToOther(decimal, to);
}

var numberConverter = {
    ConvertFromOneToOther: ConvertFromOneToOther
}

var imports = {
    numberConverter,
    arraySorter,
    calculator,
    textFormatter,
    dateFormatter,
    arrayProcessor
};