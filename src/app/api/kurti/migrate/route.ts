export const dynamic = 'force-dynamic'

import { migrate, sellKurti } from "@/src/data/kurti";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
    try {
        // const code = request.nextUrl.searchParams.get("code") || "";
        // console.log(code, code.substring(0, 7), code.substring(7));
        const data = await migrate();
        return new NextResponse(JSON.stringify({ data }), { status: 200 });
    } catch (error: any) {
        return new NextResponse(JSON.stringify({ error: error.message }), {
            status: 404
        });
    }
}





