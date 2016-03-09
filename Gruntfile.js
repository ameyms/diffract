module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    // Define the configuration for all the tasks
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            build: ['build/*'],
            packages: ['diffract-*.*.*.tgz'],
            demo: [
                'example/node_modules/diffract',
                'example/demo{,.}*.js'
            ]
        },

        copy: {
            js: {
                files: [{
                    expand: true,
                    src: ['**/*.js', '*.js'],
                    dest: 'build',
                    cwd: 'src'
                }]
            }
        },

        eslint: {
            source: {
                src: ['src/{,*/}*.{js,jsx}', '!src/{,*/}__tests__/*.js'],
                options: {
                    configFile: '.eslintrc'
                }
            },
            demo: {
                src: ['example/{,*/}*.jsx'],
                options: {
                    configFile: 'example/.eslintrc'
                }
            },

            scripts: {
                src: ['Gruntfile.js']
            }
        },

        babel: {
            options: {
                sourceMap: false,
                babelrc: true
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: ['{,*/}*.js{,x}'],
                    dest: 'build/',
                    ext: '.js'
                }]
            }
        },

        browserify: {
            options: {
                sourceMap: false,
                transform: [
                    [
                        'babelify',
                        {
                            sourceMap: false,
                            babelrc: true
                        }
                    ]
                ]
            },
            demo: {
                files: [{
                    expand: true,
                    src: 'demo.jsx',
                    dest: 'example/',
                    ext: '.compiled.js',
                    cwd: 'example'
                }]
            }
        },


        shell: {
            pack: {
                command: 'npm pack'
            },
            demoSetup: {
                command: [
                    'npm install ../diffract-<%= pkg.version %>.tgz '
                ].join('&&'),

                options: {
                    execOptions: {
                        cwd: 'example'
                    }
                }
            }
        },
        connect: {
            server: {
                options: {
                    port: 9001,
                    hostname: 'localhost',
                    base: ['example', '.tmp'],
                    keepAlive: true,
                    open: true
                }
            }
        },
        watch: {
            src: {
                files: ['src/*', 'example/demo.jsx'],
                options: {
                    reload: true,
                    livereload: true
                },
                tasks: [
                    'browserify:demo'
                ]
            }
        }

    });

    grunt.registerTask('lint', [
        'eslint'
    ]);

    grunt.registerTask('package', [
        'clean:build',
        'copy',
        'lint',
        'babel:dist',
        'clean:packages',
        'shell:pack'
    ]);


    grunt.registerTask('demo', [
        'package',
        'clean:demo',
        'shell:demoSetup',
        'browserify:demo',
        'connect',
        'watch'
    ]);

};
