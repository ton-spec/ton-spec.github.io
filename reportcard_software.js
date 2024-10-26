function generateReportCards() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet();
  const dataSheet = sheet.getSheetByName('Sheet1');
  const templateSheet = sheet.getSheetByName('Sheet2');
  
  const range = dataSheet.getDataRange();
  const values = range.getValues();
  
  for (let i = 1; i < values.length; i++) {
    const studentID = values[i][0];  // Assuming the student ID is in the first column
    const name = values[i][1];  // Names in the second column
    
    // Check if a sheet with the same name already exists and create a unique name if needed
    let newName = name;
    let counter = 1;
    while (sheet.getSheetByName(newName)) {
      newName = name + " (" + counter + ")";
      counter++;
    }

    // Copy the template sheet and rename it
    const newSheet = templateSheet.copyTo(sheet);
    newSheet.setName(newName);
    
    // Set values for the report card
    

    // Ensure the correct values are being used for each subject
    newSheet.getRange('B2').setValue(studentID);       //[0] Student ID ASSUMED TO BE IN THE 1ST COLUMN OF SHEET1
    newSheet.getRange('B3').setValue(name);            //[1] NAME OF THE LEARNER ASSUMED TO BE IN THE 2ND COLUMN OF SHEET1
    newSheet.getRange('B5').setValue(values[i][2]);    // ENG SCORE IN THE 3RD COLUMN OF SHEET1
    newSheet.getRange('C5').setValue(values[i][3]);    // ENG SCORE LEVEL IN THE 4TH COLUMN OF SHEET1
    newSheet.getRange('B6').setValue(values[i][4]);    // MATH SCORE IN THE 5TH COLUMN OF SHEET1
    newSheet.getRange('C6').setValue(values[i][5]);    // MATH SCORE LEVEL IN THE 6TH COLUMN OF SHEET1
    newSheet.getRange('B7').setValue(values[i][6]);    // KISW SCORE IN THE 7TH COLUMN OF SHEET1
    newSheet.getRange('C7').setValue(values[i][7]);    // KISW SCORE LEVEL IN THE 8TH COLUMN OF SHEET1
    newSheet.getRange('B8').setValue(values[i][8]);    // SST SCORE IN THE 9TH COLUMN OF SHEET1
    newSheet.getRange('C8').setValue(values[i][9]);    // SST SCORE LEVEL IN THE 10TH COLUMN OF SHEET1
    newSheet.getRange('B9').setValue(values[i][10]);   // AGRIC SCORE IN THE 11TH COLUMN OF SHEET1
    newSheet.getRange('C9').setValue(values[i][11]);   // AGRIC SCORE LEVEL IN THE 12TH COLUMN OF SHEET1
    newSheet.getRange('B10').setValue(values[i][12]);  // PRET SCORE IN THE 13TH COLUMN OF SHEET1
    newSheet.getRange('C10').setValue(values[i][13]);  // PRET SCORE LEVEL IN THE 14TH COLUMN OF SHEET1
    newSheet.getRange(A'B11').setValue(values[i][14]); // CRE SCORE IN THE 15TH COLUMN OF SHEET1
    newSheet.getRange('C11').setValue(values[i][15]);  // CRE SCORE LEVEL IN THE 16TH COLUMN OF SHEET1
    newSheet.getRange('B12').setValue(values[i][16]);  // CART SCORE IN THE 17TH COLUMN OF SHEET1
    newSheet.getRange('C12').setValue(values[i][17]);  // CART SCORE LEVEL IN THE 18TH COLUMN OF SHEET1
    newSheet.getRange('B13').setValue(values[i][18]);  // SCIE SCORE IN THE 19TH COLUMN OF SHEET1
    newSheet.getRange('C13').setValue(values[i][19]);  // SCIE SCORE LEVEL IN THE 20TH COLUMN OF SHEET1
    newSheet.getRange('B14').setValue(values[i][20]);  // TOTAL MARK  IN THE 21ST COLUMN OF SHEET1
    newSheet.getRange('B15').setValue(values[i][21]);  // AVERAGE MARK  IN THE 22ND COLUMN OF SHEET1
    newSheet.getRange('B16').setValue(values[i][22]);  // AVG LEVEL  IN THE 23RD COLUMN OF SHEET1
    newSheet.getRange('E18').setValue(values[i][22]);  // COMMENT AVG LEVEL  IN THE 23RD COLUMN OF SHEET1
    

  }
}


















