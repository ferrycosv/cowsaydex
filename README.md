# Cowsaydex

A Node.js script that allows users to generate cowsays and save them to their file system.  Indispensible for anyone interested in swarm computing, genetic algorithms, or neuraltechnics.

---

## Getting Started

1. Clone the repo
1. `cd` into the project
1. `npm install`

---

## Running the Demo

This repo comes with a fully-functioning (but unreadable!) demo.  Play with this demo for a while to make sure you understand how your `cowsaydex` should behave.

* run `node demo.min.js -h` or `node demo.min.js --help`

---

## Complete the Exercise

`index.js` contains starter code that _almost_ entirely works.  There are three tasks for you to complete:

1. __Process User Input__: Create an array containing all of (and only!) the command line arguments passed by the user
1. __Generate the `userConfig` object__: Convert the array of user arguments (all strings) into a config object describing the new cowsay
1. __Write the cowsay to a file__: Using the constant `COWSAID_DIRNAME` and the config option `.file`, write the generated cowsay to the user's file system
