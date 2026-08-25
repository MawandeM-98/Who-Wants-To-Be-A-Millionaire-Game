// ============================================================
// DATA - Questions, Prize Ladder, Safe Havens
// ============================================================

const PRIZE_LADDER = [
    100, 200, 300, 500, 1000, 2000, 4000, 8000,
    16000, 32000, 64000, 125000, 250000, 500000, 1000000
];

const SAFE_HAVENS = [1000, 32000];

// Questions grouped by tier: tier 0 = easy (Q1-5), 1 = medium (Q6-10), 2 = hard (Q11-15)
const QUESTION_BANK = [
    // Tier 0 - Easy
    [
        { q: "Which planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter", "Mercury"], answer: 1 },
        { q: "How many continents are there on Earth?", options: ["5", "6", "7", "8"], answer: 2 },
        { q: "What is the largest mammal in the world?", options: ["African elephant", "Blue whale", "Giraffe", "Orca"], answer: 1 },
        { q: "Which gas do plants primarily absorb for photosynthesis?", options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"], answer: 2 },
        { q: "How many strings does a standard guitar have?", options: ["4", "5", "6", "7"], answer: 2 },
        { q: "What is the capital city of Japan?", options: ["Osaka", "Kyoto", "Tokyo", "Seoul"], answer: 2 },
        { q: "Which animal is known as man's best friend?", options: ["Cat", "Dog", "Horse", "Parrot"], answer: 1 },
        { q: "How many days are there in a leap year?", options: ["364", "365", "366", "367"], answer: 2 },
        { q: "What colour do you get by mixing blue and yellow?", options: ["Purple", "Green", "Orange", "Brown"], answer: 1 },
        { q: "Which ocean is the largest?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], answer: 3 },
        { q: "What is H2O more commonly known as?", options: ["Salt", "Water", "Sugar", "Oxygen"], answer: 1 },
        { q: "How many sides does a hexagon have?", options: ["5", "6", "7", "8"], answer: 1 },
        { q: "Which sport uses a shuttlecock?", options: ["Tennis", "Squash", "Badminton", "Cricket"], answer: 2 },
        { q: "Who painted the Mona Lisa?", options: ["Van Gogh", "Picasso", "Da Vinci", "Rembrandt"], answer: 2 },
        { q: "What is the currency of the United Kingdom?", options: ["Euro", "Dollar", "Pound sterling", "Franc"], answer: 2 },
    ],
    // Tier 1 - Medium
    [
        { q: "Which element has the chemical symbol 'Fe'?", options: ["Fluorine", "Iron", "Lead", "Francium"], answer: 1 },
        { q: "In which year did the Berlin Wall fall?", options: ["1987", "1989", "1991", "1993"], answer: 1 },
        { q: "Who wrote the novel 'Things Fall Apart'?", options: ["Wole Soyinka", "Chinua Achebe", "Ngugi wa Thiong'o", "Ben Okri"], answer: 1 },
        { q: "What is the longest river in Africa?", options: ["Congo", "Zambezi", "Niger", "Nile"], answer: 3 },
        { q: "Which country hosted the 2010 FIFA World Cup?", options: ["Brazil", "Germany", "South Africa", "Russia"], answer: 2 },
        { q: "How many bones are in the adult human body?", options: ["186", "206", "226", "246"], answer: 1 },
        { q: "Which planet has the most moons?", options: ["Jupiter", "Saturn", "Uranus", "Neptune"], answer: 1 },
        { q: "What does 'CPU' stand for?", options: ["Central Process Unit", "Computer Personal Unit", "Central Processing Unit", "Core Processing Utility"], answer: 2 },
        { q: "Mount Kilimanjaro is located in which country?", options: ["Kenya", "Tanzania", "Uganda", "Ethiopia"], answer: 1 },
        { q: "Who was the first person to walk on the Moon?", options: ["Buzz Aldrin", "Yuri Gagarin", "Neil Armstrong", "Michael Collins"], answer: 2 },
        { q: "Which language has the most native speakers worldwide?", options: ["English", "Spanish", "Hindi", "Mandarin Chinese"], answer: 3 },
        { q: "What is the hardest naturally occurring substance?", options: ["Quartz", "Diamond", "Titanium", "Corundum"], answer: 1 },
        { q: "In music, how many lines does a standard stave have?", options: ["4", "5", "6", "7"], answer: 1 },
        { q: "Which sea is the saltiest body of water commonly named a sea?", options: ["Red Sea", "Dead Sea", "Caspian Sea", "Black Sea"], answer: 1 },
        { q: "Who developed the theory of general relativity?", options: ["Isaac Newton", "Niels Bohr", "Albert Einstein", "Max Planck"], answer: 2 },
    ],
    // Tier 2 - Hard
    [
        { q: "Which Roman emperor ruled during the eruption of Vesuvius in AD 79?", options: ["Nero", "Titus", "Trajan", "Vespasian"], answer: 1 },
        { q: "What is the study of the shape of coastlines and their formation called?", options: ["Geomorphology", "Cartography", "Hydrology", "Pedology"], answer: 0 },
        { q: "Which mathematician introduced the concept of the 'Halting Problem'?", options: ["Kurt Gödel", "Alan Turing", "John von Neumann", "Alonzo Church"], answer: 1 },
        { q: "The Treaty of Tordesillas (1494) divided new lands between which two powers?", options: ["England and France", "Spain and Portugal", "Netherlands and Spain", "Portugal and France"], answer: 1 },
        { q: "In chemistry, what is the term for a reaction that absorbs heat?", options: ["Exothermic", "Endothermic", "Isothermic", "Adiabatic"], answer: 1 },
        { q: "Which composer wrote the opera 'Tristan und Isolde'?", options: ["Verdi", "Wagner", "Puccini", "Mozart"], answer: 1 },
        { q: "What is the SI unit of magnetic flux?", options: ["Tesla", "Weber", "Henry", "Gauss"], answer: 1 },
        { q: "Who was the longest-serving Secretary-General of the United Nations?", options: ["Kofi Annan", "U Thant", "Dag Hammarskjöld", "Boutros Boutros-Ghali"], answer: 1 },
        { q: "Which blood protein is measured by the HbA1c test?", options: ["Albumin", "Glycated haemoglobin", "Fibrinogen", "Globulin"], answer: 1 },
        { q: "The ancient city of Great Zimbabwe was built primarily by which people?", options: ["Zulu", "Shona", "Xhosa", "Tswana"], answer: 1 },
        { q: "In economics, what does the Gini coefficient measure?", options: ["Inflation", "Income inequality", "Unemployment", "Trade balance"], answer: 1 },
        { q: "Which spacecraft was the first to leave the solar system's heliosphere?", options: ["Pioneer 10", "Voyager 1", "New Horizons", "Cassini"], answer: 1 },
        { q: "What is the capital of Kyrgyzstan?", options: ["Astana", "Bishkek", "Dushanbe", "Tashkent"], answer: 1 },
        { q: "Which philosopher wrote 'Critique of Pure Reason'?", options: ["Hegel", "Immanuel Kant", "Nietzsche", "Descartes"], answer: 1 },
        { q: "In the human eye, which cells are responsible for colour vision?", options: ["Rods", "Cones", "Ganglion cells", "Bipolar cells"], answer: 1 },
        { q: "Which country was formerly known as Abyssinia?", options: ["Eritrea", "Ethiopia", "Somalia", "Sudan"], answer: 1 },
        { q: "What is the value of Euler's number to two decimal places?", options: ["2.62", "2.71", "3.14", "1.61"], answer: 1 },
        { q: "Who directed the 1966 film 'Andrei Rublev'?", options: ["Sergei Eisenstein", "Andrei Tarkovsky", "Ingmar Bergman", "Federico Fellini"], answer: 1 },
    ]
];

const LETTERS = ['A', 'B', 'C', 'D'];

// ----- UTILITY FUNCTIONS -----

function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function buildRun() {
    const run = [];
    for (const tier of QUESTION_BANK) {
        const shuffled = shuffle(tier);
        for (let i = 0; i < 5; i++) {
            const q = shuffled[i];
            const correct = q.options[q.answer];
            const shuffledOptions = shuffle(q.options);
            run.push({
                q: q.q,
                options: shuffledOptions,
                answer: shuffledOptions.indexOf(correct)
            });
        }
    }
    return run;
}

function formatCurrency(n) {
    return '$' + n.toLocaleString('en-US');
}

function getSafeAmount(index) {
    let amount = 0;
    for (let i = 0; i < index; i++) {
        const prize = PRIZE_LADDER[i];
        if (SAFE_HAVENS.includes(prize)) amount = prize;
    }
    return amount;
}

function generateAudienceVotes(q, hidden) {
    const available = [0, 1, 2, 3].filter(i => !hidden.includes(i));
    const weights = available.map(i =>
        i === q.answer ? 55 + Math.random() * 25 : 5 + Math.random() * 20
    );
    const total = weights.reduce((a, b) => a + b, 0);
    const result = [0, 0, 0, 0];
    available.forEach((idx, k) => {
        result[idx] = Math.round((weights[k] / total) * 100);
    });
    return result;
}