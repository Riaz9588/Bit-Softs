// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function helloAPI(req, res) {
  // console.log(req.body)
  // console.log(req.body.event.data.new)

  // You can access their arguments input at req.body.input
  const { username, password } = req.body.input

  // perform your custom business logic
  // check if the username and password are valid and login the user
  
  // return the response
  return res.json({
    accessToken: 'Ew8jkGCNDGAo7p35RV72e0Lk3RGJoJKB'
  })
}

