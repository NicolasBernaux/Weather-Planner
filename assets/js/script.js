function calendar(){monthDays[1]=year%4==0?29:28;var e=document.createElement("table");row=document.createElement("tr"),head=document.createElement("th"),firstMonthDay=new Date(year,month,1),firstMonthDay=0==firstMonthDay.getDay()?7:firstMonthDay.getDay(),firstDay=1,active=1,currentMonth=monthNames[month],lastDay=monthDays[month],date_area=document.querySelector(".header-calendar h2"),date_area.innerHTML=monthNames[month]+" "+year,today=new Date,today=[today.getMonth(),today.getDate(),1900+today.getYear()];for(var t=0;t<6;t++){row=e.insertRow(t);for(var a=0;a<7;a++){var n=new Date(year,month,firstDay);localStorage.getItem(n);if(cell=row.insertCell(a),month==today[0]&&firstDay==today[1]&&year==today[2]&&cell.setAttribute("class","active today"),0==t&&a+1<firstMonthDay){var r=month-1==-1?11:month-1;cell.setAttribute("class","non-active"),cell.innerHTML=monthDays[r]-(firstMonthDay-a-2)}else{firstDay>lastDay&&(firstDay=1,active=0);var n=new Date(year,month,firstDay);null!=localStorage.getItem(n)&&null==cell.getAttribute("class")&&cell.setAttribute("class","contains-note"),cell.innerHTML=firstDay,0==active&&cell.setAttribute("class","non-active"),firstDay++}}e.appendChild(row)}calendarArea.appendChild(e)}function short(e){for(var t=0;t<e.length;t++){for(var a=e[t],n=t-1;n>=0&&e[n][0]>a[0];)e[n+1]=e[n],n--;e[n+1]=a}}var monthNames=["Janvier","Fevrier","Mars","Avril","Mai","Juin","Juillet","Aout","Septembre","Octobre","Novembre","Decembre"],monthDays=[31,28,31,30,31,30,31,31,30,31,30,31],today=new Date,day=today.getDay(),date=today.getDate(),year=1900+today.getYear(),month=today.getMonth(),calendarArea=document.querySelector(".day");calendar();var boutonNext=document.querySelector(".next"),boutonPrevious=document.querySelector(".previous");boutonNext.addEventListener("click",function(){month>10?(month=0,year+=1):month+=1,calendarArea.querySelector("table").remove(),calendar()}),boutonPrevious.addEventListener("click",function(){month<=0?(month=11,year-=1):month-=1,calendarArea.querySelector("table").remove(),calendar()});for(var click_day,click_date,cell_add=document.querySelectorAll("td"),add_in_list=document.querySelector(".add-in-list"),quit=document.querySelector(".quit"),submit=document.querySelector(".submit-add"),i=0;i<cell_add.length;i++)cell_add[i].addEventListener("dblclick",function(){click_day=this.innerHTML,click_date=new Date(year,month,click_day),add_in_list.style.display="block"});quit.addEventListener("click",function(){add_in_list.style.display="none"}),submit.addEventListener("click",function(e){var t=[[document.querySelector("#hour").value,document.querySelector("#what").value]];click_date=new Date(year,month,click_day);var a=JSON.parse(localStorage.getItem(click_date));t=null!=a?a.concat(t):t,t=JSON.stringify(t),localStorage.setItem(click_date,t),e.preventDefault(),window.location.reload()});for(var titleToDo=document.createElement("h2"),noteArea=document.createElement("div"),noteCreate=document.createElement("div"),dateCreate=document.createElement("p"),contentCreate=document.createElement("p"),noteDiv=document.querySelector(".note"),i=0;i<cell_add.length;i++)cell_add[i].addEventListener("click",function(){click_day=this.innerHTML,click_date=new Date(year,month,click_day);var e=JSON.parse(localStorage.getItem(click_date));if(noteDiv.innerHTML="",titleToDo.innerText="What to do today ?",null!=e){short(e);for(var t=0;t<e.length;t++)noteCreate=document.createElement("div"),dateCreate=document.createElement("p"),contentCreate=document.createElement("p"),dateCreate.innerText=e[t][0],contentCreate.innerText=e[t][1],noteDiv.appendChild(titleToDo),noteCreate.appendChild(dateCreate),noteCreate.appendChild(contentCreate),noteArea.appendChild(noteCreate);noteDiv.append(noteArea)}});for(var i=0;i<cell_add.length;i++)cell_add[i].addEventListener("click",function(){document.querySelector(".active").classList.remove("active"),this.classList.add("active")});