type DashboardPageShellProps = {
  title: string;
  description: string;
};

export function DashboardPageShell({
  title,
  description,
}: DashboardPageShellProps) {
  return (
    <section className="space-y-3">
      <div className="space-y-1">
        <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
        <p className="text-muted-foreground max-w-2xl text-sm">{description}</p>
      </div>
    </section>
  );
}
