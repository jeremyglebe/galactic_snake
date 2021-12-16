# Galactic Snake
Play as an ancient bio-mechanical serpent whose destiny is to devour the universe. Try to grow as large as you can, and avoid destroying yourself. How colossal will you become?

## Install

```sh
# Installs node dependencies for this project
npm install
# Installs github dependencies for this project
git submodule init
git submodule update
```

## Develop

```sh
# Runs a developer server hosting the game
npm run serve
# Runs a developer server hosting the game, also accessible by other lan
# devices such as mobile phones
npm run serve:lan
# Runs a local server hosting the game, in production mode, good for
# testing file sizes
npm run serve:prod
```

## Build

```sh
# Builds the project (in production mode) as a web page, found in the
# www/ folder.
npm run build
# Builds the project in development mode, typically only needed if a unique
# error occurs on a given platform and logs are needed
npm run build:dev
```

## Add Native Platforms

KT Starter commands which **build, then initialize** native projects
```sh
# Add Android native project
npm run android:init
# Add Desktop (Electron) native project (Project builds for current OS)
npm run electron:init
```
Default Capacitor commands which **only initialize** the native projects, and require a build to have already been made
```sh
# Add IOS native project
npx cap add ios
# Add Android native project
npx cap add android
# Add Desktop (Electron) native project (Project builds for current OS)
npx cap add @capacitor-community/electron
```

## Run Native
Easy to remember shortcuts
```sh
# Build and open Android project
npm run android
# Build and open Desktop (Electron) project
npm run electron
```
Standard Capactitor method
```sh
# Build the web project
npm run build
# Copy the built web code to your native project of choice
npx cap copy ios
npx cap copy android
npx cap copy @capacitor-community/electron
# Open the native project of your choice
npx cap open ios
npx cap open android
npx cap open @capacitor-community/electron
```

## Update Starter Code
To get updates made to the KT Starter, make sure to run the following
command *only once for a given project*
```sh
npm run template:init
```
Then run this next command any time you want to update
```sh
npm run template:update
```
