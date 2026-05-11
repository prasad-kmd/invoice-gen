import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency: string = "LKR") {
	return new Intl.NumberFormat("en-LK", {
		style: "currency",
		currency: currency,
		minimumFractionDigits: currency === "LKR" ? 0 : 2,
	}).format(amount);
}

export function formatDate(date: Date | string) {
	return new Intl.DateTimeFormat("en-US", {
		dateStyle: "medium",
	}).format(new Date(date));
}
