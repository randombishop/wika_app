(this.webpackJsonpapp=this.webpackJsonpapp||[]).push([[0],{213:function(e,t){},222:function(e,t){},275:function(e,t,n){},276:function(e,t,n){},277:function(e,t,n){},279:function(e,t,n){"use strict";n.r(t);var r=n(14),s=n.n(r),c=n(169),a=n.n(c),i=n(3),l=n(4),u=n(9),o=n(5),b=n(6),j=n(296),d=n(301),h=n(300),x=n(56);function O(e){document.getElementById(e).select(),document.execCommand("copy")}function f(e){return e/1e12}function p(e){return null!=e?e.toFixed(4)+" W":"-"}function m(e){return null!=e?e.toFixed(2)+" US$":"-"}function k(e){if(null==e)return null;var t,n,r,s,c,a;for(t="",r=e.length,n=0;n<r;)switch((s=e[n++])>>4){case 0:case 1:case 2:case 3:case 4:case 5:case 6:case 7:t+=String.fromCharCode(s);break;case 12:case 13:c=e[n++],t+=String.fromCharCode((31&s)<<6|63&c);break;case 14:c=e[n++],a=e[n++],t+=String.fromCharCode((15&s)<<12|(63&c)<<6|(63&a)<<0)}return t}function y(e){if(console.log(JSON.stringify(e)),!e.dispatchError)return null;try{var t=e.dispatchError.asModule;return"Transaction error ("+t.index+","+t.error+")"}catch(n){return"Transaction error"}}var g=Object(l.a)((function e(t){var n=this;Object(i.a)(this,e),this.connect=function(e){var t=n;return t.wsProvider=new d.a(t.endpoint),h.a.create({provider:t.wsProvider}).then((function(n){t.api=n,e()}))},this.disconnect=function(e){return n.api.disconnect().then(e)},this.getBalance=function(e,t){return n.api.query.system.account(e,t)},this.getUrl=function(e,t){return n.api.query.likes.urls(e,t)},this.getLike=function(e,t,r){return n.api.query.likes.likes(e,t,r)},this.getLikePrice=function(e){return n.api.query.likes.likePrice(e)},this.getOwnersRequestPrice=function(e){return n.api.query.owners.requestPrice(e)},this.getUrlOwner=function(e,t){return n.api.query.owners.owners(e,t)},this.getOwnerRequest=function(e,t){return n.api.query.owners.requests(e,t)},this.getOwnerResult=function(e,t){return n.api.query.owners.results(e,t)},this.getBlockNumber=function(e){return n.api.query.system.number(e)},this.getUrlInfo=function(e,t,r){Promise.all([n.api.query.likes.urls(t),n.api.query.likes.likes(e,t)]).then((function(e){var t={urlLikes:Number(e[0][0]),likesSubmittedAt:Number(e[1][0]),likesSubmittedCount:Number(e[1][1]),likesSubmittedRemaining:Number(e[1][2])};r(t)}))},this.txLike=function(e,t,r,s,c,a){return n.api.tx.likes.like(r,s,c).signAndSend(e,{signer:t.signer},a)},this.txOwnerRequest=function(e,t,r,s){return n.api.tx.owners.requestUrlCheck(r).signAndSend(e,{signer:t.signer},s)},this.txLikeExt=function(e,t,r,s,c,a){console.log(e,t,r,s,c);var i=n,l={},u=function(e){var t=e.status;if(t.isInBlock)a({status:"In block"});else if(t.isFinalized){l.unsubTransaction();var n=y(e);a(n?{status:"Error",err:n}:{status:"Done"})}};Object(x.c)(e).then((function(e){a({status:"Sending"}),i.txLike(t,e,r,s,c,u).then((function(e){l.unsubTransaction=e})).catch((function(e){i.setState({txStatus:null}),a({status:"Error",err:e})}))}))},this.endpoint=t,this.api=null})),v=s.a.createContext(),w=n(2),S=function(e){Object(o.a)(n,e);var t=Object(b.a)(n);function n(){var e;Object(i.a)(this,n);for(var r=arguments.length,s=new Array(r),c=0;c<r;c++)s[c]=arguments[c];return(e=t.call.apply(t,[this].concat(s))).buttonStyle={height:"60px",paddingTop:"4px",paddingBottom:"4px",lineHeight:"normal"},e}return Object(l.a)(n,[{key:"renderStatus",value:function(){switch(this.context.network.status){case"connected":return Object(w.jsx)("i",{style:{color:"green"},className:"fas fa-check"});case"disconnected":return Object(w.jsx)("i",{style:{color:"red"},className:"fas fa-times"});case"connecting":return Object(w.jsx)("i",{style:{color:"orange"},className:"fas fa-spinner"});default:return""}}},{key:"render",value:function(){return Object(w.jsxs)("button",{className:"outline secondary",style:this.buttonStyle,children:[Object(w.jsxs)("span",{style:{fontSize:"18px"},children:[Object(w.jsx)("i",{className:"fas fa-network-wired"}),"\xa0\xa0",this.context.network.type,"\xa0\xa0",this.renderStatus()]}),Object(w.jsx)("br",{}),Object(w.jsx)("span",{style:{fontSize:"10px"},children:this.context.network.url})]})}}]),n}(s.a.Component);S.contextType=v;var N=S,C=n(93),R=function(e){Object(o.a)(n,e);var t=Object(b.a)(n);function n(){var e;Object(i.a)(this,n);for(var r=arguments.length,s=new Array(r),c=0;c<r;c++)s[c]=arguments[c];return(e=t.call.apply(t,[this].concat(s))).buttonStyle={height:"60px",paddingTop:"4px",paddingBottom:"4px",lineHeight:"normal"},e}return Object(l.a)(n,[{key:"renderDisconnected",value:function(){var e=this;return Object(w.jsxs)("button",{className:"outline secondary",style:this.buttonStyle,onClick:function(){return e.context.navigate("account")},children:[Object(w.jsxs)("span",{style:{fontSize:"18px"},children:[Object(w.jsx)("i",{className:"far fa-user-circle"}),"\xa0\xa0 Connect account"]}),Object(w.jsx)("br",{}),Object(w.jsx)("span",{style:{fontSize:"10px"},children:"(Requires a Polkadot wallet)"})]})}},{key:"renderConnected",value:function(){var e=this;return Object(w.jsx)("button",{className:"outline secondary",style:this.buttonStyle,onClick:function(){return e.context.navigate("account")},children:Object(w.jsxs)("div",{style:{display:"flex"},children:[Object(w.jsx)("div",{style:{marginRight:"15px"},children:Object(w.jsx)(C.a,{size:40,value:this.context.account.address})}),Object(w.jsxs)("div",{style:{fontSize:"14px"},children:[Object(w.jsx)("div",{style:{marginBottom:"5px"},children:this.context.account.name}),Object(w.jsx)("div",{children:p(this.context.balance.wika)})]})]})})}},{key:"render",value:function(){return this.context.account?this.renderConnected():this.renderDisconnected()}}]),n}(s.a.Component);R.contextType=v;var U=R,T=function(e){Object(o.a)(n,e);var t=Object(b.a)(n);function n(e){var r;return Object(i.a)(this,n),(r=t.call(this,e)).styleMenu={position:"absolute",top:"80px",left:"400px",backgroundColor:"aliceblue",padding:"10px",borderRadius:"10px",opacity:"90%"},r.toggleMenu=function(){var e=!r.state.menuOpened;r.setState({menuOpened:e})},r.navigate=function(e){r.setState({menuOpened:!1}),r.context.navigate(e)},r.renderMenu=function(){return r.state.menuOpened?Object(w.jsx)("aside",{style:r.styleMenu,children:Object(w.jsx)("nav",{children:Object(w.jsxs)("ul",{children:[Object(w.jsx)("li",{children:Object(w.jsx)("a",{href:"/#",onClick:function(){return r.navigate("account")},children:"Account"})}),Object(w.jsx)("li",{children:Object(w.jsx)("a",{href:"/#",onClick:function(){return r.navigate("liked_pages")},children:"Liked pages"})}),Object(w.jsx)("li",{children:Object(w.jsx)("a",{href:"/#",onClick:function(){return r.navigate("owned_pages")},children:"Owned pages"})}),Object(w.jsx)("li",{children:Object(w.jsx)("a",{href:"/#",onClick:function(){return r.navigate("claim_page")},children:"Claim page ownership"})}),Object(w.jsx)("li",{children:Object(w.jsx)("a",{href:"/#",onClick:function(){return r.navigate("keccak")},children:"Keccak 256"})}),Object(w.jsx)("li",{children:Object(w.jsx)("a",{href:"/#",onClick:function(){return r.navigate("blockchains")},children:"Blockchains"})}),Object(w.jsx)("li",{children:Object(w.jsx)("a",{href:"/#",onClick:function(){return r.navigate("about")},children:"About"})})]})})}):""},r.buttonClass=function(e){return r.context.tab===e?"contrast":"secondary"},r.state={menuOpened:!1},r}return Object(l.a)(n,[{key:"renderAccountOnly",value:function(){var e=this;return this.context.account?Object(w.jsxs)(s.a.Fragment,{children:[Object(w.jsx)("li",{children:Object(w.jsx)("a",{href:"/#",className:this.buttonClass("like"),onClick:function(){return e.navigate("like")},children:"Like"})}),Object(w.jsx)("li",{children:Object(w.jsx)("a",{href:"/#",className:this.buttonClass("recommend"),onClick:function(){return e.navigate("recommend")},children:"Recommended"})}),Object(w.jsx)("li",{children:Object(w.jsx)("a",{href:"/#",className:this.buttonClass("wallet"),onClick:function(){return e.navigate("wallet")},children:"Wallet"})}),Object(w.jsx)("li",{children:Object(w.jsx)("a",{href:"/#",className:this.buttonClass("menu"),onClick:this.toggleMenu,children:Object(w.jsx)("i",{className:"fas fa-bars"})})}),this.renderMenu()]}):""}},{key:"render",value:function(){var e=this;return Object(w.jsxs)("nav",{children:[Object(w.jsxs)("ul",{children:[Object(w.jsx)("li",{children:Object(w.jsxs)("a",{href:"/#",className:this.buttonClass("splash"),onClick:function(){return e.context.navigate("splash")},children:[Object(w.jsx)("img",{src:"images/logo32.png",alt:""}),"\xa0\xa0 Wika Network \xa0\xa0\xa0\xa0"]})}),this.renderAccountOnly()]}),Object(w.jsxs)("ul",{children:[Object(w.jsx)("li",{children:Object(w.jsx)(N,{})}),Object(w.jsx)("li",{children:Object(w.jsx)(U,{})})]})]})}}]),n}(s.a.Component);T.contextType=v;var A=T,B=function(e){Object(o.a)(n,e);var t=Object(b.a)(n);function n(){var e;Object(i.a)(this,n);for(var r=arguments.length,s=new Array(r),c=0;c<r;c++)s[c]=arguments[c];return(e=t.call.apply(t,[this].concat(s))).layoutStyle={display:"grid",gridAutoColumns:"1fr",gridAutoFlow:"column"},e.columnStyle={padding:"20px",fontSize:"15px",textAlign:"center"},e.imageStyle={width:"125px",height:"80px"},e}return Object(l.a)(n,[{key:"render",value:function(){var e=this;return Object(w.jsxs)("div",{className:"main-content",style:{textAlign:"center"},children:[Object(w.jsx)("h5",{children:"Welcome to the Wika Network!"}),Object(w.jsxs)("div",{style:this.layoutStyle,children:[Object(w.jsxs)("div",{style:this.columnStyle,children:[Object(w.jsx)("h6",{children:"If you're a generous internet consumer"}),Object(w.jsx)("img",{src:"images/splash1.png",alt:"",style:this.imageStyle})," ",Object(w.jsx)("br",{}),Object(w.jsx)("br",{}),"Like your favorite pages and reward the authors and previous likers."]}),Object(w.jsxs)("div",{style:this.columnStyle,children:[Object(w.jsx)("h6",{children:"If you authored a cool web page"}),Object(w.jsx)("img",{src:"images/splash2.png",alt:"",style:this.imageStyle})," ",Object(w.jsx)("br",{}),Object(w.jsx)("br",{}),"Register it in one public decentralized database, and whether your content lives in youtube, facebook, medium or any other internet place, Wika users will be able to reward you directly."]}),Object(w.jsxs)("div",{style:this.columnStyle,children:[Object(w.jsx)("h6",{children:"If you want a better internet"}),Object(w.jsx)("img",{src:"images/splash3.png",alt:"",style:this.imageStyle})," ",Object(w.jsx)("br",{}),Object(w.jsx)("br",{}),"Join and use the Wika Network to build a clean, public and non-intrusive database. The Wika Blockchain will empower new search engines and recommendation systems that respect your privacy and are 100% transparent."]})]}),Object(w.jsx)("br",{}),Object(w.jsx)("h6",{children:"Together, let's make the internet a better place and spread quality content."}),null==this.context.account?Object(w.jsx)("button",{className:"primary",onClick:function(){return e.context.navigate("account")},children:"Connect your Polkadot wallet and get started now!"}):""]})}}]),n}(s.a.Component);B.contextType=v;var q=B,L=function(e){Object(o.a)(n,e);var t=Object(b.a)(n);function n(e){var r;return Object(i.a)(this,n),(r=t.call(this,e)).handleNumLikeChange=function(e){r.setState({numLikes:e.target.value},r.update)},r.submitLike=function(){var e=Object(u.a)(r),t=e.props.url,n=e.state.referrer,s=e.state.numLikes,c=e.context.account.source,a=e.context.account.address;Object(x.c)(c).then((function(r){e.setState({txStatus:"Sending..."},(function(){e.context.wikaNetwork.txLike(a,r,t,n,s,e.monitorLike).then((function(t){e.unsubTransaction=t})).catch((function(t){e.setState({txStatus:null}),alert(t)}))}))}))},r.monitorLike=function(e){var t=e.status;if(t.isInBlock)r.setState({txStatus:"In block..."});else if(t.isFinalized){r.setState({txStatus:null}),r.unsubTransaction();var n=y(e);n&&alert(n)}},r.renderButton=function(){return null==r.state.txStatus?Object(w.jsxs)("button",{onClick:r.submitLike,children:["Send ",r.state.numLikes," ",Object(w.jsx)("i",{className:"fas fa-thumbs-up"})]}):Object(w.jsxs)("button",{disabled:!0,children:[Object(w.jsx)("i",{className:"fas fa-spinner"})," ",r.state.txStatus]})},r.render=function(){return Object(w.jsxs)(s.a.Fragment,{children:[Object(w.jsxs)("p",{children:["This page received ",Object(w.jsxs)("strong",{children:[r.props.urlLikes," likes"]}),"."]}),Object(w.jsx)("hr",{}),Object(w.jsx)("h5",{children:"Send likes to this page:"}),Object(w.jsx)("strong",{children:"Which URL referred you to the page?"}),Object(w.jsx)("input",{type:"text"}),Object(w.jsx)("strong",{children:"How much do you like it?"}),Object(w.jsxs)("div",{style:{display:"flex"},children:[Object(w.jsx)("div",{style:{marginTop:"15px"},children:Object(w.jsx)("input",{style:{width:"250px"},type:"range",min:"1",max:"100",value:r.state.numLikes,onChange:r.handleNumLikeChange})}),Object(w.jsx)("div",{style:{marginTop:"10px",marginLeft:"15px"},children:Object(w.jsxs)("strong",{children:[r.state.numLikes," ",Object(w.jsx)("i",{className:"fas fa-thumbs-up"})]})})]}),Object(w.jsx)("strong",{children:"Cost of this transaction"}),Object(w.jsx)("input",{style:{textAlign:"right"},type:"text",readOnly:!0,value:p(r.props.likePrice*r.state.numLikes)}),r.renderButton()]})},r.state={numLikes:1},r}return Object(l.a)(n)}(s.a.Component);L.contextType=v;var P=L,W=function(e){Object(o.a)(n,e);var t=Object(b.a)(n);function n(){var e;Object(i.a)(this,n);for(var r=arguments.length,c=new Array(r),a=0;a<r;a++)c[a]=arguments[a];return(e=t.call.apply(t,[this].concat(c))).render=function(){return Object(w.jsxs)(s.a.Fragment,{children:[Object(w.jsxs)("p",{children:["This page received ",Object(w.jsxs)("strong",{children:[e.props.urlLikes," likes"]}),"."]}),Object(w.jsxs)("p",{children:["You sent it ",Object(w.jsxs)("strong",{children:[e.props.likesSubmittedCount," likes"]}),"."]}),Object(w.jsxs)("p",{children:["You are ranked ",Object(w.jsxs)("strong",{children:["#",e.props.likesSubmittedAt+1]})," on the queue of people who liked this page, therefore, you will start receiving rewards when it hits ",e.props.likesSubmittedAt*e.props.rewardWaitFactor+2," likes."]})]})},e}return Object(l.a)(n)}(s.a.Component),_=W,M=function(e){Object(o.a)(n,e);var t=Object(b.a)(n);function n(e){var r;return Object(i.a)(this,n),(r=t.call(this,e)).getLikePrice=function(){var e=Object(u.a)(r);e.context.wikaNetwork.getLikePrice((function(t){var n=f(t);e.setState({likePrice:n})})).catch((function(e){alert(e)}))},r.handleUrlChange=function(e){r.setState({url:e.target.value})},r.lookupUrl=function(){r.subscribeToUrl(),r.subscribeToLike(),r.setState({lookedUp:!0})},r.clearUrl=function(){r.unsubscribe(),r.setState({lookedUp:!1,url:"",likesSubmittedCount:null})},r.subscribeToUrl=function(){var e=Object(u.a)(r);e.unsubUrl&&(e.unsubUrl(),e.unsubUrl=null);var t=r.state.url;e.context.wikaNetwork.getUrl(t,(function(t){var n=Number(t[0]);e.setState({urlLikes:n})})).then((function(t){e.unsubUrl=t})).catch((function(e){alert(e)}))},r.subscribeToLike=function(){var e=Object(u.a)(r);e.unsubLike&&(e.unsubLike(),e.unsubLike=null);var t=r.context.account.address,n=r.state.url;e.context.wikaNetwork.getLike(t,n,(function(t){e.setState({likesSubmittedAt:Number(t[0]),likesSubmittedCount:Number(t[1]),likesSubmittedRemaining:Number(t[2])})})).then((function(t){e.unsubLike=t})).catch((function(e){alert(e)}))},r.componentWillUnmount=function(){r.unsubscribe()},r.unsubscribe=function(){r.unsubUrl&&r.unsubUrl(),r.unsubLike&&r.unsubLike()},r.renderPart1=function(){return Object(w.jsxs)(s.a.Fragment,{children:[Object(w.jsx)("label",{children:"URL"}),Object(w.jsx)("input",{type:"text",value:r.state.url,onChange:r.handleUrlChange,disabled:r.state.lookedUp}),r.state.lookedUp?Object(w.jsx)("button",{onClick:r.clearUrl,className:"contrast",children:"Clear"}):Object(w.jsx)("button",{onClick:r.lookupUrl,children:"Lookup URL status"})]})},r.renderPart2=function(){if(r.state.lookedUp&&null!=r.state.likesSubmittedCount)return r.state.likesSubmittedCount>0?Object(w.jsx)(_,{urlLikes:r.state.urlLikes,likesSubmittedCount:r.state.likesSubmittedCount,likesSubmittedAt:r.state.likesSubmittedAt,rewardWaitFactor:r.state.rewardWaitFactor}):Object(w.jsx)(P,{url:r.state.url,urlLikes:r.state.urlLikes,likePrice:r.state.likePrice})},r.render=function(){return Object(w.jsxs)("div",{className:"main-content",children:[Object(w.jsx)("h5",{children:"Like"}),r.renderPart1(),Object(w.jsx)("hr",{}),r.renderPart2()]})},r.state={lookedUp:!1,url:"",referrer:null,likePrice:null,rewardPrct:"33%",rewardTarget:1.33,rewardWaitFactor:4,urlLikes:null,likesSubmittedAt:null,likesSubmittedCount:null,likesSubmittedRemaining:null},r}return Object(l.a)(n,[{key:"componentDidMount",value:function(){this.getLikePrice()}}]),n}(s.a.Component);M.contextType=v;var I=M,F=function(e){Object(o.a)(n,e);var t=Object(b.a)(n);function n(){return Object(i.a)(this,n),t.apply(this,arguments)}return Object(l.a)(n,[{key:"render",value:function(){return Object(w.jsx)("div",{className:"main-content",children:Object(w.jsx)("h5",{children:"Recommend"})})}}]),n}(s.a.Component),E=F,z=function(e){Object(o.a)(n,e);var t=Object(b.a)(n);function n(){return Object(i.a)(this,n),t.apply(this,arguments)}return Object(l.a)(n,[{key:"render",value:function(){return Object(w.jsx)("div",{className:"main-content",children:Object(w.jsx)("h5",{children:"Wallet"})})}}]),n}(s.a.Component),V=z,D=function(e){Object(o.a)(n,e);var t=Object(b.a)(n);function n(e){var r;return Object(i.a)(this,n),(r=t.call(this,e)).componentDidMount=function(){r.enableWeb3()},r.enableWeb3=function(){r.setState({wallets:null},(function(){Object(x.b)("Wika Network").then((function(e){r.setState({wallets:e})}))}))},r.renderSwitch=function(){return null===r.state.wallets?r.renderWait():0===r.state.wallets.length?r.renderNone():r.renderOk()},r.renderWait=function(){return Object(w.jsxs)("p",{children:[Object(w.jsx)("i",{className:"fas fa-spinner"}),"Waiting for wallet's authorization..."]})},r.renderNone=function(){return Object(w.jsxs)(s.a.Fragment,{children:[Object(w.jsxs)("p",{children:[Object(w.jsx)("strong",{children:"No Polkadot wallets detected."}),Object(w.jsx)("br",{}),"Please install one and make sure you authorize this app to use it."]}),Object(w.jsxs)("div",{style:{textAlign:"right"},children:[Object(w.jsx)("a",{href:"/#",role:"button",className:"secondary",children:"Install Pokadot-JS Extension"}),"\xa0\xa0",Object(w.jsx)("a",{href:"/#",role:"button",className:"primary",onClick:r.enableWeb3,children:"Retry"})]})]})},r.renderOk=function(){return Object(w.jsxs)(s.a.Fragment,{children:[Object(w.jsx)("strong",{children:"Polkadot wallets detected:"}),r.renderWalletsTable(),Object(w.jsx)("button",{onClick:r.props.next,children:"Continue"})]})},r.renderWalletsTable=function(){return Object(w.jsxs)("table",{children:[Object(w.jsx)("thead",{children:Object(w.jsxs)("tr",{children:[Object(w.jsx)("th",{children:"Name"}),Object(w.jsx)("th",{children:"Version"})]})}),Object(w.jsx)("tbody",{children:r.renderWalletsRows()})]})},r.renderWalletsRows=function(){var e=[];for(var t in r.state.wallets){var n=r.state.wallets[t];e.push(Object(w.jsxs)("tr",{children:[Object(w.jsx)("td",{children:n.name}),Object(w.jsx)("td",{children:n.version})]},t))}return e},r.render=function(){return Object(w.jsxs)("div",{className:"main-content",children:[Object(w.jsx)("h5",{children:"Enabling Polkadot Wallets"}),r.renderSwitch()]})},r.state={wallets:null},r}return Object(l.a)(n)}(s.a.Component),Y=n(192),G=n(74),J=function(e){Object(o.a)(n,e);var t=Object(b.a)(n);function n(e){var r;return Object(i.a)(this,n),(r=t.call(this,e)).styleItem={padding:0,margin:"15px"},r.styleBox1={flex:"40px",padding:"15px"},r.styleBox2={flex:"100%",padding:"15px"},r.styleBox3={flex:"100px",display:"flex",padding:"15px",textAlign:"center",alignItems:"center",fontSize:"32px"},r.componentDidMount=function(){r.getAccounts()},r.getAccounts=function(){r.setState({accounts:[]},(function(){Object(x.a)().then((function(e){r.setState({accounts:e})}))}))},r.selectAccount=function(e){return function(){var t=e.address,n=e.meta.name,s=e.meta.source,c=Object(Y.a)(t),a={name:n,address:t,addressRaw:Object(G.a)(c),source:s};r.context.selectAccount(a)}},r.renderListAccounts=function(){var e=[];for(var t in r.state.accounts){var n=r.state.accounts[t];e.push(Object(w.jsx)("article",{style:r.styleItem,children:Object(w.jsxs)("div",{style:{display:"flex"},children:[Object(w.jsx)("div",{style:r.styleBox1,children:Object(w.jsx)(C.a,{value:n.address})}),Object(w.jsxs)("div",{style:r.styleBox2,children:[Object(w.jsx)("strong",{children:n.meta.name}),Object(w.jsx)("br",{}),Object(w.jsx)("span",{style:{fontSize:"12px"},children:n.address})]}),Object(w.jsx)("div",{style:r.styleBox3,children:Object(w.jsx)("a",{href:"/#",onClick:r.selectAccount(n),children:Object(w.jsx)("i",{className:"fas fa-arrow-alt-circle-right"})})})]})},t))}return e},r.render=function(){return Object(w.jsxs)("div",{className:"main-content",children:[Object(w.jsx)("h5",{children:"Select the account to work with"}),r.renderListAccounts()]})},r.state={accounts:[]},r}return Object(l.a)(n)}(s.a.Component);J.contextType=v;var H=J,K=function(e){Object(o.a)(n,e);var t=Object(b.a)(n);function n(){var e;Object(i.a)(this,n);for(var r=arguments.length,s=new Array(r),c=0;c<r;c++)s[c]=arguments[c];return(e=t.call.apply(t,[this].concat(s))).styleInputBox={fontSize:"16px",textAlign:"center"},e.copyElement=function(e){return function(){O(e)}},e.disconnect=function(){e.context.selectAccount(null)},e.render=function(){return Object(w.jsxs)("div",{className:"main-content",children:[Object(w.jsx)("h5",{children:"Account"}),Object(w.jsxs)("div",{style:{textAlign:"center",marginBottom:"35px"},children:[Object(w.jsx)(C.a,{value:e.context.account.address}),Object(w.jsx)("br",{}),Object(w.jsx)("strong",{children:e.context.account.name})]}),Object(w.jsx)("strong",{children:"Balance"}),Object(w.jsxs)("div",{style:{display:"flex"},children:[Object(w.jsx)("div",{style:{flex:"50%",marginRight:"10px"},children:Object(w.jsx)("input",{type:"text",value:p(e.context.balance.wika),readOnly:!0,style:{textAlign:"right"}})}),Object(w.jsx)("div",{style:{flex:"50%",marginLeft:"10px"},children:Object(w.jsx)("input",{type:"text",value:m(e.context.balance.usd),readOnly:!0,style:{textAlign:"right"}})})]}),Object(w.jsxs)("strong",{children:["Public Address (Substrate format) \xa0\xa0",Object(w.jsx)("a",{href:"/#",onClick:e.copyElement("account_address_element"),children:Object(w.jsx)("i",{className:"far fa-copy"})})]}),Object(w.jsx)("input",{id:"account_address_element",type:"text",value:e.context.account.address,readOnly:!0,style:e.styleInputBox}),Object(w.jsxs)("strong",{children:["Public Address (Raw hex format) \xa0\xa0",Object(w.jsx)("a",{href:"/#",onClick:e.copyElement("account_address_raw_element"),children:Object(w.jsx)("i",{className:"far fa-copy"})})]}),Object(w.jsx)("input",{id:"account_address_raw_element",type:"text",value:e.context.account.addressRaw,readOnly:!0,style:e.styleInputBox}),Object(w.jsxs)("button",{onClick:e.disconnect,className:"contrast",children:["Disconnect this account \xa0\xa0\xa0",Object(w.jsx)("i",{className:"fas fa-sign-out-alt"})]})]})},e}return Object(l.a)(n)}(s.a.Component);K.contextType=v;var X=K,Z=function(e){Object(o.a)(n,e);var t=Object(b.a)(n);function n(e){var r;return Object(i.a)(this,n),(r=t.call(this,e)).web3Enabled=function(){r.setState({web3Enabled:!0})},r.render=function(){return r.context.account?Object(w.jsx)(X,{}):r.state.web3Enabled?Object(w.jsx)(H,{}):Object(w.jsx)(D,{next:r.web3Enabled})},r.state={web3Enabled:!1},r}return Object(l.a)(n)}(s.a.Component);Z.contextType=v;var $=Z,Q=function(e){Object(o.a)(n,e);var t=Object(b.a)(n);function n(){return Object(i.a)(this,n),t.apply(this,arguments)}return Object(l.a)(n,[{key:"render",value:function(){return Object(w.jsxs)("div",{className:"main-content",children:[Object(w.jsx)("h5",{children:"Liked pages"}),JSON.stringify(this.context.apiEndpoint)]})}}]),n}(s.a.Component);Q.contextType=v;var ee=Q,te=function(e){Object(o.a)(n,e);var t=Object(b.a)(n);function n(e){var r;return Object(i.a)(this,n),(r=t.call(this,e)).DEFAULT_ACCOUNT="5C4hrfjw9DjXZTzV3MwzrrAr9P1MJhSrvWGWqi1eSuyUpnhM",r.NUM_BLOCKS_TO_WAIT=10,r.styleTextArea={fontFamily:"monospace",fontSize:"9px"},r.styleButton={padding:0,marginBottom:"4px"},r.componentDidMount=function(){r.getOwnersRequestPrice(),r.subscribeToBlockNumber()},r.getOwnersRequestPrice=function(){var e=Object(u.a)(r);e.context.wikaNetwork.getOwnersRequestPrice((function(t){var n=f(t);e.setState({requestPrice:n})})).catch((function(e){alert(e)}))},r.subscribeToBlockNumber=function(){var e=Object(u.a)(r);e.unsubBlockNumber&&(e.unsubBlockNumber(),e.unsubBlockNumber=null),e.context.wikaNetwork.getBlockNumber((function(t){e.setState({currentBlock:Number(t)})})).then((function(t){e.unsubBlockNumber=t})).catch((function(e){alert(e)}))},r.handleUrlChange=function(e){r.setState({url:e.target.value})},r.lookupUrl=function(){r.setState({lookedUp:!0}),r.subscribeToUrlOwner(),r.subscribeToOwnerRequest(),r.subscribeToOwnerResult()},r.subscribeToUrlOwner=function(){var e=Object(u.a)(r);e.unsubUrlOwner&&(e.unsubUrlOwner(),e.unsubUrlOwner=null);var t=e.state.url;r.setState({owner:null},(function(){e.context.wikaNetwork.getUrlOwner(t,(function(t){e.setState({owner:""+t})})).then((function(t){e.unsubUrlOwner=t})).catch((function(e){alert(e)}))}))},r.subscribeToOwnerRequest=function(){var e=Object(u.a)(r);e.unsubOwnerRequest&&(e.unsubOwnerRequest(),e.unsubOwnerRequest=null);var t=e.state.url;r.setState({requestBlock:null,requestAccount:null},(function(){e.context.wikaNetwork.getOwnerRequest(t,(function(t){e.setState({requestBlock:Number(t[0]),requestAccount:""+t[1]})})).then((function(t){e.unsubOwnerRequest=t})).catch((function(e){alert(e)}))}))},r.subscribeToOwnerResult=function(){var e=Object(u.a)(r);e.unsubOwnerResult&&(e.unsubOwnerResult(),e.unsubOwnerResult=null);var t=e.state.url;r.setState({resultBlock:null,resultNumVotes:null,resultNumVotesYes:null,resultNumVotesMajority:null,resultIntro:null,resultMark:null,resultOutcome:null},(function(){e.context.wikaNetwork.getOwnerResult(t,(function(t){var n={resultBlock:Number(t[0]),resultNumVotes:Number(t[1]),resultNumVotesYes:Number(t[2]),resultNumVotesMajority:Number(t[3]),resultIntro:t[4],resultMark:t[5],resultOutcome:t[6]};e.setState(n)})).then((function(t){e.unsubOwnerResult=t}))}))},r.unsubscribeUrl=function(){r.unsubUrlOwner&&r.unsubUrlOwner(),r.unsubOwnerRequest&&r.unsubOwnerRequest(),r.unsubOwnerResult&&r.unsubOwnerResult()},r.clearUrl=function(){r.unsubscribeUrl(),r.setState({lookedUp:!1,url:"",owner:null})},r.submitRequest=function(){var e=Object(u.a)(r),t=e.state.url,n=e.context.account.source,s=e.context.account.address;Object(x.c)(n).then((function(n){e.setState({txStatus:"Sending..."},(function(){e.context.wikaNetwork.txOwnerRequest(s,n,t,e.monitorRequest).then((function(t){e.unsubTransaction=t})).catch((function(t){e.setState({txStatus:null}),alert(t)}))}))}))},r.monitorRequest=function(e){var t=e.status;if(t.isInBlock)r.setState({txStatus:"In block..."});else if(t.isFinalized){r.setState({txStatus:null}),r.unsubTransaction();var n=y(e);n&&alert(n)}},r.testUrl=function(){},r.copyMark=function(){O("wika_mark_element")},r.componentWillUnmount=function(){r.unsubUrlOwner&&r.unsubUrlOwner(),r.unsubOwnerRequest&&r.unsubOwnerRequest(),r.unsubOwnerResult&&r.unsubOwnerResult(),r.unsubBlockNumber&&r.unsubBlockNumber()},r.renderPart1=function(){return Object(w.jsxs)(s.a.Fragment,{children:[Object(w.jsx)("label",{children:"URL"}),Object(w.jsx)("input",{type:"text",value:r.state.url,onChange:r.handleUrlChange,disabled:r.state.lookedUp}),r.state.lookedUp?Object(w.jsx)("button",{onClick:r.clearUrl,className:"contrast",children:"Clear"}):Object(w.jsx)("button",{onClick:r.lookupUrl,children:"Lookup URL status"})]})},r.renderPart2=function(){return r.state.lookedUp&&null!=r.state.owner?Object(w.jsxs)(s.a.Fragment,{children:[Object(w.jsx)("hr",{}),Object(w.jsx)("label",{children:"Current Owner"}),Object(w.jsx)("input",{type:"text",readOnly:!0,defaultValue:r.formatOwner(r.state.owner)})]}):""},r.formatOwner=function(e){return e===r.DEFAULT_ACCOUNT?"-":e===r.context.account.address?"You are the owner!":e},r.renderPart3=function(){return r.state.lookedUp&&null!=r.state.owner&&r.state.owner!==r.context.account.address?Object(w.jsxs)(s.a.Fragment,{children:[Object(w.jsx)("hr",{}),Object(w.jsx)("label",{children:"Preparation"}),Object(w.jsxs)("div",{style:{display:"flex"},children:[Object(w.jsxs)("div",{style:{flex:"33%",paddingRight:"10px",textAlign:"center"},children:[Object(w.jsx)("button",{style:r.styleButton,className:"outline",onClick:r.copyMark,children:"1. Copy this"}),Object(w.jsx)("input",{id:"wika_mark_element",type:"text",readOnly:!0,defaultValue:"wika.network/author/"+r.context.account.addressRaw})]}),Object(w.jsxs)("div",{style:{flex:"33%",textAlign:"center"},children:[Object(w.jsx)("button",{disabled:!0,style:r.styleButton,className:"outline",children:"2. Insert it"}),Object(w.jsx)("small",{children:"(Use an invisible img or link for example.)"})]}),Object(w.jsxs)("div",{style:{flex:"33%",paddingLeft:"10px",textAlign:"center"},children:[Object(w.jsx)("button",{disabled:!0,style:r.styleButton,className:"outline",onClick:r.testUrl,children:"3. Test it"}),Object(w.jsx)("small",{children:r.renderTestResult()})]})]})]}):""},r.renderTestResult=function(){return null==r.state.testResult?"":!0===r.state.testResult?"YES":"NO"},r.renderPart4=function(){if(r.state.lookedUp){var e=r.state.requestAccount;return null==e||e===r.DEFAULT_ACCOUNT?r.renderSubmitRequest():e===r.context.account.address?r.renderMyRequest():r.renderOtherRequest()}return""},r.renderSubmitRequest=function(){return r.state.owner!==r.context.address?Object(w.jsxs)(s.a.Fragment,{children:[null==r.state.txStatus?Object(w.jsx)("button",{onClick:r.submitRequest,style:{marginBottom:"2px"},children:"Submit your request"}):Object(w.jsxs)("button",{disabled:!0,style:{marginBottom:"2px"},children:[Object(w.jsx)("i",{className:"fas fa-spinner"}),"\xa0\xa0",r.state.txStatus]}),Object(w.jsxs)("small",{children:["Note that the request fee is ",r.state.requestPrice," W"]})]}):""},r.renderMyRequestProgress=function(){var e=r.state.currentBlock-r.state.requestBlock;return Object(w.jsxs)(s.a.Fragment,{children:[Object(w.jsx)("hr",{}),Object(w.jsx)("br",{}),Object(w.jsxs)("label",{children:["Waiting for verification results (",e,"/",r.NUM_BLOCKS_TO_WAIT,")..."]}),Object(w.jsx)("progress",{value:e,max:r.NUM_BLOCKS_TO_WAIT})]})},r.renderMyRequestResult=function(){var e=r.state.resultOutcome?"fas fa-vote-yea":"fas fa-times";return Object(w.jsxs)(s.a.Fragment,{children:[Object(w.jsx)("hr",{}),Object(w.jsx)("br",{}),Object(w.jsxs)("div",{style:{fontSize:"18px",marginBottom:"15px"},children:[Object(w.jsx)("i",{className:e}),"\xa0\xa0 Your request was ",r.state.resultOutcome?"approved":"rejected","."]}),Object(w.jsx)("br",{}),Object(w.jsxs)("label",{children:["Verifications: ",r.state.resultNumVotes]}),Object(w.jsx)("br",{}),Object(w.jsxs)("label",{children:["Approvals: ",r.state.resultNumVotesYes]}),Object(w.jsx)("br",{}),Object(w.jsx)("label",{children:"Page intro"}),Object(w.jsx)("textarea",{style:r.styleTextArea,defaultValue:k(r.state.resultIntro),readOnly:!0}),Object(w.jsx)("label",{children:"Mark found"}),Object(w.jsx)("textarea",{style:r.styleTextArea,defaultValue:k(r.state.resultMark),readOnly:!0})]})},r.renderMyRequest=function(){return 0===r.state.resultBlock?r.renderMyRequestProgress():r.renderMyRequestResult()},r.renderOtherRequest=function(){return Object(w.jsxs)("p",{children:[Object(w.jsx)("i",{className:"fas fa-exclamation-triangle"})," \xa0 There is currently another user trying to claim ownership for this URL."]})},r.state={lookedUp:!1,url:"",requestPrice:null,owner:null,requestBlock:null,requestAccount:null,currentBlock:null,txStatus:null,testResult:null},r}return Object(l.a)(n,[{key:"render",value:function(){return Object(w.jsxs)("div",{className:"main-content",children:[Object(w.jsx)("h5",{children:"Claim Page Ownership"}),this.renderPart1(),this.renderPart2(),this.renderPart3(),this.renderPart4()]})}}]),n}(s.a.Component);te.contextType=v;var ne=te,re=n(299),se=function(e){Object(o.a)(n,e);var t=Object(b.a)(n);function n(e){var r;return Object(i.a)(this,n),(r=t.call(this,e)).updateText=function(e){r.setState({text:e.target.value})},r.generateHash=function(){var e=r.state.text,t=Object(re.a)(e);r.setState({hash:t})},r.copy=function(){O("keccak_hash_element")},r.state={text:"",hash:""},r}return Object(l.a)(n,[{key:"render",value:function(){return Object(w.jsxs)("div",{className:"main-content",children:[Object(w.jsx)("h5",{children:"Keccak"}),Object(w.jsx)("label",{children:"Text"}),Object(w.jsx)("textarea",{value:this.state.text,onChange:this.updateText}),Object(w.jsx)("button",{onClick:this.generateHash,children:"Hash"}),Object(w.jsx)("input",{id:"keccak_hash_element",type:"text",value:this.state.hash,readOnly:!0,style:{fontSize:"10px",textAlign:"center"}}),Object(w.jsx)("button",{onClick:this.copy,children:"Copy to clipboard"})]})}}]),n}(s.a.Component),ce=function(e){Object(o.a)(n,e);var t=Object(b.a)(n);function n(){return Object(i.a)(this,n),t.apply(this,arguments)}return Object(l.a)(n,[{key:"render",value:function(){return Object(w.jsx)("div",{className:"main-content",children:Object(w.jsx)("h5",{children:"WIP"})})}}]),n}(s.a.Component),ae=ce,ie=function(e){Object(o.a)(n,e);var t=Object(b.a)(n);function n(){var e;Object(i.a)(this,n);for(var r=arguments.length,s=new Array(r),c=0;c<r;c++)s[c]=arguments[c];return(e=t.call.apply(t,[this].concat(s))).render=function(){switch(e.context.tab){case"splash":return Object(w.jsx)(q,{});case"like":return Object(w.jsx)(I,{});case"recommend":return Object(w.jsx)(E,{});case"wallet":return Object(w.jsx)(V,{});case"account":return Object(w.jsx)($,{});case"liked_pages":return Object(w.jsx)(ee,{});case"claim_page":return Object(w.jsx)(ne,{});case"owned_pages":case"blockchains":default:return Object(w.jsx)(ae,{});case"keccak":return Object(w.jsx)(se,{})}},e}return Object(l.a)(n)}(s.a.Component);ie.contextType=v;var le=ie,ue=function(e){Object(o.a)(n,e);var t=Object(b.a)(n);function n(e){var r;return Object(i.a)(this,n),(r=t.call(this,e)).componentDidMount=function(){r.loadCrypto()},r.loadCrypto=function(){var e=Object(u.a)(r),t=e.state.crypto;t.status="loading",e.setState({crypto:t},(function(){Object(j.a)().then((function(){t.status="ready",e.setState({crypto:t},e.connectNetwork)}))}))},r.connectNetwork=function(e){var t=Object(u.a)(r),n=t.state.network;n.status="connecting",t.setState({network:n},(function(){var e=new g(t.state.network.url);e.connect((function(){t.wikaNetwork=e,n.status="connected",t.setState({network:n},r.subscribeToBalance)}))}))},r.subscribeToBalance=function(){var e=Object(u.a)(r);e.unsubGetBalance&&(e.unsubGetBalance(),e.unsubGetBalance=null);e.setState({balance:{wika:null,usd:null}},(function(){if(e.state.account&&"connected"===e.state.network.status){var t=e.state.account.address;e.wikaNetwork.getBalance(t,(function(t){var n,r=f(t.data.free),s=null!=(n=r)?.02*n:null;e.setState({balance:{wika:r,usd:s}})})).then((function(t){e.unsubGetBalance=t}))}}))},r.selectAccount=function(e){r.setState({account:e},r.subscribeToBalance)},r.navigate=function(e){r.setState({tab:e})},r.componentWillUnmount=function(){r.unsubGetBalance&&r.unsubGetBalance()},r.state={tab:"splash",crypto:{status:"loading"},network:{type:"Test Net",url:"wss://testnode3.wika.network:443",status:"connecting"},api:{type:"Test API",url:"https://api-test.wika.network"},account:null,balance:{wika:null,usd:null}},r}return Object(l.a)(n,[{key:"render",value:function(){return Object(w.jsx)("div",{style:{padding:"0px 40px"},children:Object(w.jsxs)(v.Provider,{value:{tab:this.state.tab,network:this.state.network,account:this.state.account,balance:this.state.balance,navigate:this.navigate,selectAccount:this.selectAccount,wikaNetwork:this.wikaNetwork,apiEndpoint:this.state.api},children:[Object(w.jsx)(A,{}),Object(w.jsx)(le,{})]})})}}]),n}(s.a.Component);n(275),n(276),n(277);a.a.render(Object(w.jsx)(s.a.StrictMode,{children:Object(w.jsx)(ue,{ref:function(e){window.wikaReactApp=e}})}),document.getElementById("root"))}},[[279,1,2]]]);
//# sourceMappingURL=main.c358cf1a.chunk.js.map