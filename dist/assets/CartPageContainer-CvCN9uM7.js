import{j as e,S as E,R as I,U as y,W as a,B as h,q as A,y as B,r as t,aC as D,Z as M,Q as P,$ as R}from"./index-CSaA1nFA.js";import $ from"./CartPage-Bl2_0ryX.js";import"./index-DVxGg5Dc.js";import"./ModalsSystem-uwFOgr8A.js";import"./chunk-UVUR7MCU-jy_K_3Vu.js";import"./LoginRotate-ySgjwLn_.js";import"./Signup-Cli2zUhA.js";import"./chunk-CWVAJCXJ-Bu8JRnmM.js";import"./chunk-7OLJDQMT-B2iVonpa.js";import"./ForgotPassword-1eQZaqRk.js";import"./chunk-MGVPL3OH-CeA--B3C.js";const d=()=>e.jsx(E,{direction:{xxl:"row",base:"column"},width:"100%",alignItems:"flex-start",spacing:6,children:e.jsx(I,{width:"100%",templateColumns:{xl:"repeat(4, 1fr)",lg:"repeat(3, 1fr)",md:"repeat(2, 1fr)",base:"repeat(1, 1fr)"},gap:"10px",templateRows:"repeat(1,1fr)",children:[...Array(4)].map((i,r)=>e.jsxs(y,{margin:"0 5px 30px 0",border:"1px solid #e4e4e4",children:[e.jsx(a,{height:"250px",width:"100%"}),e.jsxs(h,{padding:"1.25rem 1rem .75rem",children:[e.jsx(a,{height:{xxl:"20px",base:"18px"},width:"100%",marginBottom:"0.625rem"}),e.jsx(a,{height:{xxl:"20px",base:"18px"},width:"100%",marginBottom:"0.625rem"}),e.jsxs(A,{gap:"1rem",justifyContent:"space-between",children:[e.jsx(a,{height:{xxl:"40px",base:"18px"},width:"45%"}),e.jsx(a,{height:{xxl:"40px",base:"18px"},width:"45%"})]})]})]},r))})}),q=R`
    query Shoppingcarts($identifier: String!, $isEmail: Boolean) {
    shoppingcarts(identifier: $identifier,isEmail:$isEmail) {
        totalAmount
        totalItem
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
    }
`,F=()=>{const{identifier:i,isEmail:r}=B(),[u,G]=t.useState(null),{cartData:g,setCartData:f,checkoutLogin:j}=D(),[b,k]=t.useState(),[n,w]=t.useState(null),[S,l]=t.useState(!0),{data:Q,loading:p,error:m,refetch:C}=M(q,{variables:{identifier:i,isEmail:r},fetchPolicy:"cache-and-network",skip:!i||j,onCompleted:s=>{setTimeout(()=>{f(s.shoppingcarts[0]);const x={};s.shoppingcarts[0].data.forEach(c=>{x[c.strMeal]=c.numMeal}),k(x),l(!1)},300)},onError:s=>{console.log(s),l(!1)}}),o=P({xs:400,sm:576,md:768,lg:992,xl:1200,xxl:1400},{xxl:400,xl:400,lg:300,md:300,sm:500,xs:500,base:500});return t.useEffect(()=>{n===null&&(w(o),console.log(o,"initial imagewidth"))},[o,n]),S||p||!g?e.jsx(d,{}):m?e.jsx(h,{children:"something went wrong"}):e.jsx(t.Suspense,{fallback:e.jsx(d,{}),children:e.jsx($,{initialData:u,initialInputValue:b,loading:p,error:m,fetchlike:C,imageWidth:n})})};export{F as default};
