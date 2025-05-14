<?php
// Set recipient email here
$recipient_email = "info@advancedlearning.study";

// Function to sanitize form inputs
function sanitize_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

// Process form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form fields
    $name = isset($_POST['name']) ? sanitize_input($_POST['name']) : '';
    $email = isset($_POST['email']) ? sanitize_input($_POST['email']) : '';
    $subject = isset($_POST['subject']) ? sanitize_input($_POST['subject']) : '';
    $message = isset($_POST['message']) ? sanitize_input($_POST['message']) : '';
    
    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $response = [
            'status' => 'error',
            'message' => 'Please enter a valid email address.'
        ];
        echo json_encode($response);
        exit;
    }
    
    // Set email headers
    $headers = "From: $name <$email>" . "\r\n";
    $headers .= "Reply-To: $email" . "\r\n";
    $headers .= "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8" . "\r\n";
    
    // Create email content with HTML formatting
    $email_content = "
    <html>
    <head>
        <title>New Contact Form Submission</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; }
            h2 { color: #54346b; }
            .footer { margin-top: 30px; font-size: 12px; color: #777; }
        </style>
    </head>
    <body>
        <div class='container'>
            <h2>New Message from Advanced Learning Contact Form</h2>
            <p><strong>Name:</strong> $name</p>
            <p><strong>Email:</strong> $email</p>
            <p><strong>Subject:</strong> $subject</p>
            <p><strong>Message:</strong></p>
            <p>" . nl2br($message) . "</p>
            <div class='footer'>
                <p>This email was sent from the contact form on the Advanced Learning website.</p>
            </div>
        </div>
    </body>
    </html>
    ";
    
    // Send email
    $mail_sent = @mail($recipient_email, "Advanced Learning Contact: $subject", $email_content, $headers);
    
    // Check if mail was sent
    if ($mail_sent) {
        // Redirect back to contact page with success parameter
        header("Location: ../pages/contact.html?status=success");
        exit;
    } else {
        // Redirect back to contact page with error parameter
        header("Location: ../pages/contact.html?status=error");
        exit;
    }
} else {
    // Not a POST request, redirect to home page
    header("Location: ../../index.html");
    exit;
}
?> 