const CURRENCIES_URL = "http://www.nbrb.by/api/exrates/currencies";
const CURRENCY_RATE_URL = "https://www.nbrb.by/API/ExRates/Rates/Dynamics";
let allCurrencies = [];

// Можно обойтись без этих глобальных переменных
let startDate = "2019-9-2";
let endDate = "2019-10-4";
var queryCount = 0;
var currencyRate = {};
let currentCurrencies = [];
// Не используется
let currencyCount = 5;

function fillCurrencySelect(currencies) {
    let currencySelect = document.getElementById('selected-currency');
    for (let i = 0; i < currencies.length; i++) {
        let optionElement = document.createElement('option');
        optionElement.innerHTML = String(currencies[i].Cur_QuotName);
        currencySelect.append(optionElement);
    }
}

function loadCurrencyRate(currencyInfo, dateFrom, dateTo, currencyRageStorage, allQueryExecutedCallback) {
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
                // Плохая практика изменять что-то в аргументах, если без этого можно обойтись.
                // Попробуй использовать промисы и резолвить их в этим значением.
                currencyRageStorage[currencyInfo.Cur_ID] = currencyValues;
            }

            // Это выглядт как жесткий хак.
            // Представь, что у тебя эта функция в отдельном модуле и может быть использована в разных ситуациях.
            // Тогда ты не сможешь пользоваться глобальной переменной
            queryCount--;
            if (queryCount <= 0) {
                allQueryExecutedCallback();
            }
        }
    };

    let currencyUrl = `${CURRENCY_RATE_URL}/${currencyInfo.Cur_ID}?startDate=${dateFrom}&endDate=${dateTo}`
    request.open("GET", currencyUrl, true);
    request.send(null);
}

function updateSelectedCurrencies() {
    // В Javascript принято писать "let selectedCurrencies = [];"
    let selectedCurrencies = new Array();

    let selectElement = document.getElementById('selected-currency');
    for (let i = 0; i < selectElement.options.length; i++) {
        if (selectElement.options[i].selected) {
            selectedCurrencies.push(allCurrencies[i]);
        }
    }

    currentCurrencies = selectedCurrencies;
}

function updateDatesRange() {
    let dateRange;
    try {
        dateRange = processDate();
    } catch (e) {
        throw e;
    }
    startDate = dateRange.from;
    endDate = dateRange.to;
}

function clearCurrenciesRateStorage() {
    currencyRate = {};
}

function currenciesRateQuery() {

    let errorOutput = document.getElementById("errors-output");
    errorOutput.innerText = "";
    try {
        updateDatesRange();
    } catch (e) {
        errorOutput.innerText = e;
        return;
    }

    clearCurrenciesRateStorage()
    updateSelectedCurrencies();

    queryCount = currentCurrencies.length;

    for (let i = 0; i < currentCurrencies.length; i++) {
        // Попроуй промисы вместо коллбека, который вызывается по счетчику
        loadCurrencyRate(currentCurrencies[i], startDate, endDate, currencyRate, fillTableCallback);
    }
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

        let currDate = new Date(Date.parse(startDate));
        let targetDate = new Date(Date.parse(endDate));

        while (currDate <= targetDate) {
            let tableRow = document.createElement('tr');

            tabledata = document.createElement('td');
            tabledata.innerText = `${currDate.getFullYear()}-${currDate.getMonth() + 1}-${currDate.getDate()}`;
            tableRow.appendChild(tabledata);

            for (let i = 0; i < currentCurrencies.length; i++) {
                tabledata = document.createElement('td');
                try {
                    let temp = currencyRate[currentCurrencies[i].Cur_ID].filter(createDateFilterFunction(currDate));
                    if (temp.length > 0)
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

function createDateFilterFunction(currDate) {
    return function (element) {
        let targetDate = new Date(Date.parse(currDate));
        let currentDate = new Date(Date.parse(element.Date));
        // currentDate.toDateString() == targetDate.toDateString()
        if ((currentDate.getFullYear() == targetDate.getFullYear()) && (currentDate.getMonth() == targetDate.getMonth()) && (currentDate.getDate() == targetDate.getDate()))
            return true;
        else
            return false;
    }
};

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
    let toDate = new Date(toYear, toMonth - 1, toDay, 0);

    if ((fromDate.getDate() != fromDay) || (fromDate.getFullYear() != fromYear) || (fromDate.getMonth() != (fromMonth - 1))) {
        throw "Invalid start day. This day does not exist.";
    }

    if ((toDate.getDate() != toDay) || (toDate.getFullYear() != toYear) || (toDate.getMonth() != (toMonth - 1))) {
        throw "Invalid start day. This day does not exist.";
    }

    if (fromDate > toDate) {
        throw "Invalid date range. Start date can not be greater than end date";
    }

    if ((fromDate > new Date()) || (new Date() < toDate)) {
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

// Если тебе надо разделить куски кода, используй комментарий, а не 10 пустых строк











let button = document.getElementById("query-currency-rate-button");
button.disabled = true;

function loadAllCurrencies()
{
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                allCurrencies = JSON.parse(this.responseText);
                allCurrencies = allCurrencies.filter(element => {
                    return ((Date.parse(element.Cur_DateEnd) > (new Date()))&&(element.Cur_Periodicity == 0))
                })
                fillCurrencySelect(allCurrencies);
                button.disabled = false;
            }

        }
    };
    request.open("GET", CURRENCIES_URL, true);
    request.send(null);

}

loadAllCurrencies();

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
