function onOpen(e) {
var menu =  SpreadsheetApp.getUi().createAddonMenu();
  menu.addItem('Load interface for Add-one', 'loadInterface')
  .addItem('Start Service Load User', 'startService')
  .addItem('Create Multi User', 'createMutilUsers')
  .addItem('Create A User', 'showSidebar')
  .addItem('Delete A User', 'showSidebarDelete')
  .addToUi();
  
}
function loadInterface(){
 var  id= '1M7eaZDvB5HpJEssV8cFr1PylM-NhmTcYepF98Iw_8jE';
 var sheetName = 'Manager storage for users';
 var sheetName2 = 'Users list for register';
 var sheetName3 = 'Admin role';
  
 copySheet(id,sheetName);
 copySheet(id,sheetName2);
 //copySheet(id,sheetName3);
}
function showSidebarDelete(){
  var ui = HtmlService.createHtmlOutputFromFile('DeleteUser')
      .setTitle('Delete User');
  SpreadsheetApp.getUi().showSidebar(ui);
}

function showSidebar() {
  var ui = HtmlService.createHtmlOutputFromFile('SignUp')
      .setTitle('SignUp');
  SpreadsheetApp.getUi().showSidebar(ui);
}
function startService(){
   var triggers = ScriptApp.getProjectTriggers();
 for (var i = 0; i < triggers.length; i++) {
   ScriptApp.deleteTrigger(triggers[i]);
 }
   ScriptApp.newTrigger('generateUserUsageReport').timeBased().everyMinutes(1)
      .create();
  ScriptApp.newTrigger('checkRow').timeBased().everyMinutes(1)
      .create();
}

function createMutilUsers(){
 var datas = readRows('User Data List');
  for(i in datas){
 var email= datas[i][2];
 var firstname= datas[i][0];
 var lastname= datas[i][1];
 var pass= datas[i][3];
   Logger.log( getUser("M"+email));
    if(getUser(email)== 'false'){
     addUser(email,firstname,lastname,pass);
      
    }
  }
}

//store property
function getPreferences() {
  var userProperties = PropertiesService.getUserProperties();
  var userPrefs = {
    firstName: userProperties.getProperty('firstname'),
    lastName: userProperties.getProperty('lastname'),
    email: userProperties.getProperty('email'),
    pass: userProperties.getProperty('pass'),
    
  };
  return userPrefs;
}



//function doGet(e) {
//  var params = JSON.stringify(e);
//  
//  return HtmlService.createHtmlOutput(params);
//}
//
//function urlApp(e){
//var url = ScriptApp.getService().getUrl();
//  
//  Logger.log(url);
//}
