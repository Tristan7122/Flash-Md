const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic0g5U2U0blo1YncwMkJoNDBMaXNDemJxQkliVVpDdVViTm1FZ1dOSm5XOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibno4aDNoaFU0RkJWU2RSSmRaakM2T001NEZOQ2g1SDRCYlgxYTdvb3Uyaz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJFSVB5UEd0bm9jTk9WZ2doV3doOC9tRlltV0pCWWdBMFltMzRMczRRL0ZjPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJMVldwOGZMaWpDeEdtdjF5eTd0OEhlNllqNkhMVi8wYUgzK3pFbHcxb2xFPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlVQcW9lNEE5RDBzQ2ViaHJKWVpPSy9OS3N5VUQ3RlpwVU9xMHNRelNnVlE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IitiaXZIZkJLQTRXYnZNMzdNaFdnVlBkdG5OQ0NQM1RkN1hrbVZROUdDVTg9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0s1Y3RCdWdETmY3VlgwT3FvR3A4VklyVXRWYmZEWGdQMEUycmNLakxVaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNEozb0hxMVgxNEhjVnJIQVJ4bmZOSHEzMC9wcndNanREcTBtUmlCZERTTT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InRmTXdCRS9qS2FyditUM2NTM1h2dE9Ccjg3c1pUYWcvRXE0ckxxaHF4SUVTRmw1cWFyZElzcGhjY2UrcGwrQjBaZ3EvL1lGNkQxcXE1RDdzS0cyUWp3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjEyLCJhZHZTZWNyZXRLZXkiOiJLelJUZnhVcW9WeGg0RE55bWRteWtJaGtwdExNSmpiTlRmZVREZXN3YXQwPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJzZzc4NTdCQ1E5U2JkRllBWEpvMC1nIiwicGhvbmVJZCI6IjM3ZjFmZDZlLWM1NDQtNGYzMC1iNGY1LTRjZjE4ZDNiZWVlYiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI1bDA3dm0yanEwWEpQMC9icUc1OUtDcTZvZWM9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSHZBMFQ1bVhmMDRWUGlZc3ZNbDlFMExESFFjPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjdMN1JaRjFNIiwibWUiOnsiaWQiOiIyNzY4ODQ2MjM3Njo0MEBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSWJ0czd3QkVPbmU0N1VHR0FNZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoieEtESjluS0VwaWtTVVQ4U0pLdVBxQThqL3lhMy94R2tRaUJrRHlUcGhHbz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiS1ZJcno4Wms2ajB1TkJ4QmlCa3hHUVhjM3N3YWJxdktHa29zWmtZWTd2OENsMnFpZFcxOWR3K3hYdGhVNmluemVhOVZWZWFHbXNRT1Fuenl4ZlRCQ2c9PSIsImRldmljZVNpZ25hdHVyZSI6IkhLOTBZUkRLOTluQ251c1RQYm5RSThDd3VLRVZJZEl6WVpGRTZ4T3BmREhKcUFnR05rR2xXYUdlQURDS2hNRUZEcFRyRDM5Sm5nb2xQbm5sZG8rVmdBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjc2ODg0NjIzNzY6NDBAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCY1NneWZaeWhLWXBFbEUvRWlTcmo2Z1BJLzhtdC84UnBFSWdaQThrNllScSJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMzM5NTk1OSwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFPai8ifQ==',
    PREFIXE: process.env.PREFIX || "!",
    OWNER_NAME: process.env.OWNER_NAME || "Tristan",
    OWNER_NUMBER : process.env.OWNER_NUMBER || "27634624586", 
    A_REACT : process.env.AUTO_REACTION || 'off',     
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "off",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    BOT : process.env.BOT_NAME || 'FLASH-MD',
    //OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || '',
    MODE: process.env.BOT_MODE || "public",
    PM_PERMIT: process.env.PM_PERMIT || 'off',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    PRESENCE : process.env.PRESENCE || 'recording',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_MESSAGE || "on",
//    ADM : process.env.ANTI_DELETE_MESSAGE || 'off',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd" : "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
