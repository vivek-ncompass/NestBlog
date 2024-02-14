export class ApiResponse{
  constructor(response, code? : number, data? : {}){
    const ans = {
      statusCode: code || 200,
      data: data || {message: "Something went wrong"},
    }
    response.status(code).send(ans)
  }
}