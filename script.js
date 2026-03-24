const valAInput = document.getElementById("val-a-input");
const valBInput = document.getElementById("val-b-input");

const saveBtn = document.getElementById("save-btn");
const saveMessage = document.getElementById("save-notification-message");

const startBtn = document.getElementById("start-btn");
const resetBtn = document.getElementById("reset-btn");

const processInfo = document.getElementById("process-information");
const valA = document.getElementById("val-a");
const valB = document.getElementById("val-b");
const valC = document.getElementById("val-c");

const topPart = document.querySelector(".top-part");
const menuBtn = document.getElementById("menu-btn");

const messageBox = document.getElementById("message-container-box");
let messageBoxContent = document.getElementById("msg-in-box");
const messageCloseBtn = document.getElementById("message-close-btn");

// Initially we are clearing the values to make a fresh start
valA.innerText = "";
valB.innerText = "";
valC.innerText = "";
processInfo.innerText = "";

saveMessage.style.display = "none";

let a = 10;
let b = 20;
let step = 0;
let mode = "idle";
let swapInfo = JSON.parse(localStorage.getItem("swapInfo"));
if (!swapInfo) {
  const swapInfo = { a, b, step, mode };
  localStorage.setItem("swapInfo", JSON.stringify(swapInfo));
}
const initilizeInput = () => {
  let swapInfo = JSON.parse(localStorage.getItem("swapInfo"));
  valAInput.value = swapInfo.a;
  valBInput.value = swapInfo.b;
};
initilizeInput(); //Calling it to display the values in the input box

const showSaveMsg = (msg) => {
  saveMessage.innerText = msg;
  saveMessage.style.display = "block";

  setTimeout(() => {
    saveMessage.style.display = "none";
  }, 3000);
};

const saveInputVals = () => {
  const a = valAInput.value.trim();
  const b = valBInput.value.trim();
  let swapInfo = JSON.parse(localStorage.getItem("swapInfo"));
  if (swapInfo.mode == "busy") {
    showSaveMsg(`Can't save configuration mid way!`);
  } else if (a == "" || b == "") {
    showSaveMsg(`Enter the values properly!`);
  } else {
    swapInfo.a = a;
    swapInfo.b = b;
    localStorage.setItem("swapInfo", JSON.stringify(swapInfo));
    showSaveMsg(`Values saved successfully!`);
    initilizeInput();
  }
  setTimeout(() => {
    topPart.classList.remove("active-display");
  }, 1700);
};
const resetConfiguration = () => {
  valA.innerText = "";
  valB.innerText = "";
  valC.innerText = "";
  let step = 0;
  let mode = "idle";
  processInfo.innerText = "";
  let swapInfo = JSON.parse(localStorage.getItem("swapInfo"));
  swapInfo.step = step;
  swapInfo.mode = mode;
  localStorage.setItem("swapInfo", JSON.stringify(swapInfo));
  valA.classList.remove("first-animation");
  valA.classList.remove("in-C-box");
  valB.classList.remove("first-animation");
  valB.classList.remove("in-C-box");
  valC.classList.remove("move-right-top-left");
  valC.classList.remove("final-position");
  startBtn.innerText = "Start";
};

const executeSwap = () => {
  // e.preventDefault();
  let swapInfo = JSON.parse(localStorage.getItem("swapInfo"));
  swapInfo.mode = "busy";
  if (swapInfo.step == 0) {
    valA.innerText = swapInfo.a;
    valB.innerText = swapInfo.b;

    processInfo.innerText = `
  The values: ${swapInfo.a} and ${swapInfo.b} are stored in a and b respectively.
  `;
    swapInfo.step += 1;
    localStorage.setItem("swapInfo", JSON.stringify(swapInfo));
    startBtn.innerText = "Next";
  } else if (swapInfo.step == 1) {
    // valC.innerText = swapInfo.b;
    // valB.innerText = "";

    valB.classList.add("first-animation");
    setTimeout(() => {
      valB.classList.add("in-C-box");
    }, 900);
    setTimeout(() => {
      valC.innerText = swapInfo.b;
      valB.innerText = "";
    }, 1000);
    processInfo.innerText = `
      The value of b is stored in c
    `;
    swapInfo.step += 1;
    localStorage.setItem("swapInfo", JSON.stringify(swapInfo));
  } else if (swapInfo.step == 2) {
    valA.classList.add("first-animation");
    setTimeout(() => {
      valA.classList.add("in-C-box");
    }, 900);

    // setTimeout(() => {
    //   valB.innerText = swapInfo.a;
    //   valA.innerText='';
    // }, 1000);
    processInfo.innerText = `
      The value of a is stored in b
    `;
    swapInfo.step += 1;
    localStorage.setItem("swapInfo", JSON.stringify(swapInfo));
  } else if (swapInfo.step == 3) {
    valC.classList.add("move-right-top-left");
    setTimeout(() => {
      valC.classList.add("final-position");
    }, 900);
    processInfo.innerText = `
      The value of c is being stored in a.
      Now you can look at the input section to compare the new 
      and old values of a and b.
    `;
    swapInfo.step += 1;
    localStorage.setItem("swapInfo", JSON.stringify(swapInfo));
    setTimeout(() => {
      startBtn.innerText = "Finish";
    }, 3000);
  } else if (swapInfo.step == 4) {
    resetConfiguration();
    messageBoxContent.innerText = `
    Here, we have observed How the value of a and b are swapped using
    a third variable c. 
    Firstly the value of b was assigned to c.
    Then the value of a is assigned to b. And the value of c(the old value of b)
    is stored in a. 
    This is how the entire swapping process is completed.

    Thank you for your time!
  
    `;
    // messageBox.classList.add("active");
  }
};

const manageMenuVisibility = () => {
  console.log("clicked");
  topPart.classList.toggle("active-display");
};

saveBtn.addEventListener("click", () => {
  saveInputVals();
});
startBtn.addEventListener("click", (e) => {
  e.preventDefault();
  executeSwap();
});
resetBtn.addEventListener("click", () => {
  resetConfiguration();
});
messageCloseBtn.addEventListener("click", () => {
  messageBox.classList.remove("active");
});

menuBtn.addEventListener("click", () => {
  manageMenuVisibility();
});
