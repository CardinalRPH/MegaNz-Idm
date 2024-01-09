import { File } from "megajs"
import sizeConverter from "../utilities/sizeConverter.js"
import generateId from "../utilities/generateId.js"

export const getMegaLink = async (req, res, tempFunc) => {
    const { link } = req.query
    const host = req.get('host')
    const scheme = req.protocol
    const id = generateId()
    try {
        const fileLink = File.fromURL(link)
        await fileLink.loadAttributes()
        tempFunc(true, { fileLink: fileLink, idLink: id })
        res.json({
            'File Name': fileLink.name,
            'File Size': sizeConverter(fileLink.size),
            'Open this Link to download': `${scheme}://${host}/download/${id}`
        })
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).end('Internal Server Error');
    }
}

export const streamFile = (req, res, tempFunc) => {
    const { id } = req.params
    const _tempFunc = tempFunc(false)


    if (_tempFunc === undefined) {
        console.log('Empty');
        res.json({ error: 'No Link Fetched' })
        return
    }

    const { fileLink, idLink } = _tempFunc

    if (id !== idLink) {
        console.log('idNot Same');
        res.json({ error: 'No Link for this id' })
        return
    }
    res.setHeader('Content-Disposition', `attachment; filename=${fileLink.name}`);
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Length', fileLink.size);

    try {
        const stream = fileLink.download();
        stream.pipe(res);

        // stream.on('progress', info => {
        //     console.log('Loaded', info.bytesLoaded, 'bytes of', info.bytesTotal)
        // })
        stream.on('end', () => {
            console.log('Download completed.');
            const removedArr = arrFun.filter(item => item.idLink !== id)
            tempFunc(true, removedArr)
        });

        stream.on('error', (err) => {
            console.error('Error:', err.message);
            res.status(500).end('Internal Server Error');
        });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).end('Internal Server Error');
    }
}