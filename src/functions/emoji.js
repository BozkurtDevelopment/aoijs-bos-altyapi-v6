module.exports = (client) => {
    client.functionManager.createFunction({
      name: "$emoji",
      type: "djs",
      code: async (d) => {
        const data = d.util.aoiFunc(d);
        const [emoji] = data.inside.splits;
        const emojis = require('../lists/emojis.json')
  
        data.result = emojis[emoji].addBrackets();
        if (emoji in emojis) {
          return { code: d.util.setCode(data, false) };
        }
        else {
          return d.aoiError.fnError(d, "custom", {}, "Missing Inside")
        }
      }
    })
  };