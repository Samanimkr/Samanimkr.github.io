const API_KEY = 'K8SVFGG987OJSE6W';

const calculate = () => {
    const accountSize = document.getElementsByName('accountsize')[0].value;
    const riskPercentage = document.getElementsByName('riskpercentage')[0].value;
    const pips = document.getElementsByName('pips')[0].value;
    const quoteCurrency = document.getElementsByName('quotecurrency')[0].value.toUpperCase();

    const units = document.getElementsByName('units')[0];
    const lotSize = document.getElementsByName('lotsize')[0];

    const baseURL = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE`;
    const symbol = `from_currency=GBP&to_currency=${quoteCurrency}`;
    const apikey = `apikey=${API_KEY}`;
    
    axios
    .get(`${baseURL}&${symbol}&${apikey}`)
    .then(({ data }) => {
        const exchangeRate = data['Realtime Currency Exchange Rate']['5. Exchange Rate'];

        const willingToRisk = (accountSize / 100) * riskPercentage;
        const amountInGBP = (pips / 10000) / exchangeRate;

        const amountOfUnits = Math.floor(willingToRisk / amountInGBP);
        const lotSizeResult = amountOfUnits / 100000;

        units.value = amountOfUnits;
        lotSize.value = lotSizeResult;
    })
    .catch(e => {
        console.log('e: ', e)
        const errorMsg = document.getElementById('error-message');
        errorMsg.style.display = 'inline-block';

        setTimeout(() => {
            errorMsg.style.display = 'none';
        }, 2000);
    })
}