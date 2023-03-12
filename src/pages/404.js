export default function Page404(){
    return (
        <>
            <div className="flex items-center justify-center min-h-auto bg-white my-10 py-1">
                <div className="flex flex-col">
                    <div className="flex flex-col items-center">
                        <div className="text-indigo-500 font-bold text-7xl">
                            404
                        </div>
                        <div className="font-bold text-3xl xl:text-7xl lg:text-6xl md:text-5xl mt-10">
                            This page does not exist
                        </div>
                        <div className="text-gray-400 font-medium text-sm md:text-xl lg:text-2xl mt-8">
                            The page you are looking for could not be found.
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
