function copySheet(id,sheetName){
 
  try{
  
  var spread = SpreadsheetApp.getActive();
  var spreadTemp = SpreadsheetApp.openById(id)
  var sheet = spreadTemp.getSheetByName(sheetName);
  sheet.copyTo(spread).setName(sheetName);
  SpreadsheetApp.flush();
  }catch(e){
    var link = HtmlService.createHtmlOutputFromFile('ErrorNotRegister').setSandboxMode(HtmlService.SandboxMode.IFRAME)
      .setWidth(400)
      .setHeight(150); 
    SpreadsheetApp.getUi().showModalDialog(link, "Announcements");
  }
}

function deleteData(sheet){
  
  var r = sheet.getLastRow();
  var range = sheet.getRange('A2:J'+r);
  range.clearContent();
}
function addLinkChartPie(str,t,e,d,p){
 var url = ScriptApp.getService().getUrl();
 var strUrl = url+'?t='+t+'&e='+e+'&d='+d+'&p='+p+'&str='+str; 
 var value ='=hyperlink("' + strUrl + '";"' + str + '")'; 
return value;
 
}

function readRows(sheetName){
 // sheetName = 'List All Users';
  var spread = SpreadsheetApp.getActive();
  var sheet = spread.getSheetByName(sheetName);
  var data = sheet.getDataRange();
   return data.getValues();

}
function setRowColor(rowcount,sheetName,colors1,colors2){
//  rowcount = 5;
//  sheetName = 'List All Users';
  var spread = SpreadsheetApp.getActive();
  var sheet = spread.getSheetByName(sheetName);
// var colors1 = 
   [["red", "red", "red"]];
//  var colors2 = 
   [["red", "red"]];
  var RName1 = 'A'+rowcount+':C'+rowcount;
  var RName2 = 'H'+rowcount+':I'+rowcount;
  Logger.log(RName1);
 var cell1 = sheet.getRange(RName1);
 var cell2 = sheet.getRange(RName2);
  //Logger.log(cell1.getValues());
 cell1.setBackgrounds(colors1);
 cell2.setBackgrounds(colors2);
}

function checkRow(email){
  var sheetName = 'Manager storage for users';
  var data = readRows(sheetName);
  var to = 'danhtuan@edu.gimasys.com';
  var cc = 'thlong@gimasys.com';
  
  Logger.log(data);
  for(i in data){
    var num = (parseInt(i)+1);
    if(i>0){
      Logger.log(data[i][8])
      if(data[i][8] >= 0.9){
        
        
        Logger.log("I:"+ num);
         var colors1 = [["red", "red", "red"]];
         var colors2 = [["red", "red"]];
        setRowColor(num,sheetName,colors1,colors2);
        var sub = 'Notification buy more storage '+data[i][0];
        Logger.log("1:"+data[i][0]);
        Logger.log("2:"+data[i][8]);
        var body =  "<div><p>Hi,</p><br><p>Have a user has name "+data[i][0]+" in your system has reached "+data[i][8]*100+"% storage. You can buy more storage.</p><br><p>Sincerely,</p></div>";

//        body.data1 = data[i][0];
//        body.data2 = data[i][8]*100;
        Logger.log(body);
        sendMail(to,cc,sub,body);
        Logger.log('done');
      }else{
        
        var colors1 = [["#FFFFFF", "#FFFFFF", "#FFFFFF"]];
        var colors2 = [["#FFFFFF", "#FFFFFF"]];
        setRowColor(num,sheetName,colors1,colors2);
        Logger.log('done2');
      }
    }
  }
}
