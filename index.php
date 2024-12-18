<?php
// index.php

// Check if the requested path is for Firebase Auth

    $url = 'https://exride.firebaseapp.com' . $_SERVER['REQUEST_URI'];

    // Initialize a cURL session
    $ch = curl_init($url);

    // Forward the request method, headers, and body
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $_SERVER['REQUEST_METHOD']);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    // Pass the body for POST/PUT requests
    if ($_SERVER['REQUEST_METHOD'] === 'POST' || $_SERVER['REQUEST_METHOD'] === 'PUT') {
        $input = file_get_contents('php://input');
        curl_setopt($ch, CURLOPT_POSTFIELDS, $input);
    }

    // Forward headers
    $headers = [];
    foreach (getallheaders() as $key => $value) {
        $headers[] = "$key: $value";
    }
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

    // Execute the request and send the response back
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    http_response_code($httpCode);
    echo $response;
    exit;


// Serve the rest of your application
// Adjust this to match your app's routing logic
if (file_exists(__DIR__ . $_SERVER['REQUEST_URI'])) {
    return false; // Serve the requested static file directly
}

echo "Welcome to the PHP server!";
