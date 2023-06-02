export const currentSession = async (req, res) => {
        
    try {
        res.json({'session':req.session})
    } catch(error) {
        res.status(error.code).json({error: error.message})
    } 
}