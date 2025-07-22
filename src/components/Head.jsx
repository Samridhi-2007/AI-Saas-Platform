/** 
*@copyright 2024 codewithsadee
*@license Apache-2.0
*@description Head component for the app
*/
import { Helmet } from "react-helmet";

const Head = ({title}) => {
  return (
 <Helmet>
    <title>{title}</title>
 </Helmet>
  )
}

export default Head
