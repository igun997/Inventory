<?php
define('MAILGUN_URL', 'https://api.mailgun.net/v3/mailer.bitxplor.com');
define('MAILGUN_KEY', '');
/**
 * @author Indra Gunanda
 */
class Sendmail
{
    public function __construct()
    {
    }
    /**
 	 * Mailgun Sender
 	 *
 	 * @param string $to, $toname, $mailfromname, $mailfrom="shop@frasindo.com", $subject, $html, $text="", $tag="", $replyto="shop@frasindo.com"
 	 * @return bool
	 */

    public function mailgun($to, $toname, $mailfromname, $mailfrom="shop@frasindo.com", $subject, $html, $text="", $tag="", $replyto="shop@frasindo.com")
    {
        $array_data = array(
        'from'=> $mailfromname .'<'.$mailfrom.'>',
        'to'=>$toname.'<'.$to.'>',
        'subject'=>$subject,
        'html'=>$html,
        'text'=>$text,
        'o:tracking'=>'yes',
        'o:tracking-clicks'=>'yes',
        'o:tracking-opens'=>'yes',
        'o:tag'=>$tag,
        'h:Reply-To'=>$replyto
      );
        $session = curl_init(MAILGUN_URL.'/messages');
        curl_setopt($session, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
        curl_setopt($session, CURLOPT_USERPWD, 'api:'.MAILGUN_KEY);
        curl_setopt($session, CURLOPT_POST, true);
        curl_setopt($session, CURLOPT_POSTFIELDS, $array_data);
        curl_setopt($session, CURLOPT_HEADER, false);
        curl_setopt($session, CURLOPT_ENCODING, 'UTF-8');
        curl_setopt($session, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($session, CURLOPT_SSL_VERIFYPEER, false);
        $response = curl_exec($session);
        curl_close($session);
        $results = json_decode($response, true);
        return $results;
    }
}
