import { Ellipsis } from "@/components/animate-ui/icons/ellipsis";
import { AnimateIcon } from "@/components/animate-ui/icons/icon";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <AnimateIcon animate="jump" loop>
        <Ellipsis className={"size-10"} />
      </AnimateIcon>
    </div>
  );
}
