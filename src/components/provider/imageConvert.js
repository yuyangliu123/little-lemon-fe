import { Image } from '@chakra-ui/react';

export const generateImageUrl = ({ src, imgWidth, auto }) => {
    const encodedSrc = encodeURIComponent(src);
    return `${import.meta.env.VITE_BE_API_URL}/img?url=${encodedSrc}&w=${imgWidth}&auto=${auto}`;
};

export const ImageConvert = ({ src, imgWidth, auto, ...prop }) => {
    const imageUrl = generateImageUrl({ src, imgWidth, auto });

    return <Image src={imageUrl} {...prop} />;
};
