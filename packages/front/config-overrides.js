const darkTheme = require('@ant-design/dark-theme').default;
const { override, addLessLoader } = require('customize-cra');


module.exports = override(
    addLessLoader({
        lessOptions: {
            javascriptEnabled: true,
            modifyVars: {
                ...darkTheme,
                '@primary-color': '#FA7268',
            },
        },
    })
);