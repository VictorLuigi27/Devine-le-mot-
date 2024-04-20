// Charger le fichier txt
fetch("liste.txt")
    .then(response => response.text())
    .then(data => {
        var wordList = data.split("\n");
        var randomIndex = Math.floor(Math.random() * wordList.length);
        const wordToGuess = wordList[randomIndex].trim(); // Supprimer les espaces ou caractères invisibles éventuels

        var wordLength = wordToGuess.length;
        var hiddenWord = wordToGuess[0];

        for (var i = 1; i < wordLength; i++) {
            hiddenWord += "_";
        }

        document.getElementById("word").innerHTML = hiddenWord;



        var guessInput = document.getElementById("guess");
        var submitButton = document.getElementById("submit");
        var result = document.getElementById("result");
        var link = document.getElementById("link");

        var remainingAttempts = wordLength; // Nombre de tentatives restantes

        submitButton.onclick = function () {
            var guess = guessInput.value.toLowerCase(); // Convertir la saisie en minuscules pour éviter les problèmes de casse
            
            if (wordToGuess.includes(guess)) {
                for (var i = 0; i < wordLength; i++) {
                    if (wordToGuess[i] === guess) {
                        hiddenWord = hiddenWord.substr(0, i) + guess + hiddenWord.substr(i + 1);
                    }
                }
                document.getElementById("word").innerHTML = hiddenWord;

                if (hiddenWord === wordToGuess) {
                    result.innerHTML = "Bravo, tu as trouvé le mot";
                    guessInput.style.display = "none";
                    submitButton.style.display = "none";
                    link.style.display = "block";
                } else {
                    result.innerHTML = "Bonne lettre !";
                }
            } else {
                result.innerHTML = "Mauvaise lettre";
                remainingAttempts--;
                if (remainingAttempts <= 0) {
                    result.innerHTML = "Désolé, tu as utilisé toutes les tentatives. Le mot était : " + wordToGuess;
                    guessInput.style.display = "none";
                    submitButton.style.display = "none";
                    link.style.display = "block";
                }
            }
            guessInput.value = "";
        
            // Vérifier la condition de victoire
            if (hiddenWord === wordToGuess) {
                result.innerHTML = "Bravo, tu as trouvé le mot";
                guessInput.style.display = "none";
                submitButton.style.display = "none";
                link.style.display = "block";
            }
        };
    });
