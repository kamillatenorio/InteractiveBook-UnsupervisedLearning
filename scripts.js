window.onload = function() {
    // Select all page pairs in their order of appearance
    const allPages = document.querySelectorAll('.page-pair');
    let currentPageIndex = 0; // Start at the first page
    const isSmallScreen = window.innerWidth <= 768; // Detect if screen size is small

    // Function to show the current page
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

    // Initialize by showing the first page
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
