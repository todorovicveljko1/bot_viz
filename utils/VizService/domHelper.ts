const SELECTOR_REGEX = /([\w\-]+)?(#([\w\-]+))?((\.([\w\-]+))*)/;

export enum Namespace {
  HTML = "http://www.w3.org/1999/xhtml",
  SVG = "http://www.w3.org/2000/svg",
}

function _$<T extends Element>(
  namespace: Namespace,
  description: string,
  attrs?: { [key: string]: any },
  ...children: Array<Node | string>
): T {
  let match = SELECTOR_REGEX.exec(description);

  if (!match) {
    throw new Error("Bad use of emmet");
  }

  attrs = { ...(attrs || {}) };

  let tagName = match[1] || "div";
  let result: T;

  if (namespace !== Namespace.HTML) {
    result = document.createElementNS(namespace as string, tagName) as T;
  } else {
    result = document.createElement(tagName) as unknown as T;
  }

  if (match[3]) {
    result.id = match[3];
  }
  if (match[4]) {
    result.classList.add(...match[4].replace(/\./g, " ").trim().split(" "));
  }

  Object.keys(attrs).forEach((name) => {
    const value = attrs![name];

    if (typeof value === "undefined") {
      return;
    }

    if (/^on\w+$/.test(name)) {
      (<any>result)[name] = value;
    } else if (name === "selected") {
      if (value) {
        result.setAttribute(name, "true");
      }
    } else {
      result.setAttribute(name, value);
    }
  });

  result.append(...children);

  return result as T;
}

export function $<T extends HTMLElement>(
  description: string,
  attrs?: { [key: string]: any },
  ...children: Array<Node | string>
): T {
  return _$(Namespace.HTML, description, attrs, ...children);
}

$.SVG = function <T extends SVGElement>(
  description: string,
  attrs?: { [key: string]: any },
  ...children: Array<Node | string>
): T {
  return _$(Namespace.SVG, description, attrs, ...children);
};
