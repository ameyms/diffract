module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    // Define the configuration for all the tasks
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            build: ['build/*'],
            packages: ['diffract-*.*.*.tgz']
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
                src: ['src/{,*/}*.{js,jsx}', '!src/{,*/}__tests__/*.js']
            },
            demo: {
                src: ['example/demo.jsx']
            },
            tests: {
                src: ['src/{,*/}__tests__/*.{js,jsx}'],
                options: {
                    globals: ['jest', 'd3'],
                    envs: ['jasmine', 'amd', 'node', 'browser']
                }
            },

            scripts: {
                src: ['Gruntfile.js']
            }
        },

        react: {
            files: {
                    expand: true,
                    src: ['*.jsx'],
                    dest: 'build',
                    cwd: 'src',
                    ext: '.js'
            }
        },
        shell: {
            pack: {
                command: 'npm pack'
            },
            demoSetup: {
                command: [
                    'rm -rf node_modules/diffract',
                    'npm install ../diffract-<%= pkg.version %>.tgz ',
                    'make'
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
                    base: 'example',
                    keepAlive: true
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
                tasks: ['package', 'shell:demoSetup']
            }
        }

    });

    grunt.registerTask('lint', [
        'eslint'
    ]);

    grunt.registerTask('package', [
        'clean',
        'react',
        'copy',
        'lint',
        'shell:pack'
    ]);


    grunt.registerTask('demo', [
        'package',
        'shell:demoSetup',
        'connect',
        'watch'
    ]);

};
