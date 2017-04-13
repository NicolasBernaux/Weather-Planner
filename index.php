<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no">
    <title>Planner</title>
    <link rel="stylesheet" href="assets/css/main.css">
</head>
<body>
   
   <div class="panel">
       <div class="left-part">
            <div class="header-calendar">
                <button class="previous">◄</button>
                <h2>April 2017</h2>
                <button class="next">►</button>
            </div>
            <div class="calendar">
                <div class="calendar-area">
                    <table>
                        <tr>
                         <th>MON</th>
                         <th>TUE</th>
                         <th>WED</th>
                         <th>THU</th>
                         <th>FRI</th>
                         <th class="text-blue">SAT</th>
                         <th class="text-blue">SUN</th>
                       </tr>
                    </table>  
                    <div class="day"></div>
                    <div class="bouton"></div>
                </div>
            </div>
        </div>
        <div class="right-part">
            <div class="weather">
                <div class="text">
                    <div class="temperature">12°c</div>
                    <div class="city">Paris</div>
                </div>
                <div class="img-weather"></div>
            </div>
            <div class="note">
            </div>
        </div>
    </div>
    <a href="https://www.behance.net/lorenekien0885" class="lorene" target="blank">Designed by Lorène Kieny</a>
    <div class="tuto">?</div>
    <div class="tuto-div">
    	<div class="tuto-content">
	    	<h3>How does it work</h3>
	    	<p>Double click on a date to add an event</p>
	    	<p>Simple click to explore the calendar</p>
	    	<a href="#" class="close-tuto">Close</a>
    	</div>
    </div>	
    <div class="add-in-list">
        <form action="#">
            <div>
                <label for="hour">Time:   </label><input type="time" value="00:00" id="hour">
            </div>
            <div>
                <label for="what">What:   </label><input type="text" placeholder="Feed the neighbor's cat" id="what">
            </div>
            <div>
                <input type="submit" class="submit-add">
            </div>
            <div class="quit">X</div>
        </form>
    </div>

    <script src="assets/js/script.js"></script>
</body>
</html>