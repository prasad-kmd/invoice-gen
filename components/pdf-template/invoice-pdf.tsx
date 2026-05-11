import { Document, Page, Text, View, StyleSheet, Font, Image } from "@react-pdf/renderer";
import { formatCurrency, formatDate } from "@/lib/utils";

// Register fonts
Font.register({
	family: "Google Sans",
	src: "http://localhost:3000/fonts/GoogleSans-Regular.woff",
});

Font.register({
	family: "JetBrains Mono",
	src: "http://localhost:3000/fonts/JetBrainsMono-Regular.woff",
});

const styles = StyleSheet.create({
	page: {
		padding: 40,
		fontSize: 9,
		fontFamily: "Helvetica",
		color: "#444",
		backgroundColor: "#FFFFFF",
	},
	pageBorder: {
		position: 'absolute',
		top: 20,
		left: 20,
		right: 20,
		bottom: 20,
		border: 1,
		borderColor: '#F3F4F6',
		pointerEvents: 'none',
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		borderBottom: 2,
		borderColor: "#F3F4F6",
		paddingBottom: 30,
		marginBottom: 30,
	},
	businessInfo: {
		flexDirection: "column",
		width: "60%",
	},
	logo: {
		width: 80,
		marginBottom: 15,
	},
	businessName: {
		fontSize: 16,
		fontWeight: "bold",
		color: "#111",
		marginBottom: 4,
	},
	businessDetails: {
		color: "#6B7280",
		lineHeight: 1.4,
	},
	invoiceTitleContainer: {
		textAlign: "right",
		width: "40%",
	},
	invoiceTitle: {
		fontSize: 40,
		fontWeight: "black",
		color: "#008080", // Teal accent
		textTransform: "uppercase",
		letterSpacing: -1,
		opacity: 0.1,
		marginBottom: 10,
	},
	invoiceDetails: {
		marginTop: 0,
	},
	detailRow: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		marginBottom: 4,
	},
	detailLabel: {
		color: "#9CA3AF",
		textTransform: "uppercase",
		fontSize: 7,
		fontWeight: "bold",
		marginRight: 8,
		width: 60,
	},
	detailValue: {
		color: "#111",
		fontWeight: "bold",
		fontSize: 9,
	},
	billToSection: {
		marginBottom: 40,
		backgroundColor: "#F9FAFB",
		padding: 20,
		borderRadius: 12,
	},
	sectionTitle: {
		fontSize: 7,
		fontWeight: "bold",
		color: "#9CA3AF",
		textTransform: "uppercase",
		letterSpacing: 1,
		marginBottom: 8,
	},
	clientName: {
		fontSize: 14,
		fontWeight: "bold",
		color: "#111",
		marginBottom: 4,
	},
	clientDetails: {
		color: "#6B7280",
		lineHeight: 1.4,
	},
	table: {
		marginTop: 10,
	},
	tableHeader: {
		flexDirection: "row",
		backgroundColor: "#F9FAFB",
		borderBottom: 1,
		borderColor: "#E5E7EB",
		paddingVertical: 10,
		paddingHorizontal: 8,
	},
	tableHeaderText: {
		fontSize: 7,
		fontWeight: "bold",
		color: "#9CA3AF",
		textTransform: "uppercase",
		letterSpacing: 0.5,
	},
	tableRow: {
		flexDirection: "row",
		borderBottom: 1,
		borderColor: "#F3F4F6",
		paddingVertical: 12,
		paddingHorizontal: 8,
		alignItems: 'center',
	},
	col1: { width: "8%", color: "#9CA3AF" },
	col2: { width: "52%", color: "#111", fontWeight: "bold" },
	col3: { width: "10%", textAlign: "center", color: "#6B7280" },
	col4: { width: "15%", textAlign: "right", color: "#6B7280" },
	col5: { width: "15%", textAlign: "right", color: "#111", fontWeight: "bold" },
	summaryContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 40,
	},
	notesBox: {
		width: "55%",
	},
	summaryBox: {
		width: "35%",
		backgroundColor: "#F9FAFB",
		padding: 20,
		borderRadius: 12,
	},
	summaryRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingVertical: 4,
	},
	summaryLabel: {
		color: "#6B7280",
		fontSize: 8,
	},
	summaryValue: {
		color: "#111",
		fontWeight: "bold",
	},
	totalRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingVertical: 10,
		borderTop: 1,
		borderColor: "#E5E7EB",
		marginTop: 10,
	},
	totalLabel: {
		fontSize: 12,
		fontWeight: "bold",
		color: "#111",
	},
	totalValue: {
		fontSize: 16,
		fontWeight: "black",
		color: "#008080",
	},
	footer: {
		position: "absolute",
		bottom: 40,
		left: 40,
		right: 40,
		borderTop: 1,
		borderColor: "#F3F4F6",
		paddingTop: 20,
		textAlign: 'center',
	},
	thankYou: {
		fontSize: 8,
		color: "#9CA3AF",
		textTransform: "uppercase",
		letterSpacing: 2,
	},
	pageNumber: {
		position: "absolute",
		bottom: 20,
		right: 40,
		fontSize: 7,
		color: "#D1D5DB",
	},
});

export function InvoicePDF({ business, client, invoice }: any) {
	const currency = invoice.currency || business?.defaultCurrency || "LKR";

	return (
		<Document title={`Invoice ${invoice.invoiceNumber}`}>
			<Page size="A4" style={styles.page}>
				<View style={styles.pageBorder} />

				<View style={styles.header}>
					<View style={styles.businessInfo}>
						{business?.logoUrl && <Image src={business.logoUrl} style={styles.logo} />}
						<Text style={styles.businessName}>{business?.businessName}</Text>
						<View style={styles.businessDetails}>
							<Text>{business?.address}</Text>
							<Text>{business?.phone}  •  {business?.email}</Text>
							{business?.website && <Text>{business.website}</Text>}
						</View>
					</View>
					<View style={styles.invoiceTitleContainer}>
						<Text style={styles.invoiceTitle}>Invoice</Text>
						<View style={styles.invoiceDetails}>
							<View style={styles.detailRow}>
								<Text style={styles.detailLabel}>Reference</Text>
								<Text style={styles.detailValue}>{invoice.invoiceNumber}</Text>
							</View>
							<View style={styles.detailRow}>
								<Text style={styles.detailLabel}>Issue Date</Text>
								<Text style={styles.detailValue}>{formatDate(invoice.issueDate)}</Text>
							</View>
							<View style={styles.detailRow}>
								<Text style={styles.detailLabel}>Due Date</Text>
								<Text style={styles.detailValue}>{formatDate(invoice.dueDate)}</Text>
							</View>
						</View>
					</View>
				</View>

				<View style={styles.billToSection}>
					<Text style={styles.sectionTitle}>Recipient</Text>
					<Text style={styles.clientName}>{client?.name}</Text>
					<View style={styles.clientDetails}>
						<Text>{client?.email}</Text>
						<Text>{client?.phone}</Text>
						<Text style={{ marginTop: 4 }}>{client?.address}</Text>
					</View>
				</View>

				<View style={styles.table}>
					<View style={styles.tableHeader}>
						<Text style={[styles.tableHeaderText, styles.col1]}>#</Text>
						<Text style={[styles.tableHeaderText, styles.col2]}>Description</Text>
						<Text style={[styles.tableHeaderText, styles.col3]}>Qty</Text>
						<Text style={[styles.tableHeaderText, styles.col4]}>Price</Text>
						<Text style={[styles.tableHeaderText, styles.col5]}>Amount</Text>
					</View>
					{invoice.items.map((item: any, index: number) => (
						<View key={index} style={styles.tableRow}>
							<Text style={styles.col1}>{index + 1}</Text>
							<Text style={styles.col2}>{item.description}</Text>
							<Text style={styles.col3}>{item.quantity}</Text>
							<Text style={styles.col4}>{formatCurrency(item.unitPrice, currency)}</Text>
							<Text style={styles.col5}>{formatCurrency(item.totalPrice, currency)}</Text>
						</View>
					))}
				</View>

				<View style={styles.summaryContainer}>
					<View style={styles.notesBox}>
						<View style={{ marginBottom: 15 }}>
							<Text style={styles.sectionTitle}>Notes</Text>
							<Text style={{ color: "#6B7280", lineHeight: 1.4 }}>{invoice.customNotes || "Thank you for your business!"}</Text>
						</View>
						<View>
							<Text style={styles.sectionTitle}>Payment Terms</Text>
							<Text style={{ color: "#6B7280", lineHeight: 1.4 }}>
								{invoice.paymentTerms || business?.defaultPaymentTerms}
							</Text>
						</View>
					</View>

					<View style={styles.summaryBox}>
						<View style={styles.summaryRow}>
							<Text style={styles.summaryLabel}>Subtotal</Text>
							<Text style={styles.summaryValue}>{formatCurrency(invoice.subtotal, currency)}</Text>
						</View>
						{invoice.discountAmount > 0 && (
							<View style={styles.summaryRow}>
								<Text style={[styles.summaryLabel, { color: "#EF4444" }]}>Discount</Text>
								<Text style={[styles.summaryValue, { color: "#EF4444" }]}>-{formatCurrency(invoice.discountAmount, currency)}</Text>
							</View>
						)}
						<View style={styles.summaryRow}>
							<Text style={styles.summaryLabel}>Tax ({invoice.taxRate}%)</Text>
							<Text style={styles.summaryValue}>{formatCurrency(invoice.taxAmount, currency)}</Text>
						</View>
						<View style={styles.totalRow}>
							<Text style={styles.totalLabel}>Total</Text>
							<View style={{ textAlign: 'right' }}>
								<Text style={styles.totalValue}>{formatCurrency(invoice.totalAmount, currency)}</Text>
								<Text style={{ fontSize: 7, color: "#9CA3AF", fontWeight: "bold" }}>{currency}</Text>
							</View>
						</View>
					</View>
				</View>

				<View style={styles.footer} fixed>
					<Text style={styles.thankYou}>Thank you for your business</Text>
				</View>

				<Text
					style={styles.pageNumber}
					render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
					fixed
				/>
			</Page>
		</Document>
	);
}
