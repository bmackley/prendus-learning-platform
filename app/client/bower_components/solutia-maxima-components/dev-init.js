#!/usr/bin/env node

//TODO to make this a module of its own, get the package name from package.json somehow

var exec = require('child_process').exec;
var cmd = `
    mkdir -p bower_components/solutia-maxima-components &&
    mkdir -p bower_components/solutia-maxima-components/components &&
    mkdir -p bower_components/solutia-maxima-components/components/view-problem &&
    ln -s ../../../../components/view-problem/view-problem.component.html bower_components/solutia-maxima-components/components/view-problem/view-problem.component.html &&
    ln -s ../../../../components/view-problem/view-problem.component.ts bower_components/solutia-maxima-components/components/view-problem/view-problem.component.ts &&
    mkdir -p bower_components/solutia-maxima-components/components/render-math &&
    ln -s ../../../../components/render-math/render-math.component.html bower_components/solutia-maxima-components/components/render-math/render-math.component.html &&
    ln -s ../../../../components/render-math/render-math.component.ts bower_components/solutia-maxima-components/components/render-math/render-math.component.ts &&
    mkdir -p bower_components/solutia-maxima-components/components/edit-problem &&
    ln -s ../../../../components/edit-problem/edit-problem.component.html bower_components/solutia-maxima-components/components/edit-problem/edit-problem.component.html &&
    ln -s ../../../../components/edit-problem/edit-problem.component.ts bower_components/solutia-maxima-components/components/edit-problem/edit-problem.component.ts &&
    mkdir -p bower_components/solutia-maxima-components/components/edit-problem/redux &&
    ln -s ../../../../../components/edit-problem/redux/actions.ts bower_components/solutia-maxima-components/components/edit-problem/redux/actions.ts &&
    ln -s ../../../../../components/edit-problem/redux/reducers.ts bower_components/solutia-maxima-components/components/edit-problem/redux/reducers.ts &&
    ln -s ../../../../../components/edit-problem/redux/initial-state.ts bower_components/solutia-maxima-components/components/edit-problem/redux/initial-state.ts &&
    mkdir -p bower_components/solutia-maxima-components/components/text-editor &&
    ln -s ../../../../components/text-editor/text-editor.component.html bower_components/solutia-maxima-components/components/text-editor/text-editor.component.html &&
    ln -s ../../../../components/text-editor/text-editor.component.ts bower_components/solutia-maxima-components/components/text-editor/text-editor.component.ts &&
    mkdir -p bower_components/solutia-maxima-components/components/code-editor &&
    ln -s ../../../../components/code-editor/code-editor.component.html bower_components/solutia-maxima-components/components/code-editor/code-editor.component.html &&
    ln -s ../../../../components/code-editor/code-editor.component.ts bower_components/solutia-maxima-components/components/code-editor/code-editor.component.ts
`;

var newProcess = exec(cmd);

newProcess.stdout.on('data', function(data) {
    console.log(data);
});

newProcess.stderr.on('data', function(data) {
    console.log(data);
});
