// ----- require dependencies -----
const cowsay = require('cowsay')
const fs = require('fs')


// ----- declare constants -----
const COWSAID_DIRNAME = 'cowsaid'
const SUPPORTED_VERBS = [
  'say',
  'think'
]
const DEFAULT_CONFIG = {
  text: 'I cow hard',
  e: 'oo',
  T: '  ',
  f: 'default',
  file: (new Date()).toJSON() + '.txt',
  verb: 'say'
}
const DOC_STRING = `CONFG OPTIONS
text:"lorem ipsum" -- what the cow should say
  default -- I cow hard
e:"oo" -- the cow's eyes.
  not all cowfiles have customizable eyes
  2 characters only is recommended
  default -- "oo"
T:"  " -- the cow's tongue
  not all cowfiles have customizable tongues
  2 characters only is recommended
  default -- "  "
f:"bees" -- the cowfile to render
  default -- default
file:fileName.txt -- the file name to render to
  default -- (new Date()).toJSON() + ".txt"
verb:"say" -- does the cow say or think?
  only "say" and "think" are supported
  default -- "say"
NOTE: any extra options are ignored

FLAGS
-h -- prints this helpful message
-l -- prints all possible cows
if either flag is passed as an argument, no cowsay will be generated`


// ----- begin main program script -----


// --- process user input ---

// create an array containing only the user-provided CLI arguments
const userArgs = process.argv.slice(2);


// --- handle tech support ---

if (userArgs.includes('-h')) {
  console.log(DOC_STRING)
  // like an early return, quit the program
  process.exit(0)
}

if (userArgs.includes('-l')) {
  cowsay.list((err, cows) => {
    console.log(cows.join('\n'))
  })
  // like an early return, quit the program
  process.exit(0)
}


// --- generate cowsay ---

// parse the CLI arguments from the user into a config object
const userConfig = userArgs.reduce((acc,curr) => {
  const arg = curr.split("=");
  acc[arg[0]] = arg[1];
  return acc;
}, {});
/* example:
user arguments ...
  [ "text=cows be like : moooooo", "file=readme.txt" ]

become ...
  {
    text: "cows be like : moooooo",
    file: "readme.txt"
  }
*/

if (!SUPPORTED_VERBS.includes(userConfig.verb)) {
  console.log(userConfig.verb + ' is not a supported verb, the cow will "say"');
  delete userConfig.verb
}

const finalConfig = Object.assign({}, DEFAULT_CONFIG, userConfig)

const thisCow = cowsay[finalConfig.verb]({
  text: finalConfig.text,
  e: finalConfig.e,
  T: finalConfig.T,
  f: finalConfig.f,
})

console.log(thisCow)


// --- preserve cowsay for future generations ---

try {
  fs.accessSync('./' + COWSAID_DIRNAME)
} catch (err) {
  console.log('--- creating ./' + COWSAID_DIRNAME + ' directory ---')
  fs.mkdirSync('./' + COWSAID_DIRNAME)
}

// write thisCow to a new file using COWSAID_DIRNAME and finalConfig.file
fs.writeFileSync(`./${COWSAID_DIRNAME}/${finalConfig.file}`,thisCow,"utf-8");


// ----- end main program script -----
