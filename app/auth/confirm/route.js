import { createServerClient } from "@supabase/ssr";
import {cookies} from 'next/headers'
import { NextResponse } from "next/server";

export async function GET(request){
    const {searchParams} = new URL(request.url);
    const token_hash = searchParams.get('token_hash');
    const next = searchParams.get('next');
    const type = searchParams.get('type');
    const cookieStore = cookies();


    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
            cookies: {
                get(name){
                    return cookieStore.get(name)?.value
                },
                set(name, value, options){
                    cookieStore.set({name, value, ...options})
                },
                remove(name, options){
                    cookieStore.set({name, value: '', ...options})
                }
            }
        }
    )

    if (token_hash && type){
        const {error} = await supabase.auth.verifyOtp({
            type, token_hash
        })
        console.log({error})
        if (!error){
            return NextResponse.redirect(next)
        }
    }
    return NextResponse.redirect('/error')
}