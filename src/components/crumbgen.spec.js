/*
Examples:
crumbs / /
crumbs / /editapi/aprendere
crumbs / /editapi/aprendere/editentry/0
*/

const PUBLIC_URL = '/';
const testCase = [
"/",
"/editapi/aprendere",
"/editapi/aprendere/editentry/0"
];

const {getBreadCrumbTo } = require('./crumbgen');

testCase.map(x=>getBreadCrumbTo(x)).map(console.log)
getBreadCrumbTo("/editapi/aprendere/editentry/0").map(console.log)

getBreadCrumbTo("/editapi/aprendere/editentry/0", '/apimanager/').map(console.log)
