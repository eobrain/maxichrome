# Generate a set of colors that are maximally different from each other

[![Build Status](https://travis-ci.com/eobrain/maxichrome.svg?branch=master)][1]

The `maxichrome` function returns the given number of HTML/CSS colors such that they are as different as possible to each other.

Optionally it can be given a fixed set of colors to avoid, for a color to be used as a contrasting background to all the colors.

## Using Server-Side in Node

Install:

```sh
npm install maxichrome
```

Write code:

```js
import maxichrome from 'maxichrome'

(async () => {

  // Four different colors different from each other
  const colors = await maxichrome(5)

  // Six different colors different from each other and from red and #884422
  const notReds = await maxichrome(6, ['red', '#884422'])

  console.table({ colors, notReds })

})()
```

The above code prints:

```sh
┌─────────┬───────────┬───────────┬───────────┬───────────┬───────────┬───────────┐
│ (index) │     0     │     1     │     2     │     3     │     4     │     5     │
├─────────┼───────────┼───────────┼───────────┼───────────┼───────────┼───────────┤
│ colors  │ '#a4009a' │ '#ff7eff' │  'black'  │ '#1c9500' │ '#38ff10' │           │
│ notReds │ 'yellow'  │ '#a744bb' │ '#0b1000' │ '#000067' │ '#b8e9ff' │ '#41eb59' │
└─────────┴───────────┴───────────┴───────────┴───────────┴───────────┴───────────┘
```

## Using In the Browser

Create this HTML file and view in browser:

```html
<html>

<head>
    <script type="module">
        import maxichrome from 'https://unpkg.com/maxichrome@0.1.0/src/web/index.js?module'
        (async () => {

            const colors = await maxichrome(10, ['lavenderblush'])

            listElement.innerHTML = colors
                .map(c => `<li style="color:${c}">${c}</li>`)
                .join('')

        })()
    </script>
</head>

<body style="background-color: lavenderblush">
    <ol id="listElement">
    </ol>
</body>

</html>
```

## Example

[12 colors][4]

## Technical details

The `maxichrome` function uses [CIEDE2000][2] as a measure of color difference.  This takes into account how human ability to distinguish colors varies across the space of colors.

It picks initial colors spread in a grid in RGB space, and then uses [hill climbing][3] to iteratively improve them to maximize the minimum perceptual difference of each color from all other colors.

[1]: https://travis-ci.com/eobrain/maxichrome
[2]: https://en.wikipedia.org/wiki/Color_difference#CIEDE2000
[3]: https://en.wikipedia.org/wiki/Hill_climbing
[4]: example.html