/** 
*@copyright 2024 codewithsadee
*@license Apache-2.0
*@description keyboard comp for the app
*/
/**
 * @param {{ kbdList: string[] }} props
 */
const Kbd = ({ kbdList }) => {
  return (
    
   <div className="">
    <span className="sr-only"> Keyboard shortcut is,</span>
    {kbdList.map((item, index)=>(
        <kbd key= {index} className="inline-block px-1 py-0.5 bg-background rounded-full">{item}</kbd>
    ))}
   </div>
  );
};

export default Kbd;

