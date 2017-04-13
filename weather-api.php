<?php 

if(!empty($_GET['lat']) && !empty($_GET['long'])) {
	$lat = $_GET['lat'];
	$long = $_GET['long'];
	$city = file_get_contents('https://maps.googleapis.com/maps/api/geocode/json?latlng='.$lat.','.$long.'&result_type=locality&key=AIzaSyDAvqfRFUs0l8X3DJgH5T9HXoyQA82dPqs');

	$city = json_decode($city);

	$city = $city->results[0]->address_components[0]->long_name;
}
else
{
	$city = 'Paris';
}


$weather = file_get_contents('http://api.openweathermap.org/data/2.5/forecast?q='.$city.'&units=metric&APPID=fef802547bc32a48742d0bb95672f6b2');

$weather = json_decode($weather);

$temperature = $weather->list[0]->main->temp;
$description = $weather->list[0]->weather[0]->description;



$result = [
'city' => $city,
'temperature' => $temperature,
'description' => $description,
];

$result = JSON_encode($result);

die($result);