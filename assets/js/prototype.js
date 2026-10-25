"use strict";

// Find the HTML elements used for the observation review.
const observationForm = document.getElementById("observation-form");
const observationReview = document.getElementById("observation-review");
const reviewHeading = document.getElementById("review-heading");
const reviewContent = document.getElementById("review-content");
const editObservation = document.getElementById("edit-observation");
// Add one label and answer to the review.
function addReviewItem(label, answer) {
    const term = document.createElement("dt");
    const description = document.createElement("dd");

    term.textContent = label;
    description.textContent = answer;

    reviewContent.append(term, description);
}
// Build the review when the completed form is submitted.
observationForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Clear the previous preview before building a fresh one.
    reviewContent.replaceChildren();

    const fields = [
        ["Fictional child identifier", "child-id"],
        ["Observation date", "observation-date"],
        ["What happened?", "observation"],
        ["Child's voice", "child-voice"],
        ["Learning demonstrated", "learning"],
        ["Possible next steps", "next-steps"]
    ];

    fields.forEach(function (field) {
        const answer = document.getElementById(field[1]).value.trim();
        addReviewItem(field[0], answer || "Not provided");
    });

    const selectedAreas = observationForm.querySelectorAll(
        'input[name="development-areas"]:checked'
    );

    const areaNames = [];

    selectedAreas.forEach(function (checkbox) {
        areaNames.push(checkbox.labels[0].textContent.trim());
    });

    addReviewItem(
        "Areas of learning and development",
        areaNames.join(", ") || "None selected"
    );

    observationForm.hidden = true;
    observationReview.hidden = false;
    reviewHeading.focus();
});
// Return to the form without clearing the student's entries.
editObservation.addEventListener("click", function () {
    observationReview.hidden = true;
    observationForm.hidden = false;
    document.getElementById("child-id").focus();
});