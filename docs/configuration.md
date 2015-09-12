#Configuration

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