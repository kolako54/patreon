// const path = require('path')
module.exports = {
    reactStrictMode: true,
    // auto import breakpoints file
    // sassOptions: {
    //     includePaths: [path.join(__dirname, 'styles/breakpoints;')],
    //     prependData: '@import "styles/breakpoints.scss";'
    // },
    images: {
        // add google auth pictures domain
        domains: [
            'lh3.googleusercontent.com',
            'cdn4.iconfinder.com',
        ]
    }
}
