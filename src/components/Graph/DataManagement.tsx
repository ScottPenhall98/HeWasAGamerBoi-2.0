import { ChartData, ChartDataSets } from 'chart.js';
import * as data from '../../collection.json';

interface consoleData {
    [consoleName: string]: number
}

function getData(): ChartData {
    let labels: Array<string> = []
    let allData: consoleData = {}
    for (let cell of data.scottsConsoleData) {
        let currentConsole: string = cell["console-name"]
        let currentPrice: number = cell["price-in-pennies"]
        let splitText: Array<string> = currentConsole.split("PAL ")
        if (splitText.length > 1) {
            [allData, labels] = checkIfNewItemExists(labels, allData, splitText[1], currentPrice)
        } else {
            [allData, labels] = checkIfNewItemExists(labels, allData, splitText[0], currentPrice)
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

function checkIfNewItemExists(labels: Array<string>, allData: consoleData, currentConsole: string, price: number): [consoleData, Array<string>] {
    if (labels.length === 0) {
        labels.push(currentConsole)
        allData[currentConsole] = priceConvert(price, 0)
    } else {
        for (let i = 0; i < labels.length; i++) {
            if (currentConsole === labels[i]) {
                allData[labels[i]] = priceConvert(price, allData[labels[i]])
                break
            } else if (i === labels.length - 1) {
                labels.push(currentConsole)
                allData[currentConsole] = priceConvert(price, 0)
            }
        }
    }
    return [allData, labels]
}

function priceConvert(addPrice: number, totalPrice: number): number {
    let priceInDollars = getUsdToNzd(addPrice / 100)
    totalPrice = totalPrice + priceInDollars
    return totalPrice
}

function getUsdToNzd(priceInDollars: number): number {
    let convertedPrice: number = 1.51
    return priceInDollars * convertedPrice
}