//Get 1st Row in staff bench
function getBenchMark(cohort){
//  staffMember="David Malone";
  var staff_bench = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(DB_STAFF_BENCH);
  var headerRow = staff_bench.getRange("A1:1").getValues();
  var lastRow = staff_bench.getLastRow();
  var col = headerRow[0].indexOf(cohort);
  var row,benchCol,benchTag,transposedCol="";

  if(col>-1){
    benchCol = staff_bench.getRange(1,col+1,lastRow).getValues();
    transposedCol = transpose(benchCol);
    row = transposedCol[0].indexOf(true);
    if(row>-1)
      benchTag = staff_bench.getRange(row+1,col+2).getValue(); //Get Tag Column (+2)
  }
  return benchTag;
}



function getBenchMarkRow(tag, tagColHeader){
  //tag="m1s1b5";
//  var newTag = tag;
//  var finalTag ="";
//  if(newTag!="all"){
//    newTag="m1s1b5";
//  }
  Logger.log(tag);
 var tagCol="";
  var questions_sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(DB_QUESTIONS);
  var headerRow = questions_sheet.getRange("A1:1").getValues();
//  if(tagColHeaader.length !=0){
//  tagCol= tagColHeader;
//  }else{
   tagCol = headerRow[0].indexOf(TAGCOLHEADER);
//  }


  var modCol = headerRow[0].indexOf(MODULECOLHEADER);
  var lastRow = questions_sheet.getLastRow();
  var benchRow="";
  if(tagCol>-1 && modCol >-1){
    var benchVals = questions_sheet.getRange(1,tagCol+1,lastRow).getValues();
    var transposedBench = transpose(benchVals);
    var row = transposedBench[0].indexOf(tag)

    if(row>-1){
      benchRow=questions_sheet.getRange(row+1,modCol+1,1,(tagCol-modCol+1)).getValues();
    }
  }

  return benchRow[0];
}

function getBenchFromMod(modInfo){
  var benchRow="";
//  modInfo = ["bench","BM5: test5","Sec3: Web","Mod1: Web Design"];
//Logger.log(modInfo)
  var questions_sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(DB_QUESTIONS);
  var lastRow = questions_sheet.getLastRow();
  var headerRow = questions_sheet.getRange("A1:1").getValues();
  var tagCol = headerRow[0].indexOf(TAGCOLHEADER);


  var moduleCol,moduleRow,sectionRow,benchValsRow ="";
//  Logger.log(modInfo[0])
  if(modInfo[0]=="section"){
    var modCol = headerRow[0].indexOf("module");
  var secCol = headerRow[0].indexOf(modInfo[0]);

        Logger.log(modCol)
        if(modCol>-1 && secCol>-1 ){
         var modColData = questions_sheet.getRange(1,modCol+1,lastRow).getValues();
        var transposedBench = transpose(modColData);


      moduleRow = transposedBench[0].indexOf(modInfo[2]);
        Logger.log(moduleRow)
       if(moduleRow>-1){

       var sectionColVals = questions_sheet.getRange(moduleRow+1,secCol+1,lastRow).getValues();
       var transposedBench2 = transpose(sectionColVals);
       Logger.log(sectionColVals)
       sectionRow = transposedBench2[0].indexOf(modInfo[1]);
      Logger.log(sectionRow)
      if(sectionRow>-1){
        Logger.log(sectionRow)

          benchRow=questions_sheet.getRange((moduleRow+sectionRow+1),tagCol+1).getValue();
          Logger.log(benchRow)
      }
      }

    }



        }else  if(modInfo[0]=="bench"){
        var modCol = headerRow[0].indexOf("module");
  var secCol = headerRow[0].indexOf("section");
  var benCol = headerRow[0].indexOf(modInfo[0]);
        Logger.log(modCol)
        if(modCol>-1 && secCol>-1  && benCol >-1){
         var modColData = questions_sheet.getRange(1,modCol+1,lastRow).getValues();
        var transposedBench = transpose(modColData);


      moduleRow = transposedBench[0].indexOf(modInfo[3]);
        Logger.log(moduleRow)
       if(moduleRow>-1){

       var sectionColVals = questions_sheet.getRange(moduleRow+1,secCol+1,lastRow).getValues();
       var transposedBench2 = transpose(sectionColVals);

       sectionRow = transposedBench2[0].indexOf(modInfo[2]);

      if(sectionRow>-1){

         var benchColVals = questions_sheet.getRange(sectionRow+1,benCol+1,lastRow).getValues();
       var transposedBench3 = transpose(benchColVals);
       Logger.log(benchColVals)
       benchValsRow = transposedBench3[0].indexOf(modInfo[1]);
      Logger.log(benchValsRow)
      if(benchValsRow>-1){
          benchRow=questions_sheet.getRange((moduleRow+sectionRow+benchValsRow),tagCol+1).getValue();
          Logger.log(benchRow)
          }
      }
      }

    }



        }





   else{

      var modCol = headerRow[0].indexOf(modInfo[0]);

  if( modCol >-1){
   var modCol = headerRow[0].indexOf(modInfo[0]);
    var benchVals = questions_sheet.getRange(1,modCol+1,lastRow).getValues();
    var transposedBench = transpose(benchVals);
    var row = transposedBench[0].indexOf(modInfo[1])
    Logger.log(row)
    if(row>-1){
      benchRow=questions_sheet.getRange(row+1,tagCol+1).getValue();
    }
  }
  }
  Logger.log(benchRow)
  return benchRow;
 }
