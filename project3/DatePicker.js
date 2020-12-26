function DatePicker(id, callBackFunc) {
  this.id=id;
 
  this.callBackFunc=callBackFunc;


  var containerClassName="container";
  var containerDiv=document.createElement("DIV");
  containerDiv.classList.add(containerClassName);
  document.getElementById(id).appendChild(containerDiv);

  this.containerDiv=containerDiv;
}


DatePicker.prototype.render=function(date) {
  var i,j;

  var num2weekday=["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  var num2month=["January","Febuary","March","April","May","June","July","August","September","October","November","December"];


  function MyDate(date) {
    this.year=date.getFullYear();
    this.month=date.getMonth()+1;
    this.day=date.getDate();
    this.weekday=date.getDay()%7;
    this.isCurrentMonth=true;
  }

  MyDate.prototype.toString= function() {
    return this.month+"/"+this.day+"/"+this.year;

  };
/// aaaaaaa

  function getMonthDays(thisDate) {
    var startingDateStr=thisDate.month+"/1/"+thisDate.year;
    var dayOfMonth = new Date(startingDateStr);
    var dateStartingPoint= new Date(startingDateStr);
    var iterDate;
    dateStartingPoint.setDate(dateStartingPoint.getDate()-dateStartingPoint.getDay());

    var arrayOfDates=[];
    dayOfMonth=dateStartingPoint;

    for (var ii=0;ii<42;ii++) {
      iterDate=new MyDate(dayOfMonth);
      if (dayOfMonth.getMonth()!=thisDate.month-1) {
        iterDate.isCurrentMonth=false;
      }
      arrayOfDates.push(iterDate);
      dayOfMonth.setDate(dayOfMonth.getDate()+1);
    }
    return arrangeDates(arrayOfDates);
  }

  function getMonthYear(thisDate) {
    return num2month[thisDate.month-1].toUpperCase()+" "+thisDate.year;
  }


  function arrangeDates(arrayOfDates) {
    var arrayOfWeeks=[];
    var oneWeek=[];
    for (i=0;i<arrayOfDates.length;i++) {
      var thisDay=arrayOfDates[i];
      oneWeek.push(thisDay);
      if (thisDay.weekday==6) {
        arrayOfWeeks.push(oneWeek);
        oneWeek=[];
      }
    }
    return arrayOfWeeks.slice(0,6);
  }

  function changeMonth(previousDate,amount) {
    var newDate=previousDate;
    if (amount===1) {
      // increase by 1
      if (newDate.month==12) {
        newDate.year=newDate.year+1;
        newDate.month=1;
      } else {
        newDate.month=newDate.month+1;
      }
    } else {
      // decrease by 1
      if (newDate.month==1) {
        newDate.year=newDate.year-1;
        newDate.month=12;
      } else {
        newDate.month=newDate.month-1;
      }
    }
    

    return newDate;
  }

  var self=this;
  var id=this.id;
  var datepickerDiv=document.getElementById(id);
  var myDate=new MyDate(date);


 
  var containerDiv=this.containerDiv;



  var headerBarClassName="headerBar";
  var headerBarDiv=document.createElement("DIV");
  headerBarDiv.classList.add(headerBarClassName);
  containerDiv.appendChild(headerBarDiv);




  var monthButtomClassName="monthButtom";
  var prevMonthDiv= document.createElement("DIV");
  prevMonthDiv.classList.add(monthButtomClassName);
  prevMonthDiv.innerHTML="<";
  headerBarDiv.appendChild(prevMonthDiv);

  
  var aDate=new MyDate(new Date());
  aDate.year=myDate.year;
  aDate.month=myDate.month;
  aDate.day=myDate.day;

  (function(someDate) {
    prevMonthDiv.addEventListener("click", function() {
      containerDiv.innerHTML="";
      var newDate=changeMonth(someDate,-1);
      
      self.render(new Date(newDate.toString()));
    },false);
  })(aDate);

  //
  var monthYearBarClassName="monthYearBar";
  var monthYearBarDiv=document.createElement("DIV");
  monthYearBarDiv.classList.add(monthYearBarClassName);
  monthYearBarDiv.innerHTML=getMonthYear(myDate);
  headerBarDiv.appendChild(monthYearBarDiv);



  var nextMonthDiv= document.createElement("DIV");
  nextMonthDiv.classList.add(monthButtomClassName);
  nextMonthDiv.innerHTML=">";
  headerBarDiv.appendChild(nextMonthDiv);

  (function(someDate) {
    nextMonthDiv.addEventListener("click", function() {
      containerDiv.innerHTML="";
      var newDate=changeMonth(someDate,+1);
      newDate.day = aDate.day;
      self.render(new Date(newDate.toString()));
    },false);
  })(aDate);



  // 
  var weekdayBarClassName="weekdayBar";
  var weekdayBarDiv=document.createElement("DIV");
  weekdayBarDiv.classList.add(weekdayBarClassName);
  containerDiv.appendChild(weekdayBarDiv);


  //
  var paddingBarClassName="paddingBar";
  var paddingBarDiv=document.createElement("DIV");
  paddingBarDiv.classList.add(paddingBarClassName);
  containerDiv.appendChild(paddingBarDiv);

  // 
  var weekdaysContainerClassName="weekdaysContainer";
  var weekdaysContainerDiv=document.createElement("DIV");
  weekdaysContainerDiv.classList.add(weekdaysContainerClassName);
  containerDiv.appendChild(weekdaysContainerDiv);

  // 
  var weekdayNamesClassName="weekdayNames";
  var weekdayNamesDiv;
  for (i = 0;i<7;i++) {
    weekdayNamesDiv=document.createElement("DIV");
    weekdayNamesDiv.innerHTML=num2weekday[i];
    weekdayNamesDiv.classList.add(weekdayNamesClassName);
    weekdayBarDiv.appendChild(weekdayNamesDiv);
  }

  // 

  var thisMonthDates=getMonthDays(myDate);
  var weekRowDiv;
  var daysInAMonthDiv;
  var weekRowClassName="weekRow";
  var daysInAMonthClassName="daysInAMonth";
  var daysNotInAMonthClassName="daysNotInAMonth";
  var oneDayClassName="oneDay";
  var selectedClassName="selected";
  var floatDirection;
  for (i=0;i<thisMonthDates.length;i++) {
    if (i===0 || thisMonthDates[i][0].isCurrentMonth) {
      floatDirection="left";
      weekRowDiv=document.createElement("DIV");
      weekRowDiv.classList.add(weekRowClassName);
      weekdaysContainerDiv.appendChild(weekRowDiv);

      var oneWeekDays=thisMonthDates[i];
      for (j=0;j<oneWeekDays.length;j++) {
        daysInAMonthDiv=document.createElement("DIV");

        daysInAMonthDiv.innerHTML=oneWeekDays[j].day;
        daysInAMonthDiv.style.float=floatDirection;
        weekRowDiv.appendChild(daysInAMonthDiv);
        daysInAMonthDiv.classList.add(oneDayClassName);
        if (oneWeekDays[j].isCurrentMonth) {
      
          if (id === 'datepicker1' && aDate.day === oneWeekDays[j].day && aDate.month === 12 && aDate.year ===2020 ) {
            console.log('Today: '+ oneWeekDays[i].month +'/'+ oneWeekDays[j].day +'/'+ aDate.year);
            daysInAMonthDiv.classList.add("today");
          } else if(id === 'datepicker2' && aDate.day === oneWeekDays[j].day && aDate.month === 1 && aDate.year ===2009) {
            console.log('Today: '+ oneWeekDays[i].month +'/'+ oneWeekDays[j].day +'/'+ aDate.year);
            daysInAMonthDiv.classList.add("today");

          } else daysInAMonthDiv.classList.add(daysInAMonthClassName);
          
          daysInAMonthDiv.classList.add(daysInAMonthClassName);
          var selectedDate=oneWeekDays[j];
          (function(selectedDate,daysInAMonthDiv) {
            daysInAMonthDiv.addEventListener("click",function() {
              //

              var arrOfAllDates=document.getElementById(self.id).getElementsByClassName(daysInAMonthClassName);
              var currentClassList;
              for (var jj=0;jj<arrOfAllDates.length;jj++) {
                arrOfAllDates[jj].classList.remove(selectedClassName);
              }

              daysInAMonthDiv.classList.add(selectedClassName);
              // 
              self.callBackFunc(self.id,selectedDate);
            },false);
          })(selectedDate,daysInAMonthDiv);
          //
        } else {
          daysInAMonthDiv.classList.add(daysNotInAMonthClassName);

        }
      }
    }

  }
};