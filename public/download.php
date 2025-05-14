<?php
// Define the file path relative to this script
$file = __DIR__ . '/pdf/Appendix K - Code of Ethics.pdf';

// Check if file exists
if (file_exists($file)) {
    // Set headers to force download
    header('Content-Description: File Transfer');
    header('Content-Type: application/pdf');
    header('Content-Disposition: attachment; filename="Code of Ethics.pdf"');
    header('Expires: 0');
    header('Cache-Control: must-revalidate');
    header('Pragma: public');
    header('Content-Length: ' . filesize($file));
    
    // Clear output buffer
    ob_clean();
    flush();
    
    // Read file and output
    readfile($file);
    exit;
} else {
    // If file doesn't exist
    echo "Error: File not found.";
}
?> 