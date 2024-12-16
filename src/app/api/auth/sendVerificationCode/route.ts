import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    console.log('Received request at /api/auth/sendVerificationCode');

    const body = await req.json();
    const { email } = body;
    console.log('Received email:', email);

    // Validate email
    if (!email) {
      console.log('Error: Email is missing');
      return new Response(
        JSON.stringify({ error: 'Email is required' }),
        { status: 400 },
      );
    }

    // Generate a 6-digit random verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000);
    console.log('Generated verification code:', verificationCode);

    // Create the Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Use your email provider here
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Define the HTML email message options
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender email
      to: email, // Receiver email
      subject: 'Your Verification Code', // Subject of the email
      html: `
        <html>
          <body style="font-family: Arial, sans-serif; padding: 20px;">
            <h2 style="color: #2C3E50;">Your Verification Code</h2>
            <p style="font-size: 18px;">Please use the following code to verify your email:</p>
            <div style="font-size: 36px; font-weight: bold; color: #E74C3C; text-align: center;">
              ${verificationCode}
            </div>
            <p style="font-size: 16px; color: #7F8C8D;">If you did not request this, please ignore this email.</p>
          </body>
        </html>`, // HTML content for the email
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ', info.response); // Log the response from Nodemailer

    // Store the verification code temporarily (for demo purposes)
    // In production, you would store this in a database or session
    return new Response(
      JSON.stringify({ message: 'Verification email sent successfully!', code: verificationCode }),
      { status: 200 },
    );
  } catch (error) {
    console.error('Error in POST request:', error);
    return new Response(
      JSON.stringify({ error: 'Error processing the request.' }),
      { status: 500 },
    );
  }
}
