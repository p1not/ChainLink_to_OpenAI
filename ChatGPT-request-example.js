//RAC-20230412
//github project https://github.com/smartcontractkit/functions-hardhat-starter-kit
//Final Smart Contract deployed in Sepolia: 0x496C97643dc24e580F50ab9411F056168C15E0E2
//https://sepolia.etherscan.io/address/0x496C97643dc24e580F50ab9411F056168C15E0E2

/* #Commands
- Test an end-to-end request and fulfillment locally by simulating it using:
npx hardhat functions-simulate
- Deploy and verify the client contract to an actual blockchain network by running:
npx hardhat functions-deploy-client --network network_name_here --verify true
- Create, fund & authorize a new Functions billing subscription by running:
npx hardhat functions-sub-create --network network_name_here --amount LINK_funding_amount_here --contract 0xDeployed_client_contract_address_here
- Make an on-chain request by running:
npx hardhat functions-request --network network_name_here --contract 0xDeployed_client_contract_address_here --subid subscription_id_number_here
*/

const prompt = args[0]

if (!secrets.openaiKey) {
  throw Error("Need to set OPENAI_KEY environment variable")
}

//Request to OpenAI API using functions
const openaAIRequest = Functions.makeHttpRequest({
  url: "https://api.openai.com/v1/completions",
  method: "POST",
  headers: {
    Authorization: `Bearer ${secrets.openaiKey}`,
  },
  data: {
    model: "text-davinci-003",
    prompt: prompt,
    temperature: 1,
    max_tokens: 7,
  },
})

//Wait for the request complete
const openAIResponse = await openaAIRequest

console.log("raw response", openAIResponse)
console.log("raw response data", openAIResponse.data.choices[0])

//Parse the response and return the result
let result = openAIResponse.data.choices[0].text.replace(/\n/g, "").replace(/\./g, "").trim()
console.log("name", result)

//Encode the result as strings
return Functions.encodeString(result)
