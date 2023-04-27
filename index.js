const listOfSymbols = ["red", "green", "blue", "orange", "yellow", "purple"];
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
// const slotResult = [
//     reel1 = ["red","red", "yellow", "red", "blue"],
//     reel2 = [],
//     reel3 = [],
// ]

// refactor this into a state machine
// refactor using canvas

class slotMachine {

    spinDuration = 2;

    constructor(canvas, ctx ,reels, reelLength, symbols, spinDuration) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.reels = reels;
        this.reelLength = reelLength;
        this.symbols = symbols;
        this.spinDuration = spinDuration * 1000; // convert to secs
        this.slotResult = [];
        this.symbolPositions = [];
        this.allSymbolsHTML = document.getElementsByClassName("slot-symbol");

        this.slotWidth;
        this.slotHeight;
        this.symbolWidth;
        this.symbolHeight;
        this.allSlots = document.querySelectorAll('.slot-reel');

        this.isSpinning = false;

        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    
        if( this.canvas.getContext )
        {
            setInterval( this.update , 30 );
        }
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        console.log("resized")
    }

    //TODO build machine
    //TODO create update func

    update() {
        console.log("hi")
    }

    setup() {
        this.getSlotMachineProperties();
        this.setUpSpinAnimation();
        this.getSymbolPositions();
    }

    getSlotMachineProperties() {
        const SlotMachineProperties = document.getElementsByClassName("slot-reel")[0].getBoundingClientRect();
        this.slotWidth = SlotMachineProperties.width;
        this.slotHeight = SlotMachineProperties.height;
        const SymbolProperties = document.getElementsByClassName("slot-symbol")[0].getBoundingClientRect();
        this.symbolWidth = SymbolProperties.width;
        this.symbolHeight = SymbolProperties.height;
    }

    getSymbolPositions(current = false) {
        for (let i = 0; i < this.allSymbolsHTML.length; i++) {
            this.symbolPositions.push(this.allSymbolsHTML[i].getBoundingClientRect());
        }
    }
    //TODO resize function for slotmachine on diff devices

    setUpSpinAnimation() {
        //TODO need to figure out wrapping
        //TODO land on whole symbol
        const totalHeight= 5*this.symbolHeight;
        const wrapOffsetTop = this.symbolHeight/-2;
        
        const yheight = "+=" + totalHeight;
    }

    moveSymbols() {
        debugger
        if (this.isSpinning) {
            gsap.to('.slot-symbol', {
                ease: "none",
                y: "+= 10px",
                onComplete: () => {
                    this.moveSymbols();
                }
            })
        } else {
            console.log("spinning didnt work")
        }

            // check position
            // reset position to top
            // change symbol
            // continue to loop
    }

    startSpin() {
        this.emptyPrevSlotResult();
        this.isSpinning = true;
        // TODO figure out how to tween sprites to move and blur
        this.moveSymbols();
    }

    stopSpin() {
        // TODO 
        this.isSpinning = false;
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

        this.getResult();
    }

    getResult() {
        console.log(this.slotResult);

        // TODO here we check for any wins by matching this.slotResult with 3 in a row
        // then check value of win and parse this data

        this.stopSpin();
    }

    displayResult() {
        // TODO here we add to DOM
        for (let i = 0; i < this.slotResult.length; i++) {
            let slotReel = document.getElementById(`slot-reel-${i.toString()}`);

            for (let j = 0; j < this.slotResult[i].length; j++) {
                //TODO will change this too sprite later rather than number
                let slotSymbolToChange = slotReel.getElementsByClassName(`slot-position-${j.toString()}`);
                slotSymbolToChange[0].innerHTML = this.slotResult[i][j].toString();
                slotSymbolToChange[0].style.backgroundColor = listOfSymbols[this.slotResult[i][j]];
            }
        }
        console.log("display result")
    }

    emptyPrevSlotResult() {
        this.slotResult = [];
        // TODO could add to history of spins here        
    }

    createWinlines() {
        let winRow1
        let winRow2
        let winRow3
        let winDiagonalRight1
        let winDiagonalRight2
        let winDiagonalLeft1
        let winDiagonalLeft2
    }
}

const mySlotMachine = new slotMachine(canvas, ctx, 3, 5, listOfSymbols, 6);

window.onresize = slotMachine.resize;

// let number = 1;
// const test = document.getElementById(`slot-reel-${number.toString()}`)
// debugger
// TODO add event listner to this on button press
// const theSpinBtn = document.getElementById("theSpinBtn");

// theSpinBtn.addEventListener("click", handleStartSpin)

// function handleStartSpin() {
//     mySlotMachine.startSpin();
//     // setTimeout(mySlotMachine.stopSpin(), 5000)
// }

