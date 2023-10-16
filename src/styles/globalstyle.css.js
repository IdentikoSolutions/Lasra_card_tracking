import {createGlobalStyle} from "styled-components";
export const GlobalStytle = createGlobalStyle`
body{
    margin: 0;
    padding: 0;
    font-family: Open-Sans, Helvetica, Sans-Serif;
    background-color: #8bceb3 !important;
}
a{
    background-image: linear-gradient(to right, rgba(18,39,1,1), rgba(18,39,1,1), rgba(203,12,12,1));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    // background-image:linear-gradient(to right, blue,red);
}
a:active{
    color:blue !important;
    -webkit-text-fill-color: blue;

}
a:visited{
    color:red !important;
    -webkit-text-fill-color:red !important;

}
a:hover{
    color:#67f805 !important;
    -webkit-text-fill-color: #67f805;

}
// h2{
//     align-self: center;
//     text-align: center;
// }
`