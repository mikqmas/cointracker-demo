import { Toast } from "flowbite-react";
import { HiXCircle } from "react-icons/hi";

export default function Component({text}) {
  return (
    <div className='absolute bottom-5 left-1/2 transform -translate-x-1/2'>
      <Toast>
        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-500 dark:bg-cyan-800 dark:text-cyan-200">
          <HiXCircle className="h-5 w-5" />
        </div>
        <div className="ml-3 text-sm font-normal">{text}</div>
      </Toast>
    </div>
  );
}
