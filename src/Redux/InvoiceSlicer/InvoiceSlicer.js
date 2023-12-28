import { createSlice } from "@reduxjs/toolkit";
import { saveInvoicesToLocalStorage, loadInvoicesFromLocalStorage } from "../../LocalStorage/LocalStorage";

//Getting intial stored data from Local Storage.
const initialState = {
    invoices: loadInvoicesFromLocalStorage(),
};

const InvoiceSlice = createSlice({
    name: "invoices",
    initialState,
    reducers: {
        addInvoice: (state, action) => {
            // Get all existing invoice numbers
            const existingInvoiceNumbers = state.invoices.map((invoice) => invoice.invoiceNumber);

            // Find the maximum invoice number among existing invoices
            const maxInvoiceNumber = Math.max(...existingInvoiceNumbers, 0);

            // Generate a new unique invoice number
            let newInvoiceNumber = maxInvoiceNumber + 1;
            while (existingInvoiceNumbers.includes(newInvoiceNumber)) {
                newInvoiceNumber++; // Keep incrementing until a unique number is found
            }

            const newInvoice = {
                ...action.payload,
                invoiceNumber: newInvoiceNumber,
                isOpen: false,
            };
            state.invoices.push(newInvoice);

            // Save the updated invoices to local storage
            saveInvoicesToLocalStorage(state.invoices);
        },


        editInvoice: (state, action) => {
            // maping  on the invoices and replace  with the matching invoiceNumber
            state.invoices = state.invoices.map((invoice) =>
                invoice.invoiceNumber === action.payload.invoiceNumber
                    ? action.payload
                    : invoice
            );
            saveInvoicesToLocalStorage(state.invoices);
        },

        deleteInvoice: (state, action) => {
            const invoiceNumberToDelete = action.payload;

            // Filtering the invoice to be deleted
            state.invoices = state.invoices.filter(
                (invoice) => invoice.invoiceNumber !== invoiceNumberToDelete
            );
            saveInvoicesToLocalStorage(state.invoices);
        },

        deleteAllInvoice: (state, action) => {
            const invoiceNumberToDelete = action.payload;

            // Filtering the invoice to be deleted
            state.invoices = []
            saveInvoicesToLocalStorage(state.invoices);
        },

    },
});

export const { addInvoice, editInvoice, deleteInvoice, deleteAllInvoice } = InvoiceSlice.actions;
export default InvoiceSlice.reducer;