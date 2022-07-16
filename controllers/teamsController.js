const Company = require('../models/teamModel')

const getTeams = async (req, res, next) => {
    try{
        const teams = await Company.find({ })
        res.status(201).json(teams)
    }catch(e){
        res.status(400).json({text: 'An Error Has Occurred. (Error Code: Forest)'})
    }
}

const getTeam = async (req, res, next) => {
    try{
        const { company_code } = req.body
        const team = await Company.find({ company_code })
        res.status(201).json(team)
    }catch(e){
        res.status(400).json({text: 'An Error Has Occurred. (Error Code: Gamble)'})
    }
}

module.exports = { getTeams, getTeam };