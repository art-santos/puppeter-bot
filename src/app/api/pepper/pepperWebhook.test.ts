import axios from "axios";

describe("Pepper Webhook Endpoint", () => {
  const BASE_URL = "http://localhost:3001"; // The server URL
  const route = `${BASE_URL}/api/pepper`;

  it("should handle a valid webhook request", async () => {
    const webhookPayload = {
      currency: "BRL",
      payment_engine: "pepper",
      transaction: "PP56489423",
      abandonmentId: "PP213123",
      client_id: "00000-0000-0000-0000-000",
      payment_type: "Billet",
      status: "Paid",
      prod: 10000,
      prod_name: "Maratona Javascript em 30 dias",
      producer_name: "Escola de curso online LTDA",
      producer_document: "12.3456.789/0001-10",
      producer_legal_nature: "Pessoa Jurídica",
      purchase_date: "2022-08-24 15:10:59",
      confirmation_purchase_date: "2022-08-24 15:10:59",
      product_support_email: "suporte@javascript.com",
      installments_number: 12,
      original_offer_price: 29.9,
      warranty_date: "2022-08-24 15:10:59",
      order_bump: false,
      main_transaction: "PP56489423",
      cms_market_place: 3.21,
      cms_vendor: 24.31,
      off: 10232,
      price: 29.9,
      full_price: 34.9,
      email: "user@gopepper.com.br",
      name: "João Maria",
      first_name: "João",
      last_name: "Maria",
      doc: "111.222.333-45",
      phone_number: "+5511970503010",
      billet_url: "https://pepper.com.br/example",
      billet_barcode: "00000 11111 22222 333333",
      pix_URL: "https://pepper.com.br/example",
      pix_qrcode: "0002010100006820014br.example",
      utm_campaign: "Campaing Name",
      utm_source: "Source Name",
      utm_medium: "Medium Name",
      utm_content: "Content Name",
      utm_term: "Term Name",
      src: "Source Name",
      sck: "Source Name",
    };

    const response = await axios.post(route, webhookPayload);

    expect(response.status).toBe(200);
    expect(response.data).toEqual({
      message: "Webhook received successfully",
      code: 200,
    });
  });

  // Additional tests as necessary...
});
