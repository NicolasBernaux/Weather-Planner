 var monthNames = ['Janvier','Fevrier','Mars','Avril','Mai','Juin','Juillet','Aout','Septembre','Octobre','Novembre','Decembre'],
monthDays      = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
today          = new Date(),
day 		   = today.getDay(),
date 		   = today.getDate(),
year 		   = 1900+today.getYear(),
month 		   = today.getMonth(),
calendarArea   = document.querySelector('.day');




calendar();

function calendar(){

	
if(year%4==0){
	monthDays[1]=29;
}
else{
	monthDays[1]=28;
}
	var tab       = document.createElement('table');
	row           = document.createElement('tr'),
	head          = document.createElement('th'),
	firstMonthDay = new Date(year,month,01),
	firstMonthDay = firstMonthDay.getDay() == 0 ? 7 : firstMonthDay.getDay(),
	firstDay      = 1,
	active        = 1,
	currentMonth  = monthNames[month],
	lastDay		  = monthDays[month],
	date_area	  =document.querySelector('.header-calendar h2');
	date_area.innerHTML = monthNames[month] +' ' + year;
	today = new Date();
	today = [today.getMonth(),today.getDate(),1900+today.getYear()];



	for (var i = 0; i < 6; i++) { //loop for the weeks
		row = tab.insertRow(i);
		for (var j = 0; j < 7; j++) { //loop for the days 
			cell = 	row.insertCell(j);
			if(month == today[0] && firstDay == today[1] && year == today[2]){
				cell.setAttribute('class' , 'active');
			}
			if(i==0 && j+1 < firstMonthDay){
					var lastMonth = month-1 == -1 ? 11 : month-1; //for January 
					cell.setAttribute('class' , 'non-active');
					cell.innerHTML = monthDays[lastMonth]-(firstMonthDay-j-2);
			}
			else{
				if(firstDay > lastDay){
					firstDay = 1;
					active = 0;

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
	var table = calendarArea.querySelector('table');
	table.remove();
	calendar();

});


console.log(new Date().getDate());