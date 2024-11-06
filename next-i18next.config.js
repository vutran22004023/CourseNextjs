const path = require('path');

module.exports = {
    i18n: {
        defaultLocale: 'vi',
        locales: ['vi', 'en'], // Add all supported languages here
    },
    localePath: path.resolve('./public/locales'), // Adjust this path if necessary
};
