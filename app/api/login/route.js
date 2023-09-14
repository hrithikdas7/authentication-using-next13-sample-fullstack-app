import prisma from "@/lib/prisma";
import bcrypt from 'bcrypt';

async function POST(request) {
    const body = await request.json();

    const user = await prisma.user.findFirst({
        where: {
            email: body.username,
        },
    });

    if (user && (await bcrypt.compare(body.password, user.password))) {
        const { password, ...userWithoutPass } = user;
        return new Response(JSON.stringify(userWithoutPass));
    } else {
        return new Response(JSON.stringify(null));
    }
}

export { POST };
