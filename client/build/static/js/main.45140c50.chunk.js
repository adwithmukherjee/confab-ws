(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{132:function(e,t,n){"use strict";n.r(t),t.default=n.p+"static/media/title.cc86d25d.svg"},371:function(e,t,n){},403:function(e,t){},405:function(e,t){},415:function(e,t){},417:function(e,t){},443:function(e,t){},444:function(e,t){},449:function(e,t){},451:function(e,t){},458:function(e,t){},477:function(e,t){},502:function(e,t,n){},614:function(e,t,n){},615:function(e,t,n){"use strict";n.r(t);var i=n(1),o=n.n(i),r=n(31),a=n.n(r),c=(n(371),n(17)),s=o.a.createContext(void 0),l=n(0),d=n.n(l),u=n(2),j=n(29),f=n(55),h=(n(373),n(617),n(616),{AGORA_APP_ID:"37819f409bdf4c9f9405b89172a0155e",AGORA_SECRET:"e04c71eba3134c46b40389d3f7ea06a9",FIREBASE_CONFIG:{apiKey:"AIzaSyDXLFXQgYj652rsqduUGKbDyFO_3GvLUMg",authDomain:"huddle-7dff8.firebaseapp.com",projectId:"huddle-7dff8",storageBucket:"huddle-7dff8.appspot.com",messagingSenderId:"192926803111",appId:"1:192926803111:web:f8bcc3ac3af112f351e782",measurementId:"G-YZS5NRQLHW"},GAPI_CLIENT:{clientId:"512932984647-e6k7abdu7lfdaqr0mmpokthiigre935h.apps.googleusercontent.com",apiKey:"AIzaSyALTluatJjb31Y5QbWEJSc32R9QV4qP0CA",scope:"https://www.googleapis.com/auth/userinfo.profile",discoveryDocs:["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]}});f.a.initializeApp(h.FIREBASE_CONFIG);var b=f.a.auth(),p=f.a.storage(),g=function(){var e=Object(u.a)(d.a.mark((function e(){var t,n,i,o,r,a;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=window.gapi.auth2.getAuthInstance(),e.next=3,t.signIn();case 3:return n=e.sent,i=n.getAuthResponse().id_token,o=f.a.auth.GoogleAuthProvider.credential(i),r={},a=new Promise((function(e,t){f.a.auth().setPersistence(f.a.auth.Auth.Persistence.LOCAL).then((function(){f.a.auth().signInWithCredential(o).then((function(t){var n=t.user,i=n.email,o=n.displayName,a=n.photoURL;r={displayName:o,profile:"",photoURL:a},f.a.firestore().collection("users").doc(i).get().then((function(t){t.exists?e(Object(j.a)(Object(j.a)({},t.data()),{},{email:i})):f.a.firestore().collection("users").doc(i).set(r).then((function(){e(Object(j.a)(Object(j.a)({},r),{},{email:i}))}))}))})).catch((function(t){console.log(t),e(void 0)}))})).catch((function(t){console.log(t),e(void 0)}))})),e.abrupt("return",a);case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),m=function(){var e=Object(u.a)(d.a.mark((function e(){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,b.signOut();case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),x=n(108),O=n(42),v=n(358),y=n(655),w=n(644),C=n(647),S=n(648),k=n(656),A=n(660),E=n(346),N=n.n(E),R=n(7);var I=function(e){var t=e.children,n=o.a.useContext(s),i=n.user,r=n.setUser,a=o.a.useState(null),l=Object(c.a)(a,2),j=l[0],f=l[1],h=function(){f(null)},b=function(){var e=Object(u.a)(d.a.mark((function e(){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return h(),e.next=3,m();case 3:return e.next=5,r(void 0);case 5:console.log(i);case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(R.jsxs)("div",{children:[Object(R.jsx)(w.a,{position:"static",color:"transparent",elevation:0,children:Object(R.jsxs)(C.a,{style:{flexDirection:"column-reverse",alignItems:"flex-end"},children:[Object(R.jsx)(S.a,{style:{marginRight:"10px"},onClick:function(e){f(e.currentTarget)},children:Object(R.jsx)(N.a,{})}),Object(R.jsxs)(k.a,{id:"ellipsis-menu",anchorEl:j,anchorOrigin:{vertical:"bottom",horizontal:"left"},getContentAnchorEl:null,keepMounted:!0,open:Boolean(j),onClose:h,children:[Object(R.jsx)(A.a,{onClick:function(){h(),window.open("/contact-us","_blank")},children:"Contact Us"}),Object(R.jsx)(A.a,{onClick:function(){b(),b()},children:"Logout"})]})]})}),t]})},L=n(20),T=n.n(L),U=n(649),_=n(360),M=n.p+"static/media/cal-icon2.e80483cd.png",P=n.p+"static/media/phone-icon.c409c032.png",D=n(132),G=n(174),H=Object(U.a)((function(e){return{root:{margin:"auto",display:"flex",alignSelf:"flex-start",justifyContent:"center",flexDirection:"column"},title:{textAlign:"center",fontSize:L.isMobile?"7vh":"10vh"},buttonGroup:{marginTop:100,display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"row"},buttons:{flexDirection:"column",width:L.isMobile?"100%":"50%",justifyContent:"space-around",alignItems:"center",display:"flex","& > *":{margin:e.spacing(2),width:e.spacing(14),height:e.spacing(14)}},label:{height:"1.4vh",fontSize:"2vh",justifyContent:"center",alignItems:"center",display:"flex",textAlign:"center",width:"90%"},description:{height:"2vh",fontSize:"1.3vh",textAlign:"center",width:"80%",marginTop:"-0.2vh"},paper:{display:"flex",justifyContent:"center",alignItems:"center",borderRadius:20},modal:{position:"absolute",width:L.isMobile?"70%":"50%",top:"50%",left:"50%",transform:"translate(-50%, -50%)",backgroundColor:e.palette.background.paper,boxShadow:e.shadows[5],padding:e.spacing(2,4,3)}}})),B=function(){var e=Object(O.f)(),t=Object(i.useState)(!1),n=Object(c.a)(t,2),o=(n[0],n[1],Object(i.useState)({title:"",description:""})),r=Object(c.a)(o,2);r[0],r[1];function a(e){var t=e.style;return Object(R.jsx)("img",{src:D.default,style:Object(j.a)({maxWidth:L.isMobile?"80%":"100%"},t),alt:"CONFAB"})}var s=H();return Object(R.jsx)("div",{className:"landing-container-1",children:Object(R.jsxs)("div",{className:s.root,children:[Object(R.jsx)(a,{}),Object(R.jsxs)("div",{className:s.buttonGroup,children:[Object(R.jsxs)("div",{className:s.buttons,children:[Object(R.jsx)(_.a,{elevation:0,className:s.paper,children:Object(R.jsx)("img",{src:P,alt:"Create Room",style:{width:"90%",height:"90%",cursor:"pointer"},onClick:function(){(function(){var e=f.a.firestore(),t=f.a.auth().currentUser.email;return new Promise((function(n,i){e.collection("meetings").add({creatorRef:e.doc("users/"+t)}).then((function(i){e.collection("meetings").doc(i.id).collection("currentAttendees").doc(t).set({isHost:!0}).then((function(){n(i.id)}))})).catch((function(e){i(e)}))}))})().then((function(t){e.push("/call/".concat(t))}))}})}),Object(R.jsx)("div",{className:s.label,children:" Start Room"}),Object(R.jsx)("div",{className:s.description,children:" "})]}),Object(R.jsx)("div",{style:{width:L.isMobile?20:100}}),Object(R.jsxs)("div",{className:s.buttons,children:[Object(R.jsx)(_.a,{elevation:0,className:s.paper,children:Object(R.jsx)("a",{href:"https://workspace.google.com/marketplace/app/confab/192926803111",target:"_blank",rel:"noreferrer",style:{display:"flex",alignItems:"center",justifyContent:"center"},children:Object(R.jsx)("img",{src:M,alt:"calendar",style:{width:"80%",height:"80%"}})})}),Object(R.jsx)("div",{className:s.label,children:"Get Calendar Add-on"}),Object(R.jsxs)("div",{className:s.description,children:[" ","For easy scheduling straight from"," ",Object(R.jsx)("a",{href:"http://calendar.google.com",target:"_blank",rel:"noreferrer",style:{color:G.a[600]},children:"Google Calendar"})]})]})]})]})})},W=n(650),z=n(651),F=n(658),Y=n(173),q=n(81),J=n.n(q),V=n(347),K=n.n(V),Q=(n.p,n.p+"static/media/hero-img.6a434e4c.png"),Z=Object(U.a)((function(e){return{root:{padding:"2px 4px",display:"flex",alignItems:"center",width:400},input:{marginLeft:e.spacing(1),flex:1},iconButton:{padding:10,color:"white"},divider:{height:28,margin:4}}})),X=function(){var e=Object(i.useState)(void 0),t=Object(c.a)(e,2),n=t[0],o=t[1],r=Object(i.useState)(""),a=Object(c.a)(r,2),s=a[0],l=a[1],d=Z();return Object(R.jsxs)("div",{className:"landing-container-1",children:[Object(R.jsx)(w.a,{position:"static",color:"transparent",elevation:0,children:Object(R.jsx)(C.a,{style:{flexDirection:"column-reverse",alignItems:"flex-end"},children:Object(R.jsxs)(W.a,{variant:"h6",style:{fontWeight:"lighter"},children:[Object(R.jsx)("a",{href:"/contact-us",target:"_blank",children:Object(R.jsx)(z.a,{style:{fontFamily:'"Noto Sans", sans-serif',fontWeight:"100"},children:"Contact us"})})," ","|"," ",Object(R.jsx)(z.a,{style:{fontFamily:'"Noto Sans", sans-serif',fontWeight:"100"},href:"/login",target:"_blank",children:"Log in"})]})})}),Object(R.jsxs)("div",{className:"landing-container-2",style:{height:L.isMobile?"70%":"50%"},children:[Object(R.jsx)(te,{}),Object(R.jsxs)("div",{style:{display:"flex",alignItems:"column",maxWidth:L.isMobile?"90vw":"50vw"},children:[Object(R.jsx)(_.a,{component:"form",className:d.root,style:{borderStyle:"solid",borderWidth:.2},children:Object(R.jsx)(F.a,{type:"email",className:d.input,placeholder:"Enter your work email...",value:s,onChange:function(e){l(e.target.value)}})}),Object(R.jsx)(_.a,{style:{backgroundColor:G.a[600],marginLeft:"0.5vw"},children:Object(R.jsx)(S.a,{color:"primary",className:d.iconButton,onClick:function(){/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(s)?o(!0):o(!1)},children:Object(R.jsx)(K.a,{})})})]}),Object(R.jsx)(W.a,{variant:"h5",style:{marginTop:"2vh",marginBottom:"1vh"},children:"OR"}),Object(R.jsxs)("div",{style:{display:"flex",width:L.isMobile?"85vw":"50vw",alignItems:"center",justifyContent:"center",textAlign:L.isMobile?"left":"center",padding:4},children:["Skip the waitlist by getting the Google Calendar Add-on",Object(R.jsxs)(z.a,{variant:"contained",color:"primary",style:{marginLeft:15,borderRadius:2,backgroundColor:G.a[600],padding:"0.5em"},href:"https://workspace.google.com/marketplace/app/confab/192926803111",target:"_blank",rel:"noreferrer",children:["Skip ",!L.isMobile&&"Waitlist"]})]}),n?Object(R.jsx)(W.a,{variant:"body1",style:{color:G.a[600],marginTop:"1em",textAlign:"center"},children:"You're on the list!"}):void 0===n?Object(R.jsx)(W.a,{variant:"body1",style:{color:J.a[600],marginTop:"1em",textAlign:"center"}}):Object(R.jsx)(W.a,{variant:"body1",style:{color:Y.a[600],marginTop:"1em",textAlign:"center"},children:"Please enter a valid email address."})]}),Object(R.jsx)("img",{src:Q,alt:"Confab screenshots",style:{maxWidth:L.isMobile?"95%":"60%",marginTop:L.isMobile?0:"2vh",marginBottom:"40px"}}),Object(R.jsx)(W.a,{variant:"body1",children:Object(R.jsxs)("ul",{className:"branding",style:{maxWidth:L.isMobile?"90%":"65%",fontSize:(L.isMobile,"1vh+1vw"),margin:"auto",listStyle:"none"},children:[Object(R.jsx)("li",{className:"custom-list audio",children:"With Confab's drop-in audio conferencing, it's now easier than ever to have productive, efficient, and focused meetings"}),Object(R.jsxs)("li",{className:"custom-list cal",children:["Schedule rooms directly from Google Calendar with the"," ",Object(R.jsx)("a",{href:"https://workspace.google.com/marketplace/app/confab/192926803111",target:"_blank",rel:"noreferrer",style:{color:G.a[700]},children:"Confab Workspace add-on"})," ","and join on your desktop or mobile browser"]}),Object(R.jsx)("li",{className:"custom-list mirror",children:"Never worry about how you look or where you are when joining a meeting"}),Object(R.jsx)("li",{className:"custom-list person",children:"Confab is designed to give you the mobility and flexibility you need for hybrid work"})]})}),Object(R.jsx)($,{})]})};function $(e){var t=e.style;return Object(R.jsxs)("footer",{style:Object(j.a)({alignSelf:"stretch",width:"97%",margin:"auto",marginTop:"5em",marginBottom:"1.5vh",color:J.a[500],fontSize:12},t),children:["\xa9 2021 Big Mess Labs Inc. ",L.isMobile&&Object(R.jsx)("br",{})," All Rights Reserved",Object(R.jsxs)("span",{style:{float:"right",color:J.a[500]},children:[Object(R.jsx)("a",{href:"/terms-of-service.html",style:{marginRight:L.isMobile?"2vw":"5vw",color:J.a[500]},target:"_blank",children:"Terms"}),Object(R.jsx)("a",{href:"/privacy-policy.html",style:{marginRight:L.isMobile?"2vw":"4vw",color:J.a[500]},target:"_blank",children:"Privacy"}),Object(R.jsx)("a",{href:"/contact-us",style:{marginRight:"2vw",color:J.a[500]},target:"_blank",children:"Contact Us"})]})]})}function ee(e){var t=e.style;return Object(R.jsx)("img",{src:D.default,style:Object(j.a)({maxWidth:(L.isMobile,"100%"),margin:"auto"},t),alt:"CONFAB"})}function te(e){var t=e.titleStyle;return Object(R.jsxs)(W.a,{variant:"h1",style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"},children:[Object(R.jsx)(ee,{style:t}),Object(R.jsx)(W.a,{variant:"h5",style:{fontWeight:"bold",marginTop:"-1vh",marginBottom:"2em",textAlign:"center",fontSize:L.isMobile?15:25},children:"Work at the speed of sound"})]})}var ne=n(138),ie=n(114),oe=n.n(ie);var re=n(215),ae=(n(348),n(349)),ce=n.n(ae),se=function(e){var t=Ne();return T.a?Object(R.jsx)("div",{}):Object(R.jsx)("div",{style:{position:"fixed",bottom:0,right:0},children:Object(R.jsxs)("div",{className:t.qrCodeDisplayStyle,children:[Object(R.jsx)(_.a,{elevation:3,className:t.qrCodeStyle,children:Object(R.jsx)(ce.a,{style:{width:"100%",height:"100%"},value:"https://immense-beach-14785.herokuapp.com/call/".concat(e.channel)})}),Object(R.jsx)("div",{style:{width:250,lineHeight:"20px",textAlign:"center",fontSize:"13px"},children:"Point your camera at the QR code to join this room on your phone."})]})})},le=n(652),de=n(137),ue=n(220),je=(n(502),n(90)),fe=n(350),he=n(216),be=n.n(he),pe=n(661),ge=n(351),me=n.n(ge),xe=(n(596),n(217)),Oe=n.n(xe),ve=function(e){var t=Object(i.useRef)(null);return Object(i.useEffect)((function(){var t;e.isLocal||(console.log("refreshed?"),null===(t=e.audioTrack)||void 0===t||t.play());return function(){var t;null===(t=e.audioTrack)||void 0===t||t.stop()}}),[e.audioTrack,e.isLocal]),Object(R.jsx)("div",{ref:t,className:"video-player",style:{width:"0px",height:"0px"}})},ye=function(e){var t,n=Object(i.useState)(0),o=Object(c.a)(n,2),r=o[0],a=o[1];Object(i.useEffect)((function(){var t=setInterval((function(){var t,n;(null===(t=e.user)||void 0===t?void 0:t.audioTrack)&&!e.isAddParticipant&&a(null===(n=e.user)||void 0===n?void 0:n.audioTrack.getVolumeLevel())}),100);return function(){return clearInterval(t)}}),[e.isAddParticipant,null===(t=e.user)||void 0===t?void 0:t.audioTrack]);var s=Ne();return e.user&&e.user.user?Object(R.jsxs)("div",{className:s.participant,onClick:e.onClick,children:[Object(R.jsxs)(_.a,{elevation:3,className:s.paper,style:{borderRadius:L.isMobile?35:50,boxShadow:e.isAddParticipant?Oe.a[3]:r>.02?"0 0 9pt ".concat(3.5*Math.log(13*r+.6)-2,"pt cornflowerblue"):Oe.a[3]},children:[e.isAddParticipant?Object(R.jsx)("div",{style:{backgroundColor:"#CDCDCD",width:"100%",height:"100%",borderRadius:L.isMobile?35:50},children:Object(R.jsx)("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",height:L.isMobile?80:112},children:Object(R.jsx)(de.c,{color:"white",size:60})})}):Object(R.jsx)("img",{src:e.user.user.photoURL,alt:"",style:{width:"100%",height:"100%",borderRadius:L.isMobile?35:50}}),e.user.muted&&!e.isAddParticipant&&Object(R.jsx)("div",{style:{position:"absolute",bottom:0,right:0,display:"flex",width:30,height:30,borderRadius:"50%",alignItems:"center",justifyContent:"center"},children:Object(R.jsx)("div",{className:s.mute,children:Object(R.jsx)(de.b,{})})})]}),!e.isAddParticipant&&Object(R.jsx)("div",{className:s.label,children:e.user.user.displayName+(e.user.isHost?" (Host)":"")}),Object(R.jsx)(ve,{audioTrack:e.user.audioTrack,isLocal:e.isLocal})]}):null},we=n(657),Ce=function(e){var t,n=e.me,i=e.users,r=(Ne(),function(e){return 1===e?"1fr":2===e?"1fr 1fr":"1fr 1fr 1fr"}(2+(null!==(t=null===i||void 0===i?void 0:i.length)&&void 0!==t?t:0))),a=o.a.useState(!1),s=Object(c.a)(a,2),l=s[0],d=s[1],u=function(e){return Object(R.jsx)(we.a,Object(j.a)({elevation:6,variant:"filled"},e))};return Object(R.jsxs)("div",{style:{display:"grid",gridTemplateColumns:r},children:[i&&i.filter((function(e){return null===e||void 0===e?void 0:e.isHost})).map((function(t){return Object(R.jsx)(ye,{user:t,onClick:function(){e.setSelectedUser(t),e.setRemoteOpen(!0)},isLocal:!1,isAddParticipant:!1})})),Object(R.jsx)(ye,{user:n,onClick:function(){e.setLocalOpen(!0)},isLocal:!0,isAddParticipant:!1}),i&&i.map((function(t){return t&&!t.isHost?Object(R.jsx)(ye,{user:t,onClick:function(){e.setSelectedUser(t),e.setRemoteOpen(!0)},isLocal:!1,isAddParticipant:!1}):null})),Object(R.jsx)(ye,{user:n,onClick:function(){!function(){var e=document.createElement("input");e.value=window.location.href,document.body.appendChild(e),e.select(),document.execCommand("copy"),document.body.removeChild(e),d(!0)}()},isLocal:!0,isAddParticipant:!0}),Object(R.jsx)(pe.a,{open:l,autoHideDuration:4e3,onClose:function(e,t){"clickaway"!==t&&d(!1)},anchorOrigin:{vertical:"top",horizontal:"right"},children:Object(R.jsx)(u,{severity:"success",children:"Room Link Copied"})})]})},Se=n(353),ke=n.n(Se),Ae=n(352),Ee=n.n(Ae);n(132),oe.a.createClient({codec:"h264",mode:"rtc"});var Ne=Object(U.a)((function(e){return{root:{width:L.isMobile?"90%":"50%",height:L.isMobile?"95%":"100%",margin:"auto",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",position:"relative"},title:{textAlign:"center",fontSize:L.isMobile?"7vh":"10vh",marginTop:0,marginBottom:0,position:"fixed",top:"0px"},participantGroup:{display:"flex",justifyContent:"center",flexWrap:"wrap",flexDirection:"row",overflow:"scroll"},qrCodeDisplayStyle:{flexDirection:"column",justifyContent:"flex-start",alignItems:"center",display:"flex",flexWrap:"wrap","& > *":{margin:e.spacing(2),width:e.spacing(14),height:e.spacing(10)}},participant:{flexDirection:"column",justifyContent:"flex-start",alignItems:"center",display:"flex",position:"relative",flexWrap:"wrap","& > *":{margin:e.spacing(2),width:L.isMobile?e.spacing(10):e.spacing(14),height:L.isMobile?e.spacing(10):e.spacing(14)}},mute:{zIndex:2,width:30,height:30,borderRadius:"50%",backgroundColor:"white",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:e.shadows[5]},editPicture:{position:"fixed",zIndex:2,width:20,height:20,borderRadius:"50%",backgroundColor:"white",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:e.shadows[5]},label:{height:"2vh",justifyContent:"center",alignItems:"center",display:"flex",lineHeight:1.2,textAlign:"center"},paper:{display:"flex",justifyContent:"center",alignItems:"center",borderRadius:20,position:"relative"},qrCodeStyle:{display:"flex",justifyContent:"center",alignItems:"center",overflow:"clip",height:"85px",width:"85px"},modal:{position:"absolute",width:L.isMobile?"70%":"50%",top:"50%",left:"50%",transform:"translate(-50%, -50%)",backgroundColor:e.palette.background.paper,boxShadow:e.shadows[5],padding:e.spacing(2,4,3)},buttonGroup:{width:L.isMobile?"100%":"50%",marginTop:"1vh",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:40,position:"fixed",bottom:0}}})),Re=function(e){var t=e.channel,n=e.leaveMeeting,o=e.localUser,r=e.localAudioTrack,a=e.setLocalUser,s=e.remoteUsers,l=Object(i.useState)(void 0),h=Object(c.a)(l,2),g=h[0],m=h[1];Object(i.useEffect)((function(){(function(e){var t=f.a.firestore().collection("meetings");return new Promise((function(n,i){t.doc(e).get().then((function(e){var t=e.data().gcal_event;n(t||void 0)})).catch((function(){n(void 0)}))}))})().then((function(e){console.log(e),e&&m(e)}))}),[]);var x=Ne(),O=Object(i.useState)(!0),v=Object(c.a)(O,2),y=v[0],w=v[1];var C=Object(i.useState)(!1),k=Object(c.a)(C,2),A=k[0],E=k[1],N=Object(i.useState)(!1),I=Object(c.a)(N,2),T=I[0],U=I[1],M=Object(i.useState)(),P=Object(c.a)(M,2),D=P[0],H=P[1],B=Object(i.useState)(void 0),W=Object(c.a)(B,2),F=W[0],Y=W[1],q=Object(i.useState)(o.user.photoURL),J=Object(c.a)(q,2),V=J[0],K=J[1],Q=function(){if(b.currentUser&&F){console.log("uploading");var e=p.ref().child("users/"+b.currentUser.email).put(F);e.then((function(){console.log("success"),e.snapshot.ref.getDownloadURL().then((function(e){a((function(t){if(t){var n=null===t||void 0===t?void 0:t.user,i=(n.photoURL,Object(ne.a)(n,["photoURL"]));return Object(j.a)(Object(j.a)({},t),{},{user:Object(j.a)(Object(j.a)({},i),{},{photoURL:e})})}})),function(e){var t=f.a.firestore(),n=f.a.auth().currentUser.email;e&&""!==e&&t.collection("users").doc(n).set({photoURL:e},{merge:!0})}(e),console.log("uploaded")}))}))}};Object(i.useEffect)((function(){F&&Q()}),[F]);var Z=Object(i.useState)(je.EditorState.createEmpty()),X=Object(c.a)(Z,2),$=X[0],ee=X[1];Object(i.useEffect)((function(){var e=o.user.profile,t=je.ContentState.createFromBlockArray(me()(e).contentBlocks);ee(je.EditorState.createWithContent(t))}),[]),Object(i.useEffect)((function(){var e=be()(Object(je.convertToRaw)($.getCurrentContent()));a((function(t){if(t){var n=null===t||void 0===t?void 0:t.user,i=(n.profile,Object(ne.a)(n,["profile"]));return Object(j.a)(Object(j.a)({},t),{},{user:Object(j.a)(Object(j.a)({},i),{},{profile:e})})}}))}),[$]);return Object(i.useEffect)((function(){o&&function(){var e=Object(u.a)(d.a.mark((function e(){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,null===r||void 0===r?void 0:r.setMuted(o.muted);case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()()}),[null===o||void 0===o?void 0:o.muted,r]),o?Object(R.jsxs)("div",{children:[Object(R.jsx)("audio",{className:"audio",style:{height:0,width:0},children:Object(R.jsx)("source",{src:"https://firebasestorage.googleapis.com/v0/b/huddle-7dff8.appspot.com/o/cork.mp3?alt=media&token=a80a2ddc-8e85-41f8-b38c-8df04d2f7289"})}),Object(R.jsx)("div",{className:"landing-container-1",children:Object(R.jsxs)("div",{className:x.root,children:[!L.isMobile&&Object(R.jsx)(pe.a,{anchorOrigin:{vertical:"bottom",horizontal:"left"},message:"ass",color:"blue",open:y,style:{padding:0},onClose:function(e,t){"clickaway"!==t&&w(!1)},children:Object(R.jsx)(le.a,{style:{backgroundColor:"rgba(66,133,244,0.2)",color:G.a[800],padding:0},action:Object(R.jsxs)("div",{style:{maxWidth:"25vw",display:"flex",marginLeft:"-1vw",alignItems:"center",padding:10,paddingLeft:15,cursor:"pointer"},children:[Object(R.jsx)(Ee.a,{style:{marginRight:15,color:G.a[900]}}),Object(R.jsx)("a",{href:"https://workspace.google.com/marketplace/app/confab/192926803111",target:"_blank",rel:"noreferrer",style:{color:G.a[800]},children:"Get the Confab Calendar Add-on to schedule rooms directly from Google Calendar!"}),Object(R.jsx)(S.a,{color:"primary",onClick:function(){w(!1)},children:Object(R.jsx)(ke.a,{})})]})})}),Object(R.jsx)(te,{titleStyle:{}}),Object(R.jsx)("div",{style:{},children:g&&Object(R.jsx)("h3",{style:{textAlign:"center"},children:null===g||void 0===g?void 0:g.summary})}),Object(R.jsx)(ue.a,{open:A,onDismiss:function(){return E(!1)},snapPoints:function(e){return[e.minHeight,e.maxHeight]},scrollLocking:!1,header:Object(R.jsxs)("div",{style:{flexDirection:"row",display:"flex",justifyContent:"space-between"},children:[Object(R.jsxs)("div",{style:{flexDirection:"column",display:"flex",alignSelf:"center",alignItems:"flex-start",marginLeft:20},children:[Object(R.jsx)("div",{style:{fontSize:"25px",lineHeight:"40px"},children:"My Notepad"}),o&&Object(R.jsx)("div",{children:o.user.email})]}),Object(R.jsx)("div",{style:{display:"flex"},children:Object(R.jsxs)(_.a,{elevation:0,className:x.paper,style:{width:"50px",height:"50px",borderRadius:22,marginRight:20,boxShadow:"none"},children:[Object(R.jsx)("label",{htmlFor:"single",children:Object(R.jsx)("img",{src:V,alt:"",style:{width:"50px",height:"50px",borderRadius:22}})}),Object(R.jsx)("input",{type:"file",id:"single",accept:"image/*",style:{width:0,height:0,position:"absolute",borderWidth:0,border:"none",outline:0},onChange:function(e){if(e.target.files&&e.target.files[0]){var t=e.target.files[0];Y(t),K(URL.createObjectURL(t))}}}),Object(R.jsx)("div",{style:{position:"absolute",bottom:0,right:0,display:"flex",width:20,height:20,borderRadius:"50%",alignItems:"center",justifyContent:"center"},children:Object(R.jsx)("div",{className:x.editPicture,children:Object(R.jsx)(de.a,{})})})]})})]}),children:Object(R.jsx)("div",{style:{width:"90%",height:"100%",margin:"auto"},children:Object(R.jsx)(fe.Editor,{toolbar:{options:["link","emoji"]},editorState:$,wrapperStyle:{height:"50vh"},placeholder:"Add publicly visible comments, links, questions, and more here...",wrapperClassName:"wrapper-class",editorClassName:"editor-class",onEditorStateChange:function(e){ee(e)},children:Object(R.jsx)("textarea",{disabled:!0,style:{height:"30vh",margin:20,fontSize:"22px",width:"-webkit-fill-available",color:"rgb(40,40,40)",wordBreak:"break-word",overflowY:"auto",border:"solid"},value:be()(Object(je.convertToRaw)($.getCurrentContent()))})})})}),Object(R.jsx)(ue.a,{open:T,onDismiss:function(){return U(!1)},snapPoints:function(e){return[e.minHeight,e.maxHeight]},scrollLocking:!1,header:Object(R.jsxs)("div",{style:{flexDirection:"row",display:"flex",justifyContent:"space-between"},children:[Object(R.jsxs)("div",{style:{flexDirection:"column",display:"flex",alignSelf:"center",alignItems:"flex-start",marginLeft:20},children:[Object(R.jsx)("div",{style:{fontSize:"25px",lineHeight:"40px"},children:D&&D.user.displayName+"'s Notepad"}),Object(R.jsx)("div",{children:D&&D.user.email})]}),Object(R.jsx)("div",{style:{display:"flex"},children:Object(R.jsx)(_.a,{elevation:0,className:x.paper,style:{width:"50px",height:"50px",borderRadius:22,marginRight:20},children:Object(R.jsx)("img",{src:D&&D.user.photoURL,alt:"",style:{width:"50px",height:"50px",borderRadius:22}})})})]}),children:D&&Object(R.jsx)("div",{style:{height:"30vh",margin:20,fontSize:"22px",width:"-webkit-fill-available",color:"rgb(40,40,40)",wordBreak:"break-word",overflowY:"auto"},dangerouslySetInnerHTML:{__html:D.user.profile}})}),Object(R.jsxs)("div",{style:{display:"flex",flexDirection:"row",marginTop:L.isMobile?"2vh":"3vh",overflow:"scroll",marginBottom:L.isMobile?20:100,maxHeight:"65vh"},children:[Object(R.jsxs)("div",{children:[Object(R.jsx)("div",{style:{height:50}}),Object(R.jsx)(Ce,{me:o,users:s,setLocalOpen:function(e){return E(e)},setRemoteOpen:function(e){return U(e)},setSelectedUser:function(e){e&&H(e)}})]}),Object(R.jsx)(se,{channel:t})]}),Object(R.jsx)("div",{style:{display:"flex",height:"100%",width:"100%",flex:1}}),Object(R.jsxs)("div",{className:x.buttonGroup,children:[Object(R.jsxs)(z.a,{variant:"outlined",onClick:n,children:[" ","Leave"," "]}),Object(R.jsx)("div",{style:{width:80}}),Object(R.jsx)(z.a,{variant:"contained",color:"secondary",onClick:function(){a((function(e){if(e){var t=e.muted;return Object(j.a)(Object(j.a)({},e),{},{muted:!t})}}))},children:(null===o||void 0===o?void 0:o.muted)?"Unmute":"Mute"})]})]})})]}):null},Ie=n(356),Le=n.n(Ie),Te=n(74),Ue=n.n(Te),_e=Le()("/"),Me=n(654),Pe=function(){return Object(R.jsx)("div",{className:"landing-container-1",style:{position:"absolute"},children:Object(R.jsx)(Me.a,{size:100})})},De=oe.a.createClient({codec:"h264",mode:"rtc"});function Ge(e){e.audioTrack;return Object(ne.a)(e,["audioTrack"])}var He=function(){var e,t=null===(e=Object(i.useContext)(s))||void 0===e?void 0:e.user,n=Object(i.useState)(!1),o=Object(c.a)(n,2),r=o[0],a=o[1],l=Object(i.useState)(void 0),f=Object(c.a)(l,2),b=f[0],p=f[1],g=Object(i.useState)([]),m=Object(c.a)(g,2),x=m[0],v=m[1],y=function(e,t){var n=Object(i.useState)(void 0),o=Object(c.a)(n,2),r=o[0],a=o[1],s=Object(i.useState)(!1),l=Object(c.a)(s,2),j=l[0],f=l[1],h=Object(i.useState)([]),b=Object(c.a)(h,2),p=b[0],g=b[1];function m(e){return x.apply(this,arguments)}function x(){return(x=Object(u.a)(d.a.mark((function e(t){var n;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,oe.a.createMicrophoneAudioTrack(t);case 2:return n=e.sent,a(n),e.abrupt("return",n);case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function O(){return(O=Object(u.a)(d.a.mark((function t(n,i,o,r){var a;return d.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e){t.next=2;break}return t.abrupt("return");case 2:return t.next=4,m();case 4:return a=t.sent,t.next=7,e.join(n,i,o||null);case 7:return t.next=9,e.publish([a]);case 9:window.client=e,f(!0);case 11:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function v(){return(v=Object(u.a)(d.a.mark((function t(){return d.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r&&(r.stop(),r.close()),g([]),f(!1),t.next=5,null===e||void 0===e?void 0:e.leave();case 5:case"end":return t.stop()}}),t)})))).apply(this,arguments)}return Object(i.useEffect)((function(){if(e){g(e.remoteUsers);var n=function(){var t=Object(u.a)(d.a.mark((function t(n,i){return d.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.subscribe(n,i);case 2:g((function(t){return Array.from(e.remoteUsers)}));case 3:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}(),i=function(t){g((function(t){return Array.from(e.remoteUsers)}))},o=function(n){t(),g((function(t){return Array.from(e.remoteUsers)}))},r=function(t){g((function(t){return Array.from(e.remoteUsers)}))};return e.on("user-published",n),e.on("user-unpublished",i),e.on("user-joined",o),e.on("user-left",r),function(){e.off("user-published",n),e.off("user-unpublished",i),e.off("user-joined",o),e.off("user-left",r)}}}),[e]),{localAudioTrack:r,joinState:j,leave:function(){return v.apply(this,arguments)},join:function(e,t,n,i){return O.apply(this,arguments)},remoteUsers:p}}(De,(function(){var e=document.getElementsByClassName("audio")[0];e&&e.play()})),w=y.localAudioTrack,C=y.leave,S=y.join,k=y.joinState,A=y.remoteUsers,E=Object(i.useRef)(w),N=Object(i.useRef)(b),I=Object(i.useRef)(A);Object(i.useEffect)((function(){E.current=w,N.current=b,I.current=A}));var L=Object(O.g)().channelId,T=Object(O.f)(),U=Object(i.useState)(L),_=Object(c.a)(U,1)[0],M=Object(i.useState)(h.AGORA_APP_ID),P=Object(c.a)(M,1)[0],D=Object(i.useState)(re.RtcTokenBuilder.buildTokenWithUid(h.AGORA_APP_ID,h.AGORA_SECRET,L,0,re.RtcRole.PUBLISHER,Math.floor(Date.now()/1e3)+3600)),G=Object(c.a)(D,1)[0];Object(i.useEffect)((function(){b&&(console.log("emitting"),_e.emit(Ue.a.UPDATE_USER,{channel:_,user:Ge(b)}))}),[A]);var H=function(e){var t=e.users;console.log("receiving");var n=N.current,i=I.current;if(console.log(t),n&&i){var o=t.map((function(e){var t,n=null===(t=i.find((function(t){return t.uid.toString()===e.uid})))||void 0===t?void 0:t.audioTrack;return Object(j.a)(Object(j.a)({},e),{},{audioTrack:n})}));v(o.filter((function(e){return e.user.email!==n.user.email})))}};Object(i.useEffect)((function(){return _e.on("connect",(function(){console.log("Connected to Socket "+_e.id)})),_e.on(Ue.a.UPDATE_USER,H),_e.on(Ue.a.LEAVE_CHANNEL,W),_e.on(Ue.a.JOIN_CHANNEL,(function(e){var t=e.user;console.log(t),p(Object(j.a)(Object(j.a)({},t),{},{audioTrack:E.current})),a(!0)})),function(){C().then((function(){_e.emit(Ue.a.LEAVE_CHANNEL,{channel:_,user:b&&Ge(b)}),_e.off(Ue.a.UPDATE_USER,H)}))}}),[]),Object(i.useEffect)((function(){S(P,_,G)}),[]),Object(i.useEffect)((function(){if(k&&t){var e;console.log("joined");var n={user:t,isHost:!1,muted:!1,uid:null===(e=De.uid)||void 0===e?void 0:e.toString()};_e.emit(Ue.a.JOIN_CHANNEL,{channel:_,user:n}),console.log()}}),[k,t]),Object(i.useEffect)((function(){b&&r&&(console.log(b),console.log("emitting!"),_e.emit(Ue.a.UPDATE_USER,{channel:_,user:Ge(b)}))}),[b]),Object(i.useEffect)((function(){console.log("ass"),void 0===(null===b||void 0===b?void 0:b.audioTrack)&&r&&b&&C().then((function(){S(P,_,G).then((function(){p(Object(j.a)(Object(j.a)({},b),{},{audioTrack:E.current}))}))}))}),[null===b||void 0===b?void 0:b.audioTrack]);var B=function(){var e=Object(u.a)(d.a.mark((function e(){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,C();case 2:_e.emit(Ue.a.LEAVE_CHANNEL,{channel:_,user:b&&Ge(b)}),T.push("/");case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),W=function(){var e=Object(u.a)(d.a.mark((function e(){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,C();case 2:T.push("/");case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return console.log("AUDIO TRACK DEBUGGING"),console.log(b),console.log(x),b?Object(R.jsx)(Re,{channel:_,localUser:b,localAudioTrack:w,remoteUsers:x,leaveMeeting:B,setLocalUser:p}):Object(R.jsx)(Pe,{})},Be=n(357),We=n.n(Be),ze=function(){var e=Object(i.useContext)(s),t=e.setUser;e.setLoading;return Object(R.jsxs)("div",{className:"landing-container-1",style:{position:"relative",height:"100vh"},children:[Object(R.jsxs)("div",{className:"landing-container-2",style:{height:L.isMobile?"80vh":"70vh",width:L.isMobile?"95%":"60%"},children:[Object(R.jsx)(te,{}),Object(R.jsxs)(W.a,{variant:"body",style:{color:J.a[600],textAlign:"center",display:"flex",alignItems:"center",flexDirection:"column"},children:[Object(R.jsx)(We.a,{style:{marginBottom:"1.5vh"},onClick:function(){g().then((function(e){console.log(e),t(e)}))}}),"Sign in with your work email"]}),Object(R.jsx)(W.a,{variant:"body",style:{color:J.a[400],textAlign:"center",display:"flex",alignItems:"center",flexDirection:"column",fontSize:L.isMobile?12:14,maxWidth:L.isMobile?"100%":"60%"},children:Object(R.jsxs)("div",{children:["By clicking 'Sign In With Google', you acknowledge that you have read and understood, and agree to Confab\u2019s"," ",Object(R.jsxs)("a",{href:"/terms-of-service.html",style:{color:G.a[600]},children:["Terms"," "]}),"and"," ",Object(R.jsx)("a",{href:"/privacy-policy.html",style:{color:G.a[600]},children:"Privacy Policy"}),"."]})})]}),Object(R.jsx)($,{style:{position:"absolute",bottom:"0vh",width:"97%",marginLeft:"1.5%"}})]})},Fe=function(){!function(){var e="google-js",t=document.getElementsByTagName("script")[0];if(!document.getElementById(e)){var n=document.createElement("script");n.id=e,n.src="https://apis.google.com/js/platform.js",n.onload=window.onGoogleScriptLoad,t.parentNode.insertBefore(n,t)}}()},Ye=function(e){e.onGoogleScriptLoad=function(){var t=e.gapi;t.load("client",(function(){console.log("loaded client"),t.client.init(h.GAPI_CLIENT)}))},Fe()};n(614);var qe=function(){var e=Object(i.useState)(void 0),t=Object(c.a)(e,2),n=t[0],o=t[1],r=Object(i.useState)(!0),a=Object(c.a)(r,2),l=a[0],d=a[1],u={user:n,setUser:o,loading:l,setLoading:d};Object(i.useEffect)((function(){Ye(window)}),[]),Object(i.useEffect)((function(){b.onAuthStateChanged((function(e){var t;e&&(t=e.email,new Promise((function(e,n){f.a.firestore().collection("users").doc(t).get().then((function(n){e(Object(j.a)(Object(j.a)({},n.data()),{},{email:t}))})).catch((function(){e(void 0)}))}))).then((function(e){o(e)})),d(!1)}))}),[]);var h=Object(v.a)({typography:{fontFamily:'"Inter", sans-serif'}});return Object(R.jsx)("div",{children:Object(R.jsx)(y.a,{theme:h,children:Object(R.jsx)(s.Provider,{value:u,children:l?Object(R.jsx)(Pe,{}):Object(R.jsxs)(x.a,{children:[Object(R.jsx)(O.b,{exact:!0,path:"/",render:function(e){return n?Object(R.jsx)(I,{children:Object(R.jsx)(B,{})}):Object(R.jsx)(X,{})}}),Object(R.jsx)(O.b,{exact:!0,path:"/login",children:n?Object(R.jsx)(O.a,{to:"/"}):Object(R.jsx)(ze,{})}),Object(R.jsx)(O.b,{exact:!0,path:"/call/:channelId",children:n?Object(R.jsx)(He,{}):Object(R.jsx)(ze,{})})]})})})})};a.a.render(Object(R.jsx)(o.a.StrictMode,{children:Object(R.jsx)(qe,{})}),document.getElementById("root"))},74:function(e,t){e.exports={IS_USER:"IS_USER",NEW_USER:"NEW_USER",INIT_CHATS:"INIT_CHATS",LOGOUT:"LOGOUT",MESSAGE_SEND:"MESSAGE_SEND",TYPING:"TYPING",P_MESSAGE_SEND:"P_MESSAGE_SEND",P_TYPING:"P_TYPING",CHECK_CHANNEL:"CHECK_CHANNEL",CREATE_CHANNEL:"CREATE_CHANNEL",JOIN_CHANNEL:"JOIN_CHANNEL",UPDATE_USER:"UPDATE_USER",LEAVE_CHANNEL:"LEAVE_CHANNEL"}}},[[615,1,2]]]);
//# sourceMappingURL=main.45140c50.chunk.js.map