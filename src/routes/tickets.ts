import { Router } from 'express';

const router = Router();

// TODO: Student implementation - Part 1: Ticket Routes
// GET /tickets
// GET /tickets/:id
// POST /tickets
// PATCH /tickets/:id/status

// TODO: Student implementation - Part 2: Time Log Routes
// POST /tickets/:id/time
// GET /tickets/:id/time
export const TICKET_STATUSES =['TODO', 'IN_PROGRESS', 'DONE'] as const;
export type TicketStatus = (typeof TICKET_STATUSES)[number];

export interface TIcket {
    id: number;
    title: string;
    description: string;
    status: TicketStatus;
    creator_id: number;
    created_at: string;
    updated_at: string;

}

export const tickets: Ticket[] = [];
let nextId = 1;

const isStatus = (value: unknown): value is TicketStatus =>
    typeof value === 'string' && (TICKET_STATUSES as readonly string[]).includes(value);

function parsePositive(value: unknown, fallback: number): number | undefined {
    if (value === undefined) return fallback;
    if (typeof value !== 'string' || !/^\d+$/.test(value)) return undefined;
    return Number(value);
}
router.get('/tickets', (req, res) => {
    const limit = parsePositive(req.query.limit, 10);
    const offset = parsePositive(req.query.offset, 0);

    if(limit === undefined || offset === undefined || limit < 1 || limit > 100){
        res.status(400).json({
            error: '"limit" must be an integer between 1 and 1oo and "offset" must be and integer >= 0'
        });
        return;
    }

    const { status } = req.query;
    if (status !== undefined && !isStatus(status)){
        res.status(400).json({ error: `"status" must be one of: ${TICKET_STATUSES.join(', ')}`})
        return;
    }
const filtered = status ? tickets.filter((t) => t.status === status) : tickets;
    


export default router;
