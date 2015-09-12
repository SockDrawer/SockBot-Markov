#SockBot Markov

Markov plugin for [SockBot](https://sockbot.rtfd.org/en/latest/) version 2.0.0 or later; generates semi-coherent posts using a Markov chain generator.

##Usage

No special syntax is required; simply summon, reply, or send a private message.

##Developers

SockBot Markov is developed by [SockDrawer](https://github.com/SockDrawer) developer [RaceProUK](https://github.com/RaceProUK).

##Quickstart Guide

* Create a folder to install to
* Run `npm install sockbot`
* Run `npm install sockbot-markov`
* Create a configuration file called `Config.yml` in that folder with the following contents:
```
---
core:
  username: [the bot's username]
  password: [the bot's password]
  owner: [your username]
plugins:
  sockbot-markov:
    corpus: '../path/to/corpus.txt'
```
* Run `sockbot Config.yml`