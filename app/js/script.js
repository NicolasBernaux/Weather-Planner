 var monthNames = ['Janvier','Fevrier','Mars','Avril','Mai','Juin','Juillet','Aout','Septembre','Octobre','Novembre','Decembre'],
monthDays       = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
today           = new Date(),
day     		= today.getDay(),
date     		= today.getDate(),
year     		= 1900+today.getYear(),
month     		= today.getMonth(),
calendarArea    = document.querySelector('.day'),
cell_add;




calendar();

function calendar(){

	//	leap year
	if(year%4==0){
		monthDays[1]=29;
	}
	else{
		monthDays[1]=28;
	}

	var tab       		= document.createElement('table');
	row           		= document.createElement('tr'),
	head          		= document.createElement('th'),
	firstMonthDay 		= new Date(year,month,01),
	firstMonthDay 		= firstMonthDay.getDay() == 0 ? 7 : firstMonthDay.getDay(),
	firstDay      		= 1,
	active        		= 1,
	currentMonth  		= monthNames[month],
	lastDay		  		= monthDays[month],
	date_area	  		=document.querySelector('.header-calendar h2');
	date_area.innerHTML = monthNames[month] +' ' + year;
	today 				= new Date();
	today 				= [today.getMonth(),today.getDate(),1900+today.getYear()];

	for (var i = 0; i < 6; i++) { //loop for the weeks
		row = tab.insertRow(i);
		for (var j = 0; j < 7; j++) { //loop for the days 
			var local_date = new Date(year, month, firstDay);
				var storage = localStorage.getItem(local_date);
			cell = 	row.insertCell(j);
			if(month == today[0] && firstDay == today[1] && year == today[2]){ //test today 
				cell.setAttribute('class' , 'active today');
			}
			if(i==0 && j+1 < firstMonthDay){ //day of the last month in the beginning of the new month
					var lastMonth = month-1 == -1 ? 11 : month-1; //for January 
					cell.setAttribute('class' , 'non-active');
					cell.innerHTML = monthDays[lastMonth]-(firstMonthDay-j-2);
			}
			else{
				if(firstDay > lastDay){
					firstDay = 1;
					active   = 0;

				}
				var local_date = new Date(year, month, firstDay);
				var storage = localStorage.getItem(local_date);
				if(storage != null && cell.getAttribute('class') == null){//add class if contain note
					cell.setAttribute('class', 'contains-note')
				}
				cell.innerHTML = firstDay;

				if(active==0) {
					cell.setAttribute('class' , 'non-active');
				}
				firstDay ++;

			}

		}
	tab.appendChild(row);

	}

	calendarArea.appendChild(tab);
	cell_add = document.querySelectorAll('td');
	form_display();
	event_display();
	active_day();
}

create_content(JSON.parse(localStorage.getItem(today))); //display the things to do today

// Nest / previous calendar
var boutonNext = document.querySelector('.next');
var boutonPrevious = document.querySelector('.previous');

boutonNext.addEventListener('click', function(){
	if (month>10) {
		month = 0;
		year +=1;
	}
	else month +=1;
	var table = calendarArea.querySelector('table');
	table.remove();
	calendar();

});

boutonPrevious.addEventListener('click', function(){
	if (month<=0) {
		month = 11;
		year -=1;
	}
	else month -= 1;
	var table 	= calendarArea.querySelector('table');
	table.remove();
	calendar();
});




/* LOCAL STORAGE */

// localStorage.clear();


var click_day,
	click_date,
	add_in_list	   = document.querySelector('.add-in-list'),
	quit		   = document.querySelector('.quit'),
	submit		   = document.querySelector('.submit-add');

 //On double click on a date diplay block the form

function form_display(){
  for (var i = 0; i < cell_add.length; i++) {
    cell_add[i].addEventListener('dblclick', function(){
      click_day   = this.innerHTML;
      click_date  = new Date(year,month,click_day);
      add_in_list.style.display = 'block';
    });

  }	
}	

//close the form
quit.addEventListener('click', function(){ 
      add_in_list.style.display = 'none';
});

//On submit add in local storage
submit.addEventListener('click', function(e){
	var newStorage = [[document.querySelector('#hour').value , document.querySelector('#what').value]];
	click_date = new Date(year,month,click_day); //init date for local storage
	var lastStorage = JSON.parse(localStorage.getItem(click_date));
	newStorage = lastStorage != null ? lastStorage.concat(newStorage) : newStorage; //concat the last storage with the new one 
	newStorage = JSON.stringify(newStorage);
	localStorage.setItem(click_date, newStorage); //add in local storage
	e.preventDefault()
	var table 	= calendarArea.querySelector('table');
	table.remove();
	add_in_list.style.display = 'none';
	// window.location.reload();
	calendar();
});



var	titleToDo 	   = document.createElement('h2'),
	noteArea 	   = document.createElement('div'),
	noteDiv		   = document.querySelector('.note');


//Display the content 
function event_display(){
  for (var i = 0; i < cell_add.length; i++) {
    cell_add[i].addEventListener('click', function(){
		click_day   = this.innerHTML;
		click_date  		 = new Date(year,month, click_day);
		var local_storage = JSON.parse(localStorage.getItem(click_date));
	    
	    create_content(local_storage);
    });
  }
}

function create_content(local_storage){// Create the content
	var titleToDo         = document.createElement('h2'),
	noteArea          = document.createElement('div'),
	noteDiv           = document.querySelector('.note');
    noteDiv.innerText 	 = ''; //remove last list
    titleToDo.innerText  = 'What to do today ?'; // title section
    if (local_storage != null) {
        short(local_storage);
        for(var i = 0; i<local_storage.length; i++) {
            noteCreate 	   = document.createElement('div'),
            dateCreate     = document.createElement('p'),
            contentCreate  = document.createElement('p'),
            dateCreate.innerText = local_storage[i][0];
            contentCreate.innerText = local_storage[i][1];
            noteDiv.appendChild(titleToDo);
            noteCreate.appendChild(dateCreate);
            noteCreate.appendChild(contentCreate);
            noteArea.appendChild(noteCreate);
          }
    }
    else {
		var text  = document.createElement('p');
		text.innerText = "Nothing plan for this day";
      	noteArea.appendChild(text);
    }
    noteDiv.append(noteArea)
}


//short the localstorage
function short(tab){
	for (var i = 0; i < tab.length; i++) {
		var temp = tab[i];
		var j = i-1;
		while( j>=0 && tab[j][0] > temp[0]){
			tab[j+1] = tab[j];
			j--;
		}
		tab[j+1] =temp 

	};
}




//Select a day
function active_day(){
  for (var i = 0; i < cell_add.length; i++) {
    cell_add[i].addEventListener('click', function(){
      var activeDay = document.querySelector('.active');
      if(activeDay != undefined){
	      activeDay.classList.remove("active");
	  	}
	      this.classList.add('active')

    });
  }
}

// localStorage.clear();

	/*TUTO*/

var close_tuto	= document.querySelector('.close-tuto'),
	tuto	= document.querySelector('.tuto-div'),
	tuto_open	= document.querySelector('.tuto');

if (localStorage.length != 0) {
      tuto.style.display = 'none';

}

close_tuto.addEventListener('click', function(){ 
      tuto.style.display = 'none';
});	

tuto_open.addEventListener('click', function(){ 
      tuto.style.display = 'block';
});





/*  WEATHER  */

var weather = {};
var lat = false;
var long = false;

function position(position){
	lat = position.coords.latitude;
	long = position.coords.longitude;
	api();
}

function api(){
		var url = !lat ? './weather-api.php' : './weather-api.php?lat='+lat+'&long='+long;
		console.log(url);
	if(self.fetch){
		fetch(url)
		.then(function(response){
			return response.json();

		})
		.then(function(result){
			weather.result = result;
			weather_display();
		});
	}
	else {
	console.log('non supporté');
	}

console.log(weather.result);
	
		
}

function weather_display(){
	var city = document.querySelector('.city');
	var temperature = document.querySelector('.temperature');
	var img_weather = document.querySelector('.img-weather');
	var description = weather.result.description;
	description = description.replace(' ','-');
	city.innerText = weather.result.city;
	temperature.innerText = parseInt(weather.result.temperature)+'°C';
	img_weather.classList.add(description);
	console.log(description);
}

localisation()

function localisation(){
	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(position, api);
	}
}
