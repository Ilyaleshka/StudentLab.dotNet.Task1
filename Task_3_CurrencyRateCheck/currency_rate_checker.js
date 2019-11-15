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

function currenciesQuery() {
    currencyRate = {};

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
                    fillTableCallback();
                }
            }


        };

        let currencyUrl = `${CURRENCY_RATE_URL}/${currCurency.Cur_ID}?startDate=${startDate}&endDate=${endDate}`
        request.open("GET", currencyUrl, true);
        request.send(null);

    }

    //fillTable();
}

function fillTable() {
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
                try{
                tabledata.innerText = currencyRate[currentCurrencies[i].Cur_ID][j].Cur_OfficialRate;
                }catch{
                    tabledata.innerText = "none";
                }
                tableRow.appendChild(tabledata);
            }

            table.appendChild(tableRow);
        }
    }
}

let button = document.getElementById("query-currency-rate-button");
button.disabled = true;


let request = new XMLHttpRequest();
request.onreadystatechange = function () {
    //console.log(this.responseText);
    if (this.readyState === 4) {
        if (this.status === 200) {
            allCurrencies = JSON.parse(this.responseText);
            /*allCurrencies = allCurrencies.map(element => {
                return {
                    Cur_Name: element.Cur_Name,
                    Cur_ID: element.Cur_ID
                };
            })*/

            allCurrencies = allCurrencies.filter(element => {
                return Date.parse(element.Cur_DateEnd) > (new Date())
            })

            fillCurrencySelect(allCurrencies);
            //let button = document.getElementById("query-currency-rate-button");
            button.disabled = false;
        }

    }
};
request.open("GET", CURRENCIES_URL, true);
request.send(null);


//let button = document.getElementById("query-currency-rate-button");
button.addEventListener('click', currenciesQuery);