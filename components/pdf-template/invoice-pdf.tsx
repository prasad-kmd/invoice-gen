import { Document, Page, Text, View, StyleSheet, Font, Image } from "@react-pdf/renderer";
import { formatCurrency, formatDate } from "@/lib/utils";

const styles = StyleSheet.create({
	page: {
		padding: 40,
		fontSize: 10,
		fontFamily: "Helvetica",
		color: "#333",
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		borderBottom: 1,
		borderColor: "#EEE",
		paddingBottom: 20,
		marginBottom: 20,
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
		color: "#000",
	},
	invoiceTitleContainer: {
		textAlign: "right",
	},
	invoiceTitle: {
		fontSize: 30,
		fontWeight: "bold",
		color: "#2563eb",
		textTransform: "uppercase",
	},
	invoiceDetails: {
		marginTop: 10,
		lineHeight: 1.5,
	},
	billToSection: {
		marginBottom: 30,
	},
	sectionTitle: {
		fontSize: 8,
		fontWeight: "bold",
		color: "#999",
		textTransform: "uppercase",
		marginBottom: 5,
	},
	clientName: {
		fontSize: 12,
		fontWeight: "bold",
		marginBottom: 2,
	},
	table: {
		marginTop: 20,
	},
	tableHeader: {
		flexDirection: "row",
		backgroundColor: "#F9FAFB",
		borderBottom: 1,
		borderColor: "#EEE",
		padding: 8,
		fontWeight: "bold",
	},
	tableRow: {
		flexDirection: "row",
		borderBottom: 1,
		borderColor: "#EEE",
		padding: 8,
	},
	col1: { width: "10%" },
	col2: { width: "50%" },
	col3: { width: "10%", textAlign: "center" },
	col4: { width: "15%", textAlign: "right" },
	col5: { width: "15%", textAlign: "right" },
	summaryContainer: {
		flexDirection: "row",
		justifyContent: "flex-end",
		marginTop: 30,
	},
	summaryBox: {
		width: 200,
	},
	summaryRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingVertical: 4,
	},
	totalRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingVertical: 8,
		borderTop: 1,
		borderColor: "#EEE",
		marginTop: 8,
	},
	totalLabel: {
		fontSize: 14,
		fontWeight: "bold",
	},
	totalValue: {
		fontSize: 14,
		fontWeight: "bold",
		color: "#2563eb",
	},
	footer: {
		position: "absolute",
		bottom: 40,
		left: 40,
		right: 40,
		borderTop: 1,
		borderColor: "#EEE",
		paddingTop: 20,
		flexDirection: "row",
		gap: 40,
	},
	footerSection: {
		flex: 1,
	},
	pageNumber: {
		position: "absolute",
		bottom: 20,
		right: 40,
		fontSize: 8,
		color: "#999",
	},
});

export function InvoicePDF({ business, client, invoice }: any) {
	const currency = business?.currency || "LKR";

	return (
		<Document>
			<Page size="A4" style={styles.page}>
				<View style={styles.header}>
					<View style={styles.businessInfo}>
						{business?.logoUrl && <Image src={business.logoUrl} style={styles.logo} />}
						<Text style={styles.businessName}>{business?.businessName}</Text>
						<Text>{business?.address}</Text>
						<Text>{business?.phone}</Text>
						<Text>{business?.email}</Text>
						{business?.website && <Text>{business.website}</Text>}
					</View>
					<View style={styles.invoiceTitleContainer}>
						<Text style={styles.invoiceTitle}>Invoice</Text>
						<View style={styles.invoiceDetails}>
							<Text style={{ fontWeight: "bold" }}>Invoice #: {invoice.invoiceNumber}</Text>
							<Text>Date: {formatDate(invoice.issueDate)}</Text>
							<Text>Due Date: {formatDate(invoice.dueDate)}</Text>
							<Text style={{ marginTop: 5, color: "#666" }}>Status: {invoice.status.toUpperCase()}</Text>
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
						<View key={index} style={styles.tableRow}>
							<Text style={styles.col1}>{index + 1}</Text>
							<Text style={styles.col2}>{item.description}</Text>
							<Text style={styles.col3}>{item.quantity}</Text>
							<Text style={styles.col4}>{formatCurrency(item.unitPrice, currency)}</Text>
							<Text style={[styles.col5, { fontWeight: "bold" }]}>{formatCurrency(item.totalPrice, currency)}</Text>
						</View>
					))}
				</View>

				<View style={styles.summaryContainer}>
					<View style={styles.summaryBox}>
						<View style={styles.summaryRow}>
							<Text style={{ color: "#666" }}>Subtotal:</Text>
							<Text>{formatCurrency(invoice.subtotal, currency)}</Text>
						</View>
						{invoice.discountAmount > 0 && (
							<View style={styles.summaryRow}>
								<Text style={{ color: "#dc2626" }}>Discount:</Text>
								<Text style={{ color: "#dc2626" }}>-{formatCurrency(invoice.discountAmount, currency)}</Text>
							</View>
						)}
						<View style={styles.summaryRow}>
							<Text style={{ color: "#666" }}>Tax ({invoice.taxRate}%):</Text>
							<Text>{formatCurrency(invoice.taxAmount, currency)}</Text>
						</View>
						<View style={styles.totalRow}>
							<Text style={styles.totalLabel}>Total:</Text>
							<Text style={styles.totalValue}>{formatCurrency(invoice.totalAmount, currency)}</Text>
						</View>
					</View>
				</View>

				<View style={styles.footer}>
					<View style={styles.footerSection}>
						<Text style={styles.sectionTitle}>Notes:</Text>
						<Text style={{ color: "#666", lineHeight: 1.4 }}>{invoice.customNotes || "Thank you for your business!"}</Text>
					</View>
					<View style={styles.footerSection}>
						<Text style={styles.sectionTitle}>Payment Terms:</Text>
						<Text style={{ color: "#666", lineHeight: 1.4 }}>
							{invoice.paymentTerms || business?.defaultPaymentTerms}
						</Text>
					</View>
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
