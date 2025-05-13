export const handleNotFoundError = (msg, res) => {
    return res.status(404).json({
        success: false,
        errors: [{
            msg,
        }]
    })
}