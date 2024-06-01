import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const healthCheck = asyncHandler(async (req, res) => {
    console.log("Server is working, connected");
    return res.status(200).json(
        new ApiResponse(200, {}, "server is connected and running sucessfully")
    );
})

export {healthCheck} ;