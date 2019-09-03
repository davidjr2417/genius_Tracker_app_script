//Initial Data For Site
function initDropDownValues(val){
//val =[0,[ "all","All"]];


  var arrDD=[];
  var combinedDDArrs=[];
  var arrItem =[];
  var geniusArr =[];
  var benchRow,cohort,submit,request,benchTag="";
  var obj ={};

  var activeStaffMember = getActiveUser();
  var staffName = getStaffName(activeStaffMember);
  var firstName = getFirstName(staffName);
  cohort = getStaffCohort(activeStaffMember);
  request = getStaffRequest(activeStaffMember);
  submit = "Submit";

  //On Cohort Toggle
  if(val[0]==0){
     cohort=val[1];
  }
  arrDD.push(staffName);
  arrDD.push(cohort);
  arrDD.push(request);
  //Submit/Request Drop down Improve later
  arrDD.push(submit);

  //On Cohort Toggle To All
  if(cohort[0]=="all"){
    benchTag="m1s1b1";
  }else{
    benchTag = getBenchMark(cohort[0]);
  }

   benchRow = getBenchMarkRow(benchTag);
  arrDD.push(benchRow[0]);
  arrDD.push(benchRow[1]);
  arrDD.push(benchRow[2]);
  arrDD.push(benchRow[3]);
//  arrDD.push(cohort[0]);

  //*** Update Items To Only Select Checked Benchmarks In Staff Bench ***//
  arrItem=dropwDownItems();
//  arrItem.push(["cohort-info"]);

  geniusArr.push(getGeniusInfo());
  geniusArr.push(getGeniusBenchInfo(benchTag));

  obj.DDhtml = arrDD;
  obj.DDvals = arrItem;
  obj.geniusVals = geniusArr;
//  combinedDDArrs.push(arrItem);
//  combinedDDArrs.push(geniusArr);
//  Logger.log("___________________________________" );
//  Logger.log(arrDD);
//  Logger.log(arrItem);
  Logger.log("___________________________________" );
  Logger.log("Initialize Drop Down Array Below:" );
  Logger.log(obj["DDhtml"] );
  Logger.log("***********************************" );
  Logger.log(obj["DDvals"]);
  Logger.log("***********************************" );
  Logger.log( obj["geniusVals"]);
  Logger.log("___________________________________" );

  return obj;

}


function dropDownOnChange(val){
//val =[1,["module","Mod2: HTML"]]
Logger.log(val)
  var arrDD=[];
  var combinedDDArrs=[];
  var arrItem =[];
  var geniusArr =[];
  var benchRow,cohort,submit,request,benchTag="";
  var obj ={};

  arrDD.push("");
  arrDD.push("");
  arrDD.push("");
  arrDD.push("");

  benchTag = getBenchFromMod(val[1]);
  benchRow = getBenchMarkRow(benchTag);
  arrDD.push(benchRow[0]);
  arrDD.push(benchRow[1]);
  arrDD.push(benchRow[2]);
  arrDD.push(benchRow[3]);
//  arrDD.push(cohort[0]);

  //*** Update Items To Only Select Checked Benchmarks In Staff Bench ***//
  arrItem=dropwDownItems();
//  arrItem.push(["cohort-info"]);

  geniusArr.push(getGeniusInfo());
  geniusArr.push(getGeniusBenchInfo(benchTag));

  obj.DDhtml = arrDD;
  obj.DDvals = arrItem;
  obj.geniusVals = geniusArr;
//  combinedDDArrs.push(arrItem);
//  combinedDDArrs.push(geniusArr);
//  Logger.log("___________________________________" );
//  Logger.log(arrDD);
//  Logger.log(arrItem);
  Logger.log("___________________________________" );
  Logger.log("Initialize Drop Down Array Below:" );
  Logger.log(obj["DDhtml"] );
  Logger.log("***********************************" );
  Logger.log(obj["DDvals"]);
  Logger.log("***********************************" );
  Logger.log( obj["geniusVals"]);
  Logger.log("___________________________________" );

  return obj;

}












function dropwDownItems(){
  var dataArr=[];
  var dataCol=[];
  var data="";

  //Get Data From Spreadsheet (db_questions)
  var maxRow =SpreadsheetApp.getActiveSpreadsheet().getSheetByName(DB_QUESTIONS).getLastRow();
  var maxCol =SpreadsheetApp.getActiveSpreadsheet().getSheetByName(DB_QUESTIONS).getLastColumn();
   dataArr.push(["user-info"]);
 //Put All Data Into A Column Based Array
  for(var i=0; i< maxCol; i++){
     var range = [1,i+1,maxRow];
     data=SpreadsheetApp.getActiveSpreadsheet().getSheetByName(DB_QUESTIONS).getRange(range[0],range[1],range[2]).getValues();

     dataCol=[];
     for(var j=0; j<data.length; j++){
       dataCol.push(data[j].pop());
     }

     dataArr.push(dataCol);

  }
  return dataArr;
}


function submitBenchMarks(geniusData){
//return geniusData;
  var benchArr = geniusData[0];
   var masterArr= geniusData[1];
  var compSheets = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(DB_COMPLETIONS);
  var benchTagRow = compSheets.getRange("A1:1").getValues();
  var tagExists = benchTagRow[0].indexOf(benchArr);
  if(tagExists>=0){
    //update
    updateGeniusData(tagExists+1,masterArr);
  }else{
    //add
//    addNewBench(tagExists+1,masterArr)
  }
  return true;
}





function updateGeniusData(col, geniusArr){
  var indGeniusArr=[];
  var genName="";
  var genArr=[];


  for(var i=0;i<geniusArr.length;i++){

    indGeniusArr=[];
    genArr=[];
    genName="";
    indGeniusArr=geniusArr[i][0].split(" ");
    //First Name
    genArr.push(indGeniusArr[0]);

    //Generate Last Name
    for(var j=1; j<indGeniusArr.length;j++){
      if(j==indGeniusArr.length-1){
        genName+=indGeniusArr[j];
      }else{
        genName+=indGeniusArr[j]+" ";
      }
    }
    genArr.push(genName);//Last Name
    genArr.push(geniusArr[i][1]); //COHORT

      var row = findGenius(genArr);
      addContent(row,col,geniusArr[i]);
    }


}
function findGenius(genArr){
 var compSheets = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(DB_COMPLETIONS);
  var geniusInfoRange = compSheets.getRange("A3:C").getValues();


 var row=0;
  for(var i=0;i<geniusInfoRange.length;i++){
        var one = geniusInfoRange[i][0].toLowerCase()==genArr[0].toLowerCase();
        var two = geniusInfoRange[i][1].toLowerCase()==genArr[1].toLowerCase();
        var three = geniusInfoRange[i][2].toLowerCase()==genArr[2].toLowerCase();
   Logger.log("1."+one);
   Logger.log("2."+two);
   Logger.log("3."+three +" "+genArr[2]+" "+geniusInfoRange[i][2]);
    if(one && two && three){

       row =i+3
      break;
    }





  }


return row;
}




function addContent(row, col,geniusIndArr){
var compSheets = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(DB_COMPLETIONS);
 compSheets.getRange(row, col,1,2).setValues([[geniusIndArr[2],geniusIndArr[3]]]);

 }
