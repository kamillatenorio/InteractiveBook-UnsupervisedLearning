window.onload = function() {
    // Select all page pairs and single pages in their order of appearance
    const allPages = document.querySelectorAll('.page-pair, .page-single');
    let currentPageIndex = 0; // Start at the first page
    const isSmallScreen = window.innerWidth <= 768; // Detect if screen size is small

    // Array of questions for the quiz
    const quizQuestions = [
        {
            question: "Glauben Sie, dass ChatGPT den Turing-Test bestanden hat?",
            options: ["Wahr", "Falsch"],
            answer: "A"
        },
        {
            question: "What does 'AI' stand for?",
            options: ["Artificial Interface", "Automated Integration", "Artificial Intelligence", "Autonomous Interaction"],
            answer: "C"
        }
    ];
    
    let currentQuizQuestionIndex = 0;

    // Function to load a quiz question
    function loadQuizQuestion() {
        const quizQuestion = quizQuestions[currentQuizQuestionIndex];
        document.getElementById("question").innerText = quizQuestion.question;
        document.getElementById("label1").innerText = quizQuestion.options[0];
        document.getElementById("label2").innerText = quizQuestion.options[1];
        if (quizQuestion.options.length > 2) {
            document.getElementById("label3").innerText = quizQuestion.options[2];
            document.getElementById("label4").innerText = quizQuestion.options[3];
        }
        
        // Clear any previously selected option and enable inputs
        document.querySelectorAll('input[name="option"]').forEach(option => {
            option.checked = false;
            option.disabled = false;
        });
        
        // Clear previous result message
        document.getElementById("result").innerText = "";
        
        // Enable the submit button
        document.querySelector('button[onclick="checkQuizAnswer()"]').disabled = false;
    }

    // Function to check the selected answer for the quiz
    window.checkQuizAnswer = function() {
        const selectedOption = document.querySelector('input[name="option"]:checked');
        
        if (!selectedOption) {
            alert("Bitte wählen Sie eine Option aus!");
            return;
        }
        
        const answer = selectedOption.value;
        const resultElement = document.getElementById("result");

        if (answer === quizQuestions[currentQuizQuestionIndex].answer) {
            resultElement.innerText = "Richtig! Gehen Sie zur nächsten Seite, um mehr zu erfahren ...";
            resultElement.style.color = "green"; 
        } else {
            resultElement.innerText = "Das stimmt so nicht! Laut aktuellen Forschungsergebnissen hat ChatGPT den Turing-Test bestanden! Gehen Sie zur nächsten Seite, um mehr zu erfahren...";
            resultElement.style.color = "red";
        }
        // Disable further attempts
        document.querySelectorAll('input[name="option"]').forEach(option => option.disabled = true);
        document.querySelector('button[onclick="checkQuizAnswer()"]').disabled = true;
    }

    // Function to show the current page (either pair or single)
    function showPage(index) {
        // Hide all pages initially
        allPages.forEach((page, i) => {
            page.style.display = i === index ? 'flex' : 'none';
        });

        // Update the progress bar
        updateProgressBar(index, allPages.length);

        // Control the visibility of 'Previous' and 'Next' buttons
        document.getElementById('prev-btn').style.display = index === 0 ? 'none' : 'inline-block';
        document.getElementById('next-btn').style.display = index === allPages.length - 1 ? 'none' : 'inline-block';
        
        // Check if the current page is the quiz page (with id 'pair29')
        if (index === Array.from(allPages).findIndex(page => page.id === "pair29")) {
            loadQuizQuestion(); // Load the quiz question
        }
    }

    // Function to navigate to the previous page
    window.prevPage = function() {
        if (currentPageIndex > 0) {
            currentPageIndex--;
            showPage(currentPageIndex);
        }
    }

    // Function to navigate to the next page
    window.nextPage = function() {
        if (currentPageIndex < allPages.length - 1) {
            currentPageIndex++;
            showPage(currentPageIndex);
        }
    }

    // Function to update the progress bar
    function updateProgressBar(currentIndex, totalPages) {
        const progressFill = document.getElementById('progress-fill');
        const progressPercentage = ((currentIndex + 1) / totalPages) * 100;
        progressFill.style.width = progressPercentage + '%';

        const lampIcon = document.getElementById('lamp-icon');
        lampIcon.style.left = `calc(${progressPercentage}% - 15px)`; // Adjust based on lamp size
    }

    // Initialize by showing the first page (either pair or single)
    showPage(currentPageIndex);

    // Adding page numbers (except for page 1 and 2)
    const pages = document.querySelectorAll('.page');
    let pageNumber = 3; // Start from page 3

    pages.forEach((page, index) => {
        if (index >= 2) { // Skip first two pages (0 and 1)
            let pageNumDiv = document.createElement('div');
            pageNumDiv.className = 'page-number';

            // Check if it's a small screen, and only add one page number if the pages are stacked
            if (isSmallScreen) {
                if (index % 2 === 0) { // Add the number only to one of the two pages
                    pageNumDiv.classList.add('left'); // Center the number
                    pageNumDiv.innerText = pageNumber++;
                    page.appendChild(pageNumDiv);
                }
            } else {
                // Regular behavior for large screens
                if (page.classList.contains('left-page')) {
                    pageNumDiv.classList.add('left');
                } else if (page.classList.contains('right-page')) {
                    pageNumDiv.classList.add('right');
                }
                pageNumDiv.innerText = pageNumber++;
                page.appendChild(pageNumDiv);
            }
        }
    });
};
