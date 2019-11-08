/*
1.	Array Processing Tool
a.	Sub Sum
На входе массив чисел, например: arr = [1, -2, 3, 4, -9, 6].
Задача — найти непрерывный подмассив arr,
 сумма элементов которого максимальна.
  Функция должна возвращать только эту сумму.

Например:
1.	getMaxSubSum([-1, 2, 3, -9]) = 5
2.	getMaxSubSum([2, -1, 2, 3, -9]) = 6
3.	getMaxSubSum([-1, 2, 3, -9, 11]) = 11 
4.	getMaxSubSum([-2, -1, 1, 2]) = 3
5.	getMaxSubSum([100, -9, 2, -3, 5]) = 100
6.	getMaxSubSum([1, 2, 3]) = 6
7.	getMaxSubSum([-1, -2, -3]) = 0

Написать два решения, сложность O(n2) и O(n).
b.	Search
Написать функционал поиска минимального, максимального,
 медианного значения в массиве.
c.	Selection Task
Написать функционал поиска возрастающей последовательности 
максимальной длины в исходном массиве.

Например: 1, 3, 7, 4, 6, 7, 8, 1, 2, 5, 7, 8, 90, 1

	Все функции обернуть в один объект для обработки массивов.

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
    if ((!array.constructor === Array) && (array.length == 0))
        return "argument isn't array";

    let min = array[0];
    for (let i = 1; i < array.length; i++) {
        if (array[i] < min)
            min = array[i];
    }
    return min;
}

function getMax(array) {
    if ((!array.constructor === Array) && (array.length == 0))
        return "argument isn't array";

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

    if ((!array.constructor === Array) && (array.length == 0))
        return "argument isn't array";


    let len = array.length;
    array.sort(compare);
    console.log(array);
    if ((len % 2) === 0)
        return ((array[len / 2] + array[(len / 2) - 1]) / 2);
    else
        return array[(len - 1) / 2];
}

function getLongestIncreasingSequence(array) {
    if ((!array.constructor === Array) && (array.length == 0))
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

    console.log(startIndex);
    console.log(endIndex);
    return array.slice(startIndex, endIndex + 1);
}

/*
console.log("-------------subsum---------------");
for(let i = 0; i < testArgs.length;i++)
{
    console.log(testArgs[i]);
    console.log(getMaxSubSumOn2(testArgs[i]));
    console.log(getMaxSubSumOn(testArgs[i]));
    console.log();
}

console.log("-------------min---------------");
for(let i = 0; i < testArgs.length;i++)
{
    console.log(testArgs[i]);
    console.log(getMin(testArgs[i]));
}

console.log("-------------max---------------");
for(let i = 0; i < testArgs.length;i++)
{
    console.log(testArgs[i]);
    console.log(getMax(testArgs[i]));
}

console.log("-----------average-------------");
for(let i = 0; i < testArgs.length;i++)
{
    console.log(testArgs[i]);
    console.log(getMedian(testArgs[i]));
}

console.log("-------------longest increasing sequence---------------");
for(let i = 0; i < testArgs.length;i++)
{
    console.log(testArgs[i]);
    console.log(getLongestIncreasingSequence(testArgs[i]));
}
*/







/*
Разработать объект для форматирования дат 
(объект содержащий набор функций). Объект
 должен позволять обрабатывать входные данные 
 в виде строки или в виде числа (ticks, ms).
  Объект должен поддерживать возможность передачи
   внутрь формата для разбора исходной строки
    и построения выходной строки.

Например:
1.	“31102011” => “31-10-2011”
2.	“31102011” => “31 October 2011”
3.	(“20130431”, “YYYYMMDD”) => 31 April 2013
4.	(“20130431”, “MM-DD-YYYY”) => 04-31-2013
5.	(“2013-04-31”, “YYYY-MM-DD”).fromNow() => 2 years ago
		
		Реализовать как можно больше прикладных конверсий.

*/

let dateTestArgs = [
    "01012000", "31102011", "20130431", "2013-04-31"
]

let dateTestArgsFormats = [
    null, null, "YYYYMMDD", "YYYY-MM-DD"
]

function getFormatDate(dateAsString, format = "DDMMYYYY") {
    let day = "";
    let month = "";
    let year = "";

    if (dateAsString.length != format.length)
        return;

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
        throw "Incorrect date";
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

/*
console.log("-------------time formatter---------------");
for (let i = 0; i < dateTestArgs.length; i++) {
    console.log(dateTestArgs[i]);
    console.log(dateTestArgsFormats[i]);
    try {
        if (dateTestArgsFormats[i] == null) {
            console.log(getShortDate(dateTestArgs[i]));
            console.log(getLongDate(dateTestArgs[i]));
            console.log(fromNow(dateTestArgs[i]));
        } else {
            console.log(getShortDate(dateTestArgs[i], dateTestArgsFormats[i]));
            console.log(getLongDate(dateTestArgs[i], dateTestArgsFormats[i]));
            console.log(fromNow(dateTestArgs[i], dateTestArgsFormats[i]));
        }
    } catch (e) {
        console.log(e)
    }
    console.log();
}
*/






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

function getFormatText(sourceString, maxLineSize = 0, maxLineCount = 0, formatType = "NONE") {
    symbolFormat(sourceString, maxLineSize, maxLineCount)
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
//console.log("Symbols:");
//console.log(symbolFormat("tessd gjfsdft\nsdfsghdfsdjgh f\nsdfs ddfsd  fsdf\nsdfdfsdfsdfs dfsdfsddgsdg sdg", 7, 6));
let str = "Halloween, the time of pumpkins, candies, ghosts, witches and much more, is annually celebrated on 31 October. That's the night before All Saints Day. Its origins date back thousands of years to the Celtic festival of Samhaim or The Feast of the Sun, a most significant holiday of the Celtic year. This day marked the end of summer but also the season of darkness as well as the beginning of the New Year on 1 November."
/*
console.log(str);
console.log();
console.log("word:");
console.log(wordFormat(str));
console.log();
console.log("symbol:");
console.log(symbolFormat(str));
console.log();
console.log("symbol:");
console.log(sentenceFormat(str));
*/

/*
4.	String calculator
Разработать объект содержащий набор методов для выполнения функций 
калькулятора над числами передаваемыми в строковом представлении.
 Методы должны позволять работать как в целочисленном, так и вещественном формате.
 */

function getAdditionResult(num1, num2, floatFormat = false) {
    let var1, var2;

    if (!floatFormat) {
        var1 = parseInt(num1, 10);
        var2 = parseInt(num2, 10);
    } else {
        var1 = parseFloat(num1);
        var2 = parseFloat(num2);
    }

    if (isNaN(num1) || isNaN(num2))
        throw "Invalid arguments";

    return var1 + var2;
}

function getMultiplicationResult(num1, num2, floatFormat = false) {
    let var1, var2;

    if (!floatFormat) {
        var1 = parseInt(num1, 10);
        var2 = parseInt(num2, 10);
    } else {
        var1 = parseFloat(num1);
        var2 = parseFloat(num2);
    }

    if (isNaN(num1) || isNaN(num2))
        throw "Invalid arguments";

    return var1 * var2;
}

function getSubtractionResult(num1, num2, floatFormat = false) {
    let var1, var2;

    if (!floatFormat) {
        var1 = parseInt(num1, 10);
        var2 = parseInt(num2, 10);
    } else {
        var1 = parseFloat(num1);
        var2 = parseFloat(num2);
    }

    if (isNaN(num1) || isNaN(num2))
        throw "Invalid arguments";

    return var1 + var2;
}

function getDivisionResul(num1, num2, floatFormat = false) {
    let var1, var2;

    if (!floatFormat) {
        var1 = parseInt(num1, 10);
        var2 = parseInt(num2, 10);
    } else {
        var1 = parseFloat(num1);
        var2 = parseFloat(num2);
    }

    if (isNaN(num1) || isNaN(num2))
        throw "Invalid arguments";

    return var1 / var2;
}

function getDifference(num1, num2, floatFormat = false) {
    let var1, var2;

    if (!floatFormat) {
        var1 = parseInt(num1, 10);
        var2 = parseInt(num2, 10);
    } else {
        var1 = parseFloat(num1);
        var2 = parseFloat(num2);
    }

    if (isNaN(num1) || isNaN(num2))
        throw "Invalid arguments";

    return var1 - var2;
}

//console.log(getSum("100000.5", "0.5", true));

function BubbleSort(sourceArray) {
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

function BubbleSort(sourceArray) {
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

function SelectionSort(sourceArray) {
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

function SelectionSort(sourceArray) {
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


function QuickSort(sourceArray, left, right) {
    let l = left;
    let r = right;

    if (r - l <= 1) return;

    let t = (l + (r - l) / 2)
    let mid = sourceArray[Math.ceil(l + (r - l) / 2)];
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
        QuickSort(sourceArray, l, rr + 1);
    }
    if (ll < r) {
        QuickSort(sourceArray, ll, r);
    }

    return sourceArray;
}

function QuickSort(sourceArray, left, right) {
    let l = left;
    let r = right;

    if (r - l <= 1) return;

    let mid = sourceArray[Math.ceil(l + (r - l) / 2)];
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
        QuickSort(sourceArray, l, rr + 1);
    }
    if (ll < r) {
        QuickSort(sourceArray, ll, r);
    }

    return sourceArray;
}

function gShellSort(sourceArray) {
    let l = 0;
    let r = sourceArray.length - 1;
    let sz = sourceArray.length;
    let step = sz / 2;
    while (step >= 1) {
        for (let i = l + step; i < r; i++) {
            let j = i;
            let diff = Math.ceil(j - step);
            while (diff >= l && sourceArray[diff] > sourceArray[j]) {
                let buf = sourceArray[diff];
                sourceArray[j] = sourceArray[diff];
                sourceArray[diff] = buf;
                j = diff;
                diff = Math.ceil(j - step);
            }
        }
        step /= 2;
    }
    return sourceArray;
}

function ShellSort(sourceArray) // * ∆k = (b∆k−1)/2  ∆0 = N
{
    let step, i, j, tmp;
    let size = sourceArray.length;
    // Выбор шага
    for (step = Math.round(size / 1.7); step > 1; step = Math.round(step / 1.7)) {
        // Перечисление элементов, которые сортируются на определённом шаге
        for (i = step; i < size; i++) {
            let temp = sourceArray[i];
            // Перестановка элементов внутри подсписка, пока i-тый не будет отсортирован
            for (j = i; (j >= step ) && (temp < sourceArray[j - step]); j -= step) {
                sourceArray[j] = sourceArray[j - step];
            }
            sourceArray[j] = temp;
        }
    }

    return sourceArray;
}


let arr = [0, 5, 7, -7, 5, -3, 8, 4, -10, 5, 3, 65, -4, 6, 0, -7, 6, 3, -8, -1, 5, 11, 3];
console.log("bubble");
console.log(BubbleSort(arr.slice()));
console.log("selection");
console.log(SelectionSort(arr.slice()));
console.log("quick");
console.log(QuickSort(arr.slice(), 0, arr.length));
console.log("shell");
console.log(ShellSort(arr.slice()));
/*let t = BubbleSort(arr)
for (i = 0; i < t.length; i++) {
    console.log(t[i]);
}*/