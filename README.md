# Generate a set of colors that are maximally different from each other

[![Build Status](https://travis-ci.com/eobrain/maxichrome.svg?branch=master)][1]


## Using Server-Side in Node

Install:

```sh
npm install maxichrome
```

```js
import maxichrome from 'maxichrome'

(async () => {
  const colors = await maxichrome(5)
  console.log(colors)
})()
```

The above code prints:

```sh
[ '#065d00', '#00b6f9', '#d900ab', '#000035', 'yellow' ]
```

## Using In the Browser

```html
<html>

<head>
    <script type="module">
        import maxichrome from 'https://unpkg.com/maxichrome@0.0.2/src/web/index.js?module'
        (async () => {
            const colors = await maxichrome(5)

            for(const color of colors) {
                list.insertAdjacentHTML('beforeend',
                    `<li style="color:${color}">${color}</li>`)
            }
        })()
    </script>
</head>

<body style="background-color: #AAA;">
    <ol id="list">
    </ol>
</body>

</html>
```

[1]: https://travis-ci.com/eobrain/maxichrome
