export default function Header({ title, description }: { title: string, description: string }) {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <div className='flex flex-col gap-1'>
                <h1 className="text-3xl tracking-tighter font-bold leading-none text-slate-800">{title}</h1>
                <p className="text-lg tracking-tight opacity-80 leading-none text-slate-600">{description}</p>
            </div>
        </div>
    )
}