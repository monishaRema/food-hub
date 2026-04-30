import { Card, CardContent } from "@/components/ui/card";

export function HighlightCard({ icon: Icon, title, description }: any) {
  return (
    <Card className="rounded-[28px] border border-[#eedfd0] bg-white py-0 shadow-[0_10px_30px_rgba(33,24,17,0.05)]">
      <CardContent className="p-6">
        <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#fff2e8] text-[#ff6b2c]">
          <Icon className="size-4" />
        </div>
        <h3 className="text-xl font-semibold tracking-tight text-stone-900">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-6 text-stone-600">{description}</p>
      </CardContent>
    </Card>
  );
}
