<?php
/**
 * Created by PhpStorm.
 * User: danie
 * Date: 28/03/2018
 * Time: 15:05
 */
function getUrl($url){
    $locale = \App::getLocale();
    return  url($locale."/".$url);
}