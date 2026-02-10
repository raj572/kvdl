<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Form Submission</title>
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
        }
        .email-body h2 {
            color: #000000;
            font-size: 24px;
            margin-bottom: 20px;
        }
        .info-row {
            display: flex;
            margin-bottom: 15px;
            padding: 12px;
            background-color: #f8f0dd;
            border-radius: 8px;
        }
        .info-label {
            font-weight: bold;
            color: #000000;
            min-width: 140px;
            text-transform: uppercase;
            font-size: 12px;
            letter-spacing: 1px;
        }
        .info-value {
            color: #333333;
            font-size: 14px;
            flex: 1;
        }
        .message-box {
            background-color: #ffffff;
            border: 2px solid #d4a574;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
            line-height: 1.6;
        }
        .message-label {
            font-weight: bold;
            color: #000000;
            text-transform: uppercase;
            font-size: 12px;
            letter-spacing: 1px;
            margin-bottom: 10px;
        }
        .email-footer {
            background-color: #f8f0dd;
            padding: 20px 30px;
            text-align: center;
            font-size: 14px;
            color: #666666;
        }
        .badge {
            display: inline-block;
            background-color: #d4a574;
            color: #000000;
            padding: 5px 12px;
            border-radius: 12px;
            font-size: 11px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <h1>KVDL</h1>
            <p style="margin: 10px 0 0 0; font-size: 14px; opacity: 0.8;">Contact Form Submission</p>
        </div>
        
        <div class="email-body">
            <h2>📩 New Contact Form Submission</h2>
            
            <p style="margin-bottom: 25px;">You have received a new inquiry through your website contact form.</p>
            
            <div class="info-row">
                <div class="info-label">Name:</div>
                <div class="info-value">{{ $contactData['name'] }}</div>
            </div>
            
            <div class="info-row">
                <div class="info-label">Email:</div>
                <div class="info-value">
                    <a href="mailto:{{ $contactData['email'] }}" style="color: #0066cc; text-decoration: none;">
                        {{ $contactData['email'] }}
                    </a>
                </div>
            </div>
            
            <div class="info-row">
                <div class="info-label">Phone:</div>
                <div class="info-value">
                    <a href="tel:{{ $contactData['phone'] }}" style="color: #0066cc; text-decoration: none;">
                        {{ $contactData['phone'] }}
                    </a>
                </div>
            </div>
            
            <div class="info-row">
                <div class="info-label">Subject:</div>
                <div class="info-value">{{ $contactData['subject'] }}</div>
            </div>
            
            @if(!empty($contactData['property_type']))
            <div class="info-row">
                <div class="info-label">Property Type:</div>
                <div class="info-value">
                    <span class="badge">{{ $contactData['property_type'] }}</span>
                </div>
            </div>
            @endif
            
            <div class="info-row">
                <div class="info-label">Submitted:</div>
                <div class="info-value">{{ $contactData['submitted_at'] }}</div>
            </div>
            
            <div class="message-box">
                <div class="message-label">Message:</div>
                <div style="white-space: pre-wrap; color: #333333; font-size: 14px;">{{ $contactData['message'] }}</div>
            </div>
            
            <p style="margin-top: 30px; padding: 15px; background-color: #fff9e6; border-left: 4px solid #d4a574; font-size: 14px;">
                <strong>💡 Quick Action:</strong> You can reply directly to this email to respond to {{ $contactData['name'] }}.
            </p>
        </div>
        
        <div class="email-footer">
            <p>© {{ date('Y') }} KVDL. All rights reserved.</p>
            <p>This email was sent from your website contact form.</p>
        </div>
    </div>
</body>
</html>
