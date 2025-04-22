<?php
if($_POST) {
    $to = "gningmamadou22@gmail.com";
    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];
    
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    
    if(mail($to, $subject, $message, $headers)) {
        echo "<script>alert('Message envoyé!');</script>";
    } else {
        echo "<script>alert('Erreur d'envoi');</script>";
    }
}
?>