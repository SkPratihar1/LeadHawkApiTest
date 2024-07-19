import axios from 'axios';
import util from 'util'


// export function handleApiError(error:any) {
//     if (axios.isAxiosError(error)) {
//         console.log("String pratihar")
//         console.error(util.inspect(error.toJSON(), { depth: null, colors: true }));
//         // Or log the specific parts of the error you are interested in
//         // console.log(util.inspect(error.response?.data, { depth: null, colors: true }));
//     } else {
//         console.log("String itobuz")
//         console.error('Error message:', (error instanceof Error) ? error.message : error);
//     }
// }

export function handleApiError(error: any) {
    if (axios.isAxiosError(error)) {
        console.log("String pratihar");
        const errorDetails = {
            message: error.message,
            name: error.name,
            stack: error.stack,
            config: error.config,
            response: error.response && {
                data: error.response.data,
                status: error.response.status,
                headers: error.response.headers,
            },
        };
        console.error(util.inspect(errorDetails, { depth: null, colors: true }));
    } else {
        console.log("String itobuz");
        console.error('Error message:', (error instanceof Error) ? error.message : error);
    }
}