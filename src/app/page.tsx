import { Poppins } from "next/font/google"

import { cn } from "@/src/lib/utils"

import { Button } from '@/src/components/ui/button'
import { LoginButton } from "@/src/components/auth/login-button"
import Logo from "@/src/components/logo"
import Link from 'next/link'



const font = Poppins({
    subsets: ["latin"],
    weight: ["600"]
})


export default function Home() {
    return (
        <main className='flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800'>
            <div className='space-y-6 text-center'>
                <div className="flex flex-row items-center">
                    {/* <Logo /> */}
                    <h1 className={cn('text-6xl font-semibold text-white drop-shadow-md', font.className,)}>Demo</h1>
                </div>
                <div className="flex justify-center gap-x-2">
                    <LoginButton>

                        <Button variant="secondary" size="lg">
                            Sign in
                        </Button>
                    </LoginButton>
                </div>
            </div>
        </main >
    )
}
