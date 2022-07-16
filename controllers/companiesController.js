const Company = require('../models/teamModel')

async function createCompany(req, res, next) {
    try {
        const { company_code, admin_user, company_name } = req.body

        const company = await Company.create({
            company_code,
            admin_user,
            company_name
        })
    } catch (err) {
        console.log(err)
    }
}

const authUser = async (req, res, next) => {
    try{
        const { email, password } = req.body
    
        const user = await User.findOne({ email })
    
        if(user && (await user.matchPassword(password))){
            res.status(201).json({
                _id: user._id,
                email: user.email, 
                name: user.name,
                theme: user.theme,
                company_code: user.company_code,
                token: generateToken(user._id)
            })
        }else{
            res.status(400).json({error: 'Invalid Email or Password'})
        }
    }catch(e){
        res.status(400).json({text: 'An Error Has Occurred. (Error Code: Kangaroo)'})
    }
}


module.exports = { createCompany };