"use client";

import { PDFDownloadLink } from "@react-pdf/renderer";
import { InvoicePDF } from "./invoice-pdf";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export function PDFDownloadButton({ business, client, invoice }: any) {
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	if (!isClient) {
		return (
			<Button variant="outline" disabled>
				<Loader2 className="mr-2 h-4 w-4 animate-spin" />
				Preparing...
			</Button>
		);
	}

	return (
		<PDFDownloadLink
			document={<InvoicePDF business={business} client={client} invoice={invoice} />}
			fileName={`${invoice.invoiceNumber}.pdf`}
		>
			{({ loading }: any) => (
				<Button disabled={loading} className="shadow-lg shadow-primary/20">
					{loading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <Download className="mr-2 h-4 w-4" />
                    )}
					{loading ? "Generating..." : "Download PDF"}
				</Button>
			)}
		</PDFDownloadLink>
	);
}
