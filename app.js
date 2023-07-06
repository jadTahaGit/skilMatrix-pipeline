const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

const SKILL_MATRIZES_PATH = './skill-matrizes';
const CONFIG_FILE_PATH = './Config_Mitarbeiter.xlsx';

// Function to read excel data
function getExcelData(filePath) {
  const workbook = xlsx.readFile(filePath);
  const sheet_name_list = workbook.SheetNames;
  return xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
}

// Function to format name to file name format
function formatName(name) {
  const [first, last] = name.split(' ');
  console.log(first, last);
  if (!first || !last) {
    return 0;
  }
  return (first.slice(0, 2) + last.slice(0, 2)).toUpperCase();
}

// Get user data from config
const userData = getExcelData(CONFIG_FILE_PATH);

fs.readdir(SKILL_MATRIZES_PATH, (err, files) => {
  if (err) {
    console.error('Error reading files', err);
    return;
  }

  files.forEach((file) => {
    if (path.extname(file) === '.xlsx') {
      const fileName = path.basename(file, '.xlsx');
      const userName = fileName.split('_')[1];

      const user = userData.find((user) => formatName(user.Name) === userName);

      if (!user) {
        console.log(`Error finding user for file ${fileName}.xlsx`);
        return;
      }

      const newFileName = `${user.HQ_UserID}.xlsx`;

      fs.rename(
        path.join(SKILL_MATRIZES_PATH, `${fileName}.xlsx`),
        path.join(SKILL_MATRIZES_PATH, newFileName),
        (err) => {
          if (err) {
            console.log(`Error renaming file ${fileName}.xlsx`);
            return;
          }
          console.log(
            `Successfully renamed file ${fileName}.xlsx to ${newFileName}`
          );
        }
      );
    }
  });
});
