import { v2 as cloudinary } from 'cloudinary';
const path = '/home/hariharakumaran/recap/appointment/src/assets/doc5.png';
(async function () {

    // Configuration
    cloudinary.config({
        cloud_name: 'djoidbneg',
        api_key: '984883951647734',
        api_secret: 'IgeiPo1zukc_U4rXL82zzzBBXbk' // Click 'View API Keys' above to copy your API secret
    });

    // Upload an image
    const uploadResult = await cloudinary.uploader
        .upload(
            path, { resorceType: "image" }
        )
        .catch((error) => {
            console.log(error);
        });

    console.log(uploadResult);
})();