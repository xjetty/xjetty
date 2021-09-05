import Head from "next/head";
import CreateListingFormComponent from "../components/FormComponents/CreateListingFormComponent";
import UpdateEosRate from "../components/UpdateEosRate";

const Create = () => {
    return (
        <html>
            <Head>
                <title>Create a Listing - BlockCommerc</title>
            </Head>
            <UpdateEosRate/>
            <CreateListingFormComponent/>
        </html>
    )
}

export default Create