// onReadyScript of the example scenario, on an external demo (not the application under test): starts
// the StackBlitz project and fills the registration form with the administrator credentials of the
// repository's .env (see abp.cjs).
const abp = require("../../abp.cjs");

module.exports = async (page) => {
  // StackBlitz shows a button that starts the demo before showing it.
  const run = await page.waitForSelector("button", { timeout: 30000 });
  await run.click();
  await page.waitForSelector('input[formcontrolname="username"]');

  const [firstName, ...lastName] = abp.ABP_ADMIN_NAME.split(" ");
  await page.type('input[formcontrolname="firstName"]', firstName);
  await page.type('input[formcontrolname="lastName"]', lastName.join(" "));
  await page.type('input[formcontrolname="username"]', abp.ABP_ADMIN_EMAIL);
  await page.type('input[formcontrolname="password"]', abp.ABP_ADMIN_PASSWORD);
};
