let array = [];
const arrayContainer = document.getElementById("array-container");
let speed = 10; // 🚀 Ultra-Fast Sorting (10ms)
let i = 0, j = 0;
let isSorting = false;

// Function to update speed based on slider input
function updateSpeed() {
    speed = document.getElementById("speed").value / 10; // Now 10x faster
    document.getElementById("speedValue").textContent = speed + "ms";
}

// Function to generate a new random array
function generateArray() {
    array = [];
    arrayContainer.innerHTML = "";
    isSorting = false;
    i = 0;
    j = 0;

    for (let i = 0; i < 20; i++) {  // More bars for better visualization
        let value = Math.floor(Math.random() * 150) + 20;
        array.push(value);
        let bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = `${value}px`;
        arrayContainer.appendChild(bar);
    }
}

// Function to automatically sort the array with Bubble Sort
function autoSort() {
    if (isSorting) return;
    isSorting = true;

    let bars = document.getElementsByClassName("bar");

    function step() {
        if (i < array.length - 1) {
            if (j < array.length - i - 1) {
                bars[j].classList.add("compare");
                bars[j + 1].classList.add("compare");

                setTimeout(() => {
                    if (array[j] > array[j + 1]) {
                        [array[j], array[j + 1]] = [array[j + 1], array[j]];
                        bars[j].style.height = `${array[j]}px`;
                        bars[j + 1].style.height = `${array[j + 1]}px`;
                    }

                    bars[j].classList.remove("compare");
                    bars[j + 1].classList.remove("compare");

                    j++;

                    if (j >= array.length - i - 1) {
                        bars[array.length - i - 1].classList.add("sorted");
                        j = 0;
                        i++;
                    }

                    setTimeout(step, speed);
                }, speed);
            } else {
                i++;
                j = 0;
                setTimeout(step, speed);
            }
        } else {
            isSorting = false;
            for (let k = 0; k < bars.length; k++) {
                bars[k].classList.add("sorted");
            }
        }
    }

    step();
}
