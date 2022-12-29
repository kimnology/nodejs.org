const fs = require('fs');

/**
 * 
 * @returns {Array}
 */
function dataMapping (){
    const i18nData = JSON.parse(fs.readFileSync('./i18n/locales.json', 'utf8'));
    const locale = [];

    for (let i = 0; i < i18nData.length; i += 1) {
        locale.push(i18nData[i].locale);  
    };

    return locale;
}

/**
 * 
 * @exports {Array}
 */
exports.module = dataMapping()
