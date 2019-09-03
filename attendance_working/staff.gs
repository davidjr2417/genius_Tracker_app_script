//Get Active User Information
function getActiveUser(){
  return Session.getActiveUser().getEmail();
}


//Get Staff Name
function getStaffName(email){
  if(email.length > 0){
    var benchSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(DB_STAFF_BENCH);
    var staffInfo = transpose(benchSheet.getRange("B1:B").getValues());
    var staffIndex = staffInfo[0].indexOf(email);
    var staff ="";

    if(staffIndex>-1){
      var col = 1; //Column For Staff Names
      staff = benchSheet.getRange(staffIndex+1, col).getValue();
    }
  }
  return staff;
}

//Get Cohort That Staff Is Over
function getStaffCohort(email){
  if(email.length > 0){
    var benchSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(DB_STAFF_BENCH);
    var staffInfo = transpose(benchSheet.getRange("B1:B").getValues());
    var staffIndex = staffInfo[0].indexOf(email);
    var location, number, cohortName,col,cohort, cohortAbbrev="";

    if(staffIndex>-1){
      col = 3; //Column For Cohort
      cohort = benchSheet.getRange(staffIndex+1, col).getValue().toLowerCase();

      if(cohort.indexOf("rich")>-1){
        location = "Richmond ";
        number = cohort.match(/\d+/g).map(Number);
        cohortName= location+number[0];


      }
      else if(cohort.indexOf("oak")>-1 || cohort.indexOf("*")>-1 ){
        location = "Oakland ";
        number = cohort.match(/\d+/g).map(Number);
        cohortName= location+number[0];
      }
      //else{//error}

    }
  }
  return [cohort, cohortName];
}

function getStaffRequest(email){
email="david@hiddengeniusproject.org"
  if(email.length > 0){
    var benchSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(DB_STAFF_BENCH);
    var staffInfo = transpose(benchSheet.getRange("B1:B").getValues());
    var staffIndex = staffInfo[0].indexOf(email);
    var col,cohort, requestType="";
    requestType = "Benchmarks";

    if(staffIndex>-1){
      col = 3; //Column For Cohort
      cohort = benchSheet.getRange(staffIndex+1, col).getValue().toLowerCase();

      if(cohort.indexOf("*")>-1)
        requestType = "Attendance"; //Request Type For Drop Down
    }
  }
  Logger.log(requestType)
  return requestType;
}

//Get First Name From A String & Proper Case
function getFirstName(name){
  var firstName = name.split(' ')[0];
  firstName = firstName[0].toUpperCase()+ firstName.substr(1);
  return firstName;
}
