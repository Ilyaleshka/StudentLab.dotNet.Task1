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
    let currLineSize = 0;
    let currLineCount;
    symbolFormat(sourceString, maxLineSize, maxLineCount)
}

function wordFormat(sourceString, maxLineSize, maxLineCount) {



    let currWord = "";
    let lineWordsCount = 0;

    let currLineSize = 0;
    let currLineCount = 1;
    let i = 0;
    while (i < sourceString.length) {

        if (sourceString[i] == " ") {
            if ((maxLineSize == 0) || ((currLineSize + 1) <= maxLineSize)) {
                currLineSize++;
            } else {
                sourceString = splice(sourceString, i, 0, '\n');
                currLineSize = 0;
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
            currLineSize = 0;
            currLineCount++;
            i++
            if ((maxLineCount != 0) && (currLineCount > maxLineCount)) {
                sourceString = sourceString.slice(0, i - 1);
                break;
            }
            continue;
        }

        let j = i;
        while((j < sourceString.length) && (sourceString[i] != "\n") && (sourceString[i] != " "))
        {
            j++;
        }

        if((maxLineSize == 0) || ((currLineSize + (j + 1 - i) <= maxLineSize) || (lineWordsCount == 0)) )
        {
            if(maxLineSize == 0)
            {
                currLineSize += i - j + 1;
                i = j;
                i++
                continue;
            }

            if((lineWordsCount == 0) && (currLineSize + (j + 1 - i) > maxLineSize) && (currLineSize != 0))
            {
                sourceString = splice(sourceString, i, 0, '\n');
                currLineSize = 0;
                currLineCount++;
                i++;
                j++;
                if ((maxLineCount != 0) && (currLineCount > maxLineCount)) {
                    sourceString = sourceString.slice(0, i - 1);
                    break;
                }
            }
            currLineSize += i - j + 1;
            i = j;
        }

        i++;
    }
    return sourceString;
}

function symbolFormat(sourceString, maxLineSize, maxLineCount) {
    let currLineSize = 0;
    let currLineCount = 1;
    let i = 0;
    while (i < sourceString.length) {

        if (sourceString[i] == "\n") {
            currLineSize = 0;
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
            currLineSize = 0;
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

function sentenceFormat(sourceString, maxLineSize, maxLineCount) {

}
console.log("Symbols:");
console.log(symbolFormat("tessd gjfsdft\nsdfsghdfsdjgh f\nsdfs ddfsd  fsdf\nsdfdfsdfsdfs dfsdfsddgsdg sdg", 7, 6));
console.log("word:");
console.log(wordFormat("tessd gjfsdft\nsdfsghdfsdjgh f\nsdfs ddfsd  fsdf\nsdfdfsdfsdfs dfsdfsddgsdg sdg", 7, 6));