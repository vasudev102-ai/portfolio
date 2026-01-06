<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

echo "<pre>";
print_r($_POST);

error_reporting(E_ALL);
ini_set('display_errors', 1);

// Database connection
$conn = new mysqli("localhost", "root", "", "portfolio_db");

if ($conn->connect_error) {
    die("Connection failed");
}

// Sanitize input
$name    = trim($_POST['name']);
$email   = trim($_POST['email']);
$message = trim($_POST['message']);
$ip      = $_SERVER['REMOTE_ADDR'];

// Basic validation
if (empty($name) || empty($email) || empty($message)) {
    die("All fields are required.");
}

// Insert into DB
$stmt = $conn->prepare(
    "INSERT INTO contact_messages (name, email, message, ip_address)
     VALUES (?, ?, ?, ?)"
);
$stmt->bind_param("ssss", $name, $email, $message, $ip);
$stmt->execute();
$stmt->close();

// ---------------- EMAIL NOTIFICATION ----------------

$to = "Vasudev102@gmail.com";
$subject = "New Contact Message – Portfolio Website";

$body = "
New message received from your portfolio website.

Name: $name
Email: $email
IP Address: $ip

Message:
--------------------------------
$message
--------------------------------
";

$headers = "From: Portfolio Website <no-reply@yourdomain.com>";

mail($to, $subject, $body, $headers);

// Redirect after success
header("Location: thank-you.html");

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host = 'smtp.mail.yahoo.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'vasudevmukherjee@yahoo.co.uk';   // your Gmail
    $mail->Password   = 'toxy gwyh vuvh tfuo';      // Gmail App Password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;
    $mail->setFrom('vasudevmukherjee@yahoo.co.uk', 'Portfolio Contact Form');
    $mail->addAddress('vasudevmukherjee@yahoo.co.uk');
	$mail->addReplyTo($email, $name);
	
    $mail->isHTML(true);
    $mail->Subject = 'New Contact Message Received';
    $mail->Body    = "
        <b>Name:</b> {$name}<br>
        <b>Email:</b> {$email}<br>
        <b>Message:</b><br>{$message}<br><br>
        <b>IP:</b> {$ip}
    ";

    $mail->send();
    echo "Message sent successfully!";
} catch (Exception $e) {
    echo "Message saved, but email failed.";
}
exit;
?>
