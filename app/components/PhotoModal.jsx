'use client'

import Image from "next/image";

export default function PhotoModal({src, alt, onClose}){
    if (!src) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
            <div className="bg-gray-800 p-4 rounded-lg relative border border-gray-600">
            <button onClick={onClose} className="text-gray-300 hover:text-white mb-2">Close</button>
            <div className="relative w-[80vw] h-[80vh]">
                <Image 
                    src={src} 
                    alt={alt}
                    fill={true}
                    style={{objectFit: 'cover', objectPosition: 'center'}}
                    className="rounded-lg" 
                />
            </div>
            </div>
        </div>
    )
}