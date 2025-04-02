export const verifyImageUrl = async (req,res,next) => {
    const imageUrl = req.body.image;
    if(!imageUrl) return res.status(400).json({ success: false, message: 'Please provide an image URL!' });

    try {
        const verificationResponse = await fetch(imageUrl, { 
            method: 'HEAD',
            redirect: 'manual' 
        });
        if (!verificationResponse.ok) {
            return res.status(400).json({ success: false, message: 'The image URL response raises an error. Please check and resend the request' });
        }

        if (verificationResponse.status >= 300 && verificationResponse.status < 400) {
            return res.status(400).json({ success: false, message: 'The URL is a redirect which is not allowed!' });
        }

        const imageDataHeader = verificationResponse.headers.get('Content-Type');
        if(imageDataHeader && imageDataHeader.startsWith('image/')) {
            next();
        }
        else {
            return res.status(400).json({ success: false, message: 'The URL does not point to an image!' });
        }
    } catch (error) {
        console.error(`Checking the Image URL: ${error}`);
        return res.status(400).json({ success: false, message: 'Invalid Image URL. Please check and try again!' });
    }
}