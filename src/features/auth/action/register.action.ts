"server action"

import { apiFetchServer } from "@/lib/api/apiFetchServer"
import { RegisterUserSchema } from "@/lib/schema/auth.schema"

export async function registerAction(data:RegisterUserSchema){

    const user = await apiFetchServer('/auth/register', {
        method: "POST",
        data: data,
        cache: "no-store"
    })

    return user;
}