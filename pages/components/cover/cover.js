import Image from "next/image";

export const Cover =({children, background}) => {
    return (
        <div className="h-screen bg-slate-800 relative min-h-[400px] flex justify-center items-center flex-col">{children}
        <Image alt="Cover" src={background} fill className="mix-blend-soft-ligh object-cover"/>
        </div>
    )
};