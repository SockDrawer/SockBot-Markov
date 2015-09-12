[![Build Status](https://travis-ci.org/RaceProUK/SockBot-Markov.svg?branch=master)](https://travis-ci.org/RaceProUK/SockBot-Markov)
[![Coverage Status](https://coveralls.io/repos/RaceProUK/SockBot-Markov/badge.svg?branch=master)](https://coveralls.io/r/RaceProUK/SockBot-Markov?branch=master)
[![Docs Status](https://readthedocs.org/projects/sockbot-Markov/badge/?version=latest)](http://sockbot-markov.readthedocs.org/)

[![Dependency Status](https://david-dm.org/RaceProUK/SockBot-Markov/master.svg)](https://david-dm.org/RaceProUK/SockBot-Markov/master)
[![devDependency Status](https://david-dm.org/RaceProUK/SockBot-Markov/master/dev-status.svg)](https://david-dm.org/RaceProUK/SockBot-Markov/master#info=devDependencies)
[![optionalDependency Status](https://david-dm.org/RaceProUK/SockBot-Markov/master/optional-status.svg)](https://david-dm.org/RaceProUK/SockBot-Markov/master#info=optionalDependencies)

[![Stories in Ready](https://badge.waffle.io/RaceProUK/SockBot-Markov.png?label=ready&title=Ready)](https://waffle.io/RaceProUK/SockBot-Markov)
[![Stories in Progress](https://badge.waffle.io/RaceProUK/SockBot-Markov.png?label=in%20progress&title=In%20Progress)](https://waffle.io/RaceProUK/SockBot-Markov)

#SockBot Markov

Markov plugin for [SockBot](https://sockbot.rtfd.org/en/latest/) version 2.0.0 or later; generated semi-coherent posts using a Markov chain generator.

##Usage

No special syntax is required; simply summon, reply, or send a private message.

##Developers

SockBot Markov is developed by [SockDrawer](https://github.com/SockDrawer) developer [RaceProUK](https://github.com/RaceProUK).

##Installation

The preferred method of installation is via NPM; simply run this command within the SockBot installation folder:
```
npm install sockbot-markov
```

Other methods of installation are possible e.g. cloning the git repository, but only installation via NPM is supported.

###Post Install Setup

If you installed via NPM skip this step as NPM has already installed all necessary dependencies.
Otherwise you will need to run the following command in the folder where you installed SockBot Markov:
```
npm install
```

##Configuration

SockBot Markov requires a text file to generate the corpus that powers the Markov chain; this is specified by the `corpus` setting.

YAML example:
```
---
core:
  username: username
  password: password
  owner: owner
plugins:
  sockbot-markov:
    corpus: '../path/to/corpus.txt'
```

JSON example:
```
{
  "core": {
    "username": "username",
    "password": "password",
    "owner": "owner"
  },
  "plugins": {
    "sockbot-markov": {
      "corpus": "../path/to/corpus.txt"
    }
  }
}
```

Note that these examples assume an NPM-based installation; other installation methods may require the path to `Math.js` (without file extension) be specified explicitly.

YAML example:
```
---
core:
  username: username
  password: password
  owner: owner
plugins:
  '../path/to/Markov':
    corpus: '../path/to/corpus.txt'
```

JSON example:
```
{
  "core": {
    "username": "username",
    "password": "password",
    "owner": "owner"
  },
  "plugins": {
    "../path/to/Markov": {
      "corpus": "../path/to/corpus.txt"
    }
  }
}
```

##Special Thanks

For creating [SockBot](https://sockbot.readthedocs.org/en/latest/) and just generally being awesome: [Accalia de Elementia](https://github.com/AccaliaDeElementia)