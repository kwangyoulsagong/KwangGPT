const {Configuration, OpenAIApi} = require('openai');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());
const PORT=process.env.PORT || 3000


const configuration = new Configuration({
    organization: "org-Sj3OdDKiO8FRLsUTE1Dn99r1",
    apiKey: "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",
});

const openai = new OpenAIApi(configuration);

app.post('/message', async (req, res) => {
    const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: req.body.message,
        temperature: 0,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        max_tokens: 256
    });
    console.log(response.data)

    if(response.data){
        if(response.data.choices){
            res.json({
                message: response.data.choices[0].text
            })
        }
    }
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
