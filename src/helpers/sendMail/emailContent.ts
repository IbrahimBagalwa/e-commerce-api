export interface GenerateVerify {
  username: string;
  email: string;
  verificationToken: string;
  originUrl: string;
}
const generateVerifyEmailHTML = ({
  username,
  email,
  originUrl,
  verificationToken,
}: GenerateVerify) =>
  `
<div style="width: 70%; margin: 0 auto; font-family: sans-serif;">
  <nav style="background-color: #c4c4c4; padding: 0.1rem;">
    <h1 style="text-align: center;">Reaction Road API needs you to verify your email address</h1>
  </nav>

  <div style="padding: 2rem;">
    <h2>Hi ${username}!</h2>

    
  <p>You recently registered on Reaction Road, we sent you this email in order to verify if the email you provided us is viable,
      for the sake of security and better services you receive from Reaction Road!</p>

  <p>Kindly click the link below, so that we will know that this email belongs to you. Keep in mind that you need to always remember your email
    and password you used and don’t share it with anyone else!</p>

    <p>If you didn’t register on Reaction Road system recently,
    we are sorry for that inconvenience, ignore this email!</p>

    <div>
      <p>Yours truly,</p>
      <p>Reaction Road</p>
    </div>
  </div>
  <footer style="background-color: #c4c4c4; padding: 0.1rem">
    <p style="text-align: center; font-size: 0.8rem;">© 2023 click here <a href="${originUrl}/user/verify-emailtoken=${verificationToken}&email=${email}">Reaction Road</a>. All rights reserved.</p>
  </footer>
</div>
  `;
export default generateVerifyEmailHTML;
