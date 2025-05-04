function initializeReviews() {
    if (!localStorage.getItem('reviews')) {
        const initialReviews = [
            {
                id: 1,
                "user-name": "Mohammad Magdy",
                stars: 4,
                comment: "this site is a good one",
                "created-at": new Date().toDateString(),
                "is-hidden": true, 
                "user-email": "mohammad@example.com"
            }
        ];
        localStorage.setItem('reviews', JSON.stringify(initialReviews));
    }
}

function displayReviews() {
    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    const reviewsContainer = document.getElementById('reviews-container');
    
    reviewsContainer.innerHTML = '';

    const visibleReviews = reviews.filter(review => review["is-hidden"] === false);

    if (visibleReviews.length === 0) {
        reviewsContainer.innerHTML = `
            <div class="no-reviews">
                No reviews available
            </div>
        `;
        return;
    }

    visibleReviews.forEach(review => {
        const reviewElement = document.createElement('div');
        reviewElement.className = 'review-card';
        reviewElement.innerHTML = `
            <div class="review-header">
                <span class="review-user">${review["user-name"]}</span>
                <div class="review-stars">
                    ${'★'.repeat(review.stars)}${'☆'.repeat(5 - review.stars)}
                    <span class="review-user">(${review.stars}/5)</span>
                </div>
            </div>
            <div class="review-date ">${review["created-at"]}</div>
            <p class="review-comment" >${review["comment"]}</p>
        `;
        reviewsContainer.appendChild(reviewElement);
    });
}

function handleReviewSubmit(event) {
    event.preventDefault();
    
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (!currentUser) {
        alert('Please login to submit a review');
        window.location.href = 'login.html';
        return;
    }

    const stars = parseInt(document.getElementById('stars').value);
    const comment = document.getElementById('comment').value.trim();

    if (isNaN(stars) || stars < 1 || stars > 5) {
        alert('Please select a rating between 1-5 stars');
        return;
    }

    if (!comment) {
        alert('Please write your review comment');
        return;
    }

    const offers = JSON.parse(localStorage.getItem('offers')) || [];
    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];

// console.log(currentUser);

    const newReview = {
        id: offers.length + 1,
        "user-name": currentUser.name || currentUser.email.split('@')[0],
        stars: stars,
        comment: comment,
        "created-at": new Date().toDateString(),
        "is-hidden": true,
        "user-email": currentUser.email
    };

    reviews.push(newReview);
    localStorage.setItem('reviews', JSON.stringify(reviews));

    event.target.reset();
    document.querySelectorAll('.star').forEach(star => star.classList.remove('active'));
    displayReviews();
    alert('Your review has been submitted and will be visible after approval.');
}

function initStarRating() {
    const stars = document.querySelectorAll('.star');
    const starsInput = document.getElementById('stars');
    
    stars.forEach(star => {
        star.addEventListener('click', () => {
            const value = parseInt(star.getAttribute('data-value'));
            starsInput.value = value;
            
            stars.forEach((s, index) => {
                if (index < value) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });
        });
    });
}

function approveReview(reviewId) {
    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    const reviewIndex = reviews.findIndex(r => r.id === reviewId);
    if (reviewIndex !== -1) {
        reviews[reviewIndex]["is-hidden"] = false;
        localStorage.setItem('reviews', JSON.stringify(reviews));
        displayReviews();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    initializeReviews();
    displayReviews();
    initStarRating();
    
    document.getElementById('review-form').addEventListener('submit', handleReviewSubmit);
});