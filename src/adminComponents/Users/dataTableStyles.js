export const customStyles = {
    rows: {
        style: {
            fontSize: '14px', // override the row height
            borderBottom: "none", 
            padding: "12px 0",
            '&:not(:last-of-type)': {
            borderBottomStyle: 'solid',
            borderBottomWidth: '0.5px',
            // borderBottomColor: theme.divider.default,
        },
        },
    },
    headCells: {
        style: {
            fontSize: '15px',
            fontWeight: 'bold'
        },
    },
    cells: {
        style: {
            border: "none",
            fontWeight: "600"
        },
    },
};