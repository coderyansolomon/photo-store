'use client'
import { useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { useRouter } from "next/navigation";

export default function PhotoUploader(){
    const [uploading, setUploading] = useState(false);
    const router = useRouter()

    async function handleFileUpload(event){
        try {
            setUploading(true);

            const file = event.target.files[0]
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`
            const {data: {user}} = await supabase.auth.getUser();
            if (!user){
                throw new Error("User not authenticated for photo upload")
            }

            const filePath = `user_uploads/${user.id}/${fileName}`
            const {error} = await supabase.storage.from('photos')
                .upload(filePath, file)

            if (error){
                throw error
            }

            await fetch('/api/revalidate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({path: '/photos'})
            })

            router.refresh();

        } catch(err){
            console.error(err)
        } finally {
            setUploading(false)
        }
    }


    return (
        <label
         htmlFor="photo-upload"
         className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg m-4"
         >
            {uploading ? 'Uploading...' : 'Upload Photo'}
            <input 
            type="file" 
            id="photo-upload" 
            onChange={handleFileUpload}
            disabled={uploading}
            className="hidden"
            />
         </label>
    )
}