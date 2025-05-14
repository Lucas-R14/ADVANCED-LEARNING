<?php
// Get the requested file from query string
$requestedFile = isset($_GET['file']) ? $_GET['file'] : '';

// Validate the file parameter to prevent directory traversal
$requestedFile = str_replace(['../', '..\\', '/', '\\'], '', $requestedFile);

// Only allow PDF files for security
if (!preg_match('/\.pdf$/i', $requestedFile)) {
    die("Invalid file type requested. Only PDF files are allowed.");
}

// Define the file path relative to this script
$file = dirname(dirname(__DIR__)) . '/public/pdf/' . $requestedFile;

// Check if file exists
if (file_exists($file)) {
    // Get the filename without the path
    $filename = basename($requestedFile);
    
    // Set headers to force download
    header('Content-Description: File Transfer');
    header('Content-Type: application/pdf');
    header('Content-Disposition: attachment; filename="' . $filename . '"');
    header('Expires: 0');
    header('Cache-Control: must-revalidate');
    header('Pragma: public');
    header('Content-Length: ' . filesize($file));
    
    // Clear output buffer
    if (ob_get_level()) {
        ob_clean();
    }
    flush();
    
    // Read file and output
    readfile($file);
    exit;
} else {
    // If file doesn't exist
    echo "Error: File not found.";
}
?> 