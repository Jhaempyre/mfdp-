import {asyncHandler} from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Update from "../models/updates.models.js";
import AllUpdates from "../models/allUpdates.models.js";

const addUpdate = asyncHandler(async(req,res)=>{
    console.log("getting update from frontend")
    const{message,tittle}=req.body
    const schoolUniqueCode = req.theAdmin?.schoolUniqueCode
    console.log(message,tittle);
    if(!message&&!tittle&&!schoolUniqueCode){
        throw new ApiError(400, "All fields are required ")
    }

    const theUpdate = await Update.create({
        message,
        tittle,
        schoolUniqueCode
    })

    if (!theUpdate){
        throw new ApiError(500,"Something went wrong in serverside , please try again")
    }
    const allUpdates = await AllUpdates.findOne({ schoolUniqueCode });
    if(allUpdates){
        allUpdates.allUpdates.push(theUpdate._id);
        await allUpdates.save();
    }else{
        await AllUpdates.create({ schoolUniqueCode,
            allUpdates: [theUpdate._id]
         });
    }
    console.log("everything worked fine")
    return res.status(201).json(
        new ApiResponse(200,theUpdate," Message Updated Successfully.")
    )
})

const getAllUpdates = asyncHandler(async(req,res)=>{
    console.log("getting all updates from Database")
    const schoolUniqueCode = req.theAdmin?.schoolUniqueCode
    const allUpdates = await AllUpdates.findOne({ schoolUniqueCode }).populate('allUpdates');
    if(!allUpdates){
        throw new ApiError(404, "No updates found");
    }
    return res.status(200).json(
        new ApiResponse(200, allUpdates.allUpdates, "All updates fetched successfully")
    );
})
const editUpdate = asyncHandler(async(req,res)=>{
    console.log("Got edit request from frontend")
    const {id,message,tittle,schoolUniqueCodex} = req.body
    const schoolUniqueCode = req.theAdmin?.schoolUniqueCode
    if(!message&&!tittle&&!schoolUniqueCodex){
        throw new ApiError(400, "All fields are required ")
    }
    if(schoolUniqueCode!=schoolUniqueCodex){
        throw new ApiError(400, "You are not authorized to edit this update")
    }
    const newUpdate = await Update.findByIdAndUpdate(id,{

        $set :{
            tittle:tittle,
            message:message
        }
        },
        {
            new: true,
        }
        )
    
        return res.status(200)
        .json(
            new ApiResponse(
                200,
                {
                    newUpdate
                },
                " Details updated succesfully"
    
            )
            )
    })
const deleteUpdate = asyncHandler(async(req,res)=>{
    console.log("Got delete request from frontend")
    const {id,schoolUniqueCodex} = req.body
    if(!(id&&schoolUniqueCodex)){
        throw new ApiError(400, "All fields are required ")
    }
    const schoolUniqueCode = req.theAdmin?.schoolUniqueCode
    if(schoolUniqueCode!=schoolUniqueCodex){
        throw new ApiError(400, "You are not authorized to delete this update")
        }
    const noUpdate = await Update.findByIdAndDelete(id)
    console.log(noUpdate)
    
    return res.status(200)
    .json(
        new ApiResponse(
            200,
            {},
            " Details updated succesfully"

        ))
    })
export {
    addUpdate,
    getAllUpdates,
    editUpdate,
    deleteUpdate
}


/*
*/