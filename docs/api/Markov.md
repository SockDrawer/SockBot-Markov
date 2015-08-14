<a name="module_Markov"></a>
## Markov
Markov

**Author:** RaceProUK  
**License**: MIT  

* [Markov](#module_Markov)
  * [.prepare(plugConfig, config, events, browser)](#module_Markov.prepare)
  * [.start()](#module_Markov.start)
  * [.stop()](#module_Markov.stop)
  * [.handler(notification, topic, post)](#module_Markov.handler)

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
<a name="module_Markov.handler"></a>
### Markov.handler(notification, topic, post)
Handle notifications

**Kind**: static method of <code>[Markov](#module_Markov)</code>  

| Param | Type | Description |
| --- | --- | --- |
| notification | <code>external.notifications.Notification</code> | Notification recieved |
| topic | <code>external.topics.Topic</code> | Topic trigger post belongs to |
| post | <code>external.posts.CleanedPost</code> | Post that triggered notification |

