<?php

// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Load Composer's autoloader
require_once 'vendor/autoload.php';

// Instantiation and passing `true` enables exceptions
$mail = new PHPMailer(true);

try {

    $mail->IsSMTP();
    $mail->SMTPDebug = 2;
    $mail->Host = "smtp.gmail.com";
    $mail->SMTPAuth = true;
    $mail->SMTPSecure = "tls";
    $mail->Username = 'ammiel16@gmail.com';
    $mail->Password = 'ammiel2070efesios2';
    $mail->Port = 587;
    $mail->SMTPOptions = array(
        'ssl' => array(
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true
        )
    );
    //Server settings
//    $mail->SMTPDebug = 2;                                       // Enable verbose debug output
//   // $mail->isSMTP();                                            // Set mailer to use SMTP
//    $mail->Host = 'tls://smtp.gmail.com';  // Specify main and backup SMTP servers
//    $mail->SMTPAuth = true;                                   // Enable SMTP authentication
//    $mail->Username = 'ammiel16@gmail.com';                     // SMTP username
//    $mail->Password = 'ammiel2070efesios2';                               // SMTP password
//    $mail->SMTPSecure = 'tls';                                  // Enable TLS encryption, `ssl` also accepted
//    $mail->Port = 587;                                    // TCP port to connect to
    //Recipients
    $mail->setFrom('ammiel16@gmail.com', 'Ing.Ammiel Pajuelo');
    $mail->addAddress('ammiel16@gmail.com', 'Carla Hernandez');     // Add a recipient
//    $mail->addAddress('ammiel16@gmail.com');               // Name is optional
//    $mail->addReplyTo('ammiel16@gmail.com', 'Information');
//    $mail->addCC('ammiel16@gmail.com');
//    $mail->addBCC('bcc@example.com');
    // Attachments
//    $mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//    $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
    // Content
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = 'Hola Ammiel esto es una prueba desde mi app';
    $mail->Body = 'Hola Ammiel muchas gracias por tu interes en mi app';
    $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

    $mail->send();
    echo 'Message has been sent';
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}
