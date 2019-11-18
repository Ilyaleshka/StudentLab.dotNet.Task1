const CURRENCIES_URL = "http://www.nbrb.by/api/exrates/currencies";
//const CURRENCIES_URL = "http://www.nbrb.by/api/exrates/currencies";
var queryCount = 0;
var currencyRate = {};
let allCurrencies = [];
let currentCurrencies = [];
let currencyCount = 5;
//http://www.nbrb.by/API/ExRates/Rates/Dynamics/{Cur_ID}
const CURRENCY_RATE_URL = "https://www.nbrb.by/API/ExRates/Rates/Dynamics";
let startDate = "2019-9-2";
let endDate = "2019-10-4";

function fillCurrencySelect(currencies) {
    let currencySelect = document.getElementById('selected-currency');
    for (let i = 0; i < currencies.length; i++) {
        let optionElement = document.createElement('option');
        //optionElement.innerHTML = String(currencies[i].Cur_Name);//Cur_QuotName
        optionElement.innerHTML = String(currencies[i].Cur_QuotName); //Cur_QuotName
        currencySelect.append(optionElement);
    }
}

// Огромные функции, их следует разбить на более мелкие. Посмотри Single responsibility principle
function currenciesRateQuery() {
    let dateRange;

    let errorOutput = document.getElementById("errors-output");
    errorOutput.innerText = "";
    try {
        dateRange = processDate();
    } catch (e) {
        errorOutput.innerText = e;
        return;
    }

    currencyRate = {};
    startDate = dateRange.from;
    endDate = dateRange.to;


    let selectedArray = new Array();
    let selObj = document.getElementById('selected-currency');
    for (let i = 0; i < selObj.options.length; i++) {
        if (selObj.options[i].selected) {
            selectedArray.push(allCurrencies[i]);
        }
    }

    currentCurrencies = selectedArray;
    queryCount = selectedArray.length;
    for (let i = 0; i < selectedArray.length; i++) {

        let currCurency = selectedArray[i];

        // Запрос было бы неплохо вынести в отдельную функцию
        let request = new XMLHttpRequest();
        request.onreadystatechange = function () {

            if (this.readyState === 4) {
                if (this.status === 200) {
                    let currencyValues;
                    try {
                        currencyValues = JSON.parse(this.responseText);
                    } catch {
                        currencyValues = [];
                    }
                    currencyValues = currencyValues.map(element => {
                        return {
                            Date: element.Date,
                            Cur_ID: element.Cur_ID,
                            Cur_OfficialRate: element.Cur_OfficialRate
                        };
                    })


                    currencyRate[currCurency.Cur_ID] = currencyValues;
                }

                queryCount--;
                if (queryCount <= 0) {
                    // Зачем заполнять таблицу в цикле?
                    fillTableCallbackImpl2();
                   // fillTableCallback();
                }
            }


        };

        let currencyUrl = `${CURRENCY_RATE_URL}/${currCurency.Cur_ID}?startDate=${startDate}&endDate=${endDate}`
        request.open("GET", currencyUrl, true);
        request.send(null);

    }

    //fillTable();
}

function fillTableCallback() {
    let table = document.getElementById("currency-rate-table");
    table.innerHTML = "";

    let tableHeadersRow = document.createElement('tr');

    let tableHeader = document.createElement('th');
    tableHeader.innerText = "Date";
    tableHeadersRow.appendChild(tableHeader);

    for (let i = 0; i < currentCurrencies.length; i++) {
        tableHeader = document.createElement('th');
        tableHeader.innerText = currentCurrencies[i].Cur_Name;
        tableHeadersRow.appendChild(tableHeader);
    }

    table.appendChild(tableHeadersRow);

    if (currentCurrencies.length > 0) {
        let rowCount = currencyRate[currentCurrencies[0].Cur_ID].length;
        for (let j = 0; j < rowCount; j++) {

            let tableRow = document.createElement('tr');

            tabledata = document.createElement('td');
            tabledata.innerText = currencyRate[currentCurrencies[0].Cur_ID][j].Date;
            tableRow.appendChild(tabledata);

            for (let i = 0; i < currentCurrencies.length; i++) {
                tabledata = document.createElement('td');
                try {
                    tabledata.innerText = currencyRate[currentCurrencies[i].Cur_ID][j].Cur_OfficialRate;
                } catch {
                    tabledata.innerText = "none";
                }
                tableRow.appendChild(tabledata);
            }

            table.appendChild(tableRow);
        }
    }
}


function fillTableCallbackImpl2() {

    //startDate;
    //endDate;

    let table = document.getElementById("currency-rate-table");
    table.innerHTML = "";

    let tableHeadersRow = document.createElement('tr');

    let tableHeader = document.createElement('th');
    tableHeader.innerText = "Date";
    tableHeadersRow.appendChild(tableHeader);

    for (let i = 0; i < currentCurrencies.length; i++) {
        tableHeader = document.createElement('th');
        tableHeader.innerText = currentCurrencies[i].Cur_Name;
        tableHeadersRow.appendChild(tableHeader);
    }

    table.appendChild(tableHeadersRow);

    if (currentCurrencies.length > 0) {

        let currDate = new Date(Date.parse(startDate));
        let targetDate = new Date(Date.parse(endDate));
        while (currDate <= targetDate) {
            let tableRow = document.createElement('tr');

            tabledata = document.createElement('td');
            tabledata.innerText = `${currDate.getFullYear()}-${currDate.getMonth() + 1}-${currDate.getDate()}`; //currencyRate[currentCurrencies[0].Cur_ID][j].Date;
            tableRow.appendChild(tabledata);

            for (let i = 0; i < currentCurrencies.length; i++) {
                tabledata = document.createElement('td');
                try {
                    let filterFunc = function (element) {
                        let targetDate =  new Date(Date.parse(currDate));
                        let currentDate =  new Date(Date.parse(element.Date));
                        if ((currentDate.getFullYear() == targetDate.getFullYear()) && (currentDate.getMonth() == targetDate.getMonth()) && (currentDate.getDate() == targetDate.getDate()))
                            return true;
                        else
                            return false;
                    };
                    let temp = currencyRate[currentCurrencies[i].Cur_ID].filter(filterFunc);
                    if(temp.length > 0 )
                        tabledata.innerText = temp[0].Cur_OfficialRate;
                    else
                        tabledata.innerText = "none";
                } catch {
                    tabledata.innerText = "none";
                }
                tableRow.appendChild(tabledata);
            }

            table.appendChild(tableRow);

            currDate = new Date(currDate.getFullYear(), currDate.getMonth(), currDate.getDate() + 1);
        }
    }
}

function dateSelectInitialization(selectElement, dateType) {

    switch (dateType) {
        case "DAY":
            for (let i = 1; i < 32; i++) {
                let optionElement = document.createElement('option');
                optionElement.innerHTML = String(i);
                selectElement.append(optionElement);
            }
            break;
        case "MONTH":
            for (let i = 1; i < 13; i++) {
                let optionElement = document.createElement('option');
                optionElement.innerHTML = String(i);
                selectElement.append(optionElement);
            }
            break;
        case "YEAR":
            var now = new Date();
            for (let i = 2016; i <= now.getFullYear(); i++) {
                let optionElement = document.createElement('option');
                optionElement.innerHTML = String(i);
                selectElement.append(optionElement);
            }
            break;
    }
}

function processDate() {
    let fromDay = +(document.getElementById('from-date-day').value);
    let fromMonth = +(document.getElementById('from-date-month').value);
    let fromYear = +(document.getElementById('from-date-year').value);

    let toDay = +(document.getElementById('to-date-day').value);
    let toMonth = +(document.getElementById('to-date-month').value);
    let toYear = +(document.getElementById('to-date-year').value);

    let fromDate = new Date(fromYear, fromMonth - 1, fromDay, 0);
    let toDate = new Date(toYear, toMonth - 1, toDay,0);

    if ((fromDate.getDate() != fromDay) || (fromDate.getFullYear() != fromYear) || (fromDate.getMonth() != (fromMonth - 1))) {
        throw "Invalid start day. This day does not exist.";
    }

    if ((toDate.getDate() != toDay) || (toDate.getFullYear() != toYear) || (toDate.getMonth() != (toMonth - 1))) {
        throw "Invalid start day. This day does not exist.";
    }

    if (fromDate > toDate) {
        throw "Invalid date range. Start date can not be greater than end date";
    }

    if ((fromDate > new Date() )|| ( new Date() < toDate) ) {
        throw "Invalid date. I cant show future currency rate";
    }

    var oneDay = 1000 * 60 * 60 * 24;
    var date1_ms = toDate.getTime();
    var date2_ms = fromDate.getTime();
    var differenceMs = date1_ms - date2_ms;
    let differenceDay = Math.round(differenceMs / oneDay);
    if (differenceDay > 360) {
        throw "Invalid date range.  Date range can not be more than 360 days. ";
    }

    //"2019-9-2"
    formatedFromDate = `${fromDate.getFullYear()}-${fromDate.getMonth() + 1}-${fromDate.getDate()}`
    formatedToDate = `${toDate.getFullYear()}-${toDate.getMonth() + 1}-${toDate.getDate()}`
    return {
        from: formatedFromDate,
        to: formatedToDate
    }
}













let button = document.getElementById("query-currency-rate-button");
button.disabled = true;

let request = new XMLHttpRequest();
request.onreadystatechange = function () {
    if (this.readyState === 4) {
        if (this.status === 200) {
            allCurrencies = JSON.parse(this.responseText);
            allCurrencies = allCurrencies.filter(element => {
                return Date.parse(element.Cur_DateEnd) > (new Date())
            })
            allCurrencies = allCurrencies.filter(element => {
                return element.Cur_Periodicity == 0;
            })

            fillCurrencySelect(allCurrencies);
            button.disabled = false;
        }

    }
};
request.open("GET", CURRENCIES_URL, true);
request.send(null);

selectElement = document.getElementById('from-date-day');
dateSelectInitialization(selectElement, "DAY");

selectElement = document.getElementById('from-date-month');
dateSelectInitialization(selectElement, "MONTH");

selectElement = document.getElementById('from-date-year');
dateSelectInitialization(selectElement, "YEAR");

selectElement = document.getElementById('to-date-day');
dateSelectInitialization(selectElement, "DAY");

selectElement = document.getElementById('to-date-month');
dateSelectInitialization(selectElement, "MONTH");

selectElement = document.getElementById('to-date-year');
dateSelectInitialization(selectElement, "YEAR");

button.addEventListener('click', currenciesRateQuery);
