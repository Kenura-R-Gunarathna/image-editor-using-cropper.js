<?php

// Ensure that the request is a POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the JSON data from the request
    $jsonData = file_get_contents('php://input');
    $data = json_decode($jsonData);

    // Get the base64-encoded image data
    $base64Image = $data->image;

    // Convert base64 data to binary data
    $imageData = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $base64Image));

    // Specify the file path where you want to save the image
    $filePath = 'uploads/cropped_image.jpg';

    // Save the image to the specified file path
    file_put_contents($filePath, $imageData);

    // Send a response back to the client
    echo json_encode(['success' => true, 'message' => 'Image saved successfully']);
} else {
    // If it's not a POST request, send an error response
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?>
