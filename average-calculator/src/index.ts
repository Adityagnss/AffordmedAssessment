import express, { Request, Response, Router, RequestHandler, NextFunction } from 'express';
import axios from 'axios';

const app = express();
const router = express.Router();
const port = 9876;
const WINDOW_SIZE = 10;

interface NumberState {
    numbers: number[];
    timestamp: number;
}

interface NumberParams {
    numberid: string;
}

class NumberWindow {
    private window: NumberState[] = [];
    private readonly size: number;

    constructor(size: number) {
        this.size = size;
    }

    add(numbers: number[]): void {
        // Remove duplicates and add new numbers
        const uniqueNumbers = [...new Set(numbers)];
        this.window.push({
            numbers: uniqueNumbers,
            timestamp: Date.now()
        });

        // Keep only the newest numbers within window size
        if (this.getCurrentNumbers().length > this.size) {
            this.window.shift();
        }
    }

    getCurrentNumbers(): number[] {
        return this.window.flatMap(state => state.numbers).slice(-this.size);
    }

    getPreviousNumbers(): number[] {
        if (this.window.length < 2) return [];
        return this.window[this.window.length - 2]?.numbers || [];
    }

    calculateAverage(): number {
        const numbers = this.getCurrentNumbers();
        if (numbers.length === 0) return 0;
        return Number((numbers.reduce((a, b) => a + b, 0) / numbers.length).toFixed(2));
    }
}

const windows: Record<string, NumberWindow> = {
    'p': new NumberWindow(WINDOW_SIZE),
    'f': new NumberWindow(WINDOW_SIZE),
    'e': new NumberWindow(WINDOW_SIZE),
    'r': new NumberWindow(WINDOW_SIZE)
};

const fetchNumbers = async (type: string): Promise<number[]> => {
    const endpoints: Record<string, string> = {
        'p': 'primes',
        'f': 'fibo',
        'e': 'even',
        'r': 'rand'
    };

    try {
        const response = await axios.get(`http://20.244.56.144/test/${endpoints[type]}`, {
            timeout: 500
        });
        return response.data.numbers;
    } catch (error) {
        console.error(`Error fetching ${type} numbers:`, error);
        return [];
    }
};

const handleNumberRequest: RequestHandler<NumberParams> = async (req, res, next) => {
    const { numberid } = req.params;
    
    if (!['p', 'f', 'e', 'r'].includes(numberid)) {
        res.status(400).json({ error: 'Invalid number type' });
        return;
    }

    try {
        const window = windows[numberid];
        const windowPrevState = window.getPreviousNumbers();
        
        const numbers = await fetchNumbers(numberid);
        if (numbers.length > 0) {
            window.add(numbers);
        }

        const windowCurrState = window.getCurrentNumbers();
        const avg = window.calculateAverage();

        res.json({
            windowPrevState,
            windowCurrState,
            numbers,
            avg
        });
    } catch (error) {
        next(error);
    }
};

router.get('/numbers/:numberid', handleNumberRequest);

app.use(router);

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ error: 'Internal server error' });
});

app.listen(port, () => {
    console.log(`Average Calculator service running at http://localhost:${port}`);
});
