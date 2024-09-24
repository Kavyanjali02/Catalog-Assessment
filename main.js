const fs = require('fs');

function decodeY(base, value) {
    return parseInt(value, base);
}

function lagrangeInterpolation(points, k) {
    let c = 0;
    for (let i = 0; i < k; i++) {
        let xi = points[i].x;
        let yi = points[i].y;
        let term = yi;
        for (let j = 0; j < k; j++) {
            if (i !== j) {
                let xj = points[j].x;
                term *= (0 - xj) / (xi - xj); // Evaluate L(0)
            }
        }
        c += term;
    }
    return c;
}

function readTestCase(filePath) {
    const rawData = fs.readFileSync(filePath);
    return JSON.parse(rawData);
}

function main() {
    const inputFiles = ['test1.json', 'test2.json']; // Array of input files

    // Loop through each file
    inputFiles.forEach(filePath => {
        const data = readTestCase(filePath);
        
        const points = [];

        for (let key in data) {
            if (key !== "keys") {
                let base = parseInt(data[key].base);
                let value = data[key].value;
                let decodedY = decodeY(base, value);
                points.push({ x: parseInt(key), y: decodedY });
            }
        }

        const k = data.keys.k; // Assuming 'k' is present in the same way for both files
        const c = lagrangeInterpolation(points, k);

        // Output for the current file
        console.log(`Constant term (c) for ${filePath}:`, c);
    });
}

main();
