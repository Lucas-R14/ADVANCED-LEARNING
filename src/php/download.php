<?php
// Include the functions file
require_once 'functions.php';

// Get the requested file from query string
$requestedFile = isset($_GET['file']) ? $_GET['file'] : '';

// Handle the download
downloadPDF($requestedFile);
?> 