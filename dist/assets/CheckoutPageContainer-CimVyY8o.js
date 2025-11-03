const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/CheckoutPage-D_3O9XrN.js","assets/index-DK1BDKGD.js","assets/index-CGX9qSk3.css","assets/chunk-UVUR7MCU-Dbi6v9Kw.js","assets/ModalsSystem-Du28IU22.js","assets/AddAddress-BGSxHzdz.js","assets/chunk-7OLJDQMT-DLU5gO0J.js","assets/chunk-CWVAJCXJ-DTRhzuvr.js","assets/DeleteAddress-DVCZ9-0D.js","assets/index-BLc0O97m.js","assets/navConfig-BpbbTEl9.js"])))=>i.map(i=>d[i]);
import{Q as f,j as e,B as t,R as P,U as j,W as s,s as h,V as o,q as _,r as i,M as v,X as B,Y as O,K as T,Z as F,_ as L,$ as U}from"./index-DK1BDKGD.js";import{n as V}from"./navConfig-BpbbTEl9.js";const b=({numCol:d,numRow:n,marginTop:l,backgroundColor:p})=>(f({xs:400,sm:576,md:768,lg:992,xl:1200,xxl:1400},{xxl:4,xl:4,lg:4,md:3,sm:2,xs:2,base:1}),f({xs:400,sm:576,md:768,lg:992,xl:1200,xxl:1400},{xxl:!0,xl:!0,lg:!0,md:!0,sm:!1,xs:!1,base:!1}),e.jsx(t,{margin:"3vh 0",width:"100%",height:"100%",children:e.jsxs(P,{templateColumns:"1fr 1fr",templateRows:"1fr 1fr",gridTemplateAreas:{md:`
           "main orderSummary"
           "main orderSummary"
           `,base:`
           "main main"
           "orderSummary orderSummary"
           `},backgroundColor:`${p}`,marginTop:`${l}`,children:[e.jsxs(j,{gridArea:"main",fontSize:{base:"1.5em",[V.showNavSize]:"2em"},children:[e.jsxs(t,{children:[e.jsx(t,{padding:"0.5rem 1rem .75rem",children:e.jsx(s,{height:"20px",width:"30%",margin:"auto",borderRadius:"10px"})}),e.jsxs(h,{padding:"0.5rem 1rem .75rem",children:[e.jsx(s,{height:{xxl:"40px",base:"40px"},width:"100%",borderRadius:"10px"}),e.jsx(s,{height:{xxl:"40px",base:"40px"},width:"100%",borderRadius:"10px"}),e.jsx(s,{height:{xxl:"40px",base:"40px"},width:"100%",borderRadius:"10px"})]})]}),e.jsx("hr",{}),e.jsxs(t,{children:[e.jsx(t,{padding:"0.5rem 1rem .75rem",children:e.jsx(s,{height:"20px",width:"20%",borderRadius:"10px"})}),e.jsxs(o,{padding:"0.5rem 1rem .75rem",children:[e.jsx(s,{height:{xxl:"20px",base:"20px"},width:"100%",borderRadius:"10px"}),e.jsx(s,{height:{xxl:"20px",base:"20px"},width:"100%",borderRadius:"10px"})]})]}),e.jsx("hr",{}),e.jsxs(t,{children:[e.jsx(t,{padding:"0.5rem 1rem .75rem",children:e.jsx(s,{height:"20px",width:"20%",borderRadius:"10px"})}),e.jsxs(o,{padding:"0.5rem 1rem .75rem",children:[e.jsx(s,{height:{xxl:"20px",base:"20px"},width:"100%",borderRadius:"10px"}),e.jsx(s,{height:{xxl:"20px",base:"20px"},width:"100%",borderRadius:"10px"})]})]})]}),e.jsx(j,{gridArea:"orderSummary",backgroundColor:"#f5f5f5",height:"80vh",children:e.jsxs(t,{children:[e.jsxs(h,{justifyContent:"space-around",children:[e.jsxs(h,{children:[e.jsx(t,{padding:"0.5rem 1rem .75rem",children:e.jsx(s,{height:"60px",width:"60px",borderRadius:"10px"})}),e.jsxs(o,{padding:"0.5rem 1rem .75rem",alignItems:"start",children:[e.jsx(s,{height:"15px",width:"100px",borderRadius:"10px"}),e.jsx(s,{height:"15px",width:"50px",borderRadius:"10px"})]})]}),e.jsx(s,{height:"20px",width:"15%",borderRadius:"10px"})]}),e.jsx(t,{padding:"0.5rem 1rem .75rem",children:e.jsx(s,{height:"20px",width:"20%",borderRadius:"10px"})}),e.jsxs(o,{padding:"0.5rem 1rem .75rem",children:[e.jsx(s,{height:{xxl:"20px",base:"20px"},width:"100%",borderRadius:"10px"}),e.jsx(s,{height:{xxl:"20px",base:"20px"},width:"100%",borderRadius:"10px"})]})]})})]})})),q=i.lazy(()=>L(()=>import("./CheckoutPage-D_3O9XrN.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10]))),z=U`
  query Checkoutpageformat($identifier: String, $isEmail: Boolean, $state: String, $useDraft: Boolean, $sessionId: String) {
    checkoutpageformat(identifier: $identifier, isEmail: $isEmail, state: $state, useDraft :$useDraft, sessionId:$sessionId) {
    cart {
      checkedAmount
      checkedItem
      data {
        strMeal
        numMeal
        idMeal
        baseAmount
        cartAmount
        strMealThumb
        checked
      }
}
      shippingInfo {
        addressFname
        addressLname
        phone
        address1
        address2
        city
        country
        uuid
        isDefault
      }
      fee {
        fee {
          basic
          premium
        }
      }
    }
  }
`,ie=()=>{const{identifier:d,isEmail:n}=_(),{modalOpen:l,setModalOpen:p,operateAddress:G,setOperateAddress:Q,setLoadAddAddress:H,loadAddAddress:K,setAllAddressInfo:k,allAddressInfo:Y,setLoadDeleteAddress:N,loadDeleteAddress:W}=i.useContext(v),{setValue:x}=B(),[m,w]=i.useState(null),[R,c]=i.useState(!0),[A]=O(),u=A.get("useDraft")==="true",I=T.get("sessionId");console.log(d,"identifier");const{data:X,loading:S,error:C,refetch:Z}=F(z,{variables:{identifier:d,isEmail:n,state:"proposal",useDraft:u,sessionId:I},fetchPolicy:"cache-and-network",skip:!d||!n,onCompleted:r=>{console.log(r,"check data",r.checkoutpageformat),setTimeout(()=>{w(r.checkoutpageformat);const y={};r.checkoutpageformat.cart.data.forEach(a=>{y[a.strMeal]=a.numMeal});const{shippingInfo:D,fee:$,checkedAmount:J,checkedItem:ee,checkedItems:se,shoppingCart:re}=r.checkoutpageformat,g=D.find(a=>a.isDefault===!0),[E,M]=Object.entries($.fee)[0];console.log(r,"check data",r.checkoutpageformat,g),k((a=>({...a,shippingInfo:r.checkoutpageformat.shippingInfo}))),x("selectedAddress",g?.uuid),x("shippingMethod",E),x("shippingFee",M),c(!1)},300)},onError:r=>{console.log(r),c(!1)}});return R||S||!m?e.jsx(b,{}):C?e.jsx(Box,{children:"something went wrong"}):e.jsx(i.Suspense,{fallback:e.jsx(b,{}),children:e.jsx(q,{itemInfo:m,useDraft:u})})};export{ie as default};
