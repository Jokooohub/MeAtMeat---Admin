document.addEventListener("DOMContentLoaded", function () {
    const profileForm = document.getElementById("profile-form");
    const nameInput = document.getElementById("new-name");
    const pictureInput = document.getElementById("new-picture");

    // Pre-fill the form with existing data if available
    const savedName = localStorage.getItem("username");
    const savedPicture = localStorage.getItem("profilePicture");

    if (savedName) nameInput.value = savedName;

    profileForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent the form from refreshing the page

        // Get the values from the form
        const newName = nameInput.value;
        const newPicture = pictureInput.files[0];

        // Save the new name
        if (newName) {
            localStorage.setItem("username", newName);
        }

        // Save the new profile picture if uploaded
        if (newPicture) {
            const reader = new FileReader();
            reader.onload = function (e) {
                localStorage.setItem("profilePicture", e.target.result); // Save as Base64
                redirectToMainPage();
            };
            reader.readAsDataURL(newPicture);
        } else {
            redirectToMainPage(); // Redirect immediately if no new picture
        }
    });

    function redirectToMainPage() {
        alert("Profile updated successfully!");
        window.location.href = "index.html"; // Redirect to the main page
    }
});
