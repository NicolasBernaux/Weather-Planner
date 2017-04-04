 var monthNames = ['Janvier','Fevrier','Mars','Avril','Mai','Juin','Juillet','Aout','Septembre','Octobre','Novembre','Decembre'],
monthDays       = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
today           = new Date(),
day     		= today.getDay(),
date     		= today.getDate(),
year     		= 1900+today.getYear(),
month     		= today.getMonth(),
calendarArea    = document.querySelector('.day');




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
			cell = 	row.insertCell(j);
			if(month == today[0] && firstDay == today[1] && year == today[2]){ //test today 
				cell.setAttribute('class' , 'active');
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
				if(storage != null){
					cell.setAttribute('class', 'contains-note')
					// console.log('hello');
				}
				cell.innerHTML = firstDay;
				firstDay ++;

				if(active==0) {
					cell.setAttribute('class' , 'non-active');
				}
			}
		}
	tab.appendChild(row);

	}

	calendarArea.appendChild(tab);
}




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
	cell_add 	   = document.querySelectorAll('td'),
	titleToDo 	   = document.createElement('h2'),
	noteCreate 	   = document.createElement('div'),
	dateCreate     = document.createElement('p'),
	contentCreate  = document.createElement('p'),
	noteDiv		   = document.querySelector('.note'),
	add_in_list	   = document.querySelector('.add-in-list'),
	quit		   = document.querySelector('.quit'),
	submit		   = document.querySelector('.submit-add');
	console.log(submit);



 //On double click on a date diplay block the form
for (var i = 0; i < cell_add.length; i++) {
	cell_add[i].addEventListener('dblclick', function(){
		click_day   = this.innerHTML;
		click_date  = new Date(year,month,click_day);
		add_in_list.style.display = 'block';
	});

}	

//close the form
quit.addEventListener('click', function(){ 
	add_in_list.style.display = 'none';
});

//On submit add in local storage
submit.addEventListener('click', function(e){
	var tabStorage = {
	'hour' : document.querySelector('#hour').value,
	'text' : document.querySelector('#what').value
};
	tabStorage = JSON.stringify(tabStorage);
	click_date = new Date(year,month,click_day); //init date for local storage
	if(JSON.parse(localStorage.getItem(click_date)) == null){
		localStorage.setItem(click_date, tabStorage); //add in local storage
		e.preventDefault()
		window.location.reload();
	}
	else{
		console.log('already one');
	}
});



//Display the content 
for (var i = 0; i < cell_add.length; i++) { //
	cell_add[i].addEventListener('click', function(){
		click_day   = this.innerHTML;
		click_date  		 = new Date(year,month, click_day);
		var local_storage 	 = JSON.parse(localStorage.getItem(click_date));

		noteDiv.innerHTML 	 = ''; //remove last list
		titleToDo.innerText  = 'What to do today ?'; // title section

	//Create the content
		dateCreate.innerText = local_storage.hour;
		contentCreate.innerText = local_storage.text;
		noteDiv.appendChild(titleToDo);
		noteCreate.appendChild(dateCreate);
		noteCreate.appendChild(contentCreate);
		noteDiv.appendChild(noteCreate);
	});
}






// localStorage.clear();
