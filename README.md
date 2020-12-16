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

    let dataURL = SVG;
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

The `dataURLtoSVG(dataURL)` function converts the **Data URL** provided into an **unformatted SVG**.

### Step 2

The `dataURLtoSVG(dataURL)` function then verifies that the **unformatted SVG**:

 - has a valid **SVG Namespace**
 - represents **well-formed XML**

If either or both conditions are not met, the `dataURLtoSVG(dataURL)` function will return a verbose error detailing how the string may be fixed.

### Step 3

If both the conditions above are met, the `dataURLtoSVG(dataURL)` function will format the **valid SVG** and return a **formatted, valid SVG**.

________

### `dataURLtoSVG(dataURL)` :

```
const dataURLtoSVG = (dataURL) => {
  
  let output;


  // CONVERT DATA URL TO SVG
  let SVG = dataURL;

  SVG = SVG.replace('data:image/svg+xml,', '');
  SVG = decodeURIComponent(SVG);
  SVG = SVG.replace(/\'/g, '"');
  SVG = SVG.trim();


  // VALIDATE SVG
  const { SVGNamespaceMatches, wellFormedXML, parsedDocument } = validateSVG(SVG);


  // ASSIGN TO OUTPUT: FORMATTED SVG
  if ((SVGNamespaceMatches === true) && (wellFormedXML === true)) {

    // ADD A NEWLINE BEFORE EACH SVG ELEMENT
    SVG = SVG.replace('><', '>\n\n<');
    SVG = SVG.replace(/\>\<\/svg\>$/, '>\n\n</svg>');
    SVG = SVG.replace(/></g, '>\n<');

    // FORMAT SVG ROOT ELEMENT
    let svgRoot = SVG.match(/^\<svg([^\>]+?)\>/)[0];
    svgRootPieces = svgRoot.split('"');

    for (let i = 0; i < svgRootPieces.length; i = i + 2) {

      svgRootPieces[i] = svgRootPieces[i].split(' ').join('\n  ');
    }

    let reformattedRoot = svgRootPieces.join('"');
    SVG = SVG.replace(svgRoot, reformattedRoot);

    output = SVG;
  }


  // ELSE ASSIGN TO OUTPUT: ASHIVA CONSOLE WITH ANALYSIS OF SVG CODE
  else {

    output = consoleSVG({SVG, parsedDocument, SVGNamespaceMatches, wellFormedXML});
  }


  return output;
}

```
______

## Two more functions

Both `SVGtoDataURL(svg)` and `dataURLtoSVG(dataURL)` reference two further functions:

 - `validateSVG(SVG)` which checks:
   - if the SVG starts with the right namespace; and
   - if the SVG represents well-formed XML
   
 -  `consoleSVG(dataObject)` which returns a verbose Ashiva Console Message detailing where the SVG is invalid

________

### `validateSVG(SVG)` :

```
const validateSVG = (SVG) => {
  
  // VERIFY SVG NAMESPACE MATCHES
  const SVGNamespace = SVG.trim().replace(/\s+/g, ' ').substr(0, 39);
  const SVGNamespaceMatch = '<svg xmlns="http://www.w3.org/2000/svg"';
  const SVGNamespaceMatches = (SVGNamespace === SVGNamespaceMatch) ? true : false;

  // VERIFY SVG REPRESENTS WELL-FORMED XML
  const XMLParser = new DOMParser();
  const parsedDocument = XMLParser.parseFromString(SVG, 'image/svg+xml');
  const wellFormedXML = (parsedDocument.documentElement.nodeName.indexOf('parsererror') < 0) ? true : false;

  return { SVGNamespaceMatches, wellFormedXML, parsedDocument };
}
```

________

### `consoleSVG(dataObject)` :

```
const consoleSVG = (dataObject) => {

  const { SVG, parsedDocument, SVGNamespaceMatches, wellFormedXML } = dataObject;

  const SVGTitle = SVG.split('</title>')[0].split('<title>')[1];

  let console = '';
  console += '\n\n<!--\n\n';
  console += '  ⚠️ Ashiva Console:\n\n';

  if (SVGTitle !== undefined) {

    console += '  ⚠️ Issue: SVG Document with title "' + SVGTitle + '" is not validating as an SVG.\n\n';
  }

  else {

    console += '  ⚠️ Issue: SVG Document is not validating as an SVG.\n\n';
  }

  switch (true) {

    case ((SVGNamespaceMatches === false) && (wellFormedXML === false)) :
      console += '  ⚠️ Analysis: This SVG lacks a valid SVG Namespace AND this SVG is not well-formed XML.\n\n';
      break;

    case (SVGNamespaceMatches === false) :
      console += '  ⚠️ Analysis: This SVG lacks a valid SVG Namespace.\n\n';
      break;

    case (wellFormedXML === false) :
      console += '  ⚠️ Analysis: This SVG is not well-formed XML.\n\n';
      break;
  }


  if (SVGNamespaceMatches === false) {

    console += '  ⚠️ Next Step: Ensure this SVG begins with the following valid namespace:\n\n';
    console += '      xmlns="http://www.w3.org/2000/svg"\n\n';
  }


  if (wellFormedXML === false) {

    console += '  ⚠️ Next Step: Fix the XML of this SVG by following the error report below.\n\n';
    console += '  ⚠️ Error Report: ' + parsedDocument.documentElement.textContent.replace(/\n/g, '\n\n      ') + '\n\n';
  }

  console += '-->\n\n';

  return console;
}
```
