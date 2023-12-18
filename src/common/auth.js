import bcrypt from 'bcrypt'
import  jwt  from 'jsonwebtoken'




const hashPassword =async(password)=>{
let salt= await bcrypt.genSalt(Number(process.env.SALT_ROUNDS))
let hash = await bcrypt.hash(password,salt)
return hash

}

const hashCompare = async (password,hash)=>{
    return await bcrypt.compare(password,hash)

}

const createToken = async(payload)=>{
    const token = await jwt.sign(payload,process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
    })
    return token
}

const decodeToken = async(token)=>{
    const payload = await jwt.decode(token)
    return payload
}

const validate = async(req,res,next)=>{
    let token = req.headers.authorization?.split(" ")[1]
    if(token)
    {
        let payload = await decodeToken(token)
        req.headers.userId = payload.id
        let currentTime = (+new Date())/1000
        
        if(currentTime<payload.exp)
        {
            next()
        }
        else
            res.status(401).send({message:"Token Expired"})
    }
    else
    {
        res.status(401).send({message:"No Token Found"})
    }
}

const adminGaurd = async(req,res,next)=>{
    let token = req.headers.authorization?.split(" ")[1]
    if(token)
    {
        let payload = await decodeToken(token)
        if(payload.role==='admin')
            next()
        else
            res.status(401).send({message:"Only Admins are allowed"})
    }
    else
    {
        res.status(401).send({message:"No Token Found"})
    }
}
export default{
    hashPassword,
    hashCompare,
    createToken,
    validate,
    adminGaurd
}