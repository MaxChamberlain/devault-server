const User = require('../models/usersModel')
const Company = require('../models/teamModel')
const generateToken = require('../utils/generateToken')

// create an async function names registerUser that takes req, res, and next as parameters
// try to create a new user with the username and password from req.body
// if successful, return a status code of 201 and the user
// if not, return a status code of 400 and an error message
// if an error occurs, call next with the error
async function registerUser(req, res, next) {
    try {
        const { company_code_input, password, email, name, company_name } = req.body

        if(!email.includes('@') && !email.includes('.')){
            return res.status(400).json({
                error: 'Email is invalid'
            })
        }

        if(email.split('@')[1].split('.')[0].length < 1 || email.split('@')[1].split('.')[1].length < 2){
            return res.status(400).json({
                error: 'Email is invalid'
            })
        }
        
        const check1 = await User.findOne({ email })

        if(check1){
            return res.status(400).json({
                error: 'Email already exists'
            })
        }

        if(company_code_input){
            const check2 = await User.findOne({ company_code: company_code_input })
            if(!check2){
                return res.status(400).json({
                    error: 'Company Code is invalid'
                })
            }
        } 
        
        const getCompanyCode = async(id) => {
            const randomString = Math.random().toString(36).substring(2, 8)
            const checkCode = await User.findOne({ company_code: randomString })
            if(checkCode){
                getCompanyCode(id)
            }
            return randomString.toUpperCase()
        }

        let company_code = company_code_input || await getCompanyCode()

        const user = await User.create({
            name,
            password,
            email,
            company_code,
            isApproved: company_code_input ? false : true
        })
        if(!company_code_input){
            try{
                await Company.create({
                    company_code,
                    company_admin: user._id,
                    company_name
                })
            }catch(e){
                console.log(e)
                User.deleteOne({ _id: user._id })
                return res.status(501)
            }
        }
        res.status(201).json({
            _id: user._id,
            email: user.email, 
            name: user.name,
            theme: user.theme,
            company_code: user.company_code,
            token: generateToken(user._id)
        })
    } catch (err) {
        console.log(err)
        next(err)
    }
}

const authUser = async (req, res, next) => {
    try{
        const { email, password } = req.body
        console.log(req.body)
    
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

const getUsers = async (req, res, next) => {
    try{
        const { company_code } = req.body
        const users = await User.find({ company_code })
        res.status(201).json(users)
    }catch(e){
        res.status(400).json({text: 'An Error Has Occurred. (Error Code: Jester)'})
    }
}

const makeAdmin = async (req, res, next) => {
    try{
        const { user_id, isAdmin } = req.body
        const user = await User.updateOne({ _id: user_id }, { isAdmin })
        console.log(user)
        res.sendStatus(201)
    }catch(e){
        res.status(400).json({text: 'An Error Has Occurred. (Error Code: Dripstone)'})
    }
}

const getUserPermissions = async (req, res, next) => {
    try{
        const { _id } = req.body
        const user = await User.findOne({ _id })
        res.status(201).json(user.isAdmin)
    }catch(e){
        res.status(400).json({text: 'An Error Has Occurred. (Error Code: Faux)'})
    }
}


module.exports = { registerUser, authUser, getUsers, makeAdmin, getUserPermissions };