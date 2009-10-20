/* Copyright (C) 2009 Microsoft Corporation */
var CompatVersion = "9.080509.0";
new function() {
	var f, b = navigator.userAgent.indexOf("WebKit") >= 0, a = window.opera != null, c = navigator.userAgent
			.indexOf("Mozilla") >= 0
			&& !a && !b, d = 0;
	window.$Browser = {
		isMozilla : function() {
			return c
		},
		isOpera : function() {
			return a
		},
		isSafari : function() {
			return b
		},
		attachEventCompatibility : function(a) {
			var c = a.HTMLElement.prototype;
			function b(a) {
				window.event = a
			}
			$Browser.Button = {
				LEFT : 0,
				RIGHT : 2,
				MIDDLE : 1
			};
			function g(c, f, g) {
				var a = f.slice(2);
				if (a == "mousewheel")
					a = "DOMMouseScroll";
				if (a != "mouseenter" && a != "mouseleave")
					c.addEventListener(a, b, true);
				else {
					c.addEventListener("mouseover", b, true);
					c.addEventListener("mouseout", b, true);
					c.addEventListener("mouseover", d, false);
					c.addEventListener("mouseout", e, false)
				}
				c.addEventListener(a, g, false)
			}
			function d(b) {
				if (!this.contains(b.fromElement)) {
					var a = document.createEvent("MouseEvents");
					a.initEvent("mouseenter", false, false);
					this.dispatchEvent(a)
				}
			}
			function e(b) {
				if (!this.contains(b.toElement)) {
					var a = document.createEvent("MouseEvents");
					a.initEvent("mouseleave", false, false);
					this.dispatchEvent(a)
				}
			}
			function f(d, b, c) {
				var a = b.slice(2);
				if (b == "mousewheel")
					a = "DOMMouseScroll";
				d.removeEventListener(a, c, false)
			}
			a.attachEvent = a.HTMLDocument.prototype.attachEvent = c.attachEvent = function(
					b, a) {
				g(this, b, a);
				return true
			};
			a.detachEvent = a.HTMLDocument.prototype.detachEvent = c.detachEvent = function(
					b, a) {
				f(this, b, a);
				return true
			}
		},
		attachStyleCompatibility : function(b) {
			var a = b.CSSStyleDeclaration.prototype, d = b.HTMLElement.prototype;
			function c(e) {
				var d = ["Top", "Left", "Right", "Bottom"], a = document.defaultView
						.getComputedStyle(e, null);
				for (var c = 0; c < d.length; c++) {
					var b = d[c];
					this["border" + b + "Width"] = a.getPropertyValue("border-"
							+ b + "-width");
					this["margin" + b] = a.getPropertyValue("margin-" + b);
					this["padding" + b] = a.getPropertyValue("padding-" + b)
				}
				this["position"] = a.getPropertyValue("position");
				this["height"] = a.getPropertyValue("height");
				this["width"] = a.getPropertyValue("width");
				this["zIndex"] = a.getPropertyValue("z-index");
				this["color"] = a.getPropertyValue("color");
				this["direction"] = a.getPropertyValue("direction");
				this["overflowY"] = a.getPropertyValue("overflow-y");
				this["display"] = a.getPropertyValue("display");
				return this
			}
			d.__defineGetter__("currentStyle", function() {
						return new c(this)
					});
			a.__proto__ = {
				__proto__ : a.__proto__
			};
			a.__defineGetter__("pixelLeft", function() {
						return parseInt(this.left, 10) || 0
					});
			a.__defineSetter__("pixelLeft", function(a) {
						this.left = a + "px"
					});
			a.__defineGetter__("pixelHeight", function() {
						return parseInt(this.height, 10) || 0
					});
			a.__defineSetter__("pixelHeight", function(a) {
						this.height = a + "px"
					});
			a.__defineGetter__("pixelTop", function() {
						return parseInt(this.top, 10) || 0
					});
			a.__defineSetter__("pixelTop", function(a) {
						this.top = a + "px"
					});
			a.__defineGetter__("pixelWidth", function() {
						return parseInt(this.width, 10) || 0
					});
			a.__defineSetter__("pixelWidth", function(a) {
						this.width = a + "px"
					});
			a.__defineSetter__("filter", function(a) {
						$Browser._Private.Filters.applyFilter(this, a)
					});
			a.__defineGetter__("cssText", function() {
						var b = "";
						for (var a = 0; a < this.cssRules.length; a++)
							b += this.cssRules[a].cssText;
						return b
					})
		},
		attachMozillaCompatibility : function(a) {
			a.document.documentElement.className += " Mozilla";
			var b = a.HTMLElement.prototype, t = a.HTMLDocument.prototype, c = a.Event.prototype, u = a.CSSStyleDeclaration.prototype, d = a.Document.prototype, g = a.Node.prototype, n = a.StyleSheet.prototype, k = a.HTMLStyleElement.prototype, q = a.document
					.getElementsByName("Web.moz-custom");
			if (q.length > 0)
				$Browser.MozillaCompatMode = q[0].getAttribute("content")
						.toLowerCase() == "enabled";
			else
				$Browser.MozillaCompatMode = false;
			$Browser.attachSharedCompatibility(a);
			$Browser.attachEventCompatibility(a);
			a.createPopup = $Browser._Private.CreatePopup;
			d.__proto__ = {
				__proto__ : d.__proto__
			};
			d.__defineGetter__("xml", function() {
						return (new XMLSerializer).serializeToString(this)
					});
			d.scripts = document.getElementsByTagName("script");
			d.createStyleSheet = function() {
				var a = document.createElement("style");
				a.type = "text/css";
				document.getElementsByTagName("head")[0].appendChild(a);
				return a
			};
			d.selection = {};
			d.selection.clear = function() {
				window.getSelection().deleteFromDocument()
			};
			d.selection.empty = function() {
				window.getSelection().removeAllRanges()
			};
			d.selection.createRange = function() {
				return window.getSelection().getRangeAt(0)
			};
			b.contains = function(a) {
				while (a != null && a != this)
					a = a.parentElement;
				return a != null
			};
			b.filters = $Browser._Private.MozillaFilterSub();
			var f = false, p = document.getElementsByTagName("HTML")[0];
			function h(a) {
				if (f) {
					a.preventDefault();
					a.returnValue = false;
					document.removeEventListener("mousemove", h, true);
					var b = document.createEvent("MouseEvents");
					b.initMouseEvent(a.type, a.bubbles, a.cancelable, a.view,
							a.detail, a.screenX, a.screenY, a.clientX,
							a.clientY, a.ctrlKey, a.altKey, a.shiftKey,
							a.metaKey, a.button, a.relatedTarget);
					b._FixOffset = $Browser._Private
							.getNonTextNode(a.srcElement);
					if (b._FixOffset == p)
						b._FixOffset = document.body;
					f.dispatchEvent(b);
					document.addEventListener("mousemove", h, true);
					a.stopPropagation();
					a._FixOffset = null
				}
			}
			function j(a) {
				if (f) {
					document.removeEventListener("mouseup", j, true);
					document.removeEventListener("mousemove", h, true);
					var d = a.bubbles, c = a.cancelable;
					if (a.type == "mouseup") {
						d = false;
						c = false
					}
					var b = document.createEvent("MouseEvents");
					b.initMouseEvent(a.type, d, c, a.view, a.detail, a.screenX,
							a.screenY, a.clientX, a.clientY, a.ctrlKey,
							a.altKey, a.shiftKey, a.metaKey, a.button,
							a.relatedTarget);
					b._FixOffset = $Browser._Private
							.getNonTextNode(a.srcElement);
					if (b._FixOffset == p)
						b._FixOffset = document.body;
					f.dispatchEvent(b);
					f = null;
					a.stopPropagation();
					a.preventDefault();
					a._FixOffset = null
				}
			}
			function e(a) {
				a.stopPropagation();
				a.preventDefault()
			}
			function l(a) {
				if (a.button != 0 && a.button != 1)
					a.stopPropagation()
			}
			function o() {
				a.detachEvent("onunload", o, true);
				a.document.removeEventListener("click", l, true)
			}
			a.attachEvent("onunload", o, true);
			a.document.addEventListener("click", l, true);
			b.click = function() {
				var b = document.createEvent("MouseEvents");
				b.initEvent("click", true, true);
				var c = this.dispatchEvent(b);
				if (c || typeof event.returnValue == "boolean"
						&& event.returnValue) {
					var a = this;
					while (a)
						if (a.tagName == "A" && a.href != "") {
							if (a.target)
								window.open(a.href, a.target);
							else
								document.location = a.href;
							a = null
						} else
							a = a.parentElement
				}
			};
			b.setCapture = function() {
				f = this;
				document.addEventListener("mousemove", h, true);
				document.addEventListener("mouseover", e, true);
				document.addEventListener("mouseout", e, true);
				document.addEventListener("mouseenter", e, true);
				document.addEventListener("mouseleave", e, true);
				document.addEventListener("mouseup", j, true)
			};
			b.releaseCapture = function() {
				f = null;
				document.removeEventListener("mousemove", h, true);
				document.removeEventListener("mouseover", e, true);
				document.removeEventListener("mouseout", e, true);
				document.removeEventListener("mouseenter", e, true);
				document.removeEventListener("mouseleave", e, true);
				document.removeEventListener("mouseup", j, true)
			};
			b.insertAdjacentElement = function(b, a) {
				switch (b.toLowerCase()) {
					case "beforebegin" :
						return this.parentNode.insertBefore(a, this);
						break;
					case "beforeend" :
						return this.appendChild(a);
						break;
					case "afterbegin" :
						return this.insertBefore(a, this.firstChild);
						break;
					case "afterend" :
						if (this.nextSibling)
							return this.parentNode.insertBefore(a,
									this.nextSibling);
						else
							return this.parentNode.appendChild(a);
						break;
					default :
						throw "Invalid Argument";
				}
				return null
			};
			$Browser.attachStyleCompatibility(a);
			n.__defineSetter__("cssText", function(a) {
						this.ownerNode.innerHTML = a
					});
			n.__defineGetter__("cssText", function() {
						return this.ownerNode.innerHTML
					});
			k.__defineSetter__("cssText", function(a) {
						this.innerHTML = a
					});
			k.__defineGetter__("cssText", function() {
						return this.innerHTML
					});
			b.__proto__ = {
				__proto__ : b.__proto__
			};
			b.__defineGetter__("children", function() {
						var b = [], d = this.childNodes.length;
						for (var a = 0; a < d; a++) {
							var c = this.childNodes[a];
							if (c.nodeType == 1)
								b.push(c)
						}
						return b
					});
			b.__defineGetter__("parentElement", function() {
						return $Browser._Private
								.getNonTextNode(this.parentNode)
					});
			b.__defineGetter__("document", function() {
						return this.ownerDocument
					});
			b.__defineGetter__("onfilterchange", function() {
						return this.filters.onfilterchange
					});
			b.__defineSetter__("onfilterchange", function(a) {
						this.filters.onfilterchange = a
					});
			b.__defineGetter__("filters", function() {
						return []
					});
			b.__defineGetter__("innerText", function() {
						try {
							return this.textContent
						} catch (c) {
							var b = "";
							for (var a = 0; a < this.childNodes.length; a++)
								if (this.childNodes[a].nodeType == 3)
									b += this.childNodes[a].textContent;
							return b
						}
					});
			function r(e) {
				var a = [], f = e.length, d;
				for (var c = 0; c < f; c++) {
					var b = e.charAt(c);
					switch (b) {
						case "<" :
							a.push("&lt;");
							break;
						case ">" :
							a.push("&gt;");
							break;
						case '"' :
							a.push("&quot;");
							break;
						case "&" :
							a.push("&amp;");
							break;
						case " " :
							if (d == " ")
								a.push("&nbsp;");
							else
								a.push(" ");
							break;
						case "\r" :
							break;
						case "\n" :
							a.push("\r\n\r\n<br />");
							break;
						default :
							a.push(b)
					}
					d = b
				}
				return a.join("")
			}
			b.__defineSetter__("innerText", function(a) {
						if (a)
							this.innerHTML = r(a);
						else
							this.innerHTML = ""
					});
			a.XMLDocument.prototype.transformNodeToObject = function(c) {
				var a = new XSLTProcessor;
				a.importStylesheet(c);
				var b = document.implementation.createDocument("", "", null);
				return a.transformToFragment(this, b)
			};
			a.XMLDocument.prototype.loadXML = function(c) {
				var b = (new DOMParser).parseFromString(c, "text/xml");
				while (this.hasChildNodes())
					this.removeChild(this.lastChild);
				for (var a = 0; a < b.childNodes.length; a++)
					this.appendChild(this.importNode(b.childNodes[a], true))
			};
			a.XMLDocument.prototype.transformNode = function(c) {
				var a = new XSLTProcessor;
				a.importStylesheet(c);
				var d = document.implementation.createDocument("", "", null), b = a
						.transformToDocument(this);
				return b.xml
			};
			a.XMLDocument.prototype.setProperty = function() {
				return null
			};
			a.XMLDOMParser = a.DOMParser;
			a.DocumentFragment.prototype.getElementById = function(e) {
				var d = [], c = this.childNodes, a, b;
				for (b = 0; b < c.length; b++) {
					a = c[b];
					if (a.nodeType == 1)
						d.queue(a)
				}
				while (d.length) {
					a = d.dequeue();
					if (a.id == e)
						return a;
					c = a.childNodes;
					if (c.length != 0)
						for (b = 0; b < c.length; b++) {
							a = c[b];
							if (a.nodeType == 1)
								d.queue(a)
						}
				}
				return null
			};
			a.DocumentFragment.prototype.createElement = function(a) {
				return document.createElement(a)
			};
			function m(d, g, a) {
				a = a ? a : d;
				var f = new XPathEvaluator, c = f.evaluate(g, a, d
								.createNSResolver(d.documentElement),
						XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null), e = new Array(c.snapshotLength);
				for (var b = 0; b < c.snapshotLength; b++)
					e[b] = c.snapshotItem(b);
				return e
			}
			function s(e, c, d) {
				c += "[1]";
				var a = m(e, c, d);
				if (a.length != 0)
					for (var b = 0; b < a.length; b++)
						if (a[b])
							return a[b];
				return null
			}
			a.XMLDocument.prototype.selectNodes = function(b, a) {
				return m(this, b, a)
			};
			a.XMLDocument.prototype.selectSingleNode = function(b, a) {
				return s(this, b, a)
			};
			a.Node.prototype.selectNodes = function(a) {
				var b = this.ownerDocument;
				return b.selectNodes(a, this)
			};
			a.Node.prototype.selectSingleNode = function(a) {
				var b = this.ownerDocument;
				return b.selectSingleNode(a, this)
			};
			g.__proto__ = {
				__proto__ : g.__proto__
			};
			g.__defineGetter__("baseName", function() {
						return this.localName
					});
			g.__defineGetter__("xml", function() {
						return (new XMLSerializer).serializeToString(this)
					});
			g.__defineGetter__("text", function() {
						return this.textContent
					});
			g.__defineSetter__("text", function(a) {
						this.textContent = a
					});
			function i(a) {
				var b = {
					x : 0,
					y : 0
				};
				while (a) {
					b.x += a.offsetLeft;
					b.y += a.offsetTop;
					a = a.offsetParent
				}
				return b
			}
			c.__proto__ = {
				__proto__ : c.__proto__
			};
			c.__defineGetter__("srcElement", function() {
						var a = this._FixOffset;
						if (!a)
							a = $Browser._Private.getNonTextNode(this.target);
						return a
					});
			c.__defineSetter__("cancelBubble", function(a) {
						if (a)
							this.stopPropagation()
					});
			c.__defineGetter__("offsetX", function() {
						return window.pageXOffset
								+ this.clientX
								- (this._FixOffset
										? i(this._FixOffset).x
										: i(this.srcElement).x)
					});
			c.__defineGetter__("offsetY", function() {
						return window.pageYOffset
								+ this.clientY
								- (this._FixOffset
										? i(this._FixOffset).y
										: i(this.srcElement).y)
					});
			c.__defineGetter__("x", function() {
						return this.offsetX
					});
			c.__defineGetter__("y", function() {
						return this.offsetY
					});
			c.__defineGetter__("returnValue", function() {
						return this.cancelDefault
					});
			c.__defineSetter__("returnValue", function(a) {
						if (!a)
							this.preventDefault();
						this.cancelDefault = a;
						return a
					});
			c.__defineGetter__("button", function() {
						return this.which == 1 ? 1 : this.which == 3 ? 2 : 0
					})
		},
		attachOperaCompatibility : function(a) {
			var c = a.Document.prototype;
			try {
				a.maxConnectionsPerServer = parseInt(a.maxConnectionsPerServer)
						|| 8
			} catch (e) {
			}
			a.document.documentElement.className += " Opera";
			$Browser.attachSharedCompatibility(a);
			function b(a, f, b) {
				b = b ? b : a;
				if (!(a instanceof Document))
					a = a.ownerDocument;
				var d = a.evaluate(f, b, null,
						XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null), e = new Array(d.snapshotLength);
				for (var c = 0; c < d.snapshotLength; c++)
					e[c] = d.snapshotItem(c);
				return e
			}
			function d(f, d, e) {
				d += "[1]";
				var a = b(f, d, e);
				if (a.length != 0)
					for (var c = 0; c < a.length; c++)
						if (a[c])
							return a[c];
				return null
			}
			a.Element.prototype.selectNodes = c.selectNodes = function(c, a) {
				return b(this, c, a)
			};
			c.selectSingleNode = function(b, a) {
				return d(this, b, a)
			};
			a.Element.prototype.setCapture = function() {
			};
			a.Element.prototype.releaseCapture = function() {
			}
		},
		attachSafariCompatibility : function(a) {
			a.document.documentElement.className += " Safari";
			var b = a.Element.prototype;
			b.setCapture = function() {
			};
			b.releaseCapture = function() {
			};
			b.__defineGetter__("document", function() {
						return this.ownerDocument
					});
			function c(a, f, b) {
				b = b ? b : a;
				if (!(a instanceof Document))
					a = a.ownerDocument;
				var d = a.evaluate(f, b, null,
						XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null), e = new Array(d.snapshotLength);
				for (var c = 0; c < d.snapshotLength; c++)
					e[c] = d.snapshotItem(c);
				return e
			}
			b.selectNodes = function(b, a) {
				return c(this, b, a)
			};
			$Browser.attachSharedCompatibility(a);
			$Browser.attachEventCompatibility(a);
			$Browser.attachStyleCompatibility(a)
		},
		attachSharedCompatibility : function(b) {
			var c = b.HTMLElement.prototype;
			b.CollectGarbage = function() {
			};
			b._ce = function(a) {
				return document.createElement(a)
			};
			b._ge = function(a) {
				return document.getElementById(a)
			};
			b._get = function(a) {
				return document.getElementsByTagName(a)
			};
			if (!a) {
				c.removeNode = function() {
					return this.parentNode
							? this.parentNode.removeChild(this)
							: this
				}, c.__defineGetter__("uniqueID", function() {
							var a = this._uniqueID;
							if (!a)
								a = this._uniqueID = "ms_id" + d++;
							return a
						});
				c.insertAdjacentHTML = function(d, c) {
					var b, a = this.ownerDocument.createRange();
					switch (d.toLowerCase()) {
						case "beforebegin" :
							a.setStartBefore(this);
							b = a.createContextualFragment(c);
							return this.parentNode.insertBefore(b, this);
						case "afterbegin" :
							a.selectNodeContents(this);
							a.collapse(true);
							b = a.createContextualFragment(c);
							return this.insertBefore(b, this.firstChild);
						case "beforeend" :
							a.selectNodeContents(this);
							a.collapse(false);
							b = a.createContextualFragment(c);
							return this.appendChild(b);
						case "afterend" :
							a.setStartAfter(this);
							b = a.createContextualFragment(c);
							return this.parentNode.insertBefore(b,
									this.nextSibling);
						default :
							throw "Invalid Argument";
					}
				};
				c.swapNode = function(a) {
					var b = this.nextSibling, c = this.parentNode;
					a.parentNode.replaceChild(this, a);
					c.insertBefore(a, b)
				};
				c.replaceNode = function(a) {
					this.parentNode.replaceChild(a, this)
				}
			}
			var e = b.Event.prototype;
			e.__defineGetter__("fromElement", function() {
						var a;
						if (this.type == "mouseover")
							a = this.relatedTarget;
						else if (this.type == "mouseout")
							a = this.target;
						else if (this.type == "focusin")
							a = window.__lastElt;
						return $Browser._Private.getNonTextNode(a)
					});
			e.__defineGetter__("toElement", function() {
						var a = null, b;
						try {
							if (this.type == "mouseout")
								a = this.relatedTarget;
							else if (this.type == "mouseover")
								a = this.target;
							else if (this.type == "focusout")
								a = window.__lastElt
						} catch (c) {
						}
						return $Browser._Private.getNonTextNode(a)
					})
		},
		_Private : {
			cleanupFirefox : function(a) {
				var b, e;
				try {
					e = a.status
				} catch (k) {
				}
				if (e == 200)
					try {
						var i = a.responseXML.documentElement
					} catch (k) {
						if (window.DOMParser)
							try {
								var h = new DOMParser, f = h.parseFromString(
										a.responseText.toString(), "text/xml");
								b = {};
								b.responseText = a.responseText;
								b.responseXML = f;
								var d = a.getAllResponseHeaders(), c = {};
								function g(b) {
									var a = b.split(":");
									if (a[1])
										c[a[0]] = a[1].trim()
								}
								d.split("\n").forEach(g);
								b.getAllResponseHeaders = function() {
									return d
								};
								b.getResponseHeader = function(a) {
									return c[a]
								};
								b.statusText = a.statusText;
								b.status = a.status;
								a = b
							} catch (l) {
								a = null
							}
						else
							a = null
					}
				return a
			},
			getNonTextNode : function(a) {
				try {
					while (a && a.nodeType != 1)
						a = a.parentNode
				} catch (b) {
					a = null
				}
				return a
			},
			CreatePopup : function() {
				var a = {};
				a.document = document.createDocumentFragment();
				a.document.body = a.document.appendChild(document
						.createElement("div"));
				a.document.close = a.document.open = function() {
				};
				a.document.write = function(b) {
					a.document.body.innerHTML += b
				};
				a.show = function(i, j, h, g, c) {
					if (!Web.Dom)
						throw new Error("Missing Coreui.js");
					if (!c)
						c = document.body;
					var d = Web.Dom.GetLocation(c);
					a.document.body.style.cssText = "z-index:100;position:absolute;margin:0px;padding:0px;top:{0}px;left:{1}px;width:{2}px;height:{3}px;background:white"
							.format(j + d.top, i + d.left, h, g);
					var b = document.body.appendChild(a.document.body);
					document.addEventListener("mousedown", e, true);
					b.onclicktemp = a.document.onclick;
					b.onclick = f;
					function e(c) {
						if (!a.document.body.contains(c.target)) {
							c.stopPropagation();
							b.removeNode()
						}
						document.removeEventListener("mousedown", e, true)
					}
					function f() {
						if (this.onclicktemp)
							this.onclicktemp();
						b.removeNode()
					}
				};
				return a
			},
			MozillaModal : function(p, o, f, j) {
				if (!f)
					f = "";
				f = f.removeSpaces();
				var i = f.split(","), b = f = "", k = false, g = false, e = 0, d = 0;
				for (var h = 0; h < i.length; h++) {
					var l = i[h].split(":"), n = l[0].toLowerCase(), c = l[1];
					switch (n) {
						case "dialogheight" :
							b += "height=" + c;
							e = c;
							break;
						case "dialogwidth" :
							b += "width=" + c;
							d = c;
							break;
						case "dialogtop" :
							b += "top=" + c;
							g = true;
							break;
						case "dialogleft" :
							b += "left=" + c;
							g = true;
							break;
						case "resizable" :
							b += "resizable=" + c;
							break;
						case "status" :
							b += "status=" + c;
							break;
						case "center" :
							k = true
					}
					if (n != "center")
						b += ","
				}
				if (k && !g) {
					if (e != 0)
						e = $Number.coerceInt(e);
					else
						e = 300;
					if (d != 0)
						d = $Number.coerceInt(d);
					else
						d = 300;
					if (e != "" || d != "") {
						b += "screenX=" + (screen.availHeight - d) / 2 + ",";
						b += "screenY=" + (screen.availWidth - e) / 2
					}
				}
				var a = window.open(p, "", b);
				$Browser.AttachMozillaCompatibility(a);
				a.dialogArguments = o;
				resetModal = function(b) {
					if (a && !a.closed) {
						b.stopPropagation();
						a.focus()
					}
				};
				var m = "";
				grabReturn = function() {
					if (a && !a.closed) {
						m = a.returnValue;
						setTimeout(CheckClose, 0)
					}
				};
				CheckClose = function() {
					if (a.closed) {
						if (j)
							j(m);
						window.removeEventListener("focus", resetModal, true)
					}
				};
				hookEvents = function() {
					a.onunload = grabReturn;
					window.addEventListener("focus", resetModal, true)
				};
				setTimeout(hookEvents, 0)
			},
			MozillaFilterMethods : ["addAmbient", "addCone", "addPoint",
					"apply", "changeColor", "changeStrength", "clear",
					"moveLight"],
			MozillaFilterEventMethods : ["play", "stop"],
			MozillaFilterSub : function() {
				var b = $Browser._Private;
				for (var a = 0; a < b.MozillaFilterMethods.length; a++)
					this[b.MozillaFilterMethods[a]] = c;
				for (var a = 0; a < b.MozillaFilterEventMethods.length; a++)
					this[b.MozillaFilterEventMethods[a]] = d;
				function c() {
				}
				function d() {
					if (this.onfilterchange)
						this.onfilterchange()
				}
				return this
			},
			Filters : {
				_filterDeclarationExpression : /progid:([^\(]+)\(([^\)]+)\)/gi,
				applyFilter : function(c, e) {
					var a, b = {};
					while (a = $Browser._Private.Filters._filterDeclarationExpression
							.exec(e)) {
						var d = Object.resolve("$Browser._Private.Filters."
								+ a[1]);
						if (d)
							b[a[1]] = new d(c, $Browser._Private.Filters
											.parseParams(a[2]))
					}
					c.filters = b
				},
				parseParams : function(e) {
					var b = e.split(","), d = {};
					for (var a = 0; a < b.length; a++) {
						var c = b[a].split("=");
						d[c[0].toLowerCase()] = $Browser._Private.Filters
								.cleanParam(c[1])
					}
					return d
				},
				cleanParam : function(a) {
					if (a.indexOf("'") == 0)
						return a.substring(1, a.length - 1);
					return a.toLowerCase()
				},
				DXImageTransform : {
					Microsoft : {
						Alpha : function(a, b) {
							var c = Number(b.opacity);
							a.opacity = Number.coerceFloat(b.opacity) / 100;
							a.mozOpacity = a.opacity
						},
						AlphaImageLoader : function(a, b) {
							a.backgroundImage = "url(" + b.src + ")";
							switch (b.sizingMethod) {
								case "crop" :
									a.backgroundRepeat = "no-repeat"
							}
						},
						Blur : function(a, c) {
							if (c.makeshadow == "true") {
								var b = Number.coerceFloat(c.shadowopacity);
								a.opacity = b;
								a.mozOpacity = b;
								a.backgroundColor = "#000000";
								a.margin = "3px"
							}
						}
					}
				}
			}
		}
	};
	if (c)
		$Browser.attachMozillaCompatibility(window);
	else if (a)
		$Browser.attachOperaCompatibility(window);
	else if (b)
		$Browser.attachSafariCompatibility(window);
	CompatExtension = {};
	CompatExtension["c_focus"] = function e(a) {
		if (!a.__lastElt)
			a.__lastElt = a.document;
		a.__blurTimeout = 0;
		a.HTMLDocument.prototype.__defineGetter__("parentWindow", function() {
					return a
				});
		var c = a.document.documentElement;
		c.addEventListener("focus", f, true);
		c.addEventListener("mousedown", d, true);
		a.addEventListener("focus", g, true);
		a.addEventListener("blur", h, true);
		function d(c) {
			if (a.__lastElt != c.srcElement) {
				var d = c.srcElement;
				a.setTimeout(function() {
							b("focus", d)
						}, 0)
			}
		}
		function g() {
			if (a.__blurTimeout != 0) {
				a.clearTimeout(a.__blurTimeout);
				a.__blurTimeout = 0
			}
			if (a.__userLeftBrowser) {
				b("focusin", a.__lastElt);
				a.__userLeftBrowser = false
			}
		}
		function h() {
			if (a.__blurTimeout == 0)
				a.__blurTimeout = a.setTimeout(e, 100)
		}
		function e() {
			var c = a.__lastElt;
			a.__lastElt = null;
			a.__userLeftBrowser = true;
			a.__blurTimeout == 0;
			b("focusout", c);
			a.__lastElt = c
		}
		function f(c) {
			if (a.__lastElt) {
				var d = a.__lastElt;
				a.__lastElt = c.srcElement;
				b("focusout", d);
				a.__lastElt = d
			}
			b("focusin", c.srcElement);
			a.__lastElt = c.srcElement
		}
		function b(c, d) {
			var b = a.document.createEvent("Event");
			b.initEvent(c, true, false);
			d.dispatchEvent(b)
		}
		a.HTMLElement.prototype.setActive = function i() {
			this.focus()
		};
		if (!a.document.activeElement)
			a.HTMLDocument.prototype.__defineGetter__("activeElement",
					function() {
						return a.__lastElt
					})
	};
	CompatExtension["c_focus"](window)
};
var $Version = "9.080930.0";
if (typeof $Debug == "undefined")
	window.$Debug = {
		enabled : false,
		trace : function() {
		}
	};
function registerNamespace() {
	var g = arguments.length;
	for (var b = 0; b < g; b++) {
		var a = this, d = arguments[b].split("."), f = d.length;
		for (var c = 0; c < f; c++) {
			var e = d[c];
			a = a[e] || (a[e] = function() {
			})
		}
	}
	return a
}
Function.prototype.registerNamespace = registerNamespace;
registerNamespace("$Browser");
$Browser._isIE = false;
$Browser.isIE = function() {
	return false
};
var _dh = document.head;
if (!_dh)
	_dh = document.head = _get("head")[0];
$Browser.version = parseFloat(window.navigator.appVersion.appVersion);
new function() {
	var a = window.Function, b = a.prototype;
	a.abstractMethod = function() {
		throw new Error("Requires implementation");
	};
	a.createCallback = function(b, a) {
		return function() {
			if (a)
				return b.apply(this, a);
			else
				return b.apply(this)
		}
	};
	a.createDelegate = function(a, b) {
		return function() {
			if (arguments.length > 0)
				return b.apply(a, arguments);
			else
				return b.apply(a)
		}
	};
	a.emptyFunction = a.emptyMethod = function() {
	};
	a._htClasses = {};
	a.parse = function f(c) {
		if (typeof c === "function")
			return c;
		var b = a._htClasses[c];
		if (!b && c)
			try {
				var d = 0, e = c.split("."), b = window, f = e.length;
				for (d; d < f; d++) {
					b = b[e[d]];
					if (!b) {
						b = null;
						break
					}
				}
				if (typeof b != "function")
					b = null;
				else
					a._htClasses[c] = b
			} catch (g) {
				b = null
			}
		return b
	};
	a.eventHelper = function(a, b) {
		function c() {
			if (Object.isBoolean(b))
				event.cancelBubble = b;
			if (a != null) {
				event.returnValue = a;
				if (Object.isBoolean(a))
					return a
			}
		}
		return c
	};
	a.KillEvent = Function.eventHelper(false, true);
	a.CancelBubble = Function.eventHelper(null, true);
	a.CancelDefault = Function.eventHelper(false);
	b.getBaseMethod = function e(f, b) {
		var a = this.base || Function.parse(this.__baseType);
		if (a) {
			var e = a, d = f._baseMethods;
			if (d)
				while (a) {
					var c = d[a.__typeName + "." + b];
					if (c)
						return c;
					a = a.base || Function.parse(a.__baseType)
				}
			return e.prototype[b]
		}
		return null
	};
	b.registerBaseMethod = function(a, b) {
		if (!a._baseMethods)
			a._baseMethods = {};
		a._baseMethods[this.__typeName + "." + b] = a[b]
	};
	b._processBaseType = function c(c) {
		if (c.__basePrototypePending && this.__baseType) {
			var b = this.base
					|| (this.__baseType instanceof Function
							? this.__baseType
							: a.parse(this.__baseType));
			if (!b._parentBase)
				b._parentBase = [c.__typeName];
			else
				b._parentBase.push(c.__typeName);
			if (!c._childBase)
				c._childBase = [b.__typeName];
			else
				c._childBase.push(b.__typeName);
			if (b && this != b && !b.inheritsFrom(this) && !b._sealed) {
				this.base = b;
				b._processBaseType(c);
				var f = b.prototype, e = this.prototype;
				for (var d in f) {
					var g = f[d];
					if (!e[d])
						e[d] = g
				}
			}
			delete this.__basePrototypePending
		}
	};
	b.callBaseMethod = function d(b, d, c) {
		var a = this.getBaseMethod(b, d);
		if (a)
			if (!c)
				return a.apply(b);
			else
				return a.apply(b, c);
		return null
	};
	b.implementsInterface = function(b) {
		var c = this.__interfaces;
		if (c)
			for (var d = 0; d < c.length; d++)
				if (Object.compare(c[d], b))
					return true;
		if (this.base) {
			if (this.base.implementsInterface(b))
				return true
		} else if (this.__baseType) {
			this.base = typeof this.__baseType == "function"
					? this.__baseType
					: a.parse(this.__baseType);
			if (this.base.implementsInterface(b))
				return true
		}
		return false
	};
	b.inheritsFrom = function(b) {
		if (b == this)
			return true;
		if (this.base)
			return this.base.inheritsFrom(b);
		else if (this.__baseType) {
			this.base = typeof this.__baseType == "function"
					? this.__baseType
					: a.parse(this.__baseType);
			return this.base.inheritsFrom(b)
		}
		return false
	};
	b.initializeBase = function(c, f) {
		if (!this._parentBase) {
			this._childBase = [this.__typeName];
			this._parentBase = [this.__typeName];
			if (this.__interfaces) {
				this._parentBase.addRange(this.__interfaces);
				this._childBase.addRange(this.__interfaces)
			}
		}
		var d = this.__interfaces;
		if (d) {
			var g = d.length;
			for (var e = 0; e < g; e++) {
				var b = d[e];
				b = b instanceof Function ? b : a.parse(b);
				b.call(c)
			}
		}
		this._processBaseType(this);
		if (this.base)
			if (!f)
				this.base.apply(c);
			else
				this.base.apply(c, f);
		return c
	};
	b.isImplementedBy = function(b) {
		if (!b)
			return false;
		var a = Object.getType(b);
		if (!a.implementsInterface)
			return false;
		return a.implementsInterface(this)
	};
	b.isInstanceOfType = function(b) {
		if (typeof b == "undefined" || b == null)
			return false;
		if (b instanceof this)
			return true;
		var a = Object.getType(b);
		if (a == this)
			return true;
		if (!a.inheritsFrom)
			return false;
		return a.inheritsFrom(this) || a.isImplementedBy(this)
	};
	b.registerClass = function(c, a, d) {
		Function._htClasses[c] = this.prototype.constructor = this;
		this.__typeName = c;
		if (a) {
			if (a === "Web.Bindings.Base")
				a = "$Binding";
			this.__baseType = a;
			this.__basePrototypePending = true
		}
		if (d) {
			this.__interfaces = [];
			var e = arguments.length;
			for (var b = 2; b < e; b++)
				this.__interfaces.push(arguments[b])
		}
		return this
	};
	b.registerAbstractClass = function(b, a) {
		this.registerClass(b, a);
		this._abstract = true;
		return this
	};
	b.registerSealedClass = function(b, a) {
		this.registerClass(b, a);
		this._sealed = true;
		return this
	};
	b.registerInterface = function(a) {
		this.__typeName = a;
		this._interface = this._abstract = this._sealed = true;
		return this
	};
	b.applyClass = function(b) {
		function a(c) {
			var d = !c.skipClass
					&& (c.__typeName && c.__typeName.replace(/\./g, "_")) || "";
			if (c.base) {
				d += " " + a(c.base);
				if (b)
					c.Events = (c.Events || new $Enum).extend(c.base.Events)
			}
			return d
		}
		if (!this._className)
			this._className = a(this).trim();
		return this._className
	};
	b.removeClass = function(b) {
		if (this._className) {
			if (!this._arrClasses)
				this._arrClasses = this._className.split(" ");
			var c = this._arrClasses, d = c.length;
			for (var a = 0; a < d; a++)
				b = b.replace(new RegExp("^" + c[a] + "( |$)| " + c[a]
								+ "(?= |$)"), "");
			return b
		} else
			return b
	};
	a.__typeName = "Function"
};
function $FN(a) {
	return function(b) {
		this[a] = b;
		return this
	}
}
var $CD = Function.createDelegate, $CC = Function.createCallback;
Boolean.parse = function(a) {
	if (typeof a == "string")
		return a.trim().toLowerCase() == "true";
	return a ? true : false
};
Boolean.__typeName = "Boolean";
Number.parse = function(a) {
	if (!a || a.length == 0)
		return 0;
	return parseFloat(a)
};
Number.coerceInt = function(a) {
	a = parseInt(a, 10);
	return isNaN(a) ? 0 : a
};
Number.coerceFloat = function(a) {
	a = parseFloat(a);
	return isNaN(a) ? 0 : a
};
Number.__typeName = "Number";
Date.__typeName = "Date";
new function() {
	var o = window.Object;
	o.isString = function(a) {
		return typeof a === "string" || a && a.constructor === String
	};
	o.isArray = function(a) {
		return a instanceof Array
	};
	o.isFunction = function(a) {
		return typeof a === "function"
	};
	o.isObject = function(a) {
		return a && typeof a === "object"
	};
	o.isBoolean = function(a) {
		return typeof a === "boolean" || a && a.constructor === Boolean
	};
	o.isNumber = function(a) {
		return typeof a === "number" || a && a.constructor === Number
	};
	o.resolve = function $O$Resolve(a) {
		try {
			if (typeof a === "string")
				a = Function.parse(a);
			else if (typeof a === "object")
				a = a.constructor;
			else if (typeof a !== "function")
				a = null
		} catch (b) {
			return null
		}
		return a
	};
	o.compare = function $O$Compare(b, c) {
		var a = this.resolve(b);
		return a && a == this.resolve(c)
	};
	o.getType = function $O$getType(b) {
		var a = b.constructor;
		if (!a || typeof a != "function" || !a.__typeName)
			return Object;
		return b.constructor
	};
	o.isNull = function $O$isNull(a) {
		return null == a || undefined == a
	};
	o.getTypeName = function $O$getTypeName(a) {
		return Object.getType(a).__typeName
	};
	o.fromJSON = function $O$fromJSON(text) {
		try {
			if (typeof JSON !== "undefined" && JSON.parse)
				return JSON.parse(text);
			else if (/^[\],:{}\s]*$/
					.test(text
							.replace(/\\["\\\/b-u]/g, "@")
							.replace(
									/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
									"]").replace(/(?:^|:|,)(?:\s*\[)+/g, "")))
				return eval("(" + text + ")")
		} catch (a) {
		}
		return null
	};
	o.toJSON = function $O$toJSON(a) {
		var c = Object.toJSON, b = "null", d = Object;
		if (!Object.isNull(a))
			if (d.isArray(a)) {
				b = [];
				for (var e = 0; e < a.length; e++)
					b.push(c(a[e]));
				b = "[" + b.join(",") + "]"
			} else if (d.isObject(a)) {
				b = [];
				for (var f in a)
					b.push('"' + f + '":' + c(a[f]));
				b = "{" + b.join(",") + "}"
			} else if (d.isString(a))
				b = '"'
						+ a.replace(c._reBackslash, "\\\\").replace(
								c._reDoubleQuote, '\\"').replace(c._reNewLine,
								"\\n").replace(c._reCarriageReturn, "\\r")
						+ '"';
			else if (!d.isFunction(a))
				b = a.toString();
		return b
	};
	var oJS = o.toJSON;
	oJS._reBackslash = /\\/g;
	oJS._reDoubleQuote = /"/g;
	oJS._reNewLine = /\n/g;
	oJS._reCarriageReturn = /\r/g;
	o.__typeName = "Object"
};
new function() {
	var b = Array, a = b.prototype;
	a.add = a.queue = function(a) {
		return this.push(a)
	};
	a.addRange = function(a) {
		if (a)
			this.push.apply(this, a);
		return this
	};
	a.clear = function() {
		if (this.length > 0)
			this.splice(0, this.length)
	};
	a.clone = function() {
		return [].addRange(this)
	};
	a.contains = a.exists = function(a) {
		return this.indexOf(a) >= 0
	};
	a.dequeue = a.shift;
	if (!a.indexOf)
		a.indexOf = function(d, a) {
			var c = this.length;
			if (c != 0) {
				a = a || 0;
				if (a < 0)
					a = Math.max(0, c + a);
				for (var b = a; b < c; b++)
					if (this[b] === d)
						return b
			}
			return -1
		};
	if (!a.forEach)
		a.forEach = function(c, b) {
			var d = this.length;
			for (var a = 0; a < d; a++)
				c.call(b, this[a], a, this)
		};
	a.insert = function(a, b) {
		this.splice(a, 0, b)
	};
	a.remove = function(b) {
		var a = this.indexOf(b);
		if (a >= 0)
			this.splice(a, 1);
		return a >= 0
	};
	a.removeAt = function(a) {
		return this.splice(a, 1)[0]
	};
	b.__typeName = "Array"
};
var $Enum = function() {
	var b = arguments.length;
	this._values = {};
	for (var a = 0; a < b; a++)
		this._values[arguments[a]] = this[arguments[a]] = arguments[a];
	return this
};
$Enum.prototype = {
	getValues : function() {
		return this._values
	},
	parse : function(b) {
		if (b)
			for (var a in this._values)
				if (a.toLowerCase() === b.toLowerCase())
					return this._values[a];
		return null
	},
	toString : function(b) {
		if (!b) {
			var c = [];
			for (var a in this._values)
				c.push(a);
			return "[" + c.join(",") + "]"
		}
		for (var a in this._values)
			if (this._values[a] === b)
				return a;
		throw new Error("Invalid Enumeration Value");
	},
	extend : function(b) {
		if (b)
			for (var a in b._values)
				this._values[a] = this[a] = a;
		return this
	}
};
var $Flags = function() {
	var b = arguments.length;
	this._values = {};
	for (var a = 0; a < b; a += 2)
		this._values[arguments[a]] = this[arguments[a]] = arguments[a + 1];
	return this
};
$Flags.prototype = {
	getValues : function() {
		return this._values
	},
	parse : function(g) {
		var c = g.split("|"), d = 0;
		for (var a = c.length - 1; a >= 0; a--) {
			var f = c[a].trim(), b = false;
			for (var e in this._values)
				if (e == f) {
					d |= this[e];
					b = true;
					break
				}
			if (b == false)
				throw new Error("Invalid Enumeration Value");
		}
		return d
	},
	toString : function(c) {
		var a = new $StringBuilder;
		for (var b in this)
			if ((this[b] & c) != 0) {
				if (a.isEmpty() == false)
					a.append(" | ");
				a.append(b)
			}
		return a.toString()
	}
};
new function() {
	var b = String, a = b.prototype;
	a.endsWith = function(a) {
		return this.substr(this.length - a.length) == a
	};
	a.startsWith = function(a) {
		return this.substr(0, a.length) == a
	};
	a.lTrim = a.trimStart = function() {
		return this.replace(/^\s*/, "")
	};
	a.rTrim = a.trimEnd = function() {
		return this.replace(/\s*$/, "")
	};
	a.trim = function() {
		return this.replace(/^\s+|\s+$/g, "")
	};
	a.format = function() {
		var b = this.replace(/\$/g, "$~"), c = b.format.aRegExp, e = arguments.length, d;
		for (var a = 0; a < e; a++) {
			if (!c[a])
				c[a] = new RegExp("\\{" + a + "\\}", "g");
			d = arguments[a] && arguments[a].toString().replace(/\$/g, "$~")
					|| arguments[a];
			b = b.replace(c[a], d)
		}
		return b.replace(/\$\~/g, "$")
	};
	a.format.aRegExp = [];
	a.formatTokens = function(e) {
		var c = [], d = "";
		for (var a = 0; true;) {
			var b = this.indexOf("{", a);
			if (b < 0) {
				c.push(this.slice(a));
				break
			}
			c.push(this.slice(a, b));
			a = b + 1;
			if (this.charAt(a) == "{") {
				c.push("{");
				a++;
				continue
			}
			b = this.indexOf("}", a);
			if (b >= a) {
				d = this.slice(a, b);
				c.push(e[d] || e[d.toLowerCase()] || "{" + d + "}");
				a = b + 1
			} else {
				if (b === -1)
					d = this.slice(a);
				c.push("{" + d);
				break
			}
		}
		return c.join("")
	};
	a.removeSpaces = function() {
		return this.replace(/ /g, "")
	};
	a.removeExtraSpaces = function() {
		return this.replace(a.removeExtraSpaces.re, " ")
	};
	a.removeExtraSpaces.re = /\s+/g;
	a.removeSpaceDelimitedString = function(a) {
		var b = " " + this.trim() + " ";
		return b.replace(" " + a + " ", " ").trim()
	};
	a.addSpaceDelimitedString = function(a) {
		return this.removeSpaceDelimitedString(a) + " " + a
	};
	a.encodeHtmlAttributeURI = a.encodeURI = function() {
		return encodeURI(this).replace(/'/g, "%27")
	};
	a.encodeURIComponent = function() {
		return encodeURIComponent(this).replace(/'/g, "%27")
	};
	var c = /[^\w.,-]/g;
	a.encodeXmlAttribute = a.encodeHtmlAttribute = function() {
		return this.replace(c, function(a) {
					return ["&#", a.charCodeAt(0), ";"].join("")
				})
	};
	var d = /[^\w .,-]/g;
	a.encodeXml = a.encodeHtml = function() {
		return this.replace(d, function(a) {
					return ["&#", a.charCodeAt(0), ";"].join("")
				})
	};
	var e = /[^\w.%-]/g;
	a.encodeUrl = function() {
		return encodeURIComponent(this).replace(e, function(b) {
					var a = b.charCodeAt(0).toString(16);
					return "%" + (a.length == 1 ? "0" + a : a).toUpperCase()
				})
	};
	a.decodeURI = function() {
		return unescape(this)
	};
	b.__typeName = "String"
};
var $StringBuilder = function(a) {
	this._parts = [];
	if (a)
		this.append(a)
};
$StringBuilder.prototype = {
	append : function(a) {
		if (a === null || typeof a == "undefined" || typeof a === "string"
				&& a.length === 0)
			return;
		this._parts.push(a)
	},
	appendLine : function(a) {
		this.append(a);
		this._parts.push("\r\n")
	},
	clear : function() {
		this._parts = []
	},
	isEmpty : function() {
		return this._parts.length === 0
	},
	toString : function(a) {
		return this._parts.join(a || "")
	}
};
var $Event = function(a) {
	this._handlers = [];
	this.autoInvoke = a;
	this.invoking = this.isInvoked = false;
	this.task = null
};
$Event.prototype = {
	dispose : function() {
		this._handlers = []
	},
	attach : function(a) {
		if (!a)
			return false;
		var c = this;
		function b() {
			a(c.vPackage)
		}
		if (this.autoInvoke && this.isInvoked) {
			this._timer = window.setTimeout(b, 1);
			return true
		} else if (!this._handlers.exists(a)) {
			if (this.invoking)
				b();
			this._handlers.unshift(a);
			return true
		}
		return false
	},
	detach : function(a) {
		return this._handlers.remove(a)
	},
	fire : function(c, e) {
		var a = this;
		a.vPackage = c = c == null ? {} : c;
		a.invoking = true;
		function f() {
			a.invoking = false;
			if (a.autoInvoke)
				a.dispose();
			else
				a.vPackage = null;
			a.isInvoked = true;
			if (e)
				e()
		}
		function g(a) {
			try {
				a(c)
			} catch (b) {
				if ($Debug.enabled)
					throw b;
				$Tracing.Error
						.submitFromException(b, null, $Tracing.Error.Fire)
			}
		}
		var d = this._handlers.clone();
		if (!$Runtime.unloading && e) {
			var h = new $Task(f);
			for (var b = d.length - 1; b >= 0; b--)
				h.add($CC(g, [d[b]]), Array.$Prioritizer.High);
			h.run()
		} else {
			for (var b = d.length - 1; b >= 0; b--)
				g(d[b]);
			f()
		}
	}
};
$Event.DOM = function() {
};
$Event.DOM.prototype = {
	_self : $Event.DOM,
	_event : $Event,
	exists : function(b) {
		var a = this.constructor;
		if (a && a.Events && a.Events[b])
			return true;
		else
			throw new Error("Invalid Event Name");
		return false
	},
	_defined : function(a) {
		return this._htEvents && this._htEvents[a]
	},
	attachEvent : function(a, b) {
		if (this.exists(a)) {
			if (!this._htEvents)
				this._htEvents = {};
			if (!this._htEvents[a])
				this._htEvents[a] = new $Event;
			this._htEvents[a].attach(b)
		}
	},
	detachEvent : function(a, b) {
		if (this._defined(a))
			this._htEvents[a].detach(b);
		else
			this.exists(a)
	},
	fire : function(a, d) {
		var b;
		if (this.exists(a) && this._defined(a)) {
			var c = {
				srcBinding : this,
				eventName : a,
				Package : d,
				returnValue : null
			};
			this._htEvents[a].fire(c);
			b = c.returnValue
		}
		return b
	},
	dispose : function() {
		if (this._htEvents)
			for (var a in this._htEvents)
				this._htEvents[a].dispose();
		this._htEvents = null
	}
};
$Event.DOM.skipClass = true;
if ($Event.DOM.registerClass)
	$Event.DOM.registerClass("$Event.DOM");
$Event.Manager = function(b, a) {
	for (var c in a)
		b.attachEvent(c, a[c]);
	this.source = b;
	this.events = a
};
$Event.Manager.prototype = {
	dispose : function() {
		for (var a in this.events)
			this.source.detachEvent(a, this.events[a]);
		this.source = this.events = null
	}
};
new function() {
	var c = Array;
	c.$Prioritizer = function() {
		this.clear()
	};
	var a = new $Flags("High", 1, "Medium", 2, "Low", 3, "Lowest", 4), b = c.$Prioritizer;
	b.Priorities = a;
	b.prototype = {
		priorities : b.Priorities.getValues(),
		_add : function(c, b, a) {
			if (this.list[b]) {
				if (a && a.key && this.keys[a.key])
					if (b < this.keys[a.key])
						this.removeItem(a);
					else
						return null;
				c.call(this.list[b], a);
				if (a && a.key)
					this.keys[a.key] = b
			}
			return a
		},
		push : function(c, b) {
			if (!b)
				b = a.Medium;
			return this._add(this.list[b].unshift, b, c)
		},
		queue : function(c, b) {
			if (!b)
				b = a.Medium;
			return this._add(this.list[b].queue, b, c)
		},
		dequeue : function() {
			for (var c in this.priorities) {
				var b = this.list[this.priorities[c]];
				if (b.length > 0) {
					var a = b.dequeue();
					if (a) {
						if (a.key)
							delete this.keys[a.key];
						return a
					}
				}
			}
			return null
		},
		removeItem : function(b) {
			var a = false;
			if (b.key) {
				var c = this.keys[b.key];
				if (c) {
					a = this.list[c].remove(b);
					delete this.keys[b.key]
				}
			}
			if (!a)
				for (var c in this.priorities)
					a = this.list[this.priorities[c]].remove(b) || a;
			return a
		},
		removeKey : function(c) {
			var d = this.keys[c];
			if (d) {
				var b = this.list[d];
				for (var a = b.length - 1; a >= 0; a--)
					if (b[a] && b[a].key == c) {
						b.splice(a, 1);
						delete this.keys[c];
						return true
					}
			}
			return false
		},
		isEmpty : function() {
			for (var a in this.list)
				if (this.list[a].length > 0)
					return false;
			return true
		},
		findByProperty : function(c, d) {
			for (var f in this.priorities) {
				var b = this.list[this.priorities[f]], e = b.length;
				for (var a = 0; a < e; a++)
					if (b[a][c] === d)
						return b[a]
			}
			return null
		},
		clear : function() {
			this.list = {};
			this.keys = {};
			for (var a in this.priorities)
				this.list[this.priorities[a]] = []
		}
	}
};
$Dom = {
	Css : new function() {
		var a = this, b = document, d = _ge, c = b.documentElement;
		a.Rule = function(b) {
			b.search(a.Rule.reCssSelector);
			this.strTagName = RegExp.$1.toLowerCase();
			this.strClassName = RegExp.$2.toLowerCase();
			this.strID = RegExp.$3
		};
		a.Rule.reCssSelector = /([^\.#]*)\.?([^#]*)#?(.*)/;
		a.createRules = function(d) {
			if (!d)
				return [];
			var b = d.trim().split(a.createRules.reWhiteSpace), e = b.length, f = a.Rule;
			for (var c = 0; c < e; c++)
				b[c] = new f(b[c]);
			return b
		};
		a.createRules.reWhiteSpace = /\s+/;
		a.doesElementPassRule = function(b, a) {
			return a
					&& b.nodeType === 1
					&& (!a.strTagName || a.strTagName === b.tagName
							.toLowerCase())
					&& (!a.strClassName || (" " + b.className.toLowerCase() + " ")
							.indexOf(" " + a.strClassName + " ") !== -1)
					&& (!a.strID || a.strID === b.id)
		};
		a.doesElementPassRules = function(b, e, d) {
			var h = e.length;
			if (!e || h == 0 || !b)
				return false;
			var f = h - 1, i = a.doesElementPassRule;
			if (!i(b, e[f--]))
				return false;
			if (!d || d == document)
				d = c;
			var g = d == c;
			while (b && (g || d.contains(b)) && f >= 0) {
				b = b.parentElement;
				if (b && i(b, e[f]))
					f--
			}
			return b && (g || d.contains(b))
		};
		a.getElementsByCssSelectorRules = function(g, c) {
			var f = [], h = g.length, i = a.doesElementPassRule;
			c = c || b;
			function e(c, k) {
				var a = g[k];
				if (a) {
					var j = [];
					if (a.strID) {
						var n = _ge(a.strID);
						if (n && c == b || c.tagName && c.contains(n))
							j = [d(a.strID)]
					} else if (a.strTagName)
						j = $Dom.getAnyElementByTagName(a.strTagName, c);
					else if (a.strClassName)
						j = c.all || c.getElementsByTagName("*");
					var o = j.length;
					for (var m = 0; m < o; m++) {
						var l = j[m];
						if (i(l, a))
							if (k + 1 < h)
								e(l, k + 1);
							else
								f.push(l)
					}
				}
			}
			if (h > 0)
				e(c, 0);
			return f
		};
		a.getElementsByCssSelector = function(a, b) {
			return $Dom.Css.getElementsByCssSelectorRules($Dom.Css
							.createRules(a), b)
		}
	},
	getAnyElementByTagName : function(a, e, l) {
		var i = document, d = [], h = a.indexOf(":"), g = $Dom.getAnyElementByTagName;
		if (!e)
			e = i;
		if (h >= 0)
			if (g._scanMode) {
				var b = a.substring(0, h), a = a.substring(h + 1);
				if (b && g._ns[b] == null)
					if (b != "" && i.namespaces && !i.namespaces[b])
						throw new Error("IE Requirement - Add xmlns:" + b
								+ " to the HTML tag.");
					else
						g._ns[b] = true;
				var f = e.getElementsByTagName(a), m = f.length;
				for (var c = 0; c < m; c++) {
					var j = f[c], k = j[g._propName];
					if (k && k.toLowerCase() == b.toLowerCase())
						d.push(j)
				}
			} else if ($Browser.MozillaCompatMode && !l) {
				d = [];
				var f = e.getElementsByTagName("div");
				for (var c = 0; c < f.length; c++)
					if (f[c].className.indexOf(a) > -1)
						d.push(f[c])
			} else
				d = e.getElementsByTagName(a);
		else
			d = e.getElementsByTagName(a);
		return d
	}
};
new function() {
	var a = $Dom.getAnyElementByTagName;
	a._scanMode = $Browser._isIE || $Browser.isOpera() && $Browser.version < 9;
	a._propName = $Browser._isIE ? "scopeName" : "prefix";
	a._ns = []
};
$css = {
	has : function(c, b) {
		var a = false;
		try {
			a = (new RegExp("\\b" + b + "\\b", "i")).test(c.className)
		} catch (d) {
		}
		return a
	},
	remove : function(a, b) {
		if (a && a.className)
			a.className = a.className.replace(
					new RegExp("\\b" + b + "\\b", "ig"), "").replace(
					/^\s|\s(\s)|\s$/g, "$1")
	},
	add : function(a, b) {
		if (a && !$css.has(a, b))
			(a.className += " " + b).lTrim()
	}
};
function $(a) {
	return a == null || typeof a == "object" && !(a instanceof String)
			? a
			: _ge(a)
}
var $Xml = {
	resolveTagName : function(b) {
		var a;
		if (b.document && b.document == document) {
			a = b.tagName;
			if (a && $Browser._isIE && b.scopeName != "")
				a = b.scopeName + ":" + a
		} else
			a = b.nodeName;
		return a.toLowerCase()
	},
	getDocumentRoot : function(a) {
		if (!a)
			return null;
		if (a.document && a.document == document)
			return a;
		if (a.responseText.length == 4)
			return null;
		var b = null;
		if ((!a.responseXML || a.responseXML.xml == "") && a.status != 404)
			try {
				var c = new ActiveXObject("Microsoft.XMLDOM");
				c.loadXML(a.responseText);
				b = c.documentElement
			} catch (d) {
				b = null
			}
		else
			try {
				b = a.responseXML.documentElement
			} catch (d) {
				b = null
			}
		return b
	},
	getTextProperty : function(a) {
		if (a.text == "")
			return "";
		else
			return a.text || a.textContent
	}
}, $Parser = function(d, f, e) {
	var c = $Xml.getDocumentRoot(f), g = $Xml.resolveTagName, a = e || {};
	function b(a, f, e, c) {
		if (a.processor)
			c = a.processor(a, f, e, c);
		var k = f.childNodes.length, j = a.children;
		for (var i = 0; i < k; i++) {
			var d = f.childNodes[i];
			if (d.nodeType === 1) {
				var h = j && a.children[g(d)];
				if (h)
					b(h, d, e, c);
				else if (a.childProcessor)
					a.childProcessor(h, d, e, c)
			}
		}
	}
	if (c)
		b(d, c, a, a);
	return a
};
$Parser.root = function(c) {
	var a = {};
	a.children = {};
	for (var b = 1; b < arguments.length; b++)
		a.children[arguments[b].tagName] = arguments[b];
	a.processor = c;
	return a
};
$Parser.tag = function(g, f, e, d) {
	var a = {};
	a.tagName = g;
	a.processor = f;
	a.childProcessor = e;
	if (d) {
		var c = arguments.length;
		if (c > 3) {
			a.children = {};
			for (var b = 3; b < c; b++)
				a.children[arguments[b].tagName] = arguments[b]
		}
	}
	return a
};
var $Parsers = {
	Definitions : {
		Binding : new function() {
			var a = $Parser.tag;
			function f(i, b, e) {
				if (e && e.def) {
					var c = e.def;
					c.type = b.getAttribute("type");
					c._async = b.getAttribute("attach") == "async";
					var g = b.getAttribute("root"), d = b
							.getAttribute("selector"), a;
					if (g) {
						switch (g.toLowerCase()) {
							case "parent" :
								a = b.parentElement;
								break;
							case "previous" :
								a = b.previousSibling;
								while (a.nodeType != 1)
									a = a.previousSibling;
								break;
							case "next" :
								a = b.nextSibling;
								while (a.nodeType != 1)
									a = a.nextSibling;
								break;
							case "none" :
								a = null
						}
						c.root = a
					}
					c.preload = b.getAttributeNode("preload") != null;
					if (d) {
						d = d.split(",");
						for (var f = d.length - 1; f >= 0; f--)
							c.bindCss(d[f], c.root)
					}
					c.ns = b.getAttribute("namespace")
				}
				return e
			}
			function g(d, b, a) {
				a.network = new $Network;
				$Parser($Parsers.Definitions.References, b, a.network);
				return a
			}
			function c(f, d, c) {
				var a = d.getAttribute("src");
				if (a.startsWith("#")) {
					var b = document.getElementById(a.substring(1));
					if (b)
						$Parser($Parsers.Definitions.Binding, b, c);
					else
						throw new Error("Binding id (" + a + ") is missing");
				}
				return c
			}
			function b(d, b, a) {
				if (!a.def._defaults)
					a.def._defaults = {}
			}
			function e(e, b, c) {
				var a = b.getAttribute("name");
				if (a) {
					a = a.toLowerCase();
					if (!c.def._defaults[a])
						c.def._defaults[a] = b.value || b.getAttribute("value")
				}
			}
			function d(d, b, a) {
				a.def.addChain($Parser($Parsers.Definitions.Binding, b, {
							def : $Binding.define()
						}))
			}
			return $Parser.root(f, a("web:references", g), a("web:defaults", b,
							null, a("web:param", e)), a("web:chains", null,
							null, a("web:chain", d)), a("web:requires", null,
							null, a("web:add", c)))
		},
		References : new function() {
			function a(d, c, a) {
				if (!a.config.priority) {
					var b = c.getAttribute("priority");
					if (b)
						a.config.priority = Array.$Prioritizer.Priorities[b
								.substring(0, 1).toUpperCase()
								+ b.substring(1).toLowerCase()];
					a.config.base = c.getAttribute("base")
				}
				return a
			}
			function b(r, c, b) {
				var p = c.getAttribute("type") || "script", n = c
						.getAttribute("src"), h = c.getAttribute("key"), f = $Request, d = b.config.items, e = $Network.Type, i = n
						.split("|"), l = h && h.split("|"), o = i.length;
				for (var g = 0; g < o; g++) {
					var a = i[g].trim();
					if (b.config.base)
						a = $Request.resolveUrl(a, b.config.base);
					if (a)
						switch (p.toLowerCase()) {
							case "fpp" :
								if (!$Network._fppReady)
									d.push((new f(
											"{framework.base}/FireAnt.js",
											e.Script)).setHash("FireAnt.js"));
							case "text/javascript" :
							case "script" :
								d.push((new f(a, e.Script)).setHash(l && l[g]));
								break;
							case "text/xml" :
							case "xml" :
								var j = (new f(a, e.XML)).setName(c
										.getAttribute("name")), k = c
										.getAttribute("proxy");
								if (k && k.toLowerCase() == "true")
									j.setFlags($Network.Flags.CLIENTPROXY);
								d.push(j);
								break;
							case "text/css" :
							case "css" :
								d.push(new f(a, e.CSS));
								break;
							case "image" :
								d.push(new f(a, e.Image));
								break;
							case "reference" :
								if (a.startsWith("#")) {
									var m = c.document.getElementById(a
											.substring(1));
									if (m)
										b = $Parser(
												$Parsers.Definitions.References,
												m, b);
									else
										throw new Error("Error locating reference: "
												+ a);
								}
						}
				}
				return b
			}
			return $Parser.root(a, $Parser.tag("web:add", b))
		}
	},
	References : function(a) {
		return $Parser($Parsers.Definitions.References, a)
	},
	Binding : function(a) {
		return $Parser($Parsers.Definitions.Binding, a)
	}
};
$Runtime = {
	unloading : false,
	onunload : new $Event(true),
	_shutdown : function() {
		if ($Runtime.unloading)
			return;
		$Runtime.unloading = true;
		$Runtime.onunload.fire();
		$Runtime.onunload = null;
		if (typeof $Binding != "undefined")
			$Binding.Scope.prototype.__de = null;
		if ($Browser._isIE)
			try {
				document.execCommand("BackgroundImageCache", false, false)
			} catch (a) {
			}
		if (typeof $Network != "undefined")
			$Network.Execute.Script.outstanding = $Network.Execute.scriptList = null;
		if (typeof Web != "undefined")
			Web = {};
		CollectGarbage()
	},
	_loaded : function() {
		window.document.detachEvent("onstop", $Runtime._shutdown)
	}
};
var $Counter = 1;
if (typeof $Config == "undefined")
	$Config = {
		Themes : {},
		TraceData : {
			disable : 1
		}
	};
$Config.culture = $Config.culture
		|| document.documentElement.getAttribute("web:culture") || "en-US";
$Config.applyAppDomain = $Config.applyAppDomain || false;
if ($Browser._isIE) {
	window.document.attachEvent("onstop", $Runtime._shutdown);
	window.attachEvent("onload", $Runtime._loaded)
}
window.attachEvent("onunload", $Runtime._shutdown);
$Task = function(a) {
	this.id = "$T" + $Task._counter++;
	if (a)
		$Task.Scheduler._setCB(this.id, a)
};
$Task.prototype = {
	add : function(b, a) {
		$Task.Scheduler.add(b, a, this.id);
		return this
	},
	run : function() {
		$Task.Scheduler.run();
		return this
	},
	dispose : function() {
		$Task.Scheduler.remove(this.id)
	}
};
$Task._counter = 0;
$Task.Scheduler = new function() {
	var e = 0, a = [], b = null, c = this, d;
	function h() {
		c.isRunning = false;
		f()
	}
	function f() {
		if (!c.isRunning) {
			d = new Date;
			c.isRunning = true;
			var e = c.queue.dequeue();
			while (e) {
				var f = e.id;
				e.cb();
				if (f) {
					if (--a[f]._count === 0 && a[f]._cb)
						a[f]._cb(f);
					delete a[f][e.key]
				}
				if (new Date - d < c.lock)
					e = c.queue.dequeue();
				else
					e = null
			}
			if (!c.queue.isEmpty()) {
				if (!b)
					b = setInterval(h, 1)
			} else {
				c.isRunning = false;
				clearInterval(b);
				b = null
			}
		}
	}
	this._setCB = function(b, c) {
		if (!a[b]) {
			a[b] = {};
			a[b]._count = 0
		}
		a[b]._cb = c
	};
	this.shouldSleep = function() {
		return d && new Date - d < this.lock
	};
	this.lock = 175;
	this.run = f;
	this.isRunning = false;
	this.queue = new Array.$Prioritizer;
	this.add = function(d, c, b) {
		e++;
		if (this.queue.queue({
					id : b,
					key : e,
					cb : d
				}, c) && b) {
			if (!a[b]) {
				a[b] = {};
				a[b]._count = 0
			}
			a[b][e] = true;
			a[b]._count++
		}
		return e
	};
	this.remove = function(d) {
		if (!a)
			return;
		for (var c in a[d])
			if (c !== "_count" && c !== "_cb")
				this.queue.removeKey(c);
		delete a[d];
		if (this.queue.isEmpty()) {
			if (b)
				clearInterval(b);
			b = null;
			this.isRunning = false
		}
	};
	function g() {
		if (b)
			clearInterval(b);
		a = null;
		this.queue = null
	}
	$Runtime.onunload.attach(g)
};
var $Memory = function() {
	var a = $Memory;
	this.Nodes = new a.Nodes;
	this.Events = new a.Events;
	this.Properties = new a.Properties
};
new function() {
	var a = $Memory, b = "__0";
	a.prototype = {
		dispose : function() {
			this.Events.dispose();
			this.Nodes.dispose();
			this.Properties.dispose()
		}
	};
	a.Groups = function() {
		this.groups = {}
	};
	a.Groups.prototype = {
		create : function(a) {
			if (!a)
				a = b;
			if (!this.groups[a])
				this.groups[a] = new $Memory;
			return this.groups[a]
		},
		disposeGroup : function(a) {
			if (!a)
				a = b;
			if (this.groups[a])
				this.groups[a].dispose()
		},
		dispose : function() {
			for (var a in this.groups)
				this.groups[a].dispose();
			this.groups = {}
		}
	};
	a.Events = function() {
		this.events = new a.Properties
	};
	a.Events.prototype = {
		register : function(b, a) {
			this.add(new $Event.Manager(b, a))
		},
		add : function(a) {
			this.events.register(a)
		},
		dispose : function() {
			this.events.dispose();
			this.events = new a.Properties
		}
	};
	a.Nodes = function() {
		this.nodes = []
	};
	a.Nodes.prototype = {
		register : function(a) {
			this.nodes.push(a);
			return a
		},
		create : function(f, c, e, d) {
			var a = _ce(f);
			for (var b in c)
				a[b] = c[b];
			for (var b in e)
				a.style[b] = e[b];
			if (d)
				d.appendChild(a);
			return this.register(a)
		},
		dispose : function() {
			var b = this.nodes;
			for (var a = b.length - 1; a >= 0; a--) {
				if (!$Runtime.unloading)
					b[a].removeNode(true);
				b[a] = null
			}
			this.nodes = []
		}
	};
	a.Properties = function() {
		this.properties = []
	};
	a.Properties.prototype = {
		register : function(a) {
			if (a.initialize)
				a.initialize();
			this.properties.push(a)
		},
		dispose : function() {
			var c = $Runtime.unloading, b = this.properties;
			for (var a = b.length - 1; a >= 0; a--) {
				if (b[a].dispose)
					b[a].dispose(c);
				b[a] = null
			}
			this.properties = []
		}
	}
};
function $Network(a, c, b) {
	this.config = {
		priority : a,
		context : c,
		items : b || []
	};
	this.response = [];
	this.isLoaded = this.isExecuting = false
}
$Network.prototype = {
	setContext : function(a) {
		this.config.context = a;
		return this
	},
	add : function(f) {
		var h = this, e = h.config.items, d = $Network.Type, c = d.Script;
		function g(a) {
			var b = a instanceof $Request ? a : new $Request(a, f);
			if (f == d.Fpp) {
				b.type = c;
				if (!$Network._fppReady) {
					var g = (new $Request("{framework.base}/FireAnt.js", c))
							.setHash("FireAnt.js");
					e.push(g)
				}
			}
			e.push(b)
		}
		for (var b = arguments.length - 1; b > 0; b--) {
			var a = arguments[b];
			if (a)
				if (a instanceof Array)
					a.forEach(g);
				else
					g(a)
		}
		return this
	},
	_complete : function(b, c, a) {
		this._received++;
		a.resource = b;
		this.response.push(a);
		if (this._received === this.config.items.length) {
			this.isExecuting = false;
			this.isLoaded = true;
			if (this._callback)
				this._callback(this.response, this.config.context)
		}
	},
	load : function(c) {
		if (!this.isExecuting) {
			this.isExecuting = true;
			this._callback = c;
			this._received = 0;
			this._delCallback = $CD(this, this._complete);
			var a = this.config.items, d = a.length;
			if (d > 0)
				for (var b = 0; b < a.length; b++)
					$Network.fetch(this._delCallback, a[b]);
			else {
				this.isExecuting = false;
				this._callback(this.response, this.config.context)
			}
		} else
			this._callback = c
	},
	abort : function() {
		if (this.isExecuting) {
			var a = this._delCallback;
			this.config.items.forEach(function(b) {
						$Network.abortRequest(a, b)
					});
			this._received = 0
		}
		this.isExecuting = false
	},
	dispose : function() {
		if (!$Runtime.unloading)
			this.abort();
		this.config = this.response = this._callback = this._delCallback = null
	}
};
new function() {
	var a = $Network, d = $Event, g = $Browser.isMozilla(), f = Array.$Prioritizer;
	a.Type = new $Enum("XML", "Image", "Script", "XMLPost", "XMLGet", "CSS",
			"Stream", "Fpp");
	a.Verbs = new $Enum("GET", "POST", "DELETE", "PUT");
	a.Flags = new $Flags("SERIALIZE", 1, "DUPLICATE", 2, "NOTIFY", 4,
			"CACHEONLY", 8, "CLIENTPROXY", 16, "CANARY", 32);
	a.Priority = f.Priorities;
	var b = a.Type, c = a.Flags;
	a.getCookie = function(c) {
		var a = $Network.getCookie, b = document.cookie;
		if (b !== a.cookieString) {
			a.cookies = {};
			b.split(";").forEach(function(b) {
				var c = b.indexOf("=");
				if (c !== -1)
					a.cookies[b.substring(0, c).trim()] = b.substring(c + 1,
							b.length).trim()
			});
			a.cookieString = b
		}
		return a.cookies[c]
	};
	a.getCookie.cookieString = "";
	a.getCookie.cookies = {};
	a.abortGroup = function(b) {
		for (var c in a.Domain.list)
			a.Domain.list[c].abortGroup(b)
	};
	a.Events = {
		onrequest : new d,
		oncomplete : new d,
		onerror : new d,
		onhttperror : new d,
		oninvoke : new d,
		onfinished : new d,
		onprofile : new d
	};
	a.Domain = function(a) {
		this.domain = a;
		this.groups = {};
		this.parallel = new f;
		this.serial = new f;
		this.requests = {};
		this._active = 0;
		this._serialActive = this._proxy = false;
		this._proxyTarget = null
	};
	a.Domain.prototype = {
		_assignProxy : function(a) {
			this._proxyTarget = a;
			this._continue()
		},
		add : function(f, d) {
			var g;
			if (f)
				if (f._id)
					g = f._id;
				else
					g = f._id = $Counter++;
			var j = d.group, k = {
				request : d,
				callback : f
			};
			if (j) {
				if (!this.groups[j])
					this.groups[j] = [];
				this.groups[j].push(k)
			}
			if (d.flags & c.CLIENTPROXY)
				if (this.domain != a.currentDomain) {
					a.Proxy.generate(this.domain);
					this._proxy = true
				} else
					d.flags = d.flags ^ c.CLIENTPROXY;
			var l = d._key = d.getKey(), e = this.requests[l];
			if (e) {
				if (f && !e._items[g])
					if (e._complete)
						f(e._complete, d.context, d);
					else
						e._items[g] = k;
				e._count++
			} else {
				var i;
				if (d.flags & c.SERIALIZE)
					i = this.serial;
				else
					i = this.parallel;
				var h = d.type;
				if (h == b.XML || h == b.XMLGet || h == b.XMLPost
						|| h == b.Stream)
					i.push(d, d.priority);
				else
					i.queue(d, d.priority);
				e = this.requests[l] = {};
				e._items = {};
				e._count = 1;
				if (f)
					e._items[g] = {
						request : d,
						callback : f
					}
			}
			this._continue();
			return e
		},
		_continue : function() {
			var d;
			if (this._active < a.Config.maxActive
					&& (!this._proxy || this._proxy && this._proxyTarget)) {
				if (!this._serialActive)
					if (d = this.serial.dequeue())
						this._serialActive = true;
				if (!d)
					d = this.parallel.dequeue();
				if (d) {
					var f = $CD(this, this._complete), g = d._key, e = this.requests[g];
					if (d.flags
							& c.CLIENTPROXY
							&& (d.type == b.XMLGet || d.type == b.XML || d.type == b.XMLPost))
						e._executing = this._proxyTarget.fetchXML(d,
								$Network.Events, null, f);
					else
						e._executing = a.Execute.load(f, d);
					if (e._executing)
						this._active++
				}
			}
		},
		_complete : function(f, d) {
			a.Events.oncomplete.fire(d);
			if (g && d.flags & c.CLIENTPROXY)
				switch (d.type) {
					case b.XMLGet :
					case b.XML :
					case b.XMLPost :
						f = $Browser._Private.cleanupFirefox(f, d)
				}
			if (d.flags & c.SERIALIZE)
				this._serialActive = false;
			this._active--;
			var n = d._key, l = this.requests[n], k = false, h = [];
			if (l) {
				l._complete = f;
				var m = l._items;
				for (var p in m) {
					var j = m[p], i = j.request, e = i.context;
					k = k || i.flags & c.NOTIFY;
					j.callback(f, e, i);
					if (e && e.bRetry) {
						h.push(j);
						e.bRetry = false
					}
				}
				delete this.requests[n]
			}
			if (d.group) {
				this.groups[d.group].remove(d);
				if (this.groups[d.group].length === 0)
					delete this.groups[d.group]
			}
			if (h.length > 0) {
				var o = this;
				h.forEach(function(a) {
							o.add(a.callback, a.request)
						})
			}
			if (k)
				$Accessibility.notify();
			this._continue()
		},
		abortRequest : function(b, h) {
			var e = h.getKey(), d = b && b._id, a = this.requests[e];
			if (a) {
				if (b && d)
					if (a._items[d]) {
						delete a._items[d];
						a._count--
					}
				if (a._count === 0) {
					if (a._executing)
						a._executing.abort();
					else {
						var g = h.flags & c.SERIALIZE
								? this.serial
								: this.parallel, f = g
								.findByProperty("_key", e);
						if (f)
							g.removeItem(f)
					}
					delete this.requests[e]
				}
			}
		},
		abort : function() {
			for (var b in this.requests) {
				var a = this.requests[b]._executing;
				if (a)
					a.abort()
			}
			this.groups = {};
			this.requests = {}
		},
		abortGroup : function(b) {
			var a = this.groups[b], c = this;
			if (a) {
				a.forEach(function(a) {
							c.abortRequest(a.callback, a.request)
						});
				delete this.groups[b]
			}
		},
		dispose : function() {
			this.abort();
			this.parallel = this.serial = null
		}
	};
	a.abortRequest = function(d, b) {
		var c = a.Domain.list[b.domain];
		if (c)
			c.abortRequest(d, b)
	};
	a.fetch = function(e, d) {
		var b = d.domain;
		if (b === "" || b === null)
			throw new Error("Invalid Domain");
		var c = a.Domain.list[b];
		if (!c)
			c = a.Domain.list[b] = new a.Domain(b);
		return c.add(e, d)
	};
	a.fetchXML = function(f, c, e, b, d) {
		return a.fetch(c, (new $Request(f, e === "GET"
								? a.Type.XMLGet
								: a.Type.XMLPost)).setHeaders(d)
						.setPostString(b))
	};
	a.fetchCSS = function(d, b, c) {
		return a.fetch(b, (new $Request(d, a.Type.CSS)).setObject(c))
	};
	a.fetchScript = function(c, b, d) {
		return a.fetch(b, (new $Request(c, a.Type.Script)).setHash(d))
	};
	a.fetchImage = function(e, b, c, d) {
		var a = _ce("IMG");
		a.onload = b;
		a.onerror = c || b;
		a.onabort = d;
		a.src = e;
		return a
	};
	a.Domain.list = {};
	a.Domain.abort = function() {
		for (var b in a.Domain.list)
			a.Domain.list[b].dispose();
		a.Domain.list = {}
	};
	$Runtime.onunload.attach(a.Domain.abort);
	a.Execute = new function() {
		var f = $Browser.isMozilla(), b = $Browser._isIE, c = 0, e = blnImagesChecked = false;
		this.load = function(f, c) {
			var b = a.Type, d, e = c.type, g = c.url;
			$Network.Events.onrequest.fire(c);
			if (g != c.url)
				c.resolve();
			switch (e) {
				case b.XMLGet :
				case b.XML :
				case b.XMLPost :
					d = new this.XML(f, c, b.XMLPost == e);
					break;
				case b.Stream :
					if (!this.Stream) {
						throw new Error("Streaming not installed");
						break
					}
				case b.Image :
				case b.Script :
				case b.CSS :
					d = new this[e](f, c)
			}
			return d
		};
		this.XML = function(h, a, g) {
			this.callback = h;
			this.request = a;
			this.isRunning = true;
			var c = this.resource = new XMLHttpRequest, d = a.absoluteUrl;
			if ($Browser.isSafari())
				d = d.replace(/\:80\//, "/");
			if (g) {
				c.open("POST", d, true);
				if (b)
					c.setRequestHeader("Accept-Encoding", "gzip, deflate")
			} else
				c.open(a.verb, d, true);
			if (a.headers)
				for (var e in a.headers)
					c.setRequestHeader(e, a.headers[e]);
			if (a.canary)
				c.setRequestHeader(a.canary.n, a.canary.v);
			c.onreadystatechange = $CD(this, this.complete);
			if (a.timeout)
				a.timer = setTimeout($CD(this, this.timeout), a.timeout);
			try {
				if (a.postString || f)
					c.send(a.postString);
				else
					c.send()
			} catch (i) {
				$Network.Events.onhttperror.fire(c);
				if (a && a.timer)
					clearTimeout(a.timer);
				this.complete(null, true)
			}
		};
		this.XML.prototype = {
			_cleanup : function() {
				var a = this.request, b = this.resource;
				if (a && a.timer)
					clearTimeout(a.timer);
				try {
					b.onreadystatechange = Function.emptyFunction
				} catch (c) {
				}
			},
			abort : function() {
				this._cleanup();
				try {
					this.resource.abort()
				} catch (a) {
				}
				if (!$Runtime.unloading)
					this.callback({
								status : 0
							}, this.request)
			},
			timeout : function() {
				this._cleanup();
				this.callback({
							status : 404
						}, this.request)
			},
			complete : function(c, b) {
				this.isRunning = false;
				var a = this.resource;
				if (a && (b || 4 === a.readyState)) {
					this._cleanup();
					this.callback(a, this.request)
				}
			}
		};
		this._Image = function() {
			return new Image
		};
		this.Cache = function(d, b) {
			this.callback = d;
			this.request = b;
			var c = this.cache = a.Execute._Image();
			c.onabort = c.onerror = $CD(this, this._onerror);
			c.onload = $CD(this, this._onload);
			if (b.timeout)
				this.timeout = setTimeout($CD(this, this._timeout), b.timeout);
			c.src = b.absoluteUrl
		};
		this.Cache.prototype = {
			_onerror : function() {
				this.cache.status = 404;
				blnImagesChecked = this.cache.blnError = true;
				this.dispose()
			},
			_onload : function() {
				this.cache.status = 200;
				blnImagesChecked = true;
				this.dispose()
			},
			_timeout : function() {
				this.cache.status = 408;
				this.cache.blnTimeout = true;
				this.dispose()
			},
			abort : function() {
				this.cache.removeAttribute("src");
				this.cache.status = 0;
				this.dispose()
			},
			dispose : function() {
				if (!$Runtime.unloading)
					this.callback(this.cache, this.request);
				if (this.timeout)
					clearTimeout(this.timeout);
				this.timeout = this.cache = this.callback = this.request = this.cache.onerror = this.cache.onload = this.cache.onabort = null
			}
		};
		this.CSS = function(d, a) {
			this.callback = d;
			this.request = a;
			this.isRunning = true;
			this.url = a.absoluteUrl;
			this.resource = null;
			var f = this.getElement(this.url);
			if (!f)
				if ($Browser.isSafari() || e || c >= 2 && !blnImagesChecked)
					this._next();
				else {
					if (b && !blnImagesChecked
							&& (!a.timeout || a.timeout < 3500))
						this.timeout = setTimeout($CD(this, this._timeout),
								3500);
					this.cache = new $Network.Execute.Cache($CD(this,
									this._next), a)
				}
			else
				d(f, a)
		};
		var d = "uninitialized";
		this.CSS.prototype = {
			_timeout : function() {
				if (this.cache && this.cache.cache.readyState === d) {
					e = true;
					this.cache.abort()
				}
			},
			_next : function() {
				if (this.timeout)
					clearTimeout(this.timeout);
				var c = this.request.pool, a = this.resource = c || _ce("link");
				if (!c) {
					a.rel = "stylesheet";
					a.type = "text/css"
				}
				a.href = this.url;
				a.onreadystatechange = $CD(this, this.complete);
				if (!c)
					_dh.appendChild(a);
				if (!b)
					a.readyState = "complete";
				this.cache = null;
				this.complete()
			},
			getElement : function(d) {
				var b = _get("link");
				for (var a = b.length - 1; a >= 0; a--) {
					var c = b[a];
					if ($Request.resolveUrl(c.href) === d)
						return c
				}
				return null
			},
			abort : function() {
				if (this.timeout)
					clearTimeout(this.timeout);
				var a = this.resource;
				if (a)
					try {
						a.removeAttribute("href");
						a.onreadystatechange = null
					} catch (b) {
					}
				if (this.cache)
					this.cache.abort();
				this.cache = this.resource = null;
				if (!$Runtime.unloading)
					this.callback({
								status : 0
							}, this.request)
			},
			complete : function() {
				this.isRunning = false;
				var a = this.resource;
				if (a
						&& a.onreadystatechange
						&& ("loaded" === a.readyState || "complete" === a.readyState)) {
					this.callback(a, this.request);
					this.resource = a = a.onreadystatechange = null
				}
			}
		};
		this.Image = function(d, a) {
			this.callback = d;
			this.request = a;
			this.isRunning = true;
			if (c == 2 && !blnImagesChecked)
				this.complete({
							status : 408,
							src : a.absoluteUrl
						});
			else {
				if (!blnImagesChecked && b && (!a.timeout || a.timeout < 3500))
					this.timeout = setTimeout($CD(this, this._timeout), 3500);
				this.cache = new $Network.Execute.Cache(
						$CD(this, this.complete), a)
			}
		};
		this.Image.prototype = {
			_timeout : function() {
				if (this.cache && this.cache.cache.readyState === d)
					this.cache._timeout()
			},
			abort : function() {
				if (this.timeout)
					clearTimeout(this.timeout);
				if (!$Runtime.unloading)
					this.callback({
								status : 0
							}, this.request);
				if (this.cache)
					this.cache.abort();
				this.isRunning = false;
				this.request = this.callback = this.cache = null
			},
			complete : function(a) {
				if (this.timeout)
					clearTimeout(this.timeout);
				if (b && a.status === 408 && a.readyState === d)
					c++;
				this.isRunning = false;
				if (!$Runtime.unloading)
					this.callback(a, this.request);
				this.request = this.callback = null
			}
		};
		this.Script = function(a, b) {
			this.callback = a;
			this.request = b;
			this._count = 0;
			this._run()
		};
		this.Script.prototype = {
			_run : function() {
				var f = this.request, g = this.url = f.absoluteUrl
						.toLowerCase(), c = this.resource = this.getElement(g), d, e;
				if (b && !(f.flags & a.Flags.CACHEONLY))
					e = $CD(this, this._precomplete);
				else
					e = $CD(this, this.complete);
				if (b && !c)
					d = this.resource = a.Execute.Script.outstanding[g];
				this._count++;
				if (f.hash) {
					this.hash = true;
					this.constructor.hash[f.hash] = false
				}
				if (!c || !b && this.retry)
					if (d && !this.retry) {
						if (d.callbacks == null)
							d.callbacks = [];
						d.callbacks.push(e)
					} else {
						this.resource = c = _ce("script");
						if (!b) {
							c.onload = c.onerror = e;
							c.readyState = "complete";
							a.Execute.scriptList[g] = c;
							c.src = f.absoluteUrl;
							_dh.appendChild(c)
						} else {
							a.Execute.Script.outstanding[g] = c;
							if (d)
								c.callbacks = d.callbacks;
							c.onreadystatechange = e;
							c.src = f.absoluteUrl
						}
					}
				else if (!b) {
					c.readyState = "complete";
					if (c.onload == null)
						this.complete();
					else {
						if (c.callbacks == null)
							c.callbacks = [];
						c.callbacks.push(e)
					}
				} else
					this.complete();
				d = null
			},
			abort : function() {
				try {
					this.resource.removeAttribute("src")
				} catch (a) {
				}
				if (!$Runtime.unloading)
					this.callback({
								status : 0
							}, this.request);
				if (this.resource)
					this.resource = this.resource.callbacks = null;
				this.onreadystatechange = this.callback = this.request = null
			},
			_precomplete : function() {
				var b = this.resource;
				if (b
						&& ("loaded" === b.readyState || "complete" === b.readyState))
					if (!a.Execute.scriptList[this.url]) {
						b.onreadystatechange = $CD(this, this.complete);
						_dh.appendChild(b)
					} else
						this.complete()
			},
			complete : function() {
				var b = this.resource, c;
				if (b
						&& ("loaded" === b.readyState && !this.hash
								|| "complete" === b.readyState || this.constructor.hash[this.request.hash])) {
					b.onreadystatechange = b.onload = b.onerror = null;
					if (!(this.request.flags & a.Flags.CACHEONLY))
						if (this.hash
								&& !this.constructor.hash[this.request.hash])
							if (this._count <= a.Config.retryScripts) {
								this.retry = true;
								this._run();
								return
							} else
								throw new Error("Script " + this.url + ": "
										+ this.request.hash
										+ "  failed to load.");
						else {
							a.Execute.scriptList[this.url] = b;
							delete a.Execute.Script.outstanding[this.url]
						}
					b.status = 200;
					if (b.callbacks) {
						while (c = b.callbacks.pop())
							c(b, this.request);
						this.callbacks = null
					}
					this.callback(b, this.request);
					b = null
				}
			},
			getElement : function(f) {
				var c = $Request.resolveUrl, b = a.Execute.scriptList;
				if (!b) {
					b = a.Execute.scriptList = {};
					var d = document.scripts, g = d.length;
					for (i = 0; i < g; i++) {
						var e = d[i];
						b[c(e.src).toLowerCase()] = e
					}
				}
				return b[c(f).toLowerCase()]
			}
		};
		this.Script.prototype.constructor = this.Script;
		this.Script.hash = {};
		this.Script.outstanding = {}
	};
	a.registerScript = function(b) {
		a.Execute.Script.hash[b] = true
	};
	a._fppReady = false;
	a._fppProxies = [];
	a.registerFpp = function(c, b) {
		if (a._fppReady)
			a.FppProxy.create(c, b);
		else
			a._fppProxies.push({
						type : c,
						classType : b
					})
	};
	var e = false;
	a.Proxy = {
		proxies : {},
		_registerProxy : function(b) {
			var c = $Request.extractHost(b.location.href, false);
			a.Proxy.proxies[c].onload = null;
			a.Domain.list[c]._assignProxy(b)
		},
		_proxyFailure : function(b) {
			return function() {
				var c = $Request.extractHost(b.src, false);
				b.removeNode();
				delete a.Proxy.proxies[c];
				throw new Error("xmlProxy from " + c + " failed.");
			}
		},
		generate : function(b, d) {
			if (!e)
				a.registerBaseDomain();
			if (!this.proxies[b])
				if (b.endsWith(document.domain)
						|| b.indexOf(":") > 0
						&& b.substring(0, b.indexOf(":"))
								.endsWith(document.domain)) {
					var c = d || _ce("iframe");
					c.style.display = "none";
					document.body.insertAdjacentElement("afterBegin", c);
					c.onload = a.Proxy._proxyFailure(c);
					c.src = location.protocol + "//" + b + "/xmlProxy.htm?vn="
							+ $Version + "&domain=" + document.domain;
					this.proxies[b] = c
				}
			return this.proxies[b]
		}
	};
	a.registerBaseDomain = function() {
		if (e)
			return;
		var b = a.currentDomain;
		if (b.indexOf(":") > 0)
			b = b.substring(0, b.indexOf(":"));
		if ($Config.domain && !$Config.domain.endsWith("."))
			document.domain = $Config.domain;
		else if (b.endsWith(".com")) {
			var c = b.indexOf(".");
			if (c > 0) {
				document.domain = b;
				try {
					while (c >= 0) {
						b = b.substring(c + 1);
						if (b != "com") {
							document.domain = b;
							c = b.indexOf(".")
						} else
							c = -1
					}
				} catch (d) {
				}
			}
		} else
			throw new Error("Missing/Bad $Config.domain");
		e = true
	};
	a.Config = {
		retryScripts : 2,
		maxActive : parseInt(window.maxConnectionsPerServer) || 2
	};
	if ($Config.applyAppDomain)
		a.registerBaseDomain()
};
function $Request(d, b, c, a) {
	this.id = $Request.counter++;
	this.url = d;
	this.flags = c;
	this.context = a || {};
	this.headersString = "";
	this.type = b;
	this.domain = $Request.extractHost(this.resolve());
	this.verb = "GET"
}
$Request.counter = 0;
$Request.prototype = {
	setHeaders : function(a) {
		this.headers = a;
		var c = "";
		for (var b in a)
			c += b + "=" + a[b] + "&";
		this.headersString = c;
		return this
	},
	setVerb : $FN("verb"),
	setTimeout : $FN("timeout"),
	setContext : $FN("context"),
	setFlags : $FN("flags"),
	setPriority : $FN("priority"),
	setObject : $FN("pool"),
	setHash : $FN("hash"),
	setGroup : $FN("group"),
	setName : $FN("name"),
	setHost : $FN("host"),
	setPostString : function(a) {
		this.postString = a;
		this.resolve();
		return this
	},
	toString : function() {
		return this.url
	},
	setUrl : function(a) {
		this.url = a;
		this.resolve()
	},
	_flags : $Network.Flags,
	getKey : function() {
		var a = this.absoluteUrl + "!" + this.headersString;
		if (this.flags & this._flags.DUPLICATE)
			a += "!" + this.id;
		return a
	},
	setCanary : function(a) {
		if (typeof a == "string") {
			this.canary = {
				n : a,
				v : $Network.getCookie(a) || ""
			};
			this.resolve()
		}
		return this
	},
	resolve : function(b) {
		var a = $Request.resolveUrl(this.url, b || this.host);
		if (this.canary && this.type == $Network.Type.Script)
			a += (a.indexOf("?") > 0 ? "&" : "?") + this.canary.n + "="
					+ this.canary.v;
		if (b)
			this.domain = $Request.extractHost(a);
		this.absoluteUrl = a;
		return a
	}
};
new function() {
	var a = $Request, c = $Network, b = null;
	c.extractHost = a.extractHost = function(b, c) {
		var d = c
				? this.extractHost.reProtocolAndHost
				: this.extractHost.reHost;
		b = a.resolveUrl(b).toLowerCase();
		return String(b).search(d) < 0 ? "" : RegExp.$1
	};
	a.extractHost.reHost = /^(?:http|https|ftp):\/\/([-.a-z0-9]+(?::[0-9]+)?)(?:\/|$)/i;
	a.extractHost.reProtocolAndHost = /^((?:http|https|ftp):\/\/[-.a-z0-9]+(?::[0-9]+)?)(?:\/|$)/i;
	a.expandUrl = function(c) {
		if (c.indexOf("{") >= 0 && $Config) {
			if (!b) {
				var a = $Config;
				b = {
					culture : a.culture,
					"theme.url" : a.Themes.url,
					"framework.base" : a.baseUrl
				};
				if (a.URL)
					for (var d in a.URL)
						b[d] = b[d.toLowerCase()] = a.URL[d]
			}
			c = c.formatTokens(b)
		}
		return c
	};
	c.resolveUrl = a.resolveUrl = function(b, c) {
		if (b == null)
			return "";
		b = b.toString();
		b = a.expandUrl(b);
		if (!c)
			if (!a.Base) {
				var e = _get("base");
				if (e.length > 0 && e[0].href != "")
					c = a.Base = e[0].href;
				else {
					var f = location.protocol + "//" + location.host
							+ location.pathname;
					c = a.Base = f.substring(0, f
									.lastIndexOf(location.protocol === "file:"
											? "\\"
											: "/")
									+ 1)
				}
			} else
				c = a.Base;
		else {
			c = a.expandUrl(c.toString());
			c = c.toString().substring(0, c.toString().lastIndexOf("/") + 1)
		}
		if (b.startsWith("/"))
			b = location.protocol + "//" + location.host + b;
		if (b.indexOf("//") === -1)
			b = c + b;
		function d(a) {
			while (d.reDoubleDot.test(a))
				a = a.replace(d.reDoubleDot, "");
			return a
		}
		d.reDoubleDot = /\/[^\/]*\/\.\./;
		return d(b)
	};
	$Network.currentDomain = $Request.extractHost(document.location)
};
var $Accessibility = {
	notify : function() {
		if (this.enabled) {
			if (!this._frame) {
				var b = this._frame = _ce("iframe"), a = b.style;
				a.width = a.height = "1px";
				a.top = a.left = "-1000px";
				a.position = "absolute";
				b.tabIndex = -1;
				document.body.insertAdjacentElement("afterBegin", b)
			}
			this._frame.contentWindow.location.replace("about:blank")
		}
	},
	_frame : null,
	enabled : $Config.accessibility != null ? $Config.accessibility : true
}, $Binding = function(a, b, h) {
	$Binding.initializeBase(this, arguments);
	this._element = a;
	this._htParams = b || {};
	this._strNamespace = h;
	var d = this.constructor.skipClass, c = d === true || d === "true", f = b
			&& b.skipclass, e = f === true || f === "true";
	this._blnClass = c || e;
	if (e)
		this.constructor.skipClass = true;
	var g = this.constructor.applyClass(true);
	this.constructor.skipClass = c;
	if (g != "")
		a.className += " " + g;
	if (!a.webBindings)
		a.webBindings = [this];
	else
		a.webBindings.push(this);
	return this
};
function _BindingChangedNotification(a, e) {
	var c = a._element.webBindings;
	if (c) {
		var g = c.length;
		if (g > 1) {
			var f = e ? "onunbinding" : "onbinding";
			for (var d = 0; d < g; d++) {
				var b = c[d];
				if (b != a) {
					b[f](a);
					if (!e)
						a[f](b)
				}
			}
		}
	}
}
new function() {
	var b = $Binding, a = b.prototype;
	a.initialize = function(a, b) {
		if (!this._registered)
			if (!b) {
				this._registered = true;
				this.parentScope = a && a.scope || $Binding.Scope.Root;
				this.parentScope.add(this);
				_BindingChangedNotification(this, false)
			} else
				this._owner = a
	};
	a.getParameters = function() {
		function a(g, d, c, f) {
			var b = {};
			if (d)
				for (var h in f) {
					var a = h.toLowerCase();
					try {
						var e = g.getAttribute(d + ":" + a);
						if (e) {
							b[a] = new String(e);
							b[a].Default = c[a]
						} else
							b[a] = c[a]
					} catch (i) {
						b[a] = c && c[a]
					}
				}
			return b
		}
		if (!this._blnMerge && this._strNamespace && this.constructor.Params) {
			this._htParams = a(this._element, this._strNamespace,
					this._htParams, this.constructor.Params);
			this._blnMerge = true
		}
		return this._htParams
	};
	a.registerFor = function(c, a, b) {
		if (!this._aobjRegistrations)
			this._aobjRegistrations = [];
		this._aobjRegistrations.push(this.parentScope.registerFor(c, a, b))
	};
	a.getIdentity = function() {
		return this._element.getAttribute(this._strNamespace + ":id") || ""
	};
	a.isChained = function(a) {
		return this.chains && this.chains[a]
	};
	a.addChain = function(a) {
		if (!this.chains)
			this.chains = {};
		this.chains[a.constructor.__typeName] = a
	};
	a.dispose = function(d) {
		if (!this._element || this.__disposing)
			return;
		this.__disposing = true;
		$Binding.callBaseMethod(this, "dispose", arguments);
		this.parentScope.remove(this);
		var a = this._element.webBindings, b;
		if (a)
			if (d)
				this._element.webBindings = null;
			else if (a.length === 1)
				this._element.removeAttribute("webBindings");
			else
				a.remove(this);
		if (!$Runtime.unloading) {
			_BindingChangedNotification(this, true);
			if (!this._blnClass) {
				var c = this.constructor.removeClass(this._element.className);
				if (c != this._element.className)
					this._element.className = c
			}
			if (this._aobjRegistrations)
				while (b = this._aobjRegistrations.pop())
					this.parentScope.unregisterFor(b);
			if (this.chains)
				for (var e in this.chains)
					this.chains[e].dispose()
		}
		if (this._htParams && this._htParams.xmlSources)
			this._htParams.xmlSources = null;
		this.chains = this._aobjRegistrations = this._rule = this._definition = this._htEvents = this._owner = this._htParams = this.scope = this._element = this.parentScope = null
	};
	a.register = function() {
		this.initialize(this._owner)
	};
	a.getType = function() {
		return this.constructor.__typeName
	}, a.onchain = a.onunbinding = a.onbinding = Function.emptyFunction;
	b.skipClass = true;
	b.registerClass("$Binding", "$Event.DOM")
};
$Binding.Scope = function(a) {
	this.owner = a;
	this.childBindings = {
		_untyped : []
	};
	this.aobjRegistrations = [];
	this.definitions = {}
};
$Binding.Scope.prototype = {
	getBinding : function() {
		return this.owner || $Binding.Scope.Root
	},
	__de : document.documentElement,
	_checkRegistration : function(a, g) {
		var b = a.constructor._childBase;
		if (b) {
			var h = b.length;
			for (var d = 0; d < h; d++) {
				var e = this.aobjRegistrations[b[d]];
				if (e)
					for (var f = e.length - 1; f >= 0; f--) {
						var c = e[f];
						if (c.elRoot === this.__de
								|| c.elRoot.contains(a._element))
							c.fnCallback(a, g)
					}
			}
		}
	},
	add : function(a) {
		var b = a.constructor.__typeName || "_untyped";
		if (!this.childBindings[b])
			this.childBindings[b] = [a];
		else
			this.childBindings[b].push(a);
		this._checkRegistration(a, true)
	},
	remove : function(a) {
		if (!$Runtime.unloading) {
			this._checkRegistration(a, false);
			this.childBindings[a.constructor.__typeName || "_untyped"]
					.remove(a)
		}
		if (a.scope)
			a.scope.dispose()
	},
	unregisterFor : function(a) {
		a.task.dispose();
		this.aobjRegistrations[a.strBinding].remove(a);
		if ($Binding.Scope.Root != this)
			this.owner.parentScope.unregisterFor(a)
	},
	registerFor : function(a, h, i) {
		var b = a, d;
		if (b === "*" || b === "Web.Bindings.Base") {
			b = "$Binding";
			a = $Binding
		} else if (typeof a === "function")
			b = a.__typeName;
		else
			a = Function.parse(a);
		var c = {
			fnCallback : h,
			elRoot : i || this.__de,
			strBinding : b,
			task : new $Task
		}, g = a && a._parentBase;
		if (!this.aobjRegistrations[b])
			this.aobjRegistrations[b] = [c];
		else
			this.aobjRegistrations[b].push(c);
		if (g) {
			var f = 0, k = g.length;
			for (f; f < k; f++)
				if (d = this.childBindings[g[f]]) {
					var j = d.length;
					for (var e = 0; e < j; e++)
						if (c.elRoot === this.__de
								|| c.elRoot.contains(d[e]._element))
							c.task.add($CC(c.fnCallback, [d[e], true]))
				}
		}
		if ($Binding.Scope.Root != this)
			this.owner.parentScope.registerFor(a, h, i);
		c.task.run();
		return c
	},
	dispose : function() {
		var d, f = $Runtime.unloading;
		for (d in this.childBindings) {
			var c = this.childBindings[d];
			for (var b = c.length - 1; b >= 0; b--) {
				var a = c[b];
				if (a && !a.__disposing)
					a.dispose(f)
			}
		}
		for (var e in this.definitions)
			this.definitions[e].dispose();
		this.owner = this.childBindings = this.aobjRegistrations = this.definitions = this.elements = null
	}
};
$Binding.Scope.Root = new $Binding.Scope;
$Binding.define = function(a, c, b) {
	return new $Binding.Definition(a, c, b)
};
$Binding.Definition = function(a, c, b) {
	this.id = "$Def" + $Counter++;
	this.type = a;
	this.owner = b;
	this.root = c || document.documentElement;
	this.task = null;
	this.isAttaching = this.isBound = false;
	this.objBindings = []
};
$Binding.Definition.prototype = {
	bindTo : function(b, c) {
		if (!this._elements)
			this._elements = [];
		this._elements.push(b);
		if (c)
			for (var a = 1; a < arguments.length; a++)
				this._elements.push(arguments[a]);
		return this
	},
	bindCss : function(a, c) {
		if (!a)
			return this;
		if (!this._selectors)
			this._selectors = [];
		if (a instanceof Array)
			for (var b = 0; b < a.length; b++)
				this._selectors.push({
							sel : a[b],
							root : c || this.root
						});
		else
			this._selectors.push({
						sel : a,
						root : c || this.root
					});
		return this
	},
	setDefaults : $FN("_defaults"),
	setNS : $FN("ns"),
	addChain : function() {
		var c = arguments.length;
		if (!this.chain) {
			this.chain = [];
			this.readyChain = []
		}
		for (var b = 0; b < c; b++) {
			var a = arguments[b];
			if (a instanceof Array)
				this.chain.addRange(a);
			else
				this.chain.push(a)
		}
		return this
	},
	setScope : function(a) {
		this.scope = !a || a === $Binding.Scope.Root
				? $Binding.Scope.Root
				: a.scope;
		if (!this.scope)
			this.scope = a.scope = new $Binding.Scope(a);
		return this
	},
	setSync : $FN("_async"),
	_onchain : function(b, a) {
		this.readyChain.push(a);
		a.def.attach()
	},
	create : function(d, h, f) {
		if (!d)
			return;
		var g = this.gadgetDef = this.gadgetDef || Function.parse(this.type), e = d.webBindings, b = null;
		if (e)
			for (var c = e.length - 1; c >= 0; c--) {
				var a = e[c];
				if (g === a.constructor) {
					if (f || !this._async)
						this.objBindings.push(a);
					return a
				}
				if (this.parent && a.constructor === this.parent.gadgetDef)
					b = a
			}
		if (!b || b && !b.__disposing) {
			var a;
			try {
				a = new g(window.$MemoryMgr != null ? $(d) : d, this._defaults
								|| {}, this.ns)
			} catch (i) {
				if ($Debug.enabled)
					throw i;
				else
					$Tracing.Error.submitFromException(i, this.type,
							$Tracing.Error.BindingMissing);
				return null
			}
			a._definition = this;
			a._rule = h;
			try {
				a.initialize(this.scope)
			} catch (i) {
				if ($Debug.enabled)
					throw i;
				else
					$Tracing.Error.submitFromException(i, this.type,
							$Tracing.Error.BindingInit);
				return null
			}
			if (this.readyChain)
				for (var c = this.readyChain.length - 1; c >= 0; c--)
					this.readyChain[c].def.create(d, h, null);
			if (f || !this._async)
				this.objBindings.push(a);
			if (b) {
				b.onchain(a);
				a.onchain(b)
			}
		}
		return a
	},
	attach : function(f) {
		var a = this, d = a.chain && a.chain.length;
		if (this.isBound)
			throw new Error("Binding Complete");
		this.isAttaching = this.isBound = true;
		this.scope = a.scope || $Binding.Scope.Root;
		this.scope.definitions[this.id] = this;
		function h() {
			a.task = null;
			a.isAttaching = false;
			if (f)
				f(a.objBindings, a);
			if (d > 0)
				for (var e = 0; e < d; e++) {
					var b = a.chain[e], c = b.def;
					if (c.type) {
						c.root = a.root;
						c.owner = a.owner;
						c.parent = a;
						if (c.type && c.root != null && !c.preload)
							if (b.network && !b.network.isLoaded)
								b.network.setContext(b)
										.load($CD(a, a._onchain));
							else
								a._onchain(null, b);
						else if (b.network)
							b.network.load()
					}
				}
		}
		if (a._selectors || a._elements) {
			if (this._async)
				this.task = new $Task(h);
			if (a._elements) {
				a._elements.forEach(function(b) {
							if (a._async)
								a.task
										.add($CC($CD(a, a.create),
												[b, false, f]));
							else
								a.create(b, false)
						});
				if (d > 0)
					for (var b = 0; b < d; b++)
						a.chain[b].def.bindTo
								.apply(a.chain[b].def, a._elements)
			}
			if (a._selectors) {
				var i = $Dom.Css;
				for (var e = a._selectors.length - 1; e >= 0; e--) {
					var c = a._selectors[e];
					if (!c.selector)
						c.rules = i.createRules(c.sel);
					var g = i.getElementsByCssSelectorRules(c.rules, c.root), j = g.length;
					if (j > 0) {
						if (d > 0)
							for (var b = 0; b < d; b++)
								a.chain[b].def.bindTo.apply(a.chain[b].def, g);
						for (var b = 0; b < j; b++)
							if (this._async)
								a.task.add($CC($CD(this, this.create, f), [
												g[b], c]));
							else
								this.create(g[b], c)
					}
				}
			}
			if (d > 0)
				for (var e = 0; e < a.chain.length; e++) {
					var c = a.chain[e];
					if (c.network)
						c.network.load()
				}
			if (this._async)
				this.task.run();
			else
				h()
		} else {
			if (this.root)
				this.create(this.root, false);
			h()
		}
		return this.objBindings
	},
	isValid : function(d) {
		var c = false;
		if (this._selectors)
			for (var a = 0; a < this._selectors.length; a++) {
				var b = this._selectors[a];
				if ($Dom.Css.doesElementPassRules(d, b.rules, b.root)) {
					this.create(d, b.rules);
					c = true
				}
			}
		return c
	},
	validate : function() {
		if (this._selectors && this.isBound) {
			var d = this.gadgetDef.__typeName || "_untyped", b = this.scope.childBindings[d];
			if (b)
				for (var c = b.length - 1; c >= 0; c--) {
					var a = b[c];
					if (a._definition === this && a._rule) {
						var e = a._element;
						if (!$Dom.Css.doesElementPassRules(e, a._rule.rules,
								a._rule.root))
							a.dispose()
					}
				}
		}
	},
	dispose : function() {
		var d = $Runtime.unloading;
		if (this.isBound) {
			if (this.task)
				this.task.dispose();
			if (!d && this.gadgetDef) {
				var e = this.gadgetDef.__typeName || "_untyped", b = this.scope.childBindings[e];
				if (b)
					for (var a = b.length - 1; a >= 0; a--)
						if (b[a]._definition === this)
							try {
								b[a].dispose(d)
							} catch (f) {
								if ($Debug.enabled)
									throw f;
							}
				if (this.chain)
					for (var a = this.chain.length - 1; a >= 0; a--) {
						var c = this.chain[a];
						if (c.network && c.network.isExecuting)
							c.network.abort();
						c.def.dispose()
					}
			}
		}
		this.parent = this.readyChain = this.chain = this.owner = this.root = this.scope = this._elements = this._selectors = this.objBindings = null;
		this.isBound = this.isAttaching = false
	}
};
$Binding.load = function(c, a, b) {
	if (a)
		if (!b)
			a.attach(c);
		else
			b.load($Binding._runBind(c, a, a._key))
};
$Binding.extend = function(d, b) {
	var c = b || $Binding.Scope.Root, a = c.definitions;
	for (var e in a)
		a[e].isValid(d, true)
};
$Binding.validate = function(b, a) {
	if (b.webBindings)
		for (var d = b.webBindings.length - 1; d >= 0; d--) {
			var c = b.webBindings[d];
			if ((!a || c.scope === a || a && a.scope === c.scope)
					&& c._definition)
				if (!c._definition.isValid(b))
					c.dispose()
		}
	$Binding.extend(b, a)
};
$Binding.remove = function(a) {
	if (a && a.webBindings) {
		for (var b = a.webBindings.length - 1; b >= 0; b--)
			a.webBindings[b].dispose(false);
		a.removeAttribute("webBindings");
		return true
	}
	return false
};
$Runtime.onunload.attach(function() {
			$Binding.Scope.Root.dispose()
		});
$Binding._complete = function(b, a) {
	return function() {
		if (!a) {
			if (b)
				b();
			return
		}
		$Binding._runCount[a]--;
		if ($Binding._runCount[a] === 0) {
			delete $Binding._runCount[a];
			if (b)
				b();
			if (a === $Binding._init && $Config && $Config.TraceData
					&& $Config.TraceData.SkipInitPLT != "1")
				$Tracing.PLT()
		}
	}
};
$Binding._runBind = function(b, a) {
	return function(f) {
		if (f) {
			var d = [], g = f.length;
			for (var e = 0; e < g; e++) {
				var c = f[e];
				if (c.type === $Network.Type.XML) {
					d.push(c.resource);
					if (c.name)
						d[c.name] = c.resource
				}
			}
			if (!a._defaults)
				a._defaults = {};
			a._defaults.xmlSources = d
		}
		a.attach(b)
	}
};
$Binding._runCount = {};
$Binding.parse = function(g, r, d, w, p) {
	var x = d || document, s = $Dom.getAnyElementByTagName, v = Array.$Prioritizer, u = v.Priorities, j = "web:", f;
	if (d && d.tagName === j + "binding")
		f = [d];
	else
		f = s(j + "binding", x, true);
	var h = f.length, i = new v, b, q = [], n = $Binding, k = $Binding._init;
	if (!k)
		$Tracing.initTime = (new Date).getTime();
	if (h > 0) {
		var c = "r" + $Counter++;
		n._runCount[c] = h;
		if (!k)
			$Binding._init = c;
		for (var o = 0; o < h; o++) {
			var t = f[o], l = s(j + "references", t, true), b = null;
			if (l && l.length > 0)
				b = l[0].getAttribute("priority");
			b = b
					&& u[b.substring(0, 1).toUpperCase()
							+ b.substring(1).toLowerCase()] || u.High;
			i.queue(t, b)
		}
		var m = i.dequeue(), B = $Parser, z = $Parsers.Definitions.Binding, A = n.Definition, y = $Binding.load;
		while (m) {
			var e = B(z, m, {
						def : new A(null, d, w)
					}), a = e.def;
			if (r != null)
				a._async = r;
			if (p != null)
				a.preload = p;
			if (a.type && a.root != null && !a.preload) {
				a._key = c;
				y($Binding._complete(g, c), a, e.network);
				q.push(a);
				e = null
			} else if (e.network)
				e.network.load($Binding._complete(g, c));
			else
				n._runCount[c]--;
			m = i.dequeue()
		}
	} else {
		if (g)
			g();
		if (!k && $Config && $Config.TraceData
				&& $Config.TraceData.SkipInitPLT != "1") {
			$Binding._init = true;
			$Tracing.PLT()
		}
	}
	return q
};
$Binding.version = "1.0";
new function() {
	var b = $Config, a = b ? b.TraceData : null;
	window["$Tracing"] = {
		Error : {
			Script : 34,
			Extraction : 35,
			Multiple : 36,
			BindingInit : 37,
			BindingMissing : 39,
			Fire : 38,
			Count : 0,
			TraceLevels : new $Flags("NoTrace", 0, "NoMessage", 1,
					"NoStackTrace", 2, "NoParameters", 3, "FullTrace", 4),
			Submit : function(q, r, s, i, f, m) {
				var b = $Tracing.Error;
				function p(i, h) {
					try {
						var b = [], e = i.split(",");
						if (e[0])
							for (var c = 0; c < e.length; c++) {
								if (c > 0)
									b.push(",");
								var a = h[c];
								if (!a)
									a = "null";
								b.push(e[c].trim() + "=");
								if (typeof a == "string")
									b.push("'" + a + "'");
								else if (typeof a == "function") {
									var d = a.toString(), f = d.substr(0, d
													.indexOf("("));
									if (f == "function")
										f = d.substr(0, d.indexOf("(") + 20)
												.trim()
												+ "...}";
									b.push(f)
								} else if (typeof a == "object")
									b.push("object");
								else
									b.push("[" + typeof a + "]" + a)
							}
						return b.join("")
					} catch (j) {
						var g = j.description;
						if (!g)
							g = j;
						return "~ERRORIN~ExpandArguments~ " + g
					}
				}
				function n(f, e) {
					var d = false;
					try {
						if (b.CallBack && b.CallBack(f, e, a.target) === -1)
							d = true
					} catch (h) {
					}
					if (!d && b.Count < 4) {
						var g = new Image, c = a.target + "&ec=" + f + "&pl="
								+ escape(e);
						c = c.substr(0, Math.min(c.length, 1950));
						g.src = c
					}
				}
				if (!f)
					if (b.Count > 0)
						f = b.Multiple;
					else
						f = b.Script;
				b.Count++;
				if (!a || a.disable == "1")
					return false;
				var d = [];
				try {
					var h = parseInt(a.traceLevel, 10), g = b.TraceLevels;
					if (h > g.NoTrace) {
						if (h > g.NoMessage)
							d.push("msg=" + q);
						d.push("~url=" + r, "~ln=" + s);
						if (h > g.NoStackTrace)
							if (m)
								d.push("~cs=" + m);
							else if (arguments.caller) {
								var c = arguments.caller.callee, j = 0;
								if (i)
									c = c.caller;
								while (c && j < 10) {
									var e = c.toString(), o = "-";
									if (h > g.NoParameters)
										o = p(	e.substring(e.indexOf("(") + 1,
														e.indexOf(")")),
												c.arguments);
									var k = e.substring(0, e.indexOf(")") + 1)
											.trim();
									if (k.substring(0, 9) == "function(")
										k = e.substring(0, e.indexOf(")") + 20)
												.trim()
												+ "...}";
									d.push("~cs" + j + "=" + k + " " + o);
									c = c.caller;
									j++
								}
							}
						d.push("~fv=" + $Version);
						if (i)
							d.push("~data=" + i);
						n(f, d.join("").replace(/</g, "%3C"))
					}
				} catch (t) {
					try {
						var l = t.description;
						if (!l)
							l = t;
						n(b.Extraction, l)
					} catch (u) {
					}
				}
			},
			submitFromException : function(a, c, h, d) {
				if (a.traced)
					return;
				a.traced = true;
				var g = 0, f = document.location.href, b = "u", e = null;
				if (typeof a == "object")
					if ($Browser.isMozilla()) {
						f = a.fileName;
						g = a.lineNumber;
						b = a.message;
						e = a.stack
					} else
						b = a.description;
				else
					b = a;
				if (c)
					b += "@" + c;
				if (!d)
					d = c;
				$Tracing.Error.Submit(b, f, g, d, h, e)
			}
		},
		_complete : false,
		onplttrace : new $Event,
		PLT : function() {
			function f() {
				document.title += " PLT: " + $Network.getCookie("plt")
			}
			if (!this._complete && a) {
				this._complete = true;
				var c = (new Date).getTime(), d = b.headerRenderTime, e = a.target
						+ "&ec=0&it="
						+ (c - (this.initTime || c))
						+ "&hft="
						+ (d ? c - d : "");
				this.Trace(e, a.renderPLT == "1" ? f : null);
				this.onplttrace.fire(e)
			}
		},
		isTracking : a
				&& a.disable != "1"
				&& ($Network.getCookie("wmthr") == "1" || Math.floor(Math
						.random()
						* 1001) <= parseInt(a.PLTRate)),
		Trace : function(b, c) {
			try {
				if (this.isTracking) {
					b = b.replace("err.gif", "plt.gif") + "&r=" + Math.random();
					var a = new Image;
					if (c) {
						function d() {
							a.onload = null;
							c()
						}
						a.onload = d
					}
					a.src = b;
					this.pltImgs.add(a)
				}
			} catch (e) {
			}
		},
		pltImgs : [],
		traces : [],
		StartTrace : function(a, d, b, c) {
			this.traces[a] = {
				name : a,
				min : d,
				max : b,
				pn : c,
				start : (new Date).getTime()
			};
			if (b)
				setTimeout(function() {
							$Tracing.EndTrace(a)
						}, b)
		},
		EndTrace : function(c) {
			var a = this.traces[c], b;
			if (a) {
				this.traces[c] = null;
				b = (new Date).getTime() - a.start;
				b = a.max ? Math.min(a.max, b) : b;
				if (!a.min || b >= a.min)
					this.FireTrace(a.name, b, a.pn)
			}
		},
		FireTrace : function(e, d, c) {
			if (a) {
				var b = a.target;
				if (c)
					b = b.replace(/pn=[^&]*&?/gi, "") + "&pn=" + c;
				b = (b.replace(/(pd|rt|it|hft)=[^&]*&?/gi, "") + "&pd=" + e
						+ "&plt3=" + d).replace(/&+/g, "&");
				this.Trace(b, null)
			}
		}
	};
	var d = $Tracing, c = d.Error.Submit;
	if (a && a.disable != "1") {
		if (!$Browser.isMozilla())
			window.attachEvent("onerror", c);
		else
			window.onerror = c;
		if (b.Light && a.skipInitPLT != "1")
			d.PLT()
	}
}