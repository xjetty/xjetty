import Head from "next/head";
import CreatePostFormComponent from "../components/FormComponents/CreatePostFormComponent";
import UpdateEosRate from "../components/UpdateEosRate";

const Create = () => {
    return (
        <html>
            <Head>
                <title>Create a Post - D2R Crypto</title>
                <meta name="robots" content="noindex"/>
            </Head>
            <UpdateEosRate/>
            <CreatePostFormComponent/>
        </html>
    )
}

export default Create