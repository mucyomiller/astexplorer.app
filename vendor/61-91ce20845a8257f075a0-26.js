(window.webpackJsonp=window.webpackJsonp||[]).push([[61],{"5gxg":function(e,t,s){"use strict";const r={Boolean:"Boolean",EOF:"<end>",Identifier:"Identifier",Keyword:"Keyword",Null:"Null",Numeric:"Numeric",Punctuator:"Punctuator",String:"String",RegularExpression:"RegularExpression",Template:"Template",JSXIdentifier:"JSXIdentifier",JSXText:"JSXText"};function TokenTranslator(e,t){this._acornTokTypes=e,this._tokens=[],this._curlyBrace=null,this._code=t}TokenTranslator.prototype={constructor:TokenTranslator,translate(e,t){const s=e.type,i=this._acornTokTypes;if(s===i.name)e.type=r.Identifier,"static"===e.value&&(e.type=r.Keyword),t.ecmaVersion>5&&("yield"===e.value||"let"===e.value)&&(e.type=r.Keyword);else if(s===i.semi||s===i.comma||s===i.parenL||s===i.parenR||s===i.braceL||s===i.braceR||s===i.dot||s===i.bracketL||s===i.colon||s===i.question||s===i.bracketR||s===i.ellipsis||s===i.arrow||s===i.jsxTagStart||s===i.incDec||s===i.starstar||s===i.jsxTagEnd||s===i.prefix||s.binop&&!s.keyword||s.isAssign)e.type=r.Punctuator,e.value=this._code.slice(e.start,e.end);else if(s===i.jsxName)e.type=r.JSXIdentifier;else if("jsxText"===s.label||s===i.jsxAttrValueToken)e.type=r.JSXText;else if(s.keyword)"true"===s.keyword||"false"===s.keyword?e.type=r.Boolean:"null"===s.keyword?e.type=r.Null:e.type=r.Keyword;else if(s===i.num)e.type=r.Numeric,e.value=this._code.slice(e.start,e.end);else if(s===i.string)t.jsxAttrValueToken?(t.jsxAttrValueToken=!1,e.type=r.JSXText):e.type=r.String,e.value=this._code.slice(e.start,e.end);else if(s===i.regexp){e.type=r.RegularExpression;const t=e.value;e.regex={flags:t.flags,pattern:t.pattern},e.value=`/${t.pattern}/${t.flags}`}return e},onToken(e,t){const s=this,i=this._acornTokTypes,n=t.tokens,a=this._tokens;function translateTemplateTokens(){n.push(function convertTemplatePart(e,t){const s=e[0],i=e[e.length-1],n={type:r.Template,value:t.slice(s.start,i.end)};return s.loc&&(n.loc={start:s.loc.start,end:i.loc.end}),s.range&&(n.start=s.range[0],n.end=i.range[1],n.range=[n.start,n.end]),n}(s._tokens,s._code)),s._tokens=[]}if(e.type!==i.eof){if(e.type===i.backQuote)return this._curlyBrace&&(n.push(this.translate(this._curlyBrace,t)),this._curlyBrace=null),a.push(e),void(a.length>1&&translateTemplateTokens());if(e.type===i.dollarBraceL)return a.push(e),void translateTemplateTokens();if(e.type===i.braceR)return this._curlyBrace&&n.push(this.translate(this._curlyBrace,t)),void(this._curlyBrace=e);if(e.type===i.template||e.type===i.invalidTemplate)return this._curlyBrace&&(a.push(this._curlyBrace),this._curlyBrace=null),void a.push(e);this._curlyBrace&&(n.push(this.translate(this._curlyBrace,t)),this._curlyBrace=null),n.push(this.translate(e,t))}else this._curlyBrace&&n.push(this.translate(this._curlyBrace,t))}},e.exports=TokenTranslator},Al7G:function(e,t,s){"use strict";const r=s("sOAE"),i=s("DXAa"),n=s("QjGs"),a=s("xrHI"),o={_regular:null,_jsx:null,get regular(){return null===this._regular&&(this._regular=r.Parser.extend(a())),this._regular},get jsx(){return null===this._jsx&&(this._jsx=r.Parser.extend(i(),a())),this._jsx},get(e){return Boolean(e&&e.ecmaFeatures&&e.ecmaFeatures.jsx)?this.jsx:this.regular}};t.version=s("xiFj").version,t.tokenize=function tokenize(e,t){const s=o.get(t);return t&&!0===t.tokens||(t=Object.assign({},t,{tokens:!0})),new s(t,e).tokenize()},t.parse=function parse(e,t){return new(o.get(t))(t,e).parse()},t.Syntax=function(){let e,t={};for(e in"function"==typeof Object.create&&(t=Object.create(null)),n)Object.hasOwnProperty.call(n,e)&&(t[e]=n[e]);return"function"==typeof Object.freeze&&Object.freeze(t),t}(),t.VisitorKeys=s("Z6Aa").KEYS},DXAa:function(e,t,s){"use strict";const r=s("Xmlh"),i=/^[\da-fA-F]+$/,n=/^\d+$/,a=s("sOAE"),o=a.tokTypes,l=a.TokContext,p=a.tokContexts,c=a.TokenType,u=a.isNewLine,h=a.isIdentifierStart,m=a.isIdentifierChar,d=new l("<tag",!1),x=new l("</tag",!1),g=new l("<tag>...</tag>",!0,!0),f={jsxName:new c("jsxName"),jsxText:new c("jsxText",{beforeExpr:!0}),jsxTagStart:new c("jsxTagStart"),jsxTagEnd:new c("jsxTagEnd")};function getQualifiedJSXName(e){return e?"JSXIdentifier"===e.type?e.name:"JSXNamespacedName"===e.type?e.namespace.name+":"+e.name.name:"JSXMemberExpression"===e.type?getQualifiedJSXName(e.object)+"."+getQualifiedJSXName(e.property):void 0:e}f.jsxTagStart.updateContext=function(){this.context.push(g),this.context.push(d),this.exprAllowed=!1},f.jsxTagEnd.updateContext=function(e){let t=this.context.pop();t===d&&e===o.slash||t===x?(this.context.pop(),this.exprAllowed=this.curContext()===g):this.exprAllowed=!0},e.exports=function(e){return e=e||{},function(t){return function plugin(e,t){return class extends t{jsx_readToken(){let e="",t=this.pos;for(;;){this.pos>=this.input.length&&this.raise(this.start,"Unterminated JSX contents");let s=this.input.charCodeAt(this.pos);switch(s){case 60:case 123:return this.pos===this.start?60===s&&this.exprAllowed?(++this.pos,this.finishToken(f.jsxTagStart)):this.getTokenFromCode(s):(e+=this.input.slice(t,this.pos),this.finishToken(f.jsxText,e));case 38:e+=this.input.slice(t,this.pos),e+=this.jsx_readEntity(),t=this.pos;break;default:u(s)?(e+=this.input.slice(t,this.pos),e+=this.jsx_readNewLine(!0),t=this.pos):++this.pos}}}jsx_readNewLine(e){let t,s=this.input.charCodeAt(this.pos);return++this.pos,13===s&&10===this.input.charCodeAt(this.pos)?(++this.pos,t=e?"\n":"\r\n"):t=String.fromCharCode(s),this.options.locations&&(++this.curLine,this.lineStart=this.pos),t}jsx_readString(e){let t="",s=++this.pos;for(;;){this.pos>=this.input.length&&this.raise(this.start,"Unterminated string constant");let r=this.input.charCodeAt(this.pos);if(r===e)break;38===r?(t+=this.input.slice(s,this.pos),t+=this.jsx_readEntity(),s=this.pos):u(r)?(t+=this.input.slice(s,this.pos),t+=this.jsx_readNewLine(!1),s=this.pos):++this.pos}return t+=this.input.slice(s,this.pos++),this.finishToken(o.string,t)}jsx_readEntity(){let e,t="",s=0,a=this.input[this.pos];"&"!==a&&this.raise(this.pos,"Entity must start with an ampersand");let o=++this.pos;for(;this.pos<this.input.length&&s++<10;){if(";"===(a=this.input[this.pos++])){"#"===t[0]?"x"===t[1]?(t=t.substr(2),i.test(t)&&(e=String.fromCharCode(parseInt(t,16)))):(t=t.substr(1),n.test(t)&&(e=String.fromCharCode(parseInt(t,10)))):e=r[t];break}t+=a}return e||(this.pos=o,"&")}jsx_readWord(){let e,t=this.pos;do{e=this.input.charCodeAt(++this.pos)}while(m(e)||45===e);return this.finishToken(f.jsxName,this.input.slice(t,this.pos))}jsx_parseIdentifier(){let e=this.startNode();return this.type===f.jsxName?e.name=this.value:this.type.keyword?e.name=this.type.keyword:this.unexpected(),this.next(),this.finishNode(e,"JSXIdentifier")}jsx_parseNamespacedName(){let t=this.start,s=this.startLoc,r=this.jsx_parseIdentifier();if(!e.allowNamespaces||!this.eat(o.colon))return r;var i=this.startNodeAt(t,s);return i.namespace=r,i.name=this.jsx_parseIdentifier(),this.finishNode(i,"JSXNamespacedName")}jsx_parseElementName(){if(this.type===f.jsxTagEnd)return"";let t=this.start,s=this.startLoc,r=this.jsx_parseNamespacedName();for(this.type!==o.dot||"JSXNamespacedName"!==r.type||e.allowNamespacedObjects||this.unexpected();this.eat(o.dot);){let e=this.startNodeAt(t,s);e.object=r,e.property=this.jsx_parseIdentifier(),r=this.finishNode(e,"JSXMemberExpression")}return r}jsx_parseAttributeValue(){switch(this.type){case o.braceL:let e=this.jsx_parseExpressionContainer();return"JSXEmptyExpression"===e.expression.type&&this.raise(e.start,"JSX attributes must only be assigned a non-empty expression"),e;case f.jsxTagStart:case o.string:return this.parseExprAtom();default:this.raise(this.start,"JSX value should be either an expression or a quoted JSX text")}}jsx_parseEmptyExpression(){let e=this.startNodeAt(this.lastTokEnd,this.lastTokEndLoc);return this.finishNodeAt(e,"JSXEmptyExpression",this.start,this.startLoc)}jsx_parseExpressionContainer(){let e=this.startNode();return this.next(),e.expression=this.type===o.braceR?this.jsx_parseEmptyExpression():this.parseExpression(),this.expect(o.braceR),this.finishNode(e,"JSXExpressionContainer")}jsx_parseAttribute(){let e=this.startNode();return this.eat(o.braceL)?(this.expect(o.ellipsis),e.argument=this.parseMaybeAssign(),this.expect(o.braceR),this.finishNode(e,"JSXSpreadAttribute")):(e.name=this.jsx_parseNamespacedName(),e.value=this.eat(o.eq)?this.jsx_parseAttributeValue():null,this.finishNode(e,"JSXAttribute"))}jsx_parseOpeningElementAt(e,t){let s=this.startNodeAt(e,t);s.attributes=[];let r=this.jsx_parseElementName();for(r&&(s.name=r);this.type!==o.slash&&this.type!==f.jsxTagEnd;)s.attributes.push(this.jsx_parseAttribute());return s.selfClosing=this.eat(o.slash),this.expect(f.jsxTagEnd),this.finishNode(s,r?"JSXOpeningElement":"JSXOpeningFragment")}jsx_parseClosingElementAt(e,t){let s=this.startNodeAt(e,t),r=this.jsx_parseElementName();return r&&(s.name=r),this.expect(f.jsxTagEnd),this.finishNode(s,r?"JSXClosingElement":"JSXClosingFragment")}jsx_parseElementAt(e,t){let s=this.startNodeAt(e,t),r=[],i=this.jsx_parseOpeningElementAt(e,t),n=null;if(!i.selfClosing){e:for(;;)switch(this.type){case f.jsxTagStart:if(e=this.start,t=this.startLoc,this.next(),this.eat(o.slash)){n=this.jsx_parseClosingElementAt(e,t);break e}r.push(this.jsx_parseElementAt(e,t));break;case f.jsxText:r.push(this.parseExprAtom());break;case o.braceL:r.push(this.jsx_parseExpressionContainer());break;default:this.unexpected()}getQualifiedJSXName(n.name)!==getQualifiedJSXName(i.name)&&this.raise(n.start,"Expected corresponding JSX closing tag for <"+getQualifiedJSXName(i.name)+">")}let a=i.name?"Element":"Fragment";return s["opening"+a]=i,s["closing"+a]=n,s.children=r,this.type===o.relational&&"<"===this.value&&this.raise(this.start,"Adjacent JSX elements must be wrapped in an enclosing tag"),this.finishNode(s,"JSX"+a)}jsx_parseText(e){let t=this.parseLiteral(e);return t.type="JSXText",t}jsx_parseElement(){let e=this.start,t=this.startLoc;return this.next(),this.jsx_parseElementAt(e,t)}parseExprAtom(e){return this.type===f.jsxText?this.jsx_parseText(this.value):this.type===f.jsxTagStart?this.jsx_parseElement():super.parseExprAtom(e)}readToken(e){let t=this.curContext();if(t===g)return this.jsx_readToken();if(t===d||t===x){if(h(e))return this.jsx_readWord();if(62==e)return++this.pos,this.finishToken(f.jsxTagEnd);if((34===e||39===e)&&t==d)return this.jsx_readString(e)}return 60===e&&this.exprAllowed&&33!==this.input.charCodeAt(this.pos+1)?(++this.pos,this.finishToken(f.jsxTagStart)):super.readToken(e)}updateContext(e){if(this.type==o.braceL){var t=this.curContext();t==d?this.context.push(p.b_expr):t==g?this.context.push(p.b_tmpl):super.updateContext(e),this.exprAllowed=!0}else{if(this.type!==o.slash||e!==f.jsxTagStart)return super.updateContext(e);this.context.length-=2,this.context.push(x),this.exprAllowed=!1}}}}({allowNamespaces:!1!==e.allowNamespaces,allowNamespacedObjects:!!e.allowNamespacedObjects},t)}},e.exports.tokTypes=f},QjGs:function(e,t,s){"use strict";e.exports={AssignmentExpression:"AssignmentExpression",AssignmentPattern:"AssignmentPattern",ArrayExpression:"ArrayExpression",ArrayPattern:"ArrayPattern",ArrowFunctionExpression:"ArrowFunctionExpression",AwaitExpression:"AwaitExpression",BlockStatement:"BlockStatement",BinaryExpression:"BinaryExpression",BreakStatement:"BreakStatement",CallExpression:"CallExpression",CatchClause:"CatchClause",ClassBody:"ClassBody",ClassDeclaration:"ClassDeclaration",ClassExpression:"ClassExpression",ConditionalExpression:"ConditionalExpression",ContinueStatement:"ContinueStatement",DoWhileStatement:"DoWhileStatement",DebuggerStatement:"DebuggerStatement",EmptyStatement:"EmptyStatement",ExpressionStatement:"ExpressionStatement",ForStatement:"ForStatement",ForInStatement:"ForInStatement",ForOfStatement:"ForOfStatement",FunctionDeclaration:"FunctionDeclaration",FunctionExpression:"FunctionExpression",Identifier:"Identifier",IfStatement:"IfStatement",Literal:"Literal",LabeledStatement:"LabeledStatement",LogicalExpression:"LogicalExpression",MemberExpression:"MemberExpression",MetaProperty:"MetaProperty",MethodDefinition:"MethodDefinition",NewExpression:"NewExpression",ObjectExpression:"ObjectExpression",ObjectPattern:"ObjectPattern",Program:"Program",Property:"Property",RestElement:"RestElement",ReturnStatement:"ReturnStatement",SequenceExpression:"SequenceExpression",SpreadElement:"SpreadElement",Super:"Super",SwitchCase:"SwitchCase",SwitchStatement:"SwitchStatement",TaggedTemplateExpression:"TaggedTemplateExpression",TemplateElement:"TemplateElement",TemplateLiteral:"TemplateLiteral",ThisExpression:"ThisExpression",ThrowStatement:"ThrowStatement",TryStatement:"TryStatement",UnaryExpression:"UnaryExpression",UpdateExpression:"UpdateExpression",VariableDeclaration:"VariableDeclaration",VariableDeclarator:"VariableDeclarator",WhileStatement:"WhileStatement",WithStatement:"WithStatement",YieldExpression:"YieldExpression",JSXIdentifier:"JSXIdentifier",JSXNamespacedName:"JSXNamespacedName",JSXMemberExpression:"JSXMemberExpression",JSXEmptyExpression:"JSXEmptyExpression",JSXExpressionContainer:"JSXExpressionContainer",JSXElement:"JSXElement",JSXClosingElement:"JSXClosingElement",JSXOpeningElement:"JSXOpeningElement",JSXAttribute:"JSXAttribute",JSXSpreadAttribute:"JSXSpreadAttribute",JSXText:"JSXText",ExportDefaultDeclaration:"ExportDefaultDeclaration",ExportNamedDeclaration:"ExportNamedDeclaration",ExportAllDeclaration:"ExportAllDeclaration",ExportSpecifier:"ExportSpecifier",ImportDeclaration:"ImportDeclaration",ImportSpecifier:"ImportSpecifier",ImportDefaultSpecifier:"ImportDefaultSpecifier",ImportNamespaceSpecifier:"ImportNamespaceSpecifier"}},Xmlh:function(e,t){e.exports={quot:'"',amp:"&",apos:"'",lt:"<",gt:">",nbsp:" ",iexcl:"¡",cent:"¢",pound:"£",curren:"¤",yen:"¥",brvbar:"¦",sect:"§",uml:"¨",copy:"©",ordf:"ª",laquo:"«",not:"¬",shy:"­",reg:"®",macr:"¯",deg:"°",plusmn:"±",sup2:"²",sup3:"³",acute:"´",micro:"µ",para:"¶",middot:"·",cedil:"¸",sup1:"¹",ordm:"º",raquo:"»",frac14:"¼",frac12:"½",frac34:"¾",iquest:"¿",Agrave:"À",Aacute:"Á",Acirc:"Â",Atilde:"Ã",Auml:"Ä",Aring:"Å",AElig:"Æ",Ccedil:"Ç",Egrave:"È",Eacute:"É",Ecirc:"Ê",Euml:"Ë",Igrave:"Ì",Iacute:"Í",Icirc:"Î",Iuml:"Ï",ETH:"Ð",Ntilde:"Ñ",Ograve:"Ò",Oacute:"Ó",Ocirc:"Ô",Otilde:"Õ",Ouml:"Ö",times:"×",Oslash:"Ø",Ugrave:"Ù",Uacute:"Ú",Ucirc:"Û",Uuml:"Ü",Yacute:"Ý",THORN:"Þ",szlig:"ß",agrave:"à",aacute:"á",acirc:"â",atilde:"ã",auml:"ä",aring:"å",aelig:"æ",ccedil:"ç",egrave:"è",eacute:"é",ecirc:"ê",euml:"ë",igrave:"ì",iacute:"í",icirc:"î",iuml:"ï",eth:"ð",ntilde:"ñ",ograve:"ò",oacute:"ó",ocirc:"ô",otilde:"õ",ouml:"ö",divide:"÷",oslash:"ø",ugrave:"ù",uacute:"ú",ucirc:"û",uuml:"ü",yacute:"ý",thorn:"þ",yuml:"ÿ",OElig:"Œ",oelig:"œ",Scaron:"Š",scaron:"š",Yuml:"Ÿ",fnof:"ƒ",circ:"ˆ",tilde:"˜",Alpha:"Α",Beta:"Β",Gamma:"Γ",Delta:"Δ",Epsilon:"Ε",Zeta:"Ζ",Eta:"Η",Theta:"Θ",Iota:"Ι",Kappa:"Κ",Lambda:"Λ",Mu:"Μ",Nu:"Ν",Xi:"Ξ",Omicron:"Ο",Pi:"Π",Rho:"Ρ",Sigma:"Σ",Tau:"Τ",Upsilon:"Υ",Phi:"Φ",Chi:"Χ",Psi:"Ψ",Omega:"Ω",alpha:"α",beta:"β",gamma:"γ",delta:"δ",epsilon:"ε",zeta:"ζ",eta:"η",theta:"θ",iota:"ι",kappa:"κ",lambda:"λ",mu:"μ",nu:"ν",xi:"ξ",omicron:"ο",pi:"π",rho:"ρ",sigmaf:"ς",sigma:"σ",tau:"τ",upsilon:"υ",phi:"φ",chi:"χ",psi:"ψ",omega:"ω",thetasym:"ϑ",upsih:"ϒ",piv:"ϖ",ensp:" ",emsp:" ",thinsp:" ",zwnj:"‌",zwj:"‍",lrm:"‎",rlm:"‏",ndash:"–",mdash:"—",lsquo:"‘",rsquo:"’",sbquo:"‚",ldquo:"“",rdquo:"”",bdquo:"„",dagger:"†",Dagger:"‡",bull:"•",hellip:"…",permil:"‰",prime:"′",Prime:"″",lsaquo:"‹",rsaquo:"›",oline:"‾",frasl:"⁄",euro:"€",image:"ℑ",weierp:"℘",real:"ℜ",trade:"™",alefsym:"ℵ",larr:"←",uarr:"↑",rarr:"→",darr:"↓",harr:"↔",crarr:"↵",lArr:"⇐",uArr:"⇑",rArr:"⇒",dArr:"⇓",hArr:"⇔",forall:"∀",part:"∂",exist:"∃",empty:"∅",nabla:"∇",isin:"∈",notin:"∉",ni:"∋",prod:"∏",sum:"∑",minus:"−",lowast:"∗",radic:"√",prop:"∝",infin:"∞",ang:"∠",and:"∧",or:"∨",cap:"∩",cup:"∪",int:"∫",there4:"∴",sim:"∼",cong:"≅",asymp:"≈",ne:"≠",equiv:"≡",le:"≤",ge:"≥",sub:"⊂",sup:"⊃",nsub:"⊄",sube:"⊆",supe:"⊇",oplus:"⊕",otimes:"⊗",perp:"⊥",sdot:"⋅",lceil:"⌈",rceil:"⌉",lfloor:"⌊",rfloor:"⌋",lang:"〈",rang:"〉",loz:"◊",spades:"♠",clubs:"♣",hearts:"♥",diams:"♦"}},Z6Aa:function(e,t,s){"use strict";var r=s("aMy0"),i=Object.freeze(Object.keys(r)),n=!0,a=!1,o=void 0;try{for(var l,p=i[Symbol.iterator]();!(n=(l=p.next()).done);n=!0){var c=l.value;Object.freeze(r[c])}}catch(e){a=!0,o=e}finally{try{n||null==p.return||p.return()}finally{if(a)throw o}}Object.freeze(r);var u=new Set(["parent","leadingComments","trailingComments"]);function filterKey(e){return!u.has(e)&&"_"!==e[0]}e.exports=Object.freeze({KEYS:r,getKeys:function getKeys(e){return Object.keys(e).filter(filterKey)},unionWith:function unionWith(e){for(var t=Object.assign({},r),s=0,i=Object.keys(e);s<i.length;s++){var n=i[s];if(t.hasOwnProperty(n)){var a=new Set(e[n]),o=!0,l=!1,p=void 0;try{for(var c,u=t[n][Symbol.iterator]();!(o=(c=u.next()).done);o=!0){var h=c.value;a.add(h)}}catch(e){l=!0,p=e}finally{try{o||null==u.return||u.return()}finally{if(l)throw p}}t[n]=Object.freeze(Array.from(a))}else t[n]=Object.freeze(Array.from(e[n]))}return Object.freeze(t)}})},aMy0:function(e){e.exports=JSON.parse('{"AssignmentExpression":["left","right"],"AssignmentPattern":["left","right"],"ArrayExpression":["elements"],"ArrayPattern":["elements"],"ArrowFunctionExpression":["params","body"],"AwaitExpression":["argument"],"BlockStatement":["body"],"BinaryExpression":["left","right"],"BreakStatement":["label"],"CallExpression":["callee","arguments"],"CatchClause":["param","body"],"ClassBody":["body"],"ClassDeclaration":["id","superClass","body"],"ClassExpression":["id","superClass","body"],"ConditionalExpression":["test","consequent","alternate"],"ContinueStatement":["label"],"DebuggerStatement":[],"DoWhileStatement":["body","test"],"EmptyStatement":[],"ExportAllDeclaration":["source"],"ExportDefaultDeclaration":["declaration"],"ExportNamedDeclaration":["declaration","specifiers","source"],"ExportSpecifier":["exported","local"],"ExpressionStatement":["expression"],"ExperimentalRestProperty":["argument"],"ExperimentalSpreadProperty":["argument"],"ForStatement":["init","test","update","body"],"ForInStatement":["left","right","body"],"ForOfStatement":["left","right","body"],"FunctionDeclaration":["id","params","body"],"FunctionExpression":["id","params","body"],"Identifier":[],"IfStatement":["test","consequent","alternate"],"ImportDeclaration":["specifiers","source"],"ImportDefaultSpecifier":["local"],"ImportExpression":["source"],"ImportNamespaceSpecifier":["local"],"ImportSpecifier":["imported","local"],"JSXAttribute":["name","value"],"JSXClosingElement":["name"],"JSXElement":["openingElement","children","closingElement"],"JSXEmptyExpression":[],"JSXExpressionContainer":["expression"],"JSXIdentifier":[],"JSXMemberExpression":["object","property"],"JSXNamespacedName":["namespace","name"],"JSXOpeningElement":["name","attributes"],"JSXSpreadAttribute":["argument"],"JSXText":[],"JSXFragment":["openingFragment","children","closingFragment"],"Literal":[],"LabeledStatement":["label","body"],"LogicalExpression":["left","right"],"MemberExpression":["object","property"],"MetaProperty":["meta","property"],"MethodDefinition":["key","value"],"NewExpression":["callee","arguments"],"ObjectExpression":["properties"],"ObjectPattern":["properties"],"Program":["body"],"Property":["key","value"],"RestElement":["argument"],"ReturnStatement":["argument"],"SequenceExpression":["expressions"],"SpreadElement":["argument"],"Super":[],"SwitchStatement":["discriminant","cases"],"SwitchCase":["test","consequent"],"TaggedTemplateExpression":["tag","quasi"],"TemplateElement":[],"TemplateLiteral":["quasis","expressions"],"ThisExpression":[],"ThrowStatement":["argument"],"TryStatement":["block","handler","finalizer"],"UnaryExpression":["argument"],"UpdateExpression":["argument"],"VariableDeclaration":["declarations"],"VariableDeclarator":["id","init"],"WhileStatement":["test","body"],"WithStatement":["object","body"],"YieldExpression":["argument"]}')},xrHI:function(e,t,s){"use strict";const r=s("sOAE"),i=s("DXAa"),n=s("5gxg"),a=5,o=Symbol("espree's internal state"),l=Symbol("espree's esprimaFinishNode"),p=Object.assign({},r.tokTypes,i.tokTypes);function normalizeOptions(e){const t=function normalizeEcmaVersion(e=a){if("number"!=typeof e)throw new Error(`ecmaVersion must be a number. Received value of type ${typeof e} instead.`);let t=e;switch(t>=2015&&(t-=2009),t){case 3:case 5:case 6:case 7:case 8:case 9:case 10:case 11:return t}throw new Error("Invalid ecmaVersion.")}(e.ecmaVersion),s=function normalizeSourceType(e="script"){if("script"===e||"module"===e)return e;throw new Error("Invalid sourceType.")}(e.sourceType),r=!0===e.range,i=!0===e.loc;if("module"===s&&t<6)throw new Error("sourceType 'module' is not supported when ecmaVersion < 2015. Consider adding `{ ecmaVersion: 2015 }` to the parser options.");return Object.assign({},e,{ecmaVersion:t,sourceType:s,ranges:r,locations:i})}e.exports=()=>e=>(class Espree extends e{constructor(e,t){"object"==typeof e&&null!==e||(e={}),"string"==typeof t||t instanceof String||(t=String(t));const s=normalizeOptions(e),r=s.ecmaFeatures||{},i=!0===s.tokens?new n(p,t):null;super({ecmaVersion:s.ecmaVersion,sourceType:s.sourceType,ranges:s.ranges,locations:s.locations,allowReturnOutsideFunction:Boolean(r.globalReturn),onToken:e=>{i&&i.onToken(e,this[o]),e.type!==p.eof&&(this[o].lastToken=e)},onComment:(e,t,s,r,i,n)=>{if(this[o].comments){const a=function convertAcornCommentToEsprimaComment(e,t,s,r,i,n){const a={type:e?"Block":"Line",value:t};return"number"==typeof s&&(a.start=s,a.end=r,a.range=[s,r]),"object"==typeof i&&(a.loc={start:i,end:n}),a}(e,t,s,r,i,n);this[o].comments.push(a)}}},t),this[o]={tokens:i?[]:null,comments:!0===s.comment?[]:null,impliedStrict:!0===r.impliedStrict&&this.options.ecmaVersion>=5,ecmaVersion:this.options.ecmaVersion,jsxAttrValueToken:!1,lastToken:null}}tokenize(){do{this.next()}while(this.type!==p.eof);this.next();const e=this[o],t=e.tokens;return e.comments&&(t.comments=e.comments),t}finishNode(...e){const t=super.finishNode(...e);return this[l](t)}finishNodeAt(...e){const t=super.finishNodeAt(...e);return this[l](t)}parse(){const e=this[o],t=super.parse();return t.sourceType=this.options.sourceType,e.comments&&(t.comments=e.comments),e.tokens&&(t.tokens=e.tokens),t.range&&(t.range[0]=t.body.length?t.body[0].range[0]:t.range[0],t.range[1]=e.lastToken?e.lastToken.range[1]:t.range[1]),t.loc&&(t.loc.start=t.body.length?t.body[0].loc.start:t.loc.start,t.loc.end=e.lastToken?e.lastToken.loc.end:t.loc.end),t}parseTopLevel(e){return this[o].impliedStrict&&(this.strict=!0),super.parseTopLevel(e)}raise(e,t){const s=r.getLineInfo(this.input,e),i=new SyntaxError(t);throw i.index=e,i.lineNumber=s.line,i.column=s.column+1,i}raiseRecoverable(e,t){this.raise(e,t)}unexpected(e){let t="Unexpected token";if(null!=e){if(this.pos=e,this.options.locations)for(;this.pos<this.lineStart;)this.lineStart=this.input.lastIndexOf("\n",this.lineStart-2)+1,--this.curLine;this.nextToken()}this.end>this.start&&(t+=` ${this.input.slice(this.start,this.end)}`),this.raise(this.start,t)}jsx_readString(e){const t=super.jsx_readString(e);return this.type===p.string&&(this[o].jsxAttrValueToken=!0),t}[l](e){if("TemplateElement"===e.type){const t="${"===this.input.slice(e.end,e.end+2);e.range&&(e.range[0]--,e.range[1]+=t?2:1),e.loc&&(e.loc.start.column--,e.loc.end.column+=t?2:1)}return e.type.indexOf("Function")>-1&&!e.generator&&(e.generator=!1),e}})}}]);