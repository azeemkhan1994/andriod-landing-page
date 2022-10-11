<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

$mail = new PHPMailer(true);
$mailUsr = new PHPMailer(true);                      // Passing `true` enables exceptions
try {
    //Server settings
    $mail->SMTPDebug = 0;                                 // Enable verbose debug output
    $mail->isSMTP();                                      // Set mailer to use SMTP
    $mail->Host = 'relay-hosting.secureserver.net';  // Specify main and backup SMTP servers
    $mail->SMTPAuth = false;                               // Enable SMTP authentication
    $mail->Username = '';                 // SMTP usernme
    $mail->Password = '';                           // SMTP password
    $mail->SMTPSecure = 'none';
    $mail->Port = 25;                                    // TCP port to connect to

    //Recipients
    $mail->setFrom('info@pebtechsolutions.com');
    // $mail->addAddress('rashid.latif@pebtechsolutions.com');     // Add a recipient
    // $mail->addAddress('khurram.khan@pebtechsolutions.com');
    $mail->addAddress('azeem.khan@pebtechsolutions.com');     // Add a recipient



    //Content
    // Set email format to HTML

    $name = $_POST['Name'];
    $email = $_POST['Email'];
    $service = $_POST['Interested'];
    $phone = $_POST['Phone'];
    $message = $_POST['Message'];
    $target = $_POST['Target'];

    $emailbody = "Name = " . $name . "<br>Email = " . $email . "<br>Service = " . $service . "<br>Phone = " .  $phone .  "<br>Message =" . $message . "<br> Location =" . $target;

    $mail->Subject = "PEBTECHSOLUTIONS Andriod Landing Page - CONTACT USER DETAILS!";
    $mail->Body    =     $emailbody;

    $mail->isHTML(true);
    $mail->send();

    //=========================For User===========================//

    //Server settings
    $mailUsr->SMTPDebug = 0;                                 // Enable verbose debug output
    $mailUsr->isSMTP();                                      // Set mailer to use SMTP
    $mailUsr->Host = 'relay-hosting.secureserver.net';  // Specify main and backup SMTP servers
    $mailUsr->SMTPAuth = false;                               // Enable SMTP authentication
    $mailUsr->Username = '';                 // SMTP usernme
    $mailUsr->Password = '';                           // SMTP password
    $mailUsr->SMTPSecure = 'none';
    $mailUsr->Port = 25;                                    // TCP port to connect to

    //Recipients
    $mailUsr->setFrom('info@pebtechsolutions.com');
    $mailUsr->addAddress($email);     // Add a recipient



    //Content
    // Set email format to HTML

    $emailbodyUsr =  "<img src='https://pebtechsolutions.com/demowebsite/LOGO-FOR-EMAIL-SIGNATURE.png' height='91' width='203' /> <br/><br/>  
    Hi <b>" . $name . "</b><br/><br/>" .
        "Thank you for visiting our website. <br/><br/>
    We would like to take this opportunity to introduce PebTech Solutions a one-stop place for all IT-related services to fulfil your business needs.<br/>
    We specialize in Android and IOS App development, Web Development, Logo Design etc.PebTech uses latest technologies to deliver digital solutions.<br/><br/>
    Kindly share your availability so that we shall discuss the work scope of your project and the required deliverables.<br/>
    <a href='https://calendly.com/pebtechsolutions'> Let's Schedule meeting</a><br/><br/>
    Waiting for your feedback.<br/><br>
    Warm Regards<br/>
    Support Team";

    $mailUsr->Subject = "PEBTECHSOLUTIONS - THANK YOU FOR YOUR CONTACT!";
    $mailUsr->Body    =     $emailbodyUsr;

    $mailUsr->isHTML(true);
    $mailUsr->send();

    echo json_encode(['success' => true]);
    exit();
} catch (Exception $e) {
    echo json_encode(['success' => false]);
}
