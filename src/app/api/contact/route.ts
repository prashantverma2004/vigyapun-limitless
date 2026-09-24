// Contact form handler: validates a submission and emails it via Resend
// (https://resend.com/docs/api-reference/emails/send-email).
//
// Required env (.env.local):
//   RESEND_API_KEY      – API key from resend.com
// Optional env:
//   CONTACT_TO_EMAIL    – inbox that receives submissions
//   CONTACT_FROM_EMAIL  – sender; must be on a domain verified in Resend

const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "workwithvigyapun@gmail.com";
const FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL || "Vigyapun Website <onboarding@resend.dev>";

const LIMITS = { name: 120, email: 200, company: 160, budget: 80, message: 5000 };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Field = keyof typeof LIMITS;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real visitors never fill this hidden field, bots usually do.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return Response.json({ ok: true });
  }

  const data = {} as Record<Field, string>;
  for (const field of Object.keys(LIMITS) as Field[]) {
    const raw = typeof body[field] === "string" ? (body[field] as string).trim() : "";
    if (raw.length > LIMITS[field]) {
      return Response.json({ error: `The ${field} field is too long.` }, { status: 400 });
    }
    data[field] = raw;
  }

  if (!data.name || !data.email || !data.message) {
    return Response.json(
      { error: "Please fill in your name, email and project details." },
      { status: 400 }
    );
  }
  if (!EMAIL_PATTERN.test(data.email)) {
    return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not set; submission not sent.");
    return Response.json(
      { error: "Our contact form is temporarily unavailable. Please email us directly." },
      { status: 500 }
    );
  }

  const rows: [string, string][] = [
    ["Name", data.name],
    ["Email", data.email],
    ["Company", data.company || "—"],
    ["Monthly budget", data.budget || "—"],
    ["Message", data.message],
  ];

  const text = rows.map(([label, value]) => `${label}: ${value}`).join("\n\n");
  const html = `
    <div style="font-family:Arial,sans-serif;font-size:15px;color:#111;line-height:1.5">
      <h2 style="margin:0 0 16px">New enquiry from the Vigyapun website</h2>
      <table cellpadding="8" style="border-collapse:collapse">
        ${rows
          .map(
            ([label, value]) => `
          <tr>
            <td style="vertical-align:top;font-weight:bold;white-space:nowrap">${label}</td>
            <td style="white-space:pre-wrap">${escapeHtml(value)}</td>
          </tr>`
          )
          .join("")}
      </table>
    </div>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        reply_to: data.email,
        subject: `New enquiry from ${data.name}${data.company ? ` (${data.company})` : ""}`,
        text,
        html,
      }),
    });

    if (!res.ok) {
      console.error("[contact] Resend error", res.status, await res.text());
      return Response.json(
        { error: "We couldn't send your message right now. Please try again or email us directly." },
        { status: 502 }
      );
    }
  } catch (error) {
    console.error("[contact] Failed to reach Resend", error);
    return Response.json(
      { error: "We couldn't send your message right now. Please try again or email us directly." },
      { status: 502 }
    );
  }

  return Response.json({ ok: true });
}
