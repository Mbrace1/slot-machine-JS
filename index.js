const listOfSymbols = ["red", "green", "blue", "orange", "yellow", "purple"];

// const slotResult = [
//     reel1 = ["red","red", "yellow", "red", "blue"],
//     reel2 = [],
//     reel3 = [],
// ]

class slotMachine {

    spinDuration = 2;

    constructor(reels, reelLength, symbols, spinDuration) {
        this.reels = reels;
        this.reelLength = reelLength;
        this.symbols = symbols;
        this.spinDuration = spinDuration * 1000; // convert to secs
        this.slotResult = [];
    }

    startSpin() {
        this.emptyPrevSlotResult();
        const waitForDuration = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve("");
            }, this.spinDuration); 
        }).then(() => {
            this.generateResult();
        })
    }

    stopSpin() {
        // TODO 
        this.displayResult();
    }

    generateResult() {
        for (let i = 0; i < this.reels; i++) {
            const currentReel = [];
            for (let j = 0; j < this.reelLength; j++) {
                // TODO instead of random check for symbol weights so we can rare symbols
                const randomSymbol =  Math.floor(Math.random() * this.symbols.length);
                currentReel.push(randomSymbol)
            }
            this.slotResult.push(currentReel);
        }

        console.log(this.slotResult);
    }

    getResult() {
        // TODO here we check for any wins by matching this.slotResult with 3 in a row
        // then check value of win and parse this data
        this.stopSpin();
    }

    displayResult() {
        // TODO here we add to DOM
    }

    emptyPrevSlotResult() {
        this.slotResult = [];
        // TODO could add to history of spins here        
    }
}

const mySlotMachine = new slotMachine(3, 5, listOfSymbols, 1);

// TODO add event listner to this on button press
const theSpinBtn = document.getElementById("theSpinBtn");

theSpinBtn.addEventListener("click", handleStartSpin)

function handleStartSpin() {
    mySlotMachine.startSpin();
}
