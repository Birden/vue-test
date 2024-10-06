module.exports = {
    'verbose': true,
    'moduleFileExtensions': [
        'js',
        'json',
        'ts'
    ],
    'rootDir': 'test',
    'testRegex': '.*\\.spec\\.js$',
    'collectCoverageFrom': [
        '**/*.(t|j)s'
    ],
    'coverageDirectory': '../coverage',
    'testEnvironment': 'node'
};
