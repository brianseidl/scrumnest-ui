# Scrum Nest UI

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Running Locally

Before you can run the ScrumNest UI locally, you will first need to deploy the ScrumNest API which can be found [here](https://github.com/brianseidl/scrumnest-api).

### Install Dependencies

You will also want to make sure that you have NPM and the Amplify CLI installed as well.

You can install the Amplify CLI via npm:

```bash
npm install -g @aws-amplify/cli
```

### Amplify

#### Initialize the Amplify Project

```bash
amplify init
```

Make sure that you choose `javascript` for the app type and `react` for the framework.

#### Add an Amplify Environment

```bash
amplify env add
```

Make sure that you choose `No` for using an existing environment. Also make sure to choose a unique name for the environment.

#### Connect Amplify to Your API

```bash
amplify add codegen --apiId <API_ID_HERE>
```

You want to use your API ID for your AWS AppSync API.

### Configure S3 File Upload Bucket

```bash
amplify import storage
```

Make sure you select the bucket that was created by the API. `XXX-scrumnest-files-dev`

#### Push Your Amplify Configuration

```bash
amplify push
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run-script test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run-script build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
