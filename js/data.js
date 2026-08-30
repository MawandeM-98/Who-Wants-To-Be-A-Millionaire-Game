const PRIZE_LADDER = [
    100, 200, 300, 500, 1000, 2000, 4000, 8000,
    16000, 32000, 64000, 125000, 250000, 500000, 1000000
];

const SAFE_HAVENS = [1000, 32000];

const QUESTION_BANK = [
    // Tier 0 - Easy
    [
        { q: "Which country in Africa was not colonised?", options: ["Ethiopia", "Ghana", "Nigeria", "Kenya"], answer: 0 },
        { q: "In which year did boxing legend Salvador Sanchez defeat Juan Laporte?", options: ["1979", "1980", "1982", "1983"], answer: 1},
        { q:"Which is the 3rd biggest cloud provider in the world in 2026?", options: ["Salesforce Cloud", "Microsoft Azure", "Amazon Web Services", "Google Cloud"], answer: 3},
        { q: "How many continents are there on Earth?", options: ["5", "6", "7", "8"], answer: 2 },
        { q: "Which calendar is used by the Jews?", options: ["Lunar", "Solar", "Gregorian", "Lunisolar"], answer: 3 },
        { q: "Which gas do plants primarily absorb for photosynthesis?", options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"], answer: 2 },
        { q: "How many strings does a standard guitar have?", options: ["4", "5", "6", "7"], answer: 2 },
        { q: "What is the capital city of Japan?", options: ["Osaka", "Kyoto", "Tokyo", "Seoul"], answer: 2 },
        { q: "Who is known for being the father of psychedlic drug LSD?", options: ["Albert Hofmann", "Timothy Leary", "Ken Kesey", "Terence McKenna"], answer: 0 },
        { q: "How many days are there in a leap year?", options: ["364", "365", "366", "367"], answer: 2 },
        { q: "What colour do you get by mixing blue and yellow?", options: ["Purple", "Green", "Orange", "Brown"], answer: 1 },
        { q: "Which ocean is the largest?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], answer: 3 },
        { q: "What is H2O more commonly known as?", options: ["Salt", "Water", "Sugar", "Oxygen"], answer: 1 },
        { q: "How many sides does a hexagon have?", options: ["5", "6", "7", "8"], answer: 1 },
        { q: "Which sport uses a shuttlecock?", options: ["Tennis", "Squash", "Badminton", "Cricket"], answer: 2 },
        { q: "Who painted the Mona Lisa?", options: ["Van Gogh", "Picasso", "Da Vinci", "Rembrandt"], answer: 2 },
        { q: "What is the currency of the United Kingdom?", options: ["Euro", "Dollar", "Pound sterling", "Franc"], answer: 2 },
        { q: "Produced in the pineal gland, which hormone regulates sleep-wake cycles?", options: ["Melatonin", "Serotonin", "Dopamine", "Cortisol"], answer: 0 },
        { q: "What is the largest mammal in the world?", options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"], answer: 1 },
        { q: "The Mekong River delta is located in which of these Asian countries?", options: ["Thailand", "Vietnam", "Cambodia", "Laos"], answer: 1 },
        { q: "Which Halogen is the most reactive of all the chemical elements?", options: ["Fluorine", "Chlorine", "Bromine", "Iodine"], answer: 0 },
    ],
    // Tier 1 - Medium
    [
        { q: "Which element has the chemical symbol 'Fe'?", options: ["Fluorine", "Iron", "Lead", "Francium"], answer: 1 },
        { q: "The hammer and sickle is a symbol associated with which political ideology?", options: ["Socialism", "Fascism", "Communism", "Anarchism"], answer: 3},
        { q: "What is the 10th element on the periodic table?", options: ["Magnesium", "Sodium", "Neon", "Aluminium"], answer: 2 },
        { q: "In which year did the Berlin Wall fall?", options: ["1987", "1989", "1991", "1993"], answer: 1 },
        { q: "Who wrote the novel 'Things Fall Apart'?", options: ["Wole Soyinka", "Chinua Achebe", "Ngugi wa Thiong'o", "Ben Okri"], answer: 1 },
        { q: "What is the longest river in Africa?", options: ["Congo", "Zambezi", "Niger", "Nile"], answer: 3 },
        { q: "'Richard of York gave battle in vain' is a sentence used to help remember the order of which of these things?", options: ["Planets of the solar system", "Colours of the rainbow", "Musical notes", "Books of the Old Testament"], answer: 1 },
        { q: "What year did Czar Nicolas II get executed?", options: ["1917", "1918", "1919", "1920"], answer: 1 },
        { q: "Which of these religious observances lasts for the shortest period of time?", options: ["Ramadan", "Lent", "Hanukkah", "Diwali"], answer: 3 },
        { q: "How many bones are in the adult human body?", options: ["186", "206", "226", "246"], answer: 1 },
        { q: "Which planet has the most moons?", options: ["Jupiter", "Saturn", "Uranus", "Neptune"], answer: 1 },
        { q: "What does 'CPU' stand for?", options: ["Central Process Unit", "Computer Personal Unit", "Central Processing Unit", "Core Processing Utility"], answer: 2 },
        { q: "Mount Kilimanjaro is located in which country?", options: ["Kenya", "Tanzania", "Uganda", "Ethiopia"], answer: 1 },
        { q: "Who was the first person to walk on the Moon?", options: ["Buzz Aldrin", "Yuri Gagarin", "Neil Armstrong", "Michael Collins"], answer: 2 },
        { q: "Which language has the most native speakers worldwide?", options: ["English", "Spanish", "Hindi", "Mandarin Chinese"], answer: 3 },
        { q: "What is the hardest naturally occurring substance?", options: ["Quartz", "Diamond", "Titanium", "Corundum"], answer: 1 },
        { q: "In music, how many lines does a standard stave have?", options: ["4", "5", "6", "7"], answer: 1 },
        { q: "Which sea is the saltiest body of water commonly named a sea?", options: ["Red Sea", "Dead Sea", "Caspian Sea", "Black Sea"], answer: 1 },
        { q: "What is the capital of Iceland?", options: ["Reykjavik", "Oslo", "Helsinki", "Copenhagen"], answer: 0 },
        { q: "Who developed the theory of general relativity?", options: ["Isaac Newton", "Niels Bohr", "Albert Einstein", "Max Planck"], answer: 2 },
        { q: "What is Quentin Tarantinos 7th film?", options: ["Inglourious Basterds", "Django Unchained", "The Hateful Eight", "Once Upon a Time in Hollywood"], answer: 0 },
        { q: "What does K stand for in the phonetic alphabet?", options: ["Kappa", "Kilo", "Kangaroo", "Kilowatt"], answer: 1 },
        { q: "Marked by differences in activity and appearance, 'solitary' and 'gregarious' are terms used to describe what type of animals?", options: ["Mammals", "Birds", "Insects", "Reptiles"], answer: 2 },
        { q: "Which of these cetaceans is classified as a 'toothless whale'?", options: ["Gray Whale", "Minke Whale", "Humpback Whale", "Sperm Whale"], answer: 3 },
        { q: "What was the name of the left handed judge who assasinated King Eglon of Moab in the Bible?", options: ["Ehud", "Gideon", "Samson", "Abimelech"], answer: 0 },
        { q: "What is the largest state-directed bank heist in history?", options: ["Bangladesh Bank Heist", "Central Bank of Iraq Heist", "Banco Central Burglary", "The Great Train Robbery"], answer: 1 },
        { q: "In 2012, Paul Thomas Anderson directed a film based on a novel by Thomas Pynchon. What was the name of the film?", options: ["The Mastermind", "The Mister", "There Will Be Blood", "The Master"], answer: 1 },
    ],
    // Tier 2 - Hard
    [
        { q: "Which Roman emperor ruled during the eruption of Vesuvius in AD 79?", options: ["Nero", "Titus", "Trajan", "Vespasian"], answer: 1 },
        { q: "Based on the Bremen Coat of Arms, which animal is depicted on the flag of Bremen?", options: ["Eagle", "Bear", "Lion", "Griffin"], answer: 2 },
        { q: "Who created the South African flag that was adopted in 1994?", options: ["Herbert Baker", "Frederik de Klerk", "Freddie Kruger", "Frederik van Zyl Slabbert"], answer: 1 },
        { q: "Which programming language was developed by Brendan Eich in 1995?", options: ["Python", "JavaScript", "Java", "C#"], answer: 1 },
        { q: "What is the Economics term for how much demand or supply changes in response to shifts in factors like price or income?", options: ["Elasticity", "Volatility", "Inflation", "Marginality"], answer: 0 },
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
        { q: "Which Aviation term means a four-digit transponder code assigned to an aircraft for identification purposes?", options: ["Squawk code", "Beacon code", "Transponder code", "Flight code"], answer: 0 },
        { q: "Which country is the largest producer of coffee in the world?", options: ["Colombia", "Vietnam", "Brazil", "Ethiopia"], answer: 2 },
        { q: "What is the name of the largest moon of Saturn?", options: ["Titan", "Ganymede", "Callisto", "Europa"], answer: 0 },
        { q: "Which famous scientist developed the laws of motion and universal gravitation?", options: ["Albert Einstein", "Isaac Newton", "Galileo Galilei", "Nikola Tesla"], answer: 1 },
        { q: "In which year did the Chernobyl nuclear disaster occur?", options: ["1984", "1986", "1988", "1990"], answer: 1 },
        { q: "What is the term for a word that is spelled the same forwards and backwards?", options: ["Anagram", "Palindrome", "Homonym", "Antonym"], answer: 1 },
        { q: "Which country is known as the Land of the Rising Sun?", options: ["China", "Japan", "South Korea", "Thailand"], answer: 1 },
        { q: "What is the chemical formula for table salt?", options: ["NaCl", "KCl", "CaCl2", "MgCl2"], answer: 0 },
        { q: "Which famous physicist is known for his theory of relativity?", options: ["Albert Einstein", "Isaac Newton", "Niels Bohr", "Galileo Galilei"], answer: 0 },
        { q: "What is the largest organ in the human body?", options: ["Liver", "Skin", "Heart", "Lungs"], answer: 1 },
        { q: "When was the treaty of Tilsit signed?", options: ["1807", "1812", "1815", "1821"], answer: 0 },
        { q: "What does Che Guevara's famous quote 'Hasta la victoria siempre' translate to in English?", options: ["Until victory always", "Victory is certain", "Always victorious", "Victory forever"], answer: 0 },
        { q: "John Dillinger and Baby Faced Nelson committed their final joint heist in which city?", options: ["Chicago", "Cleveland", "Indianapolis", "Detroit"], answer: 2 },
        { q: "How many assasination attempts did Fidel Castro survive?", options: ["638", "642", "645", "650"], answer: 0 },
        { q: "Who is often referred to as the last great Viking King?", options: ["Erik the Red", "Cnut the Great", "Olaf Tryggvason", "Harald Hardrada"], answer: 3 },
        
    ]
];

const LETTERS = ['A', 'B', 'C', 'D'];

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