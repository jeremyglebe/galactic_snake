# King's Tithe Game Starter for Phaser
Starter code for phaser game projects that incorporates Javascript, Typescript, and a variety of development tools.

Inspiration/configuration from: 
- https://github.com/joshuamorony/phaser3-typescript-webpack-capacitor

## Install

```sh
# Installs dependencies for this project
npm install
```

```sh
# Initializes the Capacitor project for native platforms
npx cap init
```

## Develop

```sh
# Runs a developer server hosting the game
npm run dev
# Runs a developer server hosting the game, also accessible by other lan
# devices such as mobile phones
npm run dev:lan
# Runs a local server hosting the game, in production mode, good for
# testing file sizes
npm run prod
```

## Build

```sh
# Builds the project (in production mode) as a web page, found in the
# www/ folder. Also copies the web code to any added native projects in
# their respective folders.
npm run build
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