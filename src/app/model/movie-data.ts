import { TicketData } from "./ticket-data";

export class MovieData {
    movieId: number|any;//changed
    movieName: string|any;
    theaterName: string|any;
    totalTickets: number|any;
    ticketStatus: string|any;
    bookedSeats!: string[];
    tickets!: TicketData[];
}
