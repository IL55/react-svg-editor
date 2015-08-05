[![Circle CI](https://circleci.com/gh/IL55/react-svg-editor/tree/master.svg?style=svg)](https://circleci.com/gh/IL55/react-svg-editor/tree/master)

# edit-svg-layers

This project was inspired by project [react-svg-editor](https://github.com/asolove/react-svg-editor).

Client produce svg images, you can edit layers.
Svg image presented as [Immutable.js](https://facebook.github.io/immutable-js) object (no problem with "back" button).

For unidirectional dataflow [ReFlux.js](https://github.com/reflux/refluxjs) used.

Online build available here:
http://edit-svg-layers.herokuapp.com

This project is generated with [yo react-webpack generator](https://github.com/newtriks/generator-react-webpack)

## Build & development

### server (just for hosting react client)
We use simple node.js server, for hosting in production,
but may be in future we move some (slowly) functionality to server.

`npm install`

`node index.js`

### react.js client

`cd client`

Run `grunt build` for building distributive for production.

and `grunt serve` for developer preview.

### Testing

Running `grunt test` will run the unit tests with karma.

### Continues integration

we use [CircleCI](https://circleci.com/gh/IL55/edit-svg-layers)
inspired by [javascripting.com blog post](https://blog.javascripting.com/2014/12/05/continuous-deployment-with-github-circleci-heroku/)

Last master branch build deploys to Heroku:
http://edit-svg-layers.herokuapp.com