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
```

### Accounts
#### List accounts
```bash
python run.py accounts/list --client={browser, node, python}
```
which outputs:
```json
[
  {
    "id": "0x64137aF0104d2c96C44bb04AC06f09eC84CC5Ae4"
  }
]
```

### Secret Store
#### Encrypt documents
```bash
python run.py secretstore/encrypt -c {browser, node, python} -i "much secret wow"
```
which outputs:
```json
{
  "docId": "ded230e093653ae9c27bebe958fdb205a0e053cba8efa9a1c43bbbb5ef81f0d9",
  "encryptedDocument": "0x6653cf03fb81016ad86580c2db3645c6271b6f131c0cc862d5a129e48c861fbd7de40cceb5"
}
```

#### Decrypt documents
```bash
python run.py secretstore/decrypt -c {browser, node, python} -i '{
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