import { getSingleProvider } from "@/lib/api/publicProvider";
import { ParamsIdType } from "@/types";

export default async function providerSinglePage({params}:ParamsIdType) {

    const {id} = await params

    const provider = await getSingleProvider(id)
    console.log(provider)
    return (
        <div>Shop single page</div>
    );
}