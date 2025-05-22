import { ClassBuilder } from '@/shared/utils/classBuilder';

export const buildButtonStyles = (extra?: string) => {
  return (
    new ClassBuilder()
      //Base style
      .add('px-5 py-3 bg-main rounded-md cursor-pointer relative')
      //Text style
      .add('text-black text-lg font-bold font-natoSans')
      //After style
      .add(
        `
    after:absolute
    after:content-['']  
    after:left-1/2 after:-translate-x-1/2  
    after:top-1/2 after:-translate-y-1/2  
    after:w-[90%]  
    after:h-[110%]  
    after:rotate-[4deg]
    after:bg-main/40 after:rounded-md
    after:-z-1
    `,
      )
      //Animation
      .add(
        `
    transition-all duration-300 ease-in-out  
    hover:scale-105  
    group-hover:after:rotate-6  
    group-hover:after:scale-110  
    group-hover:after:-translate-y-[60%]
    `,
      )
      .add(extra)
      .build()
  );
};
