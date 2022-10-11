const date = new Date();

exports.getDay = () => date.getDate();
exports.getYear = () => date.getFullYear();
exports.getMonth = () => date.getMonth();
exports.getHours = () => date.getHours();
exports.getMinutes = () => date.getMinutes();
exports.getSeconds = () => date.getSeconds();

exports.getFullDate = () => `${this.getMonth()}/${this.getDay()}/${this.getYear()}  ${this.getHours()}:${this.getMinutes()}:${this.getSeconds()}`;