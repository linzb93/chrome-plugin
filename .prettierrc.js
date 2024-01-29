module.exports = {
    tabWidth: 4, //缩进4格
    printWidth: 120, //每行多余120个字符时启用换行
    semi: true, //加分号
    singleQuote: true, //单引号
    bracketSameLine: false, // 标签结尾换行
    arrowParens: 'always', //箭头函数中参数一个时，总是加上()
    quoteProps: 'consistent', //object对象中key值统一
    overrides: [
        {
            files: '*.wxml',
            options: {
                parser: 'html',
            },
        },
        {
            files: '*.wxss',
            options: {
                parser: 'css',
            },
        },
    ],
};
