const express = require("express");
const bodyParser = require("body-parser")
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')


const fetch = require("node-fetch")

// execute the parent operation in Hasura
const execute = async (gqlQuery, variables) => {
  const fetchResponse = await fetch(
    "https://advanced-pony-85.hasura.app/v1/graphql",
    {
      method: 'POST',
      body: JSON.stringify({
        query: gqlQuery,
        variables
      }),
      headers: {
        'x-hasura-admin-secret': 'XemF4fHCMMMqTv7DiEeOr3dWzNyRmZCPRWKTNcB61t8bcz3gzVo7KX2Dsk5lo4EC'
      }
    }
  );
  const data = await fetchResponse.json();
  console.log('DEBUG: ', data);
  return data;
};

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/hello', async (req, res) => {
  return res.json({
    hello: "world"
  });
});



// Request Handler
app.post('/signup', async (req, res) => {

  // get request input
  const { name, email, password } = req.body.input;

  // run some business logic
  const hashedPassword = await bcrypt.hash(password, 10);

  const gqlQuery = `
  mutation ($name: String!, $email: String!, $password: String!) {
    insert_customers_one(object: {name: $name, email: $email, password: $password}) {
      id
    }
  }
  `
  // execute the Hasura operation
  const { data, errors } = await execute(gqlQuery, { name, email, password: hashedPassword });

  // if Hasura operation errors, then throw error
  if (errors) {
    return res.status(400).json(errors[0])
  }

  const tokenContents = {
    sub: data.insert_customers_one.id.toString(),
    name: name,
    iat: Date.now() / 1000,
    iss: 'https://e3b2-103-239-254-45.in.ngrok.io',
    "https://hasura.io/jwt/claims": {
      "x-hasura-allowed-roles": ["user"],
      "x-hasura-user-id": data.insert_customers_one.id.toString(),
      "x-hasura-default-role": "user",
      "x-hasura-role": "user"
    },
    exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60)
  }

  const token = jwt.sign(tokenContents, "7c63969a02d0831902a7afb3a93e87b8");

  // success
  return res.json({
    ...data.insert_customers_one,
    accessToken: token
  })
});





app.post('/signin', async (req, res) => {

  const { email, password } = req.body.input;

  const gqlQuery = `
    query MyQuery($_eq: String = "") {
      customers(where: {email: {_eq: $_eq}}) {
        id
        name
        email
        password
      }
    }
    `
  const { data, errors } = await execute(gqlQuery, { _eq: email });

  if (errors) {
    return res.json({
      message: "Unexpected Errors!",
    })
  }

  if (data.customers.length) {
    // const match = await bcrypt.compare(password, data.customers[0].password);
    const match = true;

    console.log(data.customers)

    if (match) {
      const tokenContents = {
        sub: data.customers[0].id.toString(),
        name: data.customers[0].name,
        iat: Date.now() / 1000,
        "https://hasura.io/jwt/claims": {
          "x-hasura-allowed-roles": ["user"],
          "x-hasura-user-id": data.customers[0].id.toString(),
          "x-hasura-default-role": "user",
          "x-hasura-role": "user"
        },
        exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60)
      }
      const token = jwt.sign(tokenContents, "7c63969a02d0831902a7afb3a93e87b8");
      return res.json({
        message: "Login Successfull!",
        accessToken: token
      })
    } else {
      return res.json({
        message: "Wrong Password!",
      })
    }
  } else {
    return res.json({
      message: "Wrong Email",
    })
  }

});




app.post('/trigger', async (req, res) => {
  console.log(req.body)
  res.json({message: "Send data from server"})
})





app.listen(PORT);
