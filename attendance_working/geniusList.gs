function getGeniusInfo(){
  var ele = GENIUS_LIST_ELE;
  var compSheets = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(DB_COMPLETIONS);
  var geniuses =compSheets.getRange(GENIUS_INFO_RANGE).getValues();

  return geniuses;
}

function getGeniusBenchInfo (tag){
//tag="m1s1b1";
  var lastRow, lastCol,benchInfo ="";
  var compSheets = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(DB_COMPLETIONS);

  var benchTagRow = compSheets.getRange("A1:1").getValues();
  var tagCol = benchTagRow[0].indexOf(tag);

//  Logger.log(benchTagRow)
  if(tagCol >-1){
    lastRow = compSheets.getLastRow();
    //benchInfo= compSheets.getRange(2,tagCol+1,lastRow,3).getValues(); //Get 3 Columns
benchInfo= compSheets.getRange(1,tagCol+1,lastRow,2).getValues();
  }
  //else{//error}
  return benchInfo;

}
