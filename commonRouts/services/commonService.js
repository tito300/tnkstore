module.exports = class CommonService {
    constructor(ClientError) {
        this.ClientError = ClientError;
        this.postError = this.postError.bind(this);
    }

    async postError(error_message, error_stack, info, remoteAddress) {
     const errorDocument = await this.ClientError.create({
         error_message,
         error_stack,
         remote_address: remoteAddress,
         info,
     })
     
     try {
        await errorDocument.save();
        return true
     } catch (err) {
        return false  
     }

    }
}