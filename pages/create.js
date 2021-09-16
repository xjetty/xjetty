import Head from "next/head";
import CreateListingFormComponent from "../components/FormComponents/CreateListingFormComponent";
import UpdateEosRate from "../components/UpdateEosRate";

const Create = () => {
    return (
        <html>
            <Head>
                <title>Create a Post - BlockCommerc</title>
                <meta name="robots" content="noindex"/>
            </Head>
            <UpdateEosRate/>
            <CreateListingFormComponent/>
        </html>
    )
}

export default Create