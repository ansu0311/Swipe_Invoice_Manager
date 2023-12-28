import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { clearInvoicesToLocalStorage } from "../LocalStorage/LocalStorage";
import {
  deleteInvoice,
  deleteAllInvoice,
} from "../Redux/InvoiceSlicer/InvoiceSlicer";
import { Card, Button, Table, Modal } from "react-bootstrap";

const List = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const invoices = useSelector((state) => state.invoices.invoices);

  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const handleAddButtonClick = () => {
    navigate("/create", { state: null });
  };
  const handleDeleteButtonClick = () => {
    clearInvoicesToLocalStorage();
    dispatch(deleteAllInvoice());
    navigate("/");
  };
  const handleEditButtonClick = (invoice) => {
    navigate(`/create/${invoice.invoiceNumber}`, {
      state: { ...invoice, copymode: false },
    });
  };

  const handleCopyButtonClick = (invoice) => {
    navigate(`/create/${invoice.invoiceNumber}`, {
      state: { ...invoice, copymode: true },
    });
  };

  const handleDeleteInvoice = (invoiceNumber) => {
    dispatch(deleteInvoice(invoiceNumber));
  };

  const openInvoiceModal = (invoice) => {
    setSelectedInvoice(invoice);
    setShowInvoiceModal(true);
  };

  const closeInvoiceModal = () => {
    setSelectedInvoice(null);
    setShowInvoiceModal(false);
  };

  return (
    <div className="container mt-4">
      <Card className="p-3">
        <h1 className="text-center mb-4">Invoices</h1>
        <div className="d-flex justify-content-between mb-3">
          <Button
            variant="outline-primary"
            className="text-center fs-6"
            onClick={handleAddButtonClick}
          >
            Add Invoice
          </Button>
          <Button
            variant="outline-danger"
            className="text-center fs-6"
            onClick={handleDeleteButtonClick}
          >
            Clear Invoice List
          </Button>
        </div>
        <table
          bordered
          rounded
          className="table_main text-center"
        >
          <thead>
            <tr>
              <th>Invoice Number</th>
              <th>Bill To</th>
              <th>Bill From</th>
              <th>Date Of Issue</th>
              <th>Total Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.invoiceNumber}>
                <td className="text-center">{invoice.invoiceNumber}</td>
                <td className="text-center">{invoice.billTo}</td>
                <td className="text-center">{invoice.billFrom}</td>
                <td className="text-center">{invoice.dateOfIssue}</td>
                <td className="text-center ">{invoice.total}</td>
                <td className="text-center">
                  <Button
                    variant="outline-info"
                    className="me-2"
                    size="lg"
                    onClick={() => openInvoiceModal(invoice)}
                  >
                    View
                  </Button>
                  <Button
                    variant="outline-warning"
                    className="me-2"
                    size="lg"
                    onClick={() => handleEditButtonClick(invoice)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    className="me-2"
                    size="lg"
                    onClick={() => handleDeleteInvoice(invoice.invoiceNumber)}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="outline-success"
                    className="me-2"
                    size="lg"
                    onClick={() => handleCopyButtonClick(invoice)}
                  >
                    Copy
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Modal
        show={showInvoiceModal}
        onHide={closeInvoiceModal}
        dialogClassName="modal-a4"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Invoice Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedInvoice && (
            <div className="container mx-auto  p-3 border border-black">
              <div className="row">
                <div className="col">
                  <div className="d-flex justify-content-between">
                    <p>Invoice Number: {selectedInvoice.invoiceNumber}</p>
                    <p>Date of Issue: {selectedInvoice.dateOfIssue}</p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <h3>Bill To</h3>
                  <p>To: {selectedInvoice.billTo}</p>
                  <p>Address: {selectedInvoice.billToAddress}</p>
                  <p>Email: {selectedInvoice.billToEmail}</p>
                </div>
                <div className="col">
                  <h3>Bill From</h3>
                  <p>From: {selectedInvoice.billFrom}</p>
                  <p>Address: {selectedInvoice.billFromAddress}</p>
                  <p>Email: {selectedInvoice.billFromEmail}</p>
                </div>
              </div>
              <h4>Items:</h4>
              <table className="table table-bordered table-centered">
                <thead>
                  <tr>
                    <th className="text-center custom-font">Name</th>
                    <th className="text-center custom-font">Description</th>
                    <th className="text-center custom-font">Price</th>
                    <th className="text-center custom-font">Quantity</th>
                    <th className="text-center custom-font">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedInvoice.items.map((item) => (
                    <tr key={item.id}>
                      <td className="text-center custom-font">{item.name}</td>
                      <td className="text-center custom-font">
                        {item.description}
                      </td>
                      <td className="text-center custom-font">{item.price}</td>
                      <td className="text-center custom-font">
                        {item.quantity}
                      </td>
                      <td className="text-center custom-font">
                        {(item.price * item.quantity).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="row mt-4">
                <div className="col">
                  <p>Notes: {selectedInvoice.notes}</p>
                </div>
                <div className="col text-end">
                  <div>Currency: {selectedInvoice.currency}</div>
                  <div>Subtotal: {selectedInvoice.subTotal}</div>
                  <div>
                    Discount: {selectedInvoice.discountRate}% (
                    {selectedInvoice.discountAmmount})
                  </div>
                  <p>
                    Tax: {selectedInvoice.taxRate}% (
                    {selectedInvoice.taxAmmount})
                  </p>
                  <h4>Total: {selectedInvoice.total}</h4>
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={closeInvoiceModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default List;
