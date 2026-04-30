export function formatDisplayValue(value?: string | null) {
  if (!value) {
    return "Not available";
  }

  return value;
}

export function formatDateTime(value?: string | null) {
  if (!value) {
    return "Not available";
  }

  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Not available";
  }

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(parsedDate);
}

export function formatEnumLabel(value?: string | null) {
  if (!value) {
    return "Unknown";
  }

  return value
    .toLowerCase()
    .split("_")
    .map((part) => `${part.slice(0, 1).toUpperCase()}${part.slice(1)}`)
    .join(" ");
}

export function formatCurrency(value?: string | number | null) {
  if (value === undefined || value === null || value === "") {
    return "Not available";
  }

  const parsedValue =
    typeof value === "number" ? value : Number.parseFloat(value);

  if (Number.isNaN(parsedValue)) {
    return String(value);
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(parsedValue);
}

export function formatPrice(price?: string | number | null) {
  return formatCurrency(price);
}

export function formatDate(value?: string | null) {
  if (!value) {
    return "Not available";
  }

  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Not available";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(parsedDate);
}
