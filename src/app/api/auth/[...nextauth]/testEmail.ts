// test-send-email.ts
import sendVerificationEmail from '@/lib/emailService';

const testEmail = 'jws8@hawaii.edu';
const verificationCode = '123456';

async function testSendVerificationEmail() {
  try {
    // Try sending the email
    await sendVerificationEmail(testEmail, Number(verificationCode));
    console.log('Test email sent successfully to', testEmail);
  } catch (error) {
    console.error('Error sending test email:', error);
  }
}

testSendVerificationEmail();
