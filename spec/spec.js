import { Dropbox } from 'dropbox'

const TOKEN = 'sl.BWPjZuNgDXguX7mTPbtS7Pd4T-uiF3UDvauE3a1e1P0ZrpffURf2yCXjCiz6eYPzQH4BjVIbdCMptGDLN_kvKutSywMFP8sd2kzgLrrgVTTGWEUo8FFynoVr-n63pL-UaVg7P28Y'


const filePath = '/files/test.txt';

const drop_box = new Dropbox({
    accessToken: TOKEN
})

const uploadFile = async (path) => {
    let result

    try {
        result = await drop_box.filesUpload({ path: path })
        return result
    } catch (error) {
        console.log(`Error during file upload: ${error}`)
    }
}

let Upload_result = await uploadFile(filePath)
let GetFileMetadata_result = await drop_box.filesGetMetadata({ path: filePath })
let Delete_result = await drop_box.filesDeleteV2({ path: filePath })

describe("Drop Box API Tests ", () => {
    it("Upload test", async () => {
        expect(Upload_result.status).toBe(200)
    })

    it("GetFileMetadata test", async () => {
        expect(GetFileMetadata_result.status).toBe(200)
    })

    it("Delete file test", async () => {
        expect(Delete_result.status).toBe(200)
    })
})      
