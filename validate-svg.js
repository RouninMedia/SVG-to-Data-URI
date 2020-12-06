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
