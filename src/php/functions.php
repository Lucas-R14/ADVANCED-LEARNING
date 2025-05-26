<?php
/**
 * Function to download a PDF file
 * @param string $filePath The path to the file relative to the pdf directory
 * @return void
 */
function downloadPDF($filePath) {
    // Base path to the PDF directory
    $basePath = dirname(dirname(__DIR__)) . DIRECTORY_SEPARATOR . 'public' . DIRECTORY_SEPARATOR . 'pdf' . DIRECTORY_SEPARATOR;
    
    // Clean and validate the file path
    $filePath = str_replace(['../', '..\\'], '', $filePath);
    
    // Only allow PDF files for security
    if (!preg_match('/\.pdf$/i', $filePath)) {
        die("Invalid file type requested. Only PDF files are allowed.");
    }
    
    // Build the full file path
    $fullPath = $basePath . $filePath;
    
    // Debug information
    error_log("Requested file: " . $filePath);
    error_log("Base path: " . $basePath);
    error_log("Full path: " . $fullPath);
    error_log("File exists: " . (file_exists($fullPath) ? 'Yes' : 'No'));
    
    // Check if file exists
    if (file_exists($fullPath)) {
        // Get the filename without the path
        $filename = basename($filePath);
        
        // Set headers to force download
        header('Content-Description: File Transfer');
        header('Content-Type: application/pdf');
        header('Content-Disposition: attachment; filename="' . $filename . '"');
        header('Expires: 0');
        header('Cache-Control: must-revalidate');
        header('Pragma: public');
        header('Content-Length: ' . filesize($fullPath));
        
        // Clear output buffer
        if (ob_get_level()) {
            ob_clean();
        }
        flush();
        
        // Read file and output
        readfile($fullPath);
        exit;
    } else {
        // If file doesn't exist, show more detailed error
        echo "Error: File not found.<br>";
        echo "Requested file: " . htmlspecialchars($filePath) . "<br>";
        echo "Base path: " . htmlspecialchars($basePath) . "<br>";
        echo "Full path: " . htmlspecialchars($fullPath) . "<br>";
        echo "Directory contents:<br>";
        
        // List contents of the base directory
        echo "Base directory contents:<br>";
        $dir = dir($basePath);
        while (($entry = $dir->read()) !== false) {
            echo htmlspecialchars($entry) . "<br>";
        }
        $dir->close();
        
        // List contents of the programme Syllabus directory
        $syllabusDir = $basePath . 'programme Syllabus';
        if (is_dir($syllabusDir)) {
            echo "<br>Programme Syllabus directory contents:<br>";
            $dir = dir($syllabusDir);
            while (($entry = $dir->read()) !== false) {
                echo htmlspecialchars($entry) . "<br>";
            }
            $dir->close();
        }
    }
}
?> 