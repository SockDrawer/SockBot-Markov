<a name="module_Markov"></a>
## Markov
Markov

**Author:** RaceProUK  
**License**: MIT  

* [Markov](#module_Markov)
    * _static_
        * [.defaultConfig](#module_Markov.defaultConfig)
            * [.corpus](#module_Markov.defaultConfig.corpus) : <code>string</code>
        * [.prepare(plugConfig, config, events, browser)](#module_Markov.prepare)
        * [.start()](#module_Markov.start)
        * [.stop()](#module_Markov.stop)
    * _inner_
        * [~loadCorpus()](#module_Markov..loadCorpus)
        * [~reply(notification, topic, post)](#module_Markov..reply)
        * [~random(min, max)](#module_Markov..random) ⇒ <code>number</code>

<a name="module_Markov.defaultConfig"></a>
### Markov.defaultConfig
Default plugin configuration

**Kind**: static property of <code>[Markov](#module_Markov)</code>  
<a name="module_Markov.defaultConfig.corpus"></a>
#### defaultConfig.corpus : <code>string</code>
Corpus location

**Kind**: static property of <code>[defaultConfig](#module_Markov.defaultConfig)</code>  
**Default**: <code>&quot;&quot;</code>  
<a name="module_Markov.prepare"></a>
### Markov.prepare(plugConfig, config, events, browser)
Prepare Plugin prior to login

**Kind**: static method of <code>[Markov](#module_Markov)</code>  

| Param | Type | Description |
| --- | --- | --- |
| plugConfig | <code>\*</code> | Plugin specific configuration |
| config | <code>Config</code> | Overall bot configuration |
| events | <code>externals.events.SockEvents</code> | EventEmitter used for the bot |
| browser | <code>Browser</code> | Web browser for communicating with discourse |

<a name="module_Markov.start"></a>
### Markov.start()
Start the plugin after login

**Kind**: static method of <code>[Markov](#module_Markov)</code>  
<a name="module_Markov.stop"></a>
### Markov.stop()
Stop the plugin prior to exit or reload

**Kind**: static method of <code>[Markov](#module_Markov)</code>  
<a name="module_Markov..loadCorpus"></a>
### Markov~loadCorpus()
Load the corpus and build the in-memory corpus array and state machine dictionary

**Kind**: inner method of <code>[Markov](#module_Markov)</code>  
<a name="module_Markov..reply"></a>
### Markov~reply(notification, topic, post)
Reply to summons

**Kind**: inner method of <code>[Markov](#module_Markov)</code>  

| Param | Type | Description |
| --- | --- | --- |
| notification | <code>external.notifications.Notification</code> | Notification recieved |
| topic | <code>external.topics.Topic</code> | Topic trigger post belongs to |
| post | <code>external.posts.CleanedPost</code> | Post that triggered notification |

<a name="module_Markov..random"></a>
### Markov~random(min, max) ⇒ <code>number</code>
Generate a random number in the specified range.

**Kind**: inner method of <code>[Markov](#module_Markov)</code>  
**Returns**: <code>number</code> - The generated number  

| Param | Type | Description |
| --- | --- | --- |
| min | <code>number</code> | The lower bound of the range |
| max | <code>number</code> | The upper bound of the range |

