import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import {unmountComponentAtNode } from "react-dom";
import Graph from '../Graph';
import { getData, testingUsdToNzd } from '../DataManagement' 
//this is required to test canvas
//https://stackoverflow.com/questions/33269093/how-to-add-canvas-support-to-my-tests-in-jest#answer-33278679 as per Siva answer
import 'jest-canvas-mock';

let container: any = null;
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

test("render without crashing", () =>{
    ReactDOM.render(<Graph></Graph>, container)
})


test("Check getData method by running the whole pipeline", () => {
    let dataOutput = getData('./__test__/testdata.json', true)
    let allLabels = dataOutput.labels
    
    expect(['Playstation 2',
        'Amiibo',
        'Xbox One',
        'Xbox',
        'Nintendo Switch',
        'Xbox 360',
        'Gamecube']).toEqual(
            expect.arrayContaining(allLabels)
        );
})

test('Check if the data is output correctly', () => {
    let dataOutput = getData('./__test__/testData.json', true)
    if (dataOutput.datasets !== undefined) {
        let allPricesForEachConsole = dataOutput.datasets[0].data
        expect([
            3.81, 46.5, 21.87, 6.42, 728.51, 53.08, 21.24]).toEqual(expect.arrayContaining(allPricesForEachConsole))
    }
})


