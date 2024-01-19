document
  .getElementById("image-input")
  .addEventListener("change", function (event) {
    const fileInput = event.target;
    const imagePreview = document.getElementById("image-preview");

    const file = fileInput.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        const imageUrl = e.target.result;

        // Clear previous Cropper instance
        if (imagePreview.cropper) {
          imagePreview.cropper.destroy();
        }

        // Display the selected image with Cropper functionality
        imagePreview.innerHTML = `<img id="cropped-image" src="${imageUrl}" alt="Selected Image" style="max-width: 100%; max-height: 100%;">`;

        // Initialize Cropper
        const cropper = new Cropper(document.getElementById("cropped-image"), {
          aspectRatio: 1, // Set the aspect ratio as needed (e.g., 1:1 for a square)
          zoomable: true,
          viewMode: 1, // Set the view mode (0, 1, 2, 3)
        });

        // Save the Cropper instance for later use
        imagePreview.cropper = cropper;
      };

      // Read the image file as a data URL
      reader.readAsDataURL(file);
    } else {
      // If no file is selected, clear the image preview
      imagePreview.innerHTML = "";
    }
  });

document.getElementById("save-button").addEventListener("click", function () {
  const cropper = document.getElementById("cropped-image").cropper;

  // Get the cropped canvas
  const canvas = cropper.getCroppedCanvas();

  if (canvas) {
    // Convert the canvas to a data URL
    const croppedImageUrl = canvas.toDataURL();

    // Send the data URL to the server for saving
    saveCroppedImage(croppedImageUrl);
  }
});

function saveCroppedImage(croppedImageUrl) {
  // Send the data to the server using AJAX or any other method
  // You can use the Fetch API or an AJAX library like Axios or jQuery

  // Example using Fetch API
  fetch("save_image.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      image: croppedImageUrl,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the server response (success or error)
      console.log(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
