const listOfSymbols = ["red", "green", "blue", "orange", "yellow", "purple"];
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const slotConfig = {
    slotWidth: 500,
    slotHeight: 500,
    recoilHeight: null,
    spinDuration: null,
    numberOfReels: 3,
    symbolsPerReel: 5,
    symbols: listOfSymbols
    // etc
}

// refactor this into a state machine
// refactor using canvas

class slotMachine {

    spinDuration = 2;

    constructor(canvas, ctx , config) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        this.config = config;
        this.spinDuration = config.spinDuration * 1000; // convert to secs
        this.slotResult = [];
        this.symbolPositions = [];

        //slot
        this.slotWidth = this.canvas.width;
        this.slotHeight = this.canvas.height;
        //reels
        this.reelSpacing = (this.slotWidth/3) -20
        this.offsetTop = 100;
        this.offsetLeft = 100;
        this.reelWidth = 100;
        this.reelHeight = 300;

        this.isSpinning = false;
        
    
        if( this.canvas.getContext )
        {
            setInterval( this.update , 30 );
        }

        window.addEventListener('resize', this.resizeCanvas.bind(this), false);

        this.drawSlot();

    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.slotWidth = this.canvas.width 
        this.slotHeight = this.canvas.height
        this.offsetTop = Math.floor(this.slotHeight/100);
        this.offsetLeft = Math.floor(this.slotWidth/100);
        this.reelWidth = Math.floor(this.slotWidth/100);
        this.reelHeight = Math.floor(this.slotHeight/300);

        this.drawSlot();
    }

    //TODO build machine
    drawSlot() {
        // frame
        // 4 reels
        // 5 symbols, 2 hidden per reel
        for (let i = 0; i < this.slotWidth; i+= this.reelSpacing) {
            this.ctx.fillStyle = "red";
            this.ctx.fillRect(i + this.offsetLeft, this.offsetTop, 
                this.reelWidth, this.reelHeight);
        }



        // for (let i = 0; i < this.config.numberOfReels; i++) {
        //     this.ctx.fillStyle = "red";
        //     this.ctx.fillRect(i + 350, 0, 300, 300);
        //     for (let j = 0; j < this.config.symbolsPerReel; j++) {
        //         this.ctx.fillStyle = "green";
        //         this.ctx.fillRect(i, j + 200, 150, 100);
        //     }
        // }
    }

    update() {
    //TODO create update func
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

const mySlotMachine = new slotMachine(canvas, ctx, slotConfig);

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

