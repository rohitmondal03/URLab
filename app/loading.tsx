import { Ellipsis } from "@/components/animate-ui/icons/ellipsis";
import { AnimateIcon } from "@/components/animate-ui/icons/icon";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <AnimateIcon>
          <Ellipsis animate="jump" loop />
        </AnimateIcon>
        <p>Loading...</p>
      </div>
    </div>
  );
}
