module.exports = function(source) {
    const reg = /\sreturn\s{1,}import\('([a-z0-9\.]{1,}\.js')/ig;
    const regValue = /\('([a-z0-9\.]{1,}\.js')/i
    const regMatchs = source.match(reg);
    if(/\.contribution\.js$/.test(this.resourcePath)) {
        if(reg.test(source)) {
            source = source.replace(reg, " return require(");
            console.log("[Log] transform es7: ", regMatchs[0], regMatchs[0].match(regValue));
        }
    }
    return `export default ${JSON.stringify(source)}`;
}