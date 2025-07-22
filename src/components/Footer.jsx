/** 
*@copyright 2024 codewithsadee
*@license Apache-2.0
*@description Footer layout for the app
*/
import { Separator } from "@/components/ui/separator";
import { SOCIAL_LINKS } from "@/constants";

const Footer = () => {
  return (
    <footer className="p-4">
      <div className='container min-h-16 py-4 bg-background border border-b-0 rounded-t-xl flex flex-col gap-3 items-center lg:flex-row lg:justify-between'>
        <Separator />
        <p className='text-center text-sm'>&copy; 2025 samridhi_prakash</p>
        <ul className="flex gap-4">
          {SOCIAL_LINKS.map(({ href, label }, index) => (
            <li key={index}
            className='flex flex-wrap items-center'>
              <a href={href} target="_blank" className="text-sm text-muted-foreground hover:text-foreground">
                {label}
              </a>
              {index !== SOCIAL_LINKS.length-1 &&
                <Separator
                 orientation='vertical'
                 className='h-3 mx-3'
                 />
              }
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;



