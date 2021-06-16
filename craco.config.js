const path = require('path');

module.exports = function() {
    return {
        webpack {
            alias: {
                '@store': path.resolve(__dirname, 'src/store');
                '@view': path.resolve(__dirname, 'src/view');
                '@vm': path.resolve(__dirname, 'src/vm');
            },
        },
    };
}