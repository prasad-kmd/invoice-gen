import { Document, Page, Text, View, StyleSheet, Font, Image } from "@react-pdf/renderer";
import { formatCurrency, formatDate } from "@/lib/utils";

// In @react-pdf/renderer, when running in the browser,
// we should ideally use URLs for fonts.
// However, since we are doing local fonts only and this is also used on server-side
// for generation (if any), we need to be careful.
// To keep it simple and working in both environments without Node.js modules:
const FONT_BASE_URL = typeof window !== "undefined"
    ? window.location.origin
    : process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

Font.register({
  family: "Inter",
  src: `${FONT_BASE_URL}/fonts/Inter-Regular.woff`,
});

Font.register({
  family: "GoogleSans",
  fonts: [
    { src: `${FONT_BASE_URL}/fonts/GoogleSans-Regular.woff` },
    { src: `${FONT_BASE_URL}/fonts/GoogleSans-Regular.woff`, fontWeight: "bold" },
  ],
});

const ACCENT_COLOR = "#0D9488"; // Teal/Cyan color

const styles = StyleSheet.create({
	page: {
		padding: 40,
		fontSize: 10,
		fontFamily: "Inter",
		color: "#374151",
        position: "relative",
	},
    pageBorder: {
        position: "absolute",
        top: 20,
        left: 20,
        right: 20,
        bottom: 20,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 8,
    },
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		borderBottom: 1,
		borderColor: "#F3F4F6",
		paddingBottom: 25,
		marginBottom: 25,
	},
	businessInfo: {
		flexDirection: "column",
	},
	logo: {
		width: 100,
		marginBottom: 10,
	},
	businessName: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#111827",
        fontFamily: "GoogleSans",
	},
	invoiceTitleContainer: {
		textAlign: "right",
	},
	invoiceTitle: {
		fontSize: 32,
		fontWeight: "bold",
		color: ACCENT_COLOR,
		textTransform: "uppercase",
        fontFamily: "GoogleSans",
        letterSpacing: 1,
	},
	invoiceDetails: {
		marginTop: 10,
		lineHeight: 1.6,
	},
	billToSection: {
		marginBottom: 35,
	},
	sectionTitle: {
		fontSize: 8,
		fontWeight: "bold",
		color: "#9CA3AF",
		textTransform: "uppercase",
		marginBottom: 6,
        fontFamily: "GoogleSans",
	},
	clientName: {
		fontSize: 12,
		fontWeight: "bold",
		color: "#111827",
		marginBottom: 3,
        fontFamily: "GoogleSans",
	},
	table: {
		marginTop: 10,
	},
	tableHeader: {
		flexDirection: "row",
		backgroundColor: "#F9FAFB",
		borderBottom: 2,
		borderColor: ACCENT_COLOR,
		padding: 8,
		fontWeight: "bold",
        fontFamily: "GoogleSans",
        color: "#111827",
	},
	tableRow: {
		flexDirection: "row",
		borderBottom: 1,
		borderColor: "#F3F4F6",
		padding: 8,
	},
	col1: { width: "10%", color: "#9CA3AF" },
	col2: { width: "50%" },
	col3: { width: "10%", textAlign: "center" },
	col4: { width: "15%", textAlign: "right" },
	col5: { width: "15%", textAlign: "right" },
	summaryContainer: {
		flexDirection: "row",
		justifyContent: "flex-end",
		marginTop: 35,
	},
	summaryBox: {
		width: 220,
        backgroundColor: "#F9FAFB",
        padding: 12,
        borderRadius: 4,
	},
	summaryRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingVertical: 5,
	},
	totalRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingVertical: 10,
		borderTop: 1,
		borderColor: "#E5E7EB",
		marginTop: 8,
	},
	totalLabel: {
		fontSize: 14,
		fontWeight: "bold",
        fontFamily: "GoogleSans",
        color: "#111827",
	},
	totalValue: {
		fontSize: 14,
		fontWeight: "bold",
		color: ACCENT_COLOR,
        fontFamily: "GoogleSans",
	},
	footer: {
		position: "absolute",
		bottom: 50,
		left: 40,
		right: 40,
		borderTop: 1,
		borderColor: "#F3F4F6",
		paddingTop: 25,
		flexDirection: "row",
		gap: 40,
	},
	footerSection: {
		flex: 1,
	},
	pageNumber: {
		position: "absolute",
		bottom: 25,
		right: 40,
		fontSize: 8,
		color: "#9CA3AF",
	},
});

export function InvoicePDF({ business, client, invoice }: any) {
    const currency = invoice.currency || business?.currency || "LKR";

	return (
		<Document>
			<Page size="A4" style={styles.page}>
                {business?.showPageBorder && <View style={styles.pageBorder} />}
				<View style={styles.header}>
					<View style={styles.businessInfo}>
						{business?.logoUrl && <Image src={business.logoUrl} style={styles.logo} />}
						<Text style={styles.businessName}>{business?.businessName}</Text>
						<Text style={{ marginTop: 4 }}>{business?.address}</Text>
						<Text>{business?.phone}</Text>
						<Text>{business?.email}</Text>
						{business?.website && <Text>{business.website}</Text>}
					</View>
					<View style={styles.invoiceTitleContainer}>
						<Text style={styles.invoiceTitle}>Invoice</Text>
						<View style={styles.invoiceDetails}>
							<Text style={{ fontWeight: "bold", color: "#111827" }}># {invoice.invoiceNumber}</Text>
							<Text>Date: {formatDate(invoice.issueDate)}</Text>
							<Text>Due Date: {formatDate(invoice.dueDate)}</Text>
							<View style={{ marginTop: 8, padding: "2 6", backgroundColor: "#F3F4F6", borderRadius: 4, alignSelf: "flex-end" }}>
                                <Text style={{ fontSize: 8, fontWeight: "bold", color: "#4B5563" }}>{invoice.status.toUpperCase()}</Text>
                            </View>
						</View>
					</View>
				</View>

				<View style={styles.billToSection}>
					<Text style={styles.sectionTitle}>Bill To:</Text>
					<Text style={styles.clientName}>{client?.name}</Text>
					<Text>{client?.address}</Text>
					<Text>{client?.phone}</Text>
					<Text>{client?.email}</Text>
				</View>

				<View style={styles.table}>
					<View style={styles.tableHeader}>
						<Text style={styles.col1}>#</Text>
						<Text style={styles.col2}>Description</Text>
						<Text style={styles.col3}>Qty</Text>
						<Text style={styles.col4}>Unit Price</Text>
						<Text style={styles.col5}>Amount</Text>
					</View>
					{invoice.items.map((item: any, index: number) => (
						<View key={index} style={styles.tableRow} wrap={false}>
							<Text style={styles.col1}>{String(index + 1).padStart(2, '0')}</Text>
							<Text style={[styles.col2, { color: "#111827", fontWeight: "medium" }]}>{item.description}</Text>
							<Text style={styles.col3}>{item.quantity}</Text>
							<Text style={styles.col4}>{formatCurrency(item.unitPrice, currency)}</Text>
							<Text style={[styles.col5, { fontWeight: "bold", color: "#111827" }]}>{formatCurrency(item.totalPrice, currency)}</Text>
						</View>
					))}
				</View>

				<View style={styles.summaryContainer}>
					<View style={styles.summaryBox}>
						<View style={styles.summaryRow}>
							<Text style={{ color: "#6B7280" }}>Subtotal:</Text>
							<Text style={{ fontWeight: "bold" }}>{formatCurrency(invoice.subtotal, currency)}</Text>
						</View>
						{invoice.discountAmount > 0 && (
							<View style={styles.summaryRow}>
								<Text style={{ color: "#E11D48" }}>Discount:</Text>
								<Text style={{ color: "#E11D48", fontWeight: "bold" }}>-{formatCurrency(invoice.discountAmount, currency)}</Text>
							</View>
						)}
						<View style={styles.summaryRow}>
							<Text style={{ color: "#6B7280" }}>Tax ({invoice.taxRate}%):</Text>
							<Text style={{ fontWeight: "bold" }}>{formatCurrency(invoice.taxAmount, currency)}</Text>
						</View>
						<View style={styles.totalRow}>
							<Text style={styles.totalLabel}>Grand Total:</Text>
							<Text style={styles.totalValue}>{formatCurrency(invoice.totalAmount, currency)}</Text>
						</View>
					</View>
				</View>

				<View style={styles.footer} fixed>
					<View style={styles.footerSection}>
						<Text style={styles.sectionTitle}>Notes & Remarks:</Text>
						<Text style={{ color: "#6B7280", lineHeight: 1.5 }}>{invoice.customNotes || "Thank you for choosing our services!"}</Text>
					</View>
					<View style={styles.footerSection}>
						<Text style={styles.sectionTitle}>Payment Instructions:</Text>
						<Text style={{ color: "#6B7280", lineHeight: 1.5 }}>
							{invoice.paymentTerms || business?.defaultPaymentTerms || "Please pay within 14 days."}
						</Text>
					</View>
				</View>

				<Text
					style={styles.pageNumber}
					render={({ pageNumber, totalPages }) => `Invoice - Page ${pageNumber} of ${totalPages}`}
					fixed
				/>
			</Page>
		</Document>
	);
}
