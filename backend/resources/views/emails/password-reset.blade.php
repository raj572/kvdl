<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f8f0dd;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .email-header {
            background-color: #000000;
            color: #f8f0dd;
            padding: 30px;
            text-align: center;
        }
        .email-header h1 {
            margin: 0;
            font-size: 32px;
            font-weight: bold;
            letter-spacing: 2px;
        }
        .email-body {
            padding: 40px 30px;
            color: #333333;
            line-height: 1.6;
        }
        .email-body h2 {
            color: #000000;
            font-size: 24px;
            margin-bottom: 20px;
        }
        .email-body p {
            margin-bottom: 15px;
            font-size: 16px;
        }
        .reset-button {
            display: inline-block;
            background-color: #d4a574;
            color: #000000;
            text-decoration: none;
            padding: 15px 40px;
            border-radius: 8px;
            font-weight: bold;
            font-size: 16px;
            margin: 20px 0;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .reset-button:hover {
            background-color: #c49563;
        }
        .email-footer {
            background-color: #f8f0dd;
            padding: 20px 30px;
            text-align: center;
            font-size: 14px;
            color: #666666;
        }
        .divider {
            border-top: 1px solid #e0e0e0;
            margin: 30px 0;
        }
        .note {
            background-color: #fff9e6;
            border-left: 4px solid #d4a574;
            padding: 15px;
            margin: 20px 0;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <h1>KVDL</h1>
        </div>
        
        <div class="email-body">
            <h2>Reset Your Password</h2>
            
            <p>Hello {{ $userName }},</p>
            
            <p>We received a request to reset your password for your KVDL account. Click the button below to create a new password:</p>
            
            <div style="text-align: center;">
                <a href="{{ $resetUrl }}" class="reset-button">Reset Password</a>
            </div>
            
            <div class="note">
                <strong>⏰ This link will expire in 60 minutes</strong> for security reasons.
            </div>
            
            <div class="divider"></div>
            
            <p style="font-size: 14px; color: #666;">If the button doesn't work, copy and paste this link into your browser:</p>
            <p style="font-size: 13px; color: #0066cc; word-break: break-all;">{{ $resetUrl }}</p>
            
            <div class="divider"></div>
            
            <p style="font-size: 14px; color: #666;">
                <strong>Didn't request this?</strong><br>
                If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.
            </p>
        </div>
        
        <div class="email-footer">
            <p>© {{ date('Y') }} KVDL. All rights reserved.</p>
            <p>This is an automated email, please do not reply.</p>
        </div>
    </div>
</body>
</html>
