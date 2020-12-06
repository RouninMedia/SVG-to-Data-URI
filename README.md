# SVG to Data URL

The function `SVGtoDataURL(svg)` converts any **valid SVG** into a **Data URL**.

The function `dataURLtoSVG(dataURL)` converts a **Data URL** which satisfies certain criteria into a **valid SVG**.

______

## SVG to Data URL Function

### Step 1

The `SVGtoDataURL(svg)` function verifies that the string passed to the function:

 - has a valid **SVG Namespace**
 - represents **well-formed XML**

If either or both conditions are not met, the `SVGtoDataURL(svg)` function will return a verbose error detailing how the string may be fixed.

### Step 2

If both the conditions above are met, the `SVGtoDataURL(svg)` function returns the validated SVG as a **Data URL**.

________

### `SVGtoDataURL(svg)` :
```
const SVGToDataURL = (SVG) => {

  let output;
  const { SVGNamespaceMatches, wellFormedXML, parsedDocument } = validateSVG(SVG);

  // ASSIGN TO OUTPUT: SVG CONVERTED INTO DATA URL
  if ((SVGNamespaceMatches === true) && (wellFormedXML === true)) {

  	dataURL = SVG;
    dataURL = dataURL.replace(/(\s*\n)+\s*/g, ' ');
    dataURL = dataURL.replace(/\>\s+\</g, '><');
    dataURL = dataURL.replace(/\s\/>/g, '/>');
    dataURL = dataURL.replace(/\"/g, '\'');
    dataURL = dataURL.trim();

    const characterArray = dataURL.split('');

    for (let i = 0; i < characterArray.length; i++) {

      if (characterArray[i].match(/[A-Za-z0-9\.\,\;\:\/\*\-\=\_\~\'\!\$\@]/) === null) {

      	characterArray[i] = encodeURIComponent(characterArray[i]);
      }
    }

    dataURL = 'data:image/svg+xml,' + characterArray.join('');

    output = dataURL;
  }


  // ELSE ASSIGN TO OUTPUT: ASHIVA CONSOLE WITH ANALYSIS OF SVG CODE
  else {

    output = consoleSVG({SVG, parsedDocument, SVGNamespaceMatches, wellFormedXML});
  }

  return output;
}

```

______

## Data URL to SVG Function

Naturally, a function like `SVGtoDataURL(svg)`, above, needs a corresponding function which can perform the same transformation in reverse.

`dataURLtoSVG(dataURL)` will convert the **Data URL** (which conforms to certain constraints) into a valid, namespaced, well-formed **SVG**.

If the function cannot build an **SVG** out of the **Data URL**, it will return a verbose error, explaining why not.

### Step 1

The `dataURLtoSVG(dataURL)` function converts the **Data URL** provided into an unformatted **SVG**.

### Step 2

The `dataURLtoSVG(dataURL)` function then verifies that the unformatted **SVG**:

 - has a valid **SVG Namespace**
 - represents **well-formed XML**

If either or both conditions are not met, the `dataURLtoSVG(dataURL)` function will return a verbose error detailing how the string may be fixed.

### Step 3

If both the conditions above are met, the `dataURLtoSVG(dataURL)` function will format the **valid SVG** and return the **formatted, valid SVG**.

________

### `dataURLtoSVG(dataURL)` :

```


```
______

