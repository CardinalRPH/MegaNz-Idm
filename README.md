
# Mega.nz download with IDM

This application bypasses the Mega.nz downloader using localhost download by streaming files from the Mega.nz cloud and converting them to local.


## Run Locally

Clone the project

Required Node JS v20+

```bash
  git clone https://github.com/CardinalRPH/MegaNz-Idm.git
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

### Start with the Server Version

```bash
  npm run start
```
### Start with the Simple Version

```bash
  node ./simpleVer.js
```




## API Reference

#### Fetch Data From Mega.nz cloud

```http
  GET /api/link
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `link` | `string` | **Required**. Your Mega.nz Link |

=> Result = Json Contained 

File Size,

File Name, 

Link To Download File

#### Get item

```http
  GET /api/download/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | Id of link to fetch (Generated Auto) |


## API Used

[MEGAJS](https://mega.js.org/)

[ExpressJS](https://expressjs.com/)
