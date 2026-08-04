import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      email, 
      firstName, 
      lastName, 
      company, 
      phone, 
      inventoryPackage, 
      requestSamples,
      tags // Additional tags passed from the form
    } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const API_KEY = process.env.MAILCHIMP_API_KEY;
    const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
    const DATACENTER = process.env.MAILCHIMP_API_SERVER;

    // 1. Create MD5 Hash of lowercase email (Required for Mailchimp PUT/Upsert)
    const subscriberHash = crypto
      .createHash('md5')
      .update(email.toLowerCase())
      .digest('hex');

    // 2. Prepare Tags: Default "Enerzix Leads" + any passed in tags
    const defaultTag = "Enerzix Leads";
    let finalTags = [defaultTag];
    
    if (tags && Array.isArray(tags)) {
      finalTags = [...new Set([...finalTags, ...tags])]; // Merges and removes duplicates
    }

    // 3. Prepare Mailchimp URL
    const url = `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members/${subscriberHash}`;

    // 4. Prepare Data Payload
    const data = {
      email_address: email,
      status_if_new: 'subscribed', // If user doesn't exist, sign them up
      merge_fields: {
        FNAME: firstName || "",
        LNAME: lastName || "",
        COMPANY: company || "",
        PHONE: phone || "",
        PACKAGE: inventoryPackage || "",
        SAMPLES: requestSamples ? "YES" : "NO",
      },
      tags: finalTags // This adds the tags to the user profile
    };

    const response = await fetch(url, {
      method: 'PUT', // PUT = Create if missing, Update if exists
      headers: {
        Authorization: `auth ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const resData = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: resData.detail || 'Mailchimp Error' }, 
        { status: response.status }
      );
    }

    return NextResponse.json({ message: 'Success', status: 'upserted' }, { status: 200 });

  } catch (error) {
    console.error("Mailchimp API Error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}