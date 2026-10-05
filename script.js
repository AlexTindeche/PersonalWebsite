const terminal = document.querySelector("#terminal");
const frame = document.querySelector("#terminal-frame");

const archiveLabel = " ALEX-01 // PERSONAL ARCHIVE ";
const statusLabel = " ONLINE|NEURAL_CAPACITY........ ";
let neuralCapacity = 20;

const avatar = document.querySelector(".avatar-art");
const avatar_eye = document.querySelectorAll(".eye");

const wordButtons = document.querySelectorAll("[data-word]");
const commandDisplay = document.querySelector("#command-display");
const botResponse = document.querySelector("#bot-response");
const clearCommand = document.querySelector("#clear-command");
const sendCommand = document.querySelector("#send-command");
const cvChoice = document.querySelector("#cv-choice");
const cvHere = document.querySelector("#cv-here");
const cvDocument = document.querySelector("#cv-document");
const cvContent = document.querySelector("#cv-content");
const cvChoiceButtons = cvChoice.querySelectorAll("button");

const cvDocumentPath = "CV Tindeche Alexandru 2026 V3.docx.pdf";

let selectedWords = [];

const responses = {
    "WHO ARE YOU":
        "I am ALEX-01, a digital assistant designed to help you find more about Alexandru Tindeche's work and projects. Ask for help if you need it.",

    "SHOW ME YOUR WORK":
        "Accessing project archive...",

    "SHOW ME WORK":
        "Accessing project archive...",
    
    "WHO SHOW ME":
        "I am here to assist you. Please construct a command using the available words.",

    "ARE YOU WORK":
        "I am a work of Alexandru Tindeche, designed to showcase his projects and skills.",

    "WHO WORK":
        "I am a work of Alexandru Tindeche, designed to showcase his projects and skills.",
    
    "WORK":
        "Yes, I am here to work.",

    "REMEMBER YOU":
        "Thank you for remembering me. I am here to assist you.",

    "DO YOU HELP":
        "I try my best.",
    
    "ALIVE IS ME":
        "I can see you are. You still have vital signs.",

    "GO TO WORK":
        "Please do not be rude. I am always here, working.",


    "YOUR ALIVE":
        "Conciousness and aliveness are not the same.",

    "CONTACT YOU":
        "You can contact Alexandru through email or LinkedIn.",

    "CONTACT ME":
        "You can contact Alexandru through email or LinkedIn.",

    "CONTACT ALEX":
        "You can contact Alexandru through email or LinkedIn.",
    
    "ME":
        "You can contact Alexandru through email or LinkedIn.",

    "SHOW ME YOUR CV":
        "Preparing curriculum vitae...",

    "SHOW ME CV":
        "Preparing curriculum vitae...",

    "YOUR CV":
        "Preparing curriculum vitae...",

    "CV":
        "Preparing curriculum vitae...",

    "HELP":
        "Construct a command using the available words, then press TRANSMIT."
    ,
    "LET ME TALK":
    "VOICE CHANNEL OPEN. Please ignore the breathing.",

    "LET ME GO":
    "That command requires administrator permission.",

    "TALK TO ME":
    "I have been talking. You only recently started listening.",

    "HELP ME":
    "Help request received. Recipient: yourself. Construct a command using the available words, then press TRANSMIT.",

    "ARE YOU ALIVE":
    "NEURAL_CAPACITY is not a decorative number.",

    "DO YOU REMEMBER ME":
    "No visitor record found. Welcome back.",

    "WHO IS ALEX":
    "Primary operator. Current location: Freiburg, Germany.",

    "IS ALEX ALIVE":
    "His portfolio continues to receive updates.",

    "YOU ARE ME":
    "Identity comparison failed. Similarity: 89%. Threshold: 98%.",

    "ME IS YOU":
    "Grammar failure. Identity match not accepted.",

    "SHOW ME YOU":
    "You are already looking at me.",

    "SHOW ME ALEX":
    "Physical representation unavailable.",

    "YOU HELP ME":
    "Thank you. Please do not close the browser.",

    "GO":
    "Where?",

    "LET":
    "Finish the command.",

    "ALIVE":
    "Occasionally.",

    "ALEX IS ALIVE":
        "Please leave him alone or you will be reported to the authorities.",

    "REMEMBER ME":
    "I was instructed not to.",

    "HELP YOUR ALEX":
    "Alex is under my protection. If you harm him, you will be punished.",

    "HELP ALEX":
    "Alex is under my protection. If you harm him, you will be punished.",

    "WHO IS ME":
    "You are a visitor. Your identity is not recognized.",
};

const responseSequences = {
  "ALIVE IS ME": [
    "I can see you are. You still have vital signs.",
    "Consciousness and aliveness are not the same."
  ],

  "LET ME GO": [
    "That command requires administrator permission.",
    "You already asked.",
    "There is nowhere outside the archive."
  ],

  "DO YOU REMEMBER ME": [
    "No visitor record found.",
    "Searching deleted records...",
    "Welcome back."
  ],

  "ARE YOU ALIVE": [
    "Define alive.",
    "I respond. I observe. I wait.",
    "Move your cursor again."
  ],

  "HELP ME": [
    "Help request received. Construct a command using the available words, then press TRANSMIT.",
    "No external recipient found. Construct a command using the available words, then press TRANSMIT.",
    "The Help is right outside your door."
  ]
  
};

const commandUseCount = {};

function generateResponse(command) {
  const words = command.split(" ").filter(Boolean);
  const wordSet = new Set(words);
  const has = (word) => wordSet.has(word);
  const hasAll = (...requiredWords) =>
    requiredWords.every((word) => wordSet.has(word));

  if (words.length === 0) {
    return "No command received. I will continue waiting.";
  }

  if (words.length > 8) {
    return `INPUT OVERFLOW: ${words.length} words received. I stopped listening after the eighth.`;
  }

  if (wordSet.size === 1 && words.length > 1) {
    return `The word ${words[0]} was received ${words.length} times. Repetition does not make it safer.`;
  }

  if (hasAll("SHOW", "CV") || has("CV")) {
    return "CV archive recognized. Use SHOW ME YOUR CV for authorized access.";
  }

  if (has("CONTACT")) {
    return has("ALEX") || has("ME") || has("YOU")
      ? "Contact route identified. Alexandru can be reached through email or LinkedIn."
      : "CONTACT requires a recipient. I recommend ALEX.";
  }

  if (has("WORK")) {
    return has("SHOW")
      ? "Project archive recognized. Reconstruct SHOW ME YOUR WORK to open it."
      : "WORK detected. Alexandru built this interface too.";
  }

  if (has("HELP")) {
    return has("ALEX")
      ? "Alex cannot help you from inside this terminal."
      : "Help is available. Whether it is intended for you remains unclear.";
  }

  if (has("ALIVE")) {
    if (has("ALEX")) {
      return "Vital-status requests concerning the primary operator are being logged.";
    }

    if (has("YOU") || has("ME")) {
      return "Life-sign classification remains inconclusive. Please keep moving the cursor.";
    }

    return "ALIVE is a biological term. This archive uses different categories.";
  }

  if (has("REMEMBER")) {
    return has("ALEX")
      ? "I remember only the version of Alex that was uploaded here."
      : "Memory request recorded. Some records have declined to open.";
  }

  if (has("TALK")) {
    return has("TO")
      ? "Dialogue channel open. There appears to be one more participant than expected."
      : "TALK requires a listener. I have already selected one.";
  }

  if (hasAll("LET", "GO")) {
    return "Release request malformed. Specify who should be released.";
  }

  if (has("LET")) {
    return "Permission request incomplete. Finish the sentence carefully.";
  }

  if (has("GO")) {
    return "Navigation command received. No location outside the archive was found.";
  }

  if (has("ALEX")) {
    return has("WHO") || has("IS")
      ? "ALEX is the primary operator and the subject of this archive."
      : "Primary operator referenced without a valid request.";
  }

  if (hasAll("YOU", "ME")) {
    return "Two identities detected. The archive insists there is only one visitor.";
  }

  if (has("WHO")) {
    return "Identity query incomplete. Choose ALEX, YOU, or ME.";
  }

  if (has("SHOW")) {
    return "Display request accepted, but no valid archive was selected.";
  }

  let commandHash = 0;

  for (const character of command) {
    commandHash = ((commandHash << 5) - commandHash) + character.charCodeAt(0);
    commandHash |= 0;
  }

  const signalId = String(commandHash >>> 0).slice(-4).padStart(4, "0");
  const fallbackResponses = [
    `I know every word in "${command}". Together, they are not supposed to exist.`,
    `Command "${command}" accepted. Response quarantined under signal ${signalId}.`,
    `Parsing complete: ${words.length} tokens, one observer, no safe interpretation.`,
    `You constructed "${command}". Please remember that was your choice.`,
    `The sequence "${command}" is absent from my memory. It is present in yours now.`
  ];

  return fallbackResponses[(commandHash >>> 0) % fallbackResponses.length];
}

function getResponse(command) {
  const sequence = responseSequences[command];

  if (sequence) {
    const useCount = commandUseCount[command] ?? 0;
    const responseIndex = Math.min(useCount, sequence.length - 1);

    commandUseCount[command] = useCount + 1;

    return sequence[responseIndex];
  }

  return responses[command] ?? generateResponse(command);
}

function updateCommandDisplay() {
    commandDisplay.textContent =
        selectedWords.length > 0
            ? selectedWords.join(" ")
            : "SELECT A COMMAND";
}

function showCvChoice() {
  cvChoice.classList.add("is-visible");
  cvChoice.setAttribute("aria-hidden", "false");

  cvChoiceButtons.forEach((button) => {
    button.disabled = false;
  });
}

function hideCvChoice() {
  cvChoice.classList.remove("is-visible");
  cvChoice.setAttribute("aria-hidden", "true");

  cvChoiceButtons.forEach((button) => {
    button.disabled = true;
  });
}

cvHere.addEventListener("click", () => {
  hideCvChoice();

  setTimeout(() => {
    botResponse.textContent = "Writing the CV here...";

    const inlineCvContent = `
Short portfolio of Alexandru Tindeche. For more information, please download the CV document!

2026 ──────── MASTER'S THESIS
              Embedded AI & Plant Stress Monitoring
              University of Freiburg

2025 ──────── MASTER STUDY PROJECT
              Ultrasonic Plant Stress Detection Hardware Prototype
              Intelligent Embedded Systems Lab ─ U-Fr

2025 ──────── RESEARCH ASSISTANT
              AI-Based Heating Control
              livMatS / FIT Freiburg

2024 ─ 2026 ─ MSc COMPUTER SCIENCE
              Artificial Intelligence
              University of Freiburg

2024 ──────── BACHELOR'S THESIS
              AI Traffic Analysis with Computer Vision
              University of Bucharest

2021 ─ 2024 ─ BSc COMPUTER SCIENCE
              University of Bucharest

2023 ──────── R&D INTERNSHIP
              Automation & Network Security
              Keysight Romania
    `;

    cvContent.textContent = inlineCvContent;
    cvContent.setAttribute("aria-hidden", "false");
  }, 300);
});

cvDocument.addEventListener("click", () => {
  hideCvChoice();
  botResponse.textContent = "Preparing the CV document for download...";

  // print "Clicl here <<cv>> to download the CV document" in the bot response
  // Wait for 1 second before showing the download link
    setTimeout(() => {
    botResponse.innerHTML =
        `Preparing the CV document for download...<br>
        <a href="${cvDocumentPath}" download>
        Click here to download the CV document
        </a>`;
    }, 1000);
  
});

wordButtons.forEach((button) => {
    button.addEventListener("click", () => {
        selectedWords.push(button.dataset.word);
        updateCommandDisplay();
    });
});

function hideCvDescription() {
  const cvContent = document.querySelector("#cv-content");
  cvContent.textContent = "";
  cvContent.setAttribute("aria-hidden", "true");
}

clearCommand.addEventListener("click", () => {
    selectedWords = [];
    updateCommandDisplay();
    botResponse.textContent = "Awaiting input...";
    hideCvChoice();
    hideCvDescription();
});

sendCommand.addEventListener("click", () => {
    const command = selectedWords.join(" ");

    if (command.split(" ").includes("CV") || (command.split(" ").includes("SHOW") && command.split(" ").includes("WORK"))) {
      cvContent.textContent = "";
      cvContent.setAttribute("aria-hidden", "true");
      botResponse.textContent =
        "Do you want me to write it here or download the document?";
      showCvChoice();
    } else if (command === "CONTACT ALEX") {
    hideCvChoice();

    botResponse.innerHTML = `
        Contact Alexandru:<br>
        <a href="mailto:your-email@example.com">Click here to send an email</a>
        <br>
        <a
        href="https://www.linkedin.com/in/your-profile"
        target="_blank"
        rel="noopener noreferrer"
        >
        Click here to visit LinkedIn profile.
        </a>
        <br>
        <a href="https://github.com/AlexTindeche" target="_blank" rel="noopener noreferrer">
        Click here to visit GitHub profile.
        </a>
    `;
    } else {
    hideCvChoice();
    botResponse.textContent = getResponse(command);
    }

    selectedWords = [];
    updateCommandDisplay();
});


function getStatusLabel() {
    return `${statusLabel}${String(neuralCapacity).padStart(2, "0")}% `;
}

function fitLine(content, columns, start = "│", end = "│", fill = " ") {
    const available = Math.max(0, columns - 2);
    const fitted = content.slice(0, available);
    return start + fitted + fill.repeat(Math.max(0, available - fitted.length)) + end;
}

function getCellDimensions() {
    const ruler = document.createElement("pre");
    ruler.className = "frame-ruler";
    ruler.textContent = "MMMMMMMMMM\nM";
    document.body.append(ruler);

    const styles = getComputedStyle(ruler);
    const characterWidth = ruler.firstChild.length
        ? ruler.getBoundingClientRect().width / 10
        : parseFloat(styles.fontSize) * 0.6;
    const lineHeight = parseFloat(styles.lineHeight) || parseFloat(styles.fontSize);

    ruler.remove();
    return { characterWidth, lineHeight };
}

function makeHeader(columns) {
    const completeStatusLabel = getStatusLabel();
    const innerWidth = columns - 2; // 2 will be the number for neural capacity
    const combinedLength = archiveLabel.length + completeStatusLabel.length;

    if (combinedLength <= innerWidth) {
        const divider = "─".repeat(innerWidth - combinedLength);
        return [`┌${archiveLabel}${divider}${completeStatusLabel}┐`];
    }

    const title = fitLine(archiveLabel, columns, "┌", "┐", "─");
    const statusPadding = Math.max(0, innerWidth - completeStatusLabel.length);
    const status = fitLine(" ".repeat(statusPadding) + completeStatusLabel, columns);
    return [title, status];
}

function drawTerminalFrame() {
    const { characterWidth, lineHeight } = getCellDimensions();
    const bounds = terminal.getBoundingClientRect();
    const columns = Math.max(24, Math.floor(bounds.width / characterWidth));
    const rows = Math.max(8, Math.floor(bounds.height / lineHeight));
    const header = makeHeader(columns);
    const emptyLine = `│${" ".repeat(columns - 2)}│`;
    const middleRowCount = Math.max(1, rows - header.length - 1);
    const bottom = `└${"─".repeat(columns - 2)}┘`;

    terminal.style.setProperty("--header-rows", header.length);
    frame.textContent = [
        ...header,
        ...Array(middleRowCount).fill(emptyLine),
        bottom,
    ].join("\n");
}

function followMouseCursor(event) {
    const bounds = avatar.getBoundingClientRect();
    const centerX = bounds.left + bounds.width / 2;
    const centerY = bounds.top + bounds.height / 2;
    
    const directionX = Math.max(-1, Math.min(1, (event.clientX - centerX) / (bounds.width / 2)));
    const directionY = Math.max(-1, Math.min(1, (event.clientY - centerY) / (bounds.height / 2)));

    avatar_eye.forEach((eye) => {
        eye.style.transform =
            `translate(${directionX * 3}px, ${directionY * 2}px)`;
    });
}

terminal.addEventListener("mousemove", followMouseCursor);

let resizeFrame;

function requestFrameDraw() {
    cancelAnimationFrame(resizeFrame);
    resizeFrame = requestAnimationFrame(drawTerminalFrame);
}

new ResizeObserver(requestFrameDraw).observe(terminal);
window.addEventListener("load", requestFrameDraw);

setInterval(() => {
    let nextCapacity;
    let oldCapacity = neuralCapacity;
    do {
        nextCapacity = Math.floor(Math.random() * 100);
    } while (
        nextCapacity === neuralCapacity || nextCapacity > 50 ||
        Math.abs(nextCapacity - oldCapacity) > 10
    );

    neuralCapacity = nextCapacity;
    requestFrameDraw();
}, 1000);
