module.exports = (client) => {
    client.functionManager.createFunction({
        name: "$sayHello",
        type: "djs",
        code: async (d) => {
            const data = d.util.aoiFunc(d);
            const [user = "$memberDisplayName"] = data.inside.splits;
            
            data.result = `Hello, ${user}!`

            return {
                code: d.util.setCode(data)
            }
        }
    })
}