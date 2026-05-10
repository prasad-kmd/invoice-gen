import { Document, Page, Text, View, StyleSheet, Font, Image } from "@react-pdf/renderer";
import { formatCurrency, formatDate } from "@/lib/utils";

// Register fonts
// We need absolute URLs for fonts when rendering on the server
const fontBaseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

Font.register({
  family: "Inter",
  src: `${fontBaseUrl}/fonts/Inter-Regular.woff`,
});

Font.register({
  family: "Google Sans",
  src: `${fontBaseUrl}/fonts/GoogleSans-Regular.woff`,
});

const ACCENT_COLOR = "#0D9488"; // Teal 600

const createStyles = (showBorder: boolean) => StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: "Inter",
    color: "#444",
    backgroundColor: "#FFFFFF",
  },
  pageBorder: {
    position: "absolute",
    top: 20,
    left: 20,
    right: 20,
    bottom: 20,
    border: showBorder ? "1pt solid #E5E7EB" : "none",
    borderRadius: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottom: 2,
    borderColor: ACCENT_COLOR,
    paddingBottom: 20,
    marginBottom: 30,
  },
  businessInfo: {
    flexDirection: "column",
    gap: 2,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
    objectFit: "contain",
  },
  businessName: {
    fontSize: 16,
    fontFamily: "Google Sans",
    fontWeight: "bold",
    color: "#111",
  },
  invoiceTitleContainer: {
    textAlign: "right",
    justifyContent: "flex-end",
  },
  invoiceTitle: {
    fontSize: 32,
    fontFamily: "Google Sans",
    fontWeight: "bold",
    color: ACCENT_COLOR,
    textTransform: "uppercase",
    marginBottom: 10,
  },
  invoiceDetails: {
    gap: 3,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 5,
  },
  detailLabel: {
    color: "#666",
    fontWeight: "bold",
  },
  detailValue: {
    color: "#111",
    minWidth: 80,
  },
  billToSection: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 9,
    fontFamily: "Google Sans",
    fontWeight: "bold",
    color: ACCENT_COLOR,
    textTransform: "uppercase",
    marginBottom: 8,
    letterSpacing: 1,
  },
  clientName: {
    fontSize: 14,
    fontFamily: "Google Sans",
    fontWeight: "bold",
    color: "#111",
    marginBottom: 4,
  },
  clientInfo: {
    color: "#666",
    lineHeight: 1.4,
  },
  table: {
    marginTop: 10,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#F8FAFC",
    borderBottom: 1,
    borderColor: "#E2E8F0",
    padding: "10 8",
  },
  tableHeaderLabel: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#475569",
    textTransform: "uppercase",
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: 1,
    borderColor: "#F1F5F9",
    padding: "10 8",
    alignItems: "center",
  },
  col1: { width: "8%" },
  col2: { width: "52%" },
  col3: { width: "10%", textAlign: "center" },
  col4: { width: "15%", textAlign: "right" },
  col5: { width: "15%", textAlign: "right" },
  summaryContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
  },
  summaryBox: {
    width: 220,
    backgroundColor: "#F8FAFC",
    padding: 15,
    borderRadius: 8,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
    marginTop: 10,
    borderTop: 1,
    borderColor: "#E2E8F0",
  },
  totalLabel: {
    fontSize: 12,
    fontFamily: "Google Sans",
    fontWeight: "bold",
    color: "#111",
  },
  totalValue: {
    fontSize: 16,
    fontFamily: "Google Sans",
    fontWeight: "bold",
    color: ACCENT_COLOR,
  },
  footer: {
    position: "absolute",
    bottom: 50,
    left: 40,
    right: 40,
    borderTop: 1,
    borderColor: "#F1F5F9",
    paddingTop: 20,
    flexDirection: "row",
    gap: 30,
  },
  footerSection: {
    flex: 1,
  },
  footerText: {
    color: "#666",
    lineHeight: 1.5,
    fontSize: 9,
  },
  pageNumber: {
    position: "absolute",
    bottom: 30,
    right: 40,
    fontSize: 8,
    color: "#94A3B8",
  },
});

export function InvoicePDF({ business, client, invoice }: any) {
  const styles = createStyles(business?.showPageBorder || false);
  const currency = business?.currency || "LKR";

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.pageBorder} />

        <View style={styles.header}>
          <View style={styles.businessInfo}>
            {business?.logoUrl ? (
              <Image src={business.logoUrl} style={styles.logo} />
            ) : null}
            <Text style={styles.businessName}>{business?.businessName}</Text>
            <Text style={styles.footerText}>{business?.address}</Text>
            <Text style={styles.footerText}>{business?.phone}</Text>
            <Text style={styles.footerText}>{business?.email}</Text>
            {business?.website && <Text style={styles.footerText}>{business.website}</Text>}
          </View>
          <View style={styles.invoiceTitleContainer}>
            <Text style={styles.invoiceTitle}>Invoice</Text>
            <View style={styles.invoiceDetails}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Invoice #:</Text>
                <Text style={styles.detailValue}>{invoice.invoiceNumber}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Date:</Text>
                <Text style={styles.detailValue}>{formatDate(invoice.issueDate)}</Text>
              </View>
              {invoice.dueDate && (
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Due Date:</Text>
                    <Text style={styles.detailValue}>{formatDate(invoice.dueDate)}</Text>
                </View>
              )}
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Status:</Text>
                <Text style={[styles.detailValue, { color: ACCENT_COLOR, textTransform: "uppercase", fontSize: 8 }]}>{invoice.status}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.billToSection}>
          <Text style={styles.sectionTitle}>Bill To</Text>
          <Text style={styles.clientName}>{client?.name}</Text>
          <View style={styles.clientInfo}>
            {client?.address && <Text>{client.address}</Text>}
            {client?.phone && <Text>{client.phone}</Text>}
            {client?.email && <Text>{client.email}</Text>}
          </View>
        </View>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.col1, styles.tableHeaderLabel]}>#</Text>
            <Text style={[styles.col2, styles.tableHeaderLabel]}>Description</Text>
            <Text style={[styles.col3, styles.tableHeaderLabel]}>Qty</Text>
            <Text style={[styles.col4, styles.tableHeaderLabel]}>Price</Text>
            <Text style={[styles.col5, styles.tableHeaderLabel]}>Amount</Text>
          </View>
          {invoice.items.map((item: any, index: number) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.col1}>{index + 1}</Text>
              <Text style={[styles.col2, { color: "#111", fontWeight: "bold" }]}>{item.description}</Text>
              <Text style={styles.col3}>{Math.round(item.quantity)}</Text>
              <Text style={styles.col4}>{formatCurrency(item.unitPrice, currency)}</Text>
              <Text style={[styles.col5, { fontWeight: "bold", color: "#111" }]}>{formatCurrency(item.totalPrice, currency)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.summaryContainer}>
          <View style={styles.summaryBox}>
            <View style={styles.summaryRow}>
              <Text style={{ color: "#64748B" }}>Subtotal</Text>
              <Text style={{ color: "#111", fontWeight: "bold" }}>{formatCurrency(invoice.subtotal, currency)}</Text>
            </View>
            {invoice.discountAmount > 0 && (
              <View style={styles.summaryRow}>
                <Text style={{ color: "#EF4444" }}>Discount</Text>
                <Text style={{ color: "#EF4444", fontWeight: "bold" }}>-{formatCurrency(invoice.discountAmount, currency)}</Text>
              </View>
            )}
            {invoice.taxAmount > 0 && (
                <View style={styles.summaryRow}>
                    <Text style={{ color: "#64748B" }}>Tax ({invoice.taxRate}%)</Text>
                    <Text style={{ color: "#111", fontWeight: "bold" }}>{formatCurrency(invoice.taxAmount, currency)}</Text>
                </View>
            )}
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>{formatCurrency(invoice.totalAmount, currency)}</Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          {invoice.customNotes && (
            <View style={styles.footerSection}>
              <Text style={styles.sectionTitle}>Notes</Text>
              <Text style={styles.footerText}>{invoice.customNotes}</Text>
            </View>
          )}
          {(invoice.paymentTerms || business?.defaultPaymentTerms) && (
            <View style={styles.footerSection}>
              <Text style={styles.sectionTitle}>Payment Terms</Text>
              <Text style={styles.footerText}>
                {invoice.paymentTerms || business?.defaultPaymentTerms}
              </Text>
            </View>
          )}
        </View>

        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`}
          fixed
        />
      </Page>
    </Document>
  );
}
