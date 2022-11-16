import maxichrome from "./dist/index.cjs";

(async () => {
  // Twelve different colors different from each other
  const lightColors = await maxichrome(12, ['black']);
  const darkColors = await maxichrome(12, ['white']);

  const row = colors => colors.map(
    (color) => `<td style="background:${color}">${color}</td>`
  ).join('');

  console.log(`
<html>
  <head>
    <style>
      td{padding: 10em 1em}
    </style>
  </head>
  <body>
    <table>
      <tr style="color:black">${row(lightColors)}</tr>
      <tr style="color:white">${row(darkColors)}</tr>
    <table>
  </body>
</html>
`);
})();
