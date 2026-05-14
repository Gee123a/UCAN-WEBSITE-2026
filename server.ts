import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Endpoint to handle RSVP submission
app.post('/api/rsvp', async (req, res) => {
  try {
    const { name, nim, major, organization } = req.body;

    if (!name || !nim || !major || !organization) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if user already RSVP'd
    const existing = await prisma.rsvp.findUnique({
      where: { nim }
    });

    if (existing) {
      return res.status(409).json({ error: 'Student ID (NIM) has already registered for RSVP' });
    }

    const rsvp = await prisma.rsvp.create({
      data: {
        name,
        nim,
        major,
        organization
      }
    });

    return res.status(201).json({ success: true, rsvp });
  } catch (error: any) {
    console.error('Error saving RSVP:', error);
    return res.status(500).json({ error: 'Internal server error while saving RSVP' });
  }
});

// Endpoint to retrieve RSVP stats
app.get('/api/rsvp', async (req, res) => {
  try {
    const count = await prisma.rsvp.count();
    const rsvps = await prisma.rsvp.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return res.json({ count, rsvps });
  } catch (error) {
    console.error('Error fetching RSVPs:', error);
    return res.status(500).json({ error: 'Internal server error fetching stats' });
  }
});

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Backend API Server running on http://localhost:${PORT}`);
  });
}

export default app;
