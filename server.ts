import express from 'express';
import cors from 'cors';
import { PrismaClient, Prisma } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const prisma = new PrismaClient().$extends(withAccelerate());
const PORT = process.env.PORT || 3001;

const ADMIN_EXPORT_USER = process.env.ADMIN_EXPORT_USER;
const ADMIN_EXPORT_PASSWORD = process.env.ADMIN_EXPORT_PASSWORD;

app.use(cors());
app.use(express.json());

// Validate email domain (supports subdomains like @student.ciputra.ac.id)
function isValidCiputraEmail(email: string): boolean {
  return email.endsWith('ciputra.ac.id');
}

function escapeCsvValue(value: unknown): string {
  if (value === null || value === undefined) return '';
  const stringValue = String(value);
  if (/[,"\n\r]/.test(stringValue)) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }
  return stringValue;
}

function isAuthorizedAdminRequest(authHeader?: string): boolean {
  if (!ADMIN_EXPORT_USER || !ADMIN_EXPORT_PASSWORD) return false;
  if (!authHeader?.startsWith('Basic ')) return false;

  try {
    const base64Credentials = authHeader.slice('Basic '.length).trim();
    const decoded = Buffer.from(base64Credentials, 'base64').toString('utf8');
    const separatorIndex = decoded.indexOf(':');
    if (separatorIndex === -1) return false;

    const username = decoded.slice(0, separatorIndex);
    const password = decoded.slice(separatorIndex + 1);

    return username === ADMIN_EXPORT_USER && password === ADMIN_EXPORT_PASSWORD;
  } catch {
    return false;
  }
}

async function addEventToCalendar(token: string): Promise<boolean> {
  try {
    const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        summary: 'UCAN Awarding Night 2026',
        location: 'Dian Auditorium, Floor 7, UC Main Building, Universitas Ciputra, Surabaya',
        description: 'Congratulations! You have successfully RSVP\'d for the UCAN 2026 Awarding Night.\n\nA magical evening awaits you at the ballroom. Let the magic begin!',
        start: {
          dateTime: '2026-05-29T16:30:00+07:00',
          timeZone: 'Asia/Jakarta'
        },
        end: {
          dateTime: '2026-05-29T22:00:00+07:00',
          timeZone: 'Asia/Jakarta'
        },
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'popup', minutes: 30 },
            { method: 'email', minutes: 1440 }
          ]
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.warn('Google Calendar API returned error:', errorData);
      return false;
    }

    return true;
  } catch (err) {
    console.error('Error adding to Google Calendar:', err);
    return false;
  }
}

// Endpoint to handle RSVP submission
app.post('/api/rsvp', async (req, res) => {
  try {
    const { name, nim, major, organization, email, accessToken } = req.body;

    if (!name || !nim || !major || !organization || !email) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Validate email domain
    if (!isValidCiputraEmail(email)) {
      return res.status(403).json({ error: 'Only @ciputra.ac.id email addresses are allowed' });
    }

    // Check if user already RSVP'd (by NIM or Email)
    const existing = await prisma.rsvp.findFirst({
      where: {
        OR: [
          { nim },
          { email }
        ]
      }
    });

    if (existing) {
      const field = existing.nim === nim ? 'Student ID (NIM)' : 'Email';
      return res.status(409).json({ error: `${field} has already registered for RSVP` });
    }

    const rsvp = await prisma.rsvp.create({
      data: {
        name,
        nim,
        email,
        major,
        organization
      }
    });

    let calendarAdded = false;
    if (accessToken) {
      calendarAdded = await addEventToCalendar(accessToken);
    }

    return res.status(201).json({ success: true, rsvp, calendarAdded });
  } catch (error: any) {
    // Enhanced logging to surface Prisma errors in production logs
    console.error('Error saving RSVP:', {
      message: error?.message,
      code: error?.code,
      meta: error?.meta,
      stack: error?.stack,
    });

    // If it's a known Prisma unique constraint error, return 409
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      return res.status(409).json({ error: 'Student ID (NIM) has already registered for RSVP' });
    }

    return res.status(500).json({ error: 'Internal server error while saving RSVP' });
  }
});

// Endpoint to handle Google Calendar event retry
app.post('/api/rsvp/calendar', async (req, res) => {
  try {
    const { accessToken } = req.body;
    if (!accessToken) {
      return res.status(400).json({ error: 'Access token is required' });
    }

    const success = await addEventToCalendar(accessToken);
    if (success) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(500).json({ error: 'Failed to add event to Google Calendar' });
    }
  } catch (err: any) {
    console.error('Error in calendar retry endpoint:', err);
    return res.status(500).json({ error: 'Internal server error during calendar update' });
  }
});




// Protected endpoint for CSV export (Basic Auth)
app.get('/api/admin/rsvp/export.csv', async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!isAuthorizedAdminRequest(authHeader)) {
    res.setHeader('WWW-Authenticate', 'Basic realm="RSVP Export"');
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const rsvps = await prisma.rsvp.findMany({
      orderBy: { createdAt: 'desc' }
    });

    const header = ['id', 'name', 'nim', 'major', 'organization', 'createdAt'];
    const rows = rsvps.map((rsvp) => [
      escapeCsvValue(rsvp.id),
      escapeCsvValue(rsvp.name),
      escapeCsvValue(rsvp.nim),
      escapeCsvValue(rsvp.major),
      escapeCsvValue(rsvp.organization),
      escapeCsvValue(rsvp.createdAt.toISOString())
    ].join(','));

    const csv = [header.join(','), ...rows].join('\n');

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="rsvp-export.csv"');
    return res.status(200).send(csv);
  } catch (error) {
    console.error('Error exporting RSVPs as CSV:', error);
    return res.status(500).json({ error: 'Internal server error while exporting RSVP data' });
  }
});

if (!process.env.VERCEL) {
  app.listen(Number(PORT), '127.0.0.1', () => {
    console.log(`Backend API Server running on http://127.0.0.1:${PORT}`);
  });
}

export default app;
