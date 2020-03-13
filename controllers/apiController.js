const axios = require("axios");
const { Agent } = require("https");
const httpsAgent = new Agent({
  rejectUnauthorized: false
})

const inst = axios.create({
  baseURL: 'https://hw.shri.yandex/api',
  timeout: 1000,
  headers: { 'Authorization': `Bearer ${process.env.TOKEN}` },
  httpsAgent
});

module.exports.getSetting = async (req, res) => {
  const result = await inst.get("/conf");

  res.status(200).json({
    status: result.status,
    statusText: result.statusText,
    data: result.data.data
  });
};

module.exports.getBuilds = async (req, res) => {
  const { query } = req;
  const offset = query.offset || 0;
  const limit = query.limit || 25;
  try {
    const buildList = await inst.get(`/build/list?offset=${offset}&limit=${limit}`);

    res.status(200).json({
      data: buildList.data.data
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      data: "Error",
      error
    })
  }
}

module.exports.getBuildId = (req, res) => {
  res.send(`${req.params.buildId}`);
};

module.exports.getLogs = (req, res) => {
  res.send(`${req.url}`);
};

module.exports.postSetting = async (req, res) => {
  try {
    const setConf = await inst.post("/conf",
      {
        repoName: req.body.repoName,
        buildCommand: req.body.buildCommand,
        mainBranch: req.body.mainBranch,
        period: req.body.period
      });

    console.log("POST", setConf.config.baseURL + setConf.config.url, setConf.status, setConf.statusText, setConf.data);

    return res.status(200).json({
      data: "Success"
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      data: "Error",
      error
    });
  }
}

module.exports.postCommitHash = async (req, res) => {
  try {
    await inst.post("/build/request",
      {
        commitMessage: req.body.commitMessage,
        commitHash: req.params.commitHash,
        branchName: req.body.branchName,
        authorName: req.body.authorName
      });

    return res.status(200).json({
      data: "Success"
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      data: "Error",
      error
    });
  }
}