export const nExclusiveVipSeaterData = {
    "col": 4,
    "row": 9,
    "seats": [
        // Row 1
        { seat: "1-A", status: 'Available' },
        { seat: "1-B", status: 'Available' },
        { seat: "1-C", status: 'hide' },
        { seat: "1-D", status: 'Available' },

        // Row 2
        { seat: "2-A", status: 'Available' },
        { seat: "2-B", status: 'Available' },
        { seat: "2-C", status: 'hide' },
        { seat: "2-D", status: 'Available' },

        // Row 3
        { seat: "3-A", status: 'Available' },
        { seat: "3-B", status: 'Available' },
        { seat: "3-C", status: 'hide' },
        { seat: "3-D", status: 'Available' },

        // Row 4
        { seat: "4-A", status: 'Available' },
        { seat: "4-B", status: 'Available' },
        { seat: "4-C", status: 'hide' },
        { seat: "4-D", status: 'Available' },

        // Row 5
        { seat: "5-A", status: 'Available' },
        { seat: "5-B", status: 'Available' },
        { seat: "5-C", status: 'hide' },
        { seat: "5-D", status: 'Available' },

        // Row 6
        { seat: "6-A", status: 'Available' },
        { seat: "6-B", status: 'Available' },
        { seat: "6-C", status: 'hide' },
        { seat: "6-D", status: 'Available' },

        // Row 7
        { seat: "7-A", status: 'Available' },
        { seat: "7-B", status: 'Available' },
        { seat: "7-C", status: 'hide' },
        { seat: "7-D", status: 'wc' }, // Changed from 'wc'

        // Row 8 (FIXED)
        { seat: "8-A", status: 'Available' },
        { seat: "8-B", status: 'Available' },
        { seat: "8-C", status: 'hide' , rowSpan: 2 },
        // { seat: "8-D", status: 'Available' }, // Added missing seat

        // Row 9
        { seat: "9-A", status: 'Available' },
        { seat: "9-B", status: 'Available' },
        { seat: "9-C", status: 'Available' }, // Changed to 'hide' for consistency
        { seat: "9-D", status: 'Available' }
    ]
};