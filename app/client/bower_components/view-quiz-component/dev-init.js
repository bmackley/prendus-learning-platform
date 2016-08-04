#!/usr/bin/env node

//TODO to make this a module of its own, get the package name from package.json somehow

var exec = require('child_process').exec;
var cmd = `
    mkdir -p bower_components/view-quiz-component &&
    ln -s ../../take-quiz.component.html bower_components/view-quiz-component/take-quiz.component.html &&
    ln -s ../../take-quiz.component.ts bower_components/view-quiz-component/take-quiz.component.ts &&
    ln -s ../../quiz-results.component.html bower_components/view-quiz-component/quiz-results.component.html &&
    ln -s ../../quiz-results.component.ts bower_components/view-quiz-component/quiz-results.component.ts &&
    ln -s ../../view-quiz.component.html bower_components/view-quiz-component/view-quiz.component.html &&
    ln -s ../../view-quiz.component.ts bower_components/view-quiz-component/view-quiz.component.ts &&
    mkdir -p bower_components/view-quiz-component/redux &&
    ln -s ../../../redux/actions.ts bower_components/view-quiz-component/redux/actions.ts &&
    ln -s ../../../redux/reducers.ts bower_components/view-quiz-component/redux/reducers.ts &&
    ln -s ../../../redux/initial-state.ts bower_components/view-quiz-component/redux/initial-state.ts
`;

var newProcess = exec(cmd);

newProcess.stdout.on('data', function(data) {
    console.log(data);
});

newProcess.stderr.on('data', function(data) {
    console.log(data);
});
