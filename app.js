const fileProcessor = require('./fileProcessor');
const uploadFiles = require('./uploadFiles');

const SKILL_MATRIZES_PATH = './skill-matrizes/';
const CONFIG_FILE_PATH = './Config_Mitarbeiter.xlsx';

// fileProcessor.renameFiles(SKILL_MATRIZES_PATH, CONFIG_FILE_PATH);

uploadFiles(SKILL_MATRIZES_PATH);
