const mongoose = require('mongoose')

const companySchema = new mongoose.Schema({
    company_code: {
        type: String,
        required: true,
    },
    company_name: {
        type: String,
        required: true,
    },
    company_admin: {
        type: String,
        required: true,
    }

}
, { timestamps: true }
);

companySchema.set('collection', 'companies');

const Company = mongoose.model("Company", companySchema);

module.exports = Company;