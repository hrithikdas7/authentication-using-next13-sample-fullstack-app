import prisma from "@/lib/prisma";
import bcrypt from 'bcrypt';

async function POST(request) {
    const body = await request.json();

    const user = await prisma.user.create({
        data: {
            name: body.name,
            email: body.email,
            password: await bcrypt.hash(body.password, 10),
        },
    });

    const { password, ...result } = user;

    return new Response(JSON.stringify(result));
}

export { POST };
