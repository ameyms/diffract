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
            less: {
                files: [{
                    expand: true,
                    src: ['**/*.less', '*.less'],
                    dest: 'build',
                    cwd: 'src'
                }]
            },

            js: {
                files: [{
                    expand: true,
                    src: ['**/*.js', '*.js'],
                    dest: 'build',
                    cwd: 'src'
                }]
            },
        },
        jscs: {
            src: ['src/*.js']
        },

        jshint: {
            all: ['Gruntfile.js', 'build/*.js']
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
                    'make',
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
        'jscs',
        'jshint:all'
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
