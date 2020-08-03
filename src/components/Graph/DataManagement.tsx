import { ChartData, ChartDataSets } from 'chart.js';

interface consoleData {
    [consoleName: string]: number
}

let testingUsdToNzd = 1.5

export {testingUsdToNzd as testingUsdToNzd}

function getData(dataLocation: string, testing: boolean): ChartData {
    if(!testing){
        //odd that passing the string here does not work
        var data = require('./collection.json')
    }else{
        data = require(dataLocation)
    }
    let labels: Array<string> = []
    let allData: consoleData = {}
    for (let cell of data.scottsConsoleData) {
        let currentConsole: string = cell["console-name"]
        let currentPrice: number = cell["price-in-pennies"]
        let splitText: Array<string> = currentConsole.split("PAL ")
        if (splitText.length > 1) {
            [allData, labels] = checkIfNewItemExists(labels, allData, splitText[1], currentPrice, testing)
            
        } else {
            [allData, labels] = checkIfNewItemExists(labels, allData, splitText[0], currentPrice, testing)
        }
    }
    let dataInOrder: Array<number> = []
    for (let label of labels) {
        dataInOrder.push(allData[label])
    }
    let dataset: ChartDataSets = {
        label: '',
        backgroundColor: 'purple',
        borderColor: 'blue',
        borderWidth: 1,
        data: dataInOrder
    }
    return {
        labels: labels,
        datasets: [dataset]
    }
}
export {getData as getData}

function checkIfNewItemExists(labels: Array<string>, allData: consoleData, currentConsole: string, price: number, testing: boolean): [consoleData, Array<string>] {
    if (labels.length === 0) {
        labels.push(currentConsole)
        allData[currentConsole] = priceConvert(price, 0, testing)
    } else {
        for (let i = 0; i < labels.length; i++) {
            if (currentConsole === labels[i]) {
                allData[labels[i]] = priceConvert(price, allData[labels[i]], testing)
                break
            } else if (i === labels.length -1) {
                labels.push(currentConsole)
                allData[currentConsole] = priceConvert(price, 0, testing)
                break
            }
        }
    }
    
    return [allData, labels]
}

function priceConvert(addPrice: number, totalPrice: number, testing: boolean): number {
    let priceInDollars: number = 0
    if(testing){
        priceInDollars = (addPrice / 100) * testingUsdToNzd    
    }else{
        priceInDollars = getUsdToNzd(addPrice / 100)
    }
    totalPrice = Number((totalPrice + priceInDollars).toFixed(2))
    
    return totalPrice
}

function getUsdToNzd(priceInDollars: number): number {
    let convertedPrice = 1.51
    return priceInDollars * convertedPrice
}