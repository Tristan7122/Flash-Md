const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU0Mwd0U1dkpYb0RQcGFPZERRcVJtMUxPNSsra3g0U1lMUnNKYWNhUmxraz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOFBpK3pWeHlaWkdWNk5pTnl2ZFMvYzZ3WWt1ZGFYa1BMNExjalFVL09Ycz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ1QWNXL0hYeFo5T0I1Mjl1eFU3alVTM09pTnFTSGRFQlN6R1h1a1FZTW1BPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIrbFRVVno1VzlHVnk4em16WlIrU2lobDBrSUIzandPVHBXU1pYQ3RuN0Y4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IldJekVETXVXbktvekxuZVFDRWVjUzVPb2FJUVBoS1FNdHk3UXMrOWx5Rk09In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImVNV2FKNEljUkhCRDlyY1NsU2tHVmZyeHo5WGVld0RlSHJXT1kxcHBYakE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT0E4ZE9ZNUV3NnBWcWZ0VlR4UmZvUDRzYU13Z0tXQWEyeksxS1RrelowWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT0toZ1lvbDBxOTAvdG5WZ1BWaEdDeWM5eE9Pa1diUEJKWTJYZCtzdld5QT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjhKNEpxRXVBbnRtM2RGZnNpdGROaFVsN3Joc1ErL3F2bWR2a2FSZG0va1VuZ2ZvWjVMai9LbFdlK2J0OVU5M1ZBTCsxUXRja1Ezb3hkWXMvTzkvbURnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjM0LCJhZHZTZWNyZXRLZXkiOiJnMTZOM0xwV2I5clZSM3ppTUpjVUxkRHVjN2l0cmlOc1R1MStObGQwL2RNPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiIwcEJvM3BQNFR5dW1LaVVHT2xzMnZRIiwicGhvbmVJZCI6ImZiNWFkOTVjLWZjZmEtNDE5YS1hNmZiLWNlYjU5YjUxZGJjYiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJpa3cxT241dkJYaTl3ck84TS9zK3B5MUFLR3M9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYzJ3K1ZoMTJ5KzZEMSthSnQzVXhxRVlwOHA4PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlkySk5BWVY1IiwibWUiOnsiaWQiOiIyNzY1NjMxOTg4OTo1NkBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTkc1d2R3RUVMWFZsTGtHR0FrZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoidVl4L2Fvczlndmsyamg4M0tEbWtIdEhmWFcyRDRINUY3ZzFaY3FDd2loUT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiajYwMXAyRVlRU1g2b3FRTnJ0L2Eram9XNzcveHYySzB0a2ZCejU4WTI4cEY0SHZYTm9yTGxMMnFGWFpMZFVDakZFYkRGL1FHeVJvZ291V0Rkam1VQ2c9PSIsImRldmljZVNpZ25hdHVyZSI6ImZzRjVwUHdwYTRhNWpUQlM0bWVwT1VpN0VRQVZNVnJtck5wbXFESjlhM3dUSnVzMkcrbHUyZ0EwM25iakxya0RuV0F6RkhKcnVUaldKcFBjUjB4ckJ3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjc2NTYzMTk4ODk6NTZAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCYm1NZjJxTFBZTDVObzRmTnlnNXBCN1IzMTF0ZytCK1JlNE5XWEtnc0lvVSJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTczMDQ4OTAyNiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFNWVEifQ==',
    PREFIXE: process.env.PREFIX || ".",
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
