import mjml2html from 'mjml';

import layout from '../base/layout';

const en = ({ name, password }) =>
    mjml2html(
        layout(`
    <mj-text>Hi ${name},your account is created,your password is: ${password}</mj-text>

`)
    );
const fr = ({ name, password }) =>
    mjml2html(
        layout(`<mj-body background-color="#ffffff" font-size="13px"><mj-section background-color="#ffffff"><mj-image src="https://app.pdtakaful.com/images/logos/logo.png" alt="" align="center" border="none" width="300px" padding-left="0px" padding-right="0px" padding-bottom="0px" padding-top="0"></mj-image></mj-section>
    <mj-section background-color="#315FA9" vertical-align="top" padding-bottom="0px" padding-top="0">
      <mj-column vertical-align="top" width="100%">
        <mj-text align="left" color="#ffffff" font-size="45px" font-weight="bold" font-family="open Sans Helvetica, Arial, sans-serif" padding-left="25px" padding-right="25px" padding-bottom="30px" padding-top="50px">Welcome aboard</mj-text>
      </mj-column>
    </mj-section>
    <mj-section background-color="#315FA9" padding-bottom="20px" padding-top="20px">
      <mj-column vertical-align="middle" width="100%">
        <mj-text align="left" color="#ffffff" font-size="22px" font-family="open Sans Helvetica, Arial, sans-serif" padding-left="25px" padding-right="25px"><span style="color:#FEEB35">Dear ${name},</span><br /><br /> Welcome to PayDay for business platform.</mj-text>
        <mj-text align="left" color="#ffffff" font-size="15px" font-family="open Sans Helvetica, Arial, sans-serif" padding-left="25px" padding-right="25px">We&apos;re really excited you&apos;ve decided to join us. In case you have any questions, feel free to reach out to us at support@unetp.com. You can login to your account with your email.</mj-text>
        <mj-text align="left" color="#ffffff" font-size="15px" font-family="open Sans Helvetica, Arial, sans-serif" padding-left="25px" padding-right="25px"> Your one-time temporary password is: <span font-weight="bold">${password}</span> <br/> You will be asked to change your password upon your first successful login.</mj-text>
        <mj-button align="left" font-size="22px" font-weight="bold" background-color="#ffffff" border-radius="10px" color="#1AA0E1" font-family="open Sans Helvetica, Arial, sans-serif">Login</mj-button>
        <mj-text align="left" color="#ffffff" font-size="15px" font-family="open Sans Helvetica, Arial, sans-serif" padding-left="25px" padding-right="25px">Thanks, <br /> The PayDay Team</mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
`)
    );

export default { en, fr };
