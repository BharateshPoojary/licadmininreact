import { Skeleton } from "@/components/ui/skeleton"
import React from 'react'

const Loader = () => {
    return (
        <div className="flex flex-col  space-y-3">
            <Skeleton className="h-[400px] w-[300px] rounded-xl" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-[300px]" />
                <Skeleton className="h-4 w-[250px]" />
            </div>
        </div>
    )
}

export default Loader
