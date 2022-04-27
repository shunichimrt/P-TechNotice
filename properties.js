/** LINE Developers Info */
const ACCESS_TOKEN =
  PropertiesService.getScriptProperties().getProperty("ACCESS_TOKEN");

/** スプレッドシート */
var SPREADSHEET_ID =
  PropertiesService.getScriptProperties().getProperty("SPREADSHEET_ID");
var SPREADSHEET_QIITA =
  PropertiesService.getScriptProperties().getProperty("SPREADSHEET_QIITA");
var SPREADSHEET_ZENN =
  PropertiesService.getScriptProperties().getProperty("SPREADSHEET_Zenn");
var targetShtQiita =
  SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SPREADSHEET_QIITA);
var targetShtZenn =
  SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SPREADSHEET_ZENN);
