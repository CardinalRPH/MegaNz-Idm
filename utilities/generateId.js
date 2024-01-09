import { customAlphabet } from "nanoid";

export default () => {
    const generateNodeID = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', 7);
    const nodeId = generateNodeID()
    return nodeId
}