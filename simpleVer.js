import { File } from 'megajs'
import readline from 'readline'
import fs from 'fs'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})


const questionProvider = (question) => {
    return new Promise((answer) => {
        rl.question(question, (string) => {
            answer(string)
        })
    })
}

const sizeConverter = (fileSize) => {
    const bytesToGB = (bytes) => {
        const GB = bytes / (1024 * 1024 * 1024);
        return GB.toFixed(2) + ' GB';
    };

    const MB = fileSize / (1024 * 1024);

    if (MB > 100) {
        return bytesToGB(fileSize);
    }

    return MB.toFixed(2) + ' MB';
}

const enterProcess = (fileLink) => {
    const stream = fileLink.download()
    stream.on('error', error => {
        console.error(error)
        process.exit(-1)
    })
    stream.on('progress', info => {
        console.log('Loaded', info.bytesLoaded, 'bytes of', info.bytesTotal)
    })
    stream.on('end', () => {
        console.log('Download completed.');
        process.exit(0)
    });
    stream.pipe(fs.createWriteStream(fileLink.name))
}
// muehehe

const fileFromLink = async () => {
    console.clear()
    const link = await questionProvider('Input Mega.nz link : ')
    const fileLink = File.fromURL(link)
    await fileLink.loadAttributes()
    console.log(`File Name : ${fileLink.name}`);
    console.log(`File Size : ${sizeConverter(fileLink.size)}`);
    while (true) {
        let dialogDownload = await questionProvider('Continue download Y/N : ')
        if (dialogDownload.toLowerCase() === "y") {
            enterProcess(fileLink)
            break
        } else if (dialogDownload.toLowerCase() === "n") {
            process.exit(0)
        }
    }
}


fileFromLink()

