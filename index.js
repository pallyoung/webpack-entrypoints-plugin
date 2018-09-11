const name = 'WebpackEntrypointsPlugin'
const fs = require('fs');
class WebpackEntrypointsPlugin {
  constructor(options) {
    this.path = options.path;
  }
  apply(compiler) {
    compiler.hooks.done.tap(name, (stats) => {
      const chunkOnlyConfig = {
        assets: false,
        cached: false,
        children: true,
        chunks: true,
        chunkModules: false,
        chunkOrigins: false,
        errorDetails: false,
        hash: false,
        modules: false,
        reasons: false,
        source: false,
        timings: false,
        version: false
      };
      const entrypoints = stats.toJson(chunkOnlyConfig).entrypoints;
      const path = this.path;
      let data = {};

      if (fs.existsSync(path)) {
        data = JSON.parse(fs.readFileSync(path).toString());

      }
      for (let en in entrypoints) {
        data[en] = {
          chunks: entrypoints[en].chunks,
          assets: entrypoints[en].assets,
        }
      }
      fs.writeFileSync(path, JSON.stringify(data, null, '\t'));
    })
  }
}

module.exports = WebpackEntrypointsPlugin;