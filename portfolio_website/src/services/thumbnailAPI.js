export async function getThumbnail(url) {
    // YouTube
    const ytMatch = url.match(
        /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^?&/]+)/
    );

    if (ytMatch) {
        return `https://img.youtube.com/vi/${ytMatch[1]}/maxresdefault.jpg`;
    }

    // Vimeo
    const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);

    if (vimeoMatch) {
        const id = vimeoMatch[1];

        const res = await fetch(
            `https://vimeo.com/api/oembed.json?url=https://vimeo.com/${id}`
        );

        const data = await res.json();

        return data.thumbnail_url;
    }

    return ''
}