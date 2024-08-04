<?php

namespace App\Libraries;

class PassCrypt
{
    public static $cipher = 'AES-256-CBC';

    public static function encrypt($passphrase, $value)
    {
        $salt = openssl_random_pseudo_bytes(8);
        $salted = '';
        $dx = '';

        while (strlen($salted) < 48) {
            $dx = md5($dx . $passphrase . $salt, true);
            $salted .= $dx;
        }

        // Encrypt plain text
        $key = substr($salted, 0, 32);
        $iv = substr($salted, 32, 16);
        $encrypted_data = openssl_encrypt($value, self::$cipher, $key, true, $iv);
        $data = [
            'ct' => base64_encode($encrypted_data),
            'iv' => bin2hex($iv),
            's' => bin2hex($salt)
        ];

        // Encode hash to base64
        $cipherText = base64_encode(json_encode($data));

        return $cipherText;
    }

    public static function decrypt($passphrase, $jsonString)
    {
        // Decode Base64
        $cipher = base64_decode($jsonString);

        // Extract cipher params
        $jsondata = json_decode($cipher, true);

        if (empty($jsondata)) {
            return false;
        }

        $ct = base64_decode($jsondata['ct']);
        $salt = hex2bin($jsondata['s']);
        $iv = hex2bin($jsondata['iv']);

        if (array_key_exists('key', $jsondata)) {
            $key = hex2bin($jsondata['key']);
        } else {
            // Generate key based on salt
            $concatedPassphrase = $passphrase . $salt;
            $md5 = [];
            $md5[0] = md5($concatedPassphrase, true);
            $result = $md5[0];
            for ($i = 1; $i < 3; $i++) {
                $md5[$i] = md5($md5[$i - 1] . $concatedPassphrase, true);
                $result .= $md5[$i];
            }
            $key = substr($result, 0, 32);
        }

        // Decrypt cipher text
        return openssl_decrypt($ct, self::$cipher, $key, true, $iv);
    }
}