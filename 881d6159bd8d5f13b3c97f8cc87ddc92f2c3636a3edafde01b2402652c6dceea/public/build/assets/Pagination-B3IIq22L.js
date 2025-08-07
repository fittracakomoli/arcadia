import{j as r,t as n}from"./app-Z8F6Ek8g.js";function g({links:a,className:s=""}){return a.length<=3?null:r.jsx("nav",{className:s,children:r.jsx("ul",{className:"inline-flex items-center -space-x-px",children:a.map((e,t)=>{const l=`
                        px-3 py-2 leading-tight border border-gray-300
                        ${e.active?"bg-primary text-white":"bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700"}
                        ${e.url?"":"cursor-not-allowed text-gray-400"}
                        ${t===0?"rounded-l-lg":""}
                        ${t===a.length-1?"rounded-r-lg":""}
                    `;return e.url?r.jsx("li",{children:r.jsx(n,{href:e.url,dangerouslySetInnerHTML:{__html:e.label},className:l,preserveScroll:!0})},t):r.jsx("li",{children:r.jsx("span",{dangerouslySetInnerHTML:{__html:e.label},className:l})},t)})})})}export{g as P};
