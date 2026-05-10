"use client";

import { PDFDownloadLink } from "@react-pdf/renderer";
import { InvoicePDF } from "./invoice-pdf";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useEffect, useState } from "react";

export function PDFDownloadButton({ business, client, invoice }: any) {
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	if (!isClient) {
		return (
			<Button className="bg-blue-600 hover:bg-blue-700" disabled>
				<Download className="mr-2 h-4 w-4" />
				Loading PDF...
			</Button>
		);
	}

	return (
		<PDFDownloadLink
			document={<InvoicePDF business={business} client={client} invoice={invoice} />}
			fileName={`${invoice.invoiceNumber}.pdf`}
		>
			{({ loading }: any) => (
				<Button className="bg-blue-600 hover:bg-blue-700" disabled={loading}>
					<Download className="mr-2 h-4 w-4" />
					{loading ? "Generating..." : "Download PDF"}
				</Button>
			)}
		</PDFDownloadLink>
	);
}
