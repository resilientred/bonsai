# Bonsai

Trim your JavaScript dependencies

[![Current Version](https://img.shields.io/npm/v/bonsai-analyzer.svg)](https://www.npmjs.com/package/bonsai-analyzer) [![Build Status](https://travis-ci.org/pinterest/bonsai.svg?branch=master)](https://travis-ci.org/pinterest/bonsai) [![Greenkeeper badge](https://badges.greenkeeper.io/pinterest/bonsai.svg)](https://greenkeeper.io/)

Bonsai is a JavaScript code analyser that helps speed up your website by focusing on module size and the cumulative size of all downstream dependencies.

![What Bonsai looks like](bonsai-interface.png)

## Getting Started

The quickest way to get started is to generate a stats file locally on your computer, and then use the online analyser at [https://pinterest.github.io/bonsai/analyze](https://pinterest.github.io/bonsai/analyze).

You can [generate a stats file](stats-files.md) by running `webpack --json > stats.json`. Then all you need to to is drag and drop the output file into the online tool.

### Taking Action

Using your knowledge of your project, Bonsai will enable you to sort and filter the modules to help you identify large modules that might not be needed on initial render. Click 'Ignore' to simulate how many dependency bytes would be removed if you defer or remove a given dependency.

Read more about [analysing your project](analyzing.md).

## Running Bonsai

Once you clone Bonsai, it can run from your filesystem or anywhere you have a webserver. The Create React App guide suggests [serve](https://github.com/zeit/serve) as a static file server, and it'll work with Bonsai too:

```
git clone https://github.com/pinterest/bonsai.git
cd bonsai && yarn install && yarn run build
yarn global add serve
serve ./build
```

See also [build options](build-options.md).

## Contributing

You can file [issues](https://github.com/pinterest/bonsai/issues), contribute fixes and new features by submitting [pull requests](https://github.com/pinterest/bonsai/pulls) on GitHub.

Execute `yarn start` to quickly spin up a development server. There are other helpful scripts listed in [package.json](https://github.com/pinterest/bonsai/blob/master/package.json) to build the project for production and prevent accidental breakages.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). The most recent guide is [right here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).
