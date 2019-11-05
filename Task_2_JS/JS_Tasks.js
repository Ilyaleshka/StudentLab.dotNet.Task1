/*
1.	Array Processing Tool
a.	Sub Sum
На входе массив чисел, например: arr = [1, -2, 3, 4, -9, 6].
Задача — найти непрерывный подмассив arr, сумма элементов которого максимальна. Функция должна возвращать только эту сумму.

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
Написать функционал поиска минимального, максимального, медианного значения в массиве.
c.	Selection Task
Написать функционал поиска возрастающей последовательности максимальной длины в исходном массиве.

Например: 1, 3, 7, 4, 6, 7, 8, 1, 2, 5, 7, 8, 90, 1

	Все функции обернуть в один объект для обработки массивов.

*/

//1, -2, 3, 4, -9, 6

//Done
function getMaxSubSumOn2(array)
{
    let bufMaxSum = 0;
    let currSum = 0;
    for(let i = 0; i < array.length; i++)
    {
        currSum = 0;
        for(let j = i; j < array.length; j++)
        {
            currSum += array[j];
            if(bufMaxSum < currSum)
            {
                bufMaxSum = currSum
            }
        }
    }
    return bufMaxSum;
}

function getMaxSubSumOn(array)
{
    let currSum = 0;
    let maxSum = 0; 

    for(let i = 0; i < array.length; i++)
    {
        if((i === 0))
        {
            currSum = array[i];
            continue;
        }

        if(currSum + array[i] < currSum)
        {
            if(maxSum < currSum)
                maxSum = currSum;
        }

        currSum += array[i];
        if(currSum < array[i])
            currSum = array[i];
    }

    return (currSum > maxSum) ?currSum : maxSum;
}

console.log("-------------subsum---------------");
let testArgs = [
    [-1, 2, 3, -9],
    [2, -1, 2, 3, -9],
    [-1, 2, 3, -9, 11],
    [-2, -1, 1, 2],
    [100, -9, 2, -3, 5],
    [1, 2, 3],
    [-1, -2, -3]];

for(let i = 0; i < testArgs.length;i++)
{
    console.log(testArgs[i]);
    console.log(getMaxSubSumOn2(testArgs[i]));
    console.log(getMaxSubSumOn(testArgs[i]));
    console.log();
}

function getMin(array)
{
    if((!array.constructor === Array)&&(array.length == 0))
        return;

    let min = array[0];
    for(let i = 1; i < array.length; i++)
    {
        if(array[i] < min)
            min = array[i];
    }
    return min;
}

function getMax(array)
{
    if((!array.constructor === Array)&&(array.length == 0))
        return;

    let min = array[0];
    for(let i = 1; i < array.length; i++)
    {
        if(array[i] > min)
            min = array[i];
    }
    return min;
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

function getLongestIncreasingSequence(array)
{
    if((!array.constructor === Array)&&(array.length == 0))
        return;

    let maxLenght = 0;
    let startIndex = 0;
    let endIndex = 0;

    let bufMaxLenght = 1;
    let bufStartIndex = 0;
    let bufEndIndex = 0;

    for(let i = 1; i < array.length; i++)
    {
        if(array[i] > array[i-1])
        {
            bufMaxLenght++;
            bufEndIndex++;
        }
        else
        {
            if(bufMaxLenght > maxLenght)
            {
                maxLenght = bufMaxLenght;
                startIndex = bufStartIndex;
                endIndex = bufEndIndex;
            }
            bufMaxLenght = 1;
            bufStartIndex = i;
            bufEndIndex = i;
        }

        if(bufMaxLenght > maxLenght)
        {
            maxLenght = bufMaxLenght;
            startIndex = bufStartIndex;
            endIndex = bufEndIndex;
        }
    }

    console.log(startIndex);
    console.log(endIndex);
    return array.slice(startIndex, endIndex + 1);
}

console.log("-------------longest increasing sequence---------------");
for(let i = 0; i < testArgs.length;i++)
{
    console.log(testArgs[i]);
    console.log(getLongestIncreasingSequence(testArgs[i]));
}