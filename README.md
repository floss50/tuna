[![banner](https://raw.githubusercontent.com/oceanprotocol/art/master/github/repo-banner%402x.png)](https://oceanprotocol.com)

# tuna

> JavaScript samples of the 🦑 client library for Ocean Protocol
> [oceanprotocol.com](https://oceanprotocol.com)

---

**🐲🦑 THERE BE DRAGONS AND SQUIDS. This is in alpha state and you can expect running into problems. If you run into them, please open up [a new issue](https://github.com/oceanprotocol/tuna/issues). 🦑🐲**

---

## Table of Contents

  - [Get started](#get-started)
  - [License](#license)

---

## Get started

```bash
virtualenv venv -p python3
source venv/bin/activate
python pip install -r requirements.txt
npm i
export CONFIG_FILE=<your_config_file.ini>
```

> (*) means there's a bug 
### Accounts
#### List
```bash
> ./tuna.py accounts/list --client={node, python}
```
which outputs:
```json
[
  {
    "id": "0x64137aF0104d2c96C44bb04AC06f09eC84CC5Ae4"
  }
]
```
#### Balance
```bash
> ./tuna.py accounts/balance -c {node, python}
```
which outputs:
```json
{
  "eth": 1000000000,
  "ocn": 400
}
```

### Tokens
#### Request
```bash
> ./tuna.py tokens/request -c {node, python} -i 42 
```
which outputs:
```json
"42 tokens received"
```

### Assets
#### Register
```bash
> ./tuna.py assets/register -c {browser, node, python} -f testdata/metadata-example-weather.json 
```
which outputs:
```json
 did:op:0bd1318b7a324557ae311d40dad8cc890f4547dd125e413d8bbd42fc74ca8caf
```
#### Resolve
```bash
> ./tuna.py assets/resolve -c {node, python*} -i did:op:0bd1318b7a324557ae311d40dad8cc890f4547dd125e413d8bbd42fc74ca8caf 
```
which outputs:
```json
 {                                                                                                                                                                                                                                                                                                                       
  "@context": "https://w3id.org/future-method/v1",                                                                                                                                                                                                                                                                      
  "authentication": [...],
  "id": "did:op:0bd1318b7a324557ae311d40dad8cc890f4547dd125e413d8bbd42fc74ca8caf",
  "publicKey": [...],
  "service": [...]
 }
```

#### Search
```bash
> ./tuna.py assets/search -c {node, python} -i weather 
```
which outputs:
```json
[  
    "did:op:0bd1318b7a324557ae311d40dad8cc890f4547dd125e413d8bbd42fc74ca8caf",
    ...
]
```

### Service Execution Agreements
#### Create
```bash
> ./tuna.py sea/create -c {python} -i did:op:0bd1318b7a324557ae311d40dad8cc890f4547dd125e413d8bbd42fc74ca8caf 
```
which outputs:
```json
{
  "did": "did:op:0bd1318b7a324557ae311d40dad8cc890f4547dd125e413d8bbd42fc74ca8caf",
  "serviceAgreementId": "0x27ba400f6c7a4f798d575d6019c76b1ed8953148a2d24feb949a1b6f538f13a9",
  "serviceDefinitionId": "1"
}
```
#### Hash
```bash
> ./tuna.py sea/hash -c {node, python} -i '{
  "did": "did:op:0bd1318b7a324557ae311d40dad8cc890f4547dd125e413d8bbd42fc74ca8caf",
  "serviceAgreementId": "0xc8e5b66e157f4afe89b9c8673b01be034321fb8660a94bada3f13a606efffb72",
  "serviceDefinitionId": "1"
}' 
```
which outputs:
```json
{
  "did": "did:op:0bd1318b7a324557ae311d40dad8cc890f4547dd125e413d8bbd42fc74ca8caf",
  "serviceAgreementHash": "0x46db8fc90fd0cc2b9bd958cb6caf00b922952ead5a61acfe996238c882359aaa",
  "serviceAgreementId": "0xc8e5b66e157f4afe89b9c8673b01be034321fb8660a94bada3f13a606efffb72",
  "serviceDefinitionId": "1"
}
```
#### Sign
```bash
> ./tuna.py sea/sign -c {node, python} -i '{
  "did": "did:op:0bd1318b7a324557ae311d40dad8cc890f4547dd125e413d8bbd42fc74ca8caf",
  "serviceAgreementHash": "0x46db8fc90fd0cc2b9bd958cb6caf00b922952ead5a61acfe996238c882359aaa",
  "serviceAgreementId": "0xc8e5b66e157f4afe89b9c8673b01be034321fb8660a94bada3f13a606efffb72",
  "serviceDefinitionId": "1"
}' 
```
which outputs:
```json
{
  "consumerAddress": "0x00Bd138aBD70e2F00903268F3Db08f2D25677C9e",
  "did": "did:op:0bd1318b7a324557ae311d40dad8cc890f4547dd125e413d8bbd42fc74ca8caf",
  "serviceAgreementHash": "0x46db8fc90fd0cc2b9bd958cb6caf00b922952ead5a61acfe996238c882359aaa",
  "serviceAgreementId": "0xc8e5b66e157f4afe89b9c8673b01be034321fb8660a94bada3f13a606efffb72",
  "serviceAgreementSignature": "0x9f88c3e4c69bcc4d7136415a1793da49c6e1432745f32bea4b5e4a1f231a2e5d5de162b2d103ea95394a0c867ef5545e54b12468a8700ee0a8f780c0593820191b",
  "serviceDefinitionId": "1"
}
```
#### Verify
```bash
> ./tuna.py sea/verify -c {python} -i '{
  "consumerAddress": "0x00Bd138aBD70e2F00903268F3Db08f2D25677C9e",
  "did": "did:op:0bd1318b7a324557ae311d40dad8cc890f4547dd125e413d8bbd42fc74ca8caf",
  "serviceAgreementHash": "0x46db8fc90fd0cc2b9bd958cb6caf00b922952ead5a61acfe996238c882359aaa",
  "serviceAgreementId": "0xc8e5b66e157f4afe89b9c8673b01be034321fb8660a94bada3f13a606efffb72",
  "serviceAgreementSignature": "0x9f88c3e4c69bcc4d7136415a1793da49c6e1432745f32bea4b5e4a1f231a2e5d5de162b2d103ea95394a0c867ef5545e54b12468a8700ee0a8f780c0593820191b",
  "serviceDefinitionId": "1"
}' 
```
which outputs:
```json
{
  "valid": true
}
```
#### Execute
```bash
> ./tuna.py sea/execute -c {node*, python} -i '{
  "consumerAddress": "0x00Bd138aBD70e2F00903268F3Db08f2D25677C9e",
  "did": "did:op:0bd1318b7a324557ae311d40dad8cc890f4547dd125e413d8bbd42fc74ca8caf",
  "serviceAgreementHash": "0x46db8fc90fd0cc2b9bd958cb6caf00b922952ead5a61acfe996238c882359aaa",
  "serviceAgreementId": "0xc8e5b66e157f4afe89b9c8673b01be034321fb8660a94bada3f13a606efffb72",
  "serviceAgreementSignature": "0x9f88c3e4c69bcc4d7136415a1793da49c6e1432745f32bea4b5e4a1f231a2e5d5de162b2d103ea95394a0c867ef5545e54b12468a8700ee0a8f780c0593820191b",
  "serviceDefinitionId": "1"
}' 
```
which outputs:
```json
{
  "blockHash": "0xfc1a02350f7822b56ec499843317d3192d35767f236ac438a7f26376bd525244",
  "receiptStatus": 1,
  "transactionHash": "0x3d50131b165e2ef2f48e748ccde81e7122e910dd1bcf1a956c22f9a99503276f"
}
```
#### Send
```bash
> ./tuna.py sea/send -c {node*, python} -i '{
  "consumerAddress": "0x00Bd138aBD70e2F00903268F3Db08f2D25677C9e",
  "did": "did:op:0bd1318b7a324557ae311d40dad8cc890f4547dd125e413d8bbd42fc74ca8caf",
  "serviceAgreementHash": "0x46db8fc90fd0cc2b9bd958cb6caf00b922952ead5a61acfe996238c882359aaa",
  "serviceAgreementId": "0xc8e5b66e157f4afe89b9c8673b01be034321fb8660a94bada3f13a606efffb72",
  "serviceAgreementSignature": "0x9f88c3e4c69bcc4d7136415a1793da49c6e1432745f32bea4b5e4a1f231a2e5d5de162b2d103ea95394a0c867ef5545e54b12468a8700ee0a8f780c0593820191b",
  "serviceDefinitionId": "1"
}' 
```
which outputs:
```json
{
  "response": 201
}
```

### SEA Templates
#### Create
```bash
> ./tuna.py template/register-c {node}
```
which outputs:
```json
{
  "receiptStatus": "1",
  "templateId": "0x27ba400f6c7a4f798d575d6019c76b1ed8953148a2d24feb949a1b6f538f13a9"
}
```

### SecretStore
#### Encrypt
```bash
> ./tuna.py secretstore/encrypt -c {node, python} -i "much secret wow"
```
which outputs:
```json
{
  "docId": "ded230e093653ae9c27bebe958fdb205a0e053cba8efa9a1c43bbbb5ef81f0d9",
  "encryptedDocument": "0x6653cf03fb81016ad86580c2db3645c6271b6f131c0cc862d5a129e48c861fbd7de40cceb5"
}
```

#### Decrypt
```bash
> ./tuna.py secretstore/decrypt -c {node, python} -i '{
  "docId": "ded230e093653ae9c27bebe958fdb205a0e053cba8efa9a1c43bbbb5ef81f0d9",
  "encryptedDocument": "0x6653cf03fb81016ad86580c2db3645c6271b6f131c0cc862d5a129e48c861fbd7de40cceb5"
}'
```
which outputs:
```json
"much secret wow"
```

## License

```
Copyright 2018 Ocean Protocol Foundation Ltd.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```
