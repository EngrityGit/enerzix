import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, company, email, phone, address } = body;

    const data = await resend.emails.send({
      from: 'Wholesale Form <info@engrity.com>', // After domain verification, use your own email
      to: ['prathik.jeyakumar@engrity.com'], // YOUR EMAIL ADDRESS HERE
      subject: `New Wholesale Quote Request: ${company}`,
      html: `
        <h1>New Wholesale Lead</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Address:</strong> ${address}</p>
      `,
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}