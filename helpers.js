

const colors = require('colors');

/**
 * Делает текст красным (для вывода в консоль)
 * @param text
 */
const textRed = (text) => colors.red(text);

/**
 * Делает текст зеленым (для вывода в консоль)
 * @param text
 */
const textGreen = (text) => colors.green(text);

/**
 * Завершает работу, если передана ошибка, то выводит ее и завершает работу
 * @param errMessage
 */
const exit = (errMessage) => {
    if (errMessage) {
        console.log(textRed(errMessage));
        process.exit(1);
    }
    process.exit(0);
};

module.exports = {
    textRed,
    textGreen,
    exit
};
