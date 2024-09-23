import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Camera, Cookie } from "lucide-react";

interface ConsentProps {
  onOpenChange: (open: boolean) => void;
  setConsent: (
    consent: "all-cookies-accepted" | "reject-non-essential-cookies"
  ) => void;
}

export function Consent({ setConsent, onOpenChange }: ConsentProps) {
  return (
    <Sheet
      open={true}
      onOpenChange={(value) => {
        onOpenChange(value);
        if (value === false) {
          setConsent("reject-non-essential-cookies");
        }
      }}
    >
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>We Respect Your Privacy</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div className="my-4">
          <h3 className="text-lg font-semibold mb-1">
            Camera Access <Camera className="inline pl-1" />
          </h3>
          <p className="text-sm">
            Our application allows you to pick colors from your surroundings
            using your camera. To provide this functionality, we need access to
            your camera. We respect your privacy —{" "}
            <strong>
              all data stays on your device, and we do not store or send this
              information anywhere.
            </strong>
          </p>
        </div>
        <div className="my-4">
          <h3 className="text-lg font-semibold mb-1">
            Cookies Consent <Cookie className="inline pl-1" />
          </h3>
          <p className="text-sm">
            We also use cookies for analytics to understand how you use our app
            and to improve your experience.{" "}
            <strong>
              Your consent is needed for this. Even without accepting, the
              application will work fully for you — accepting helps us enhance
              the app for all users.{" "}
              {/* TODO: Add a link to the cookies policy page */}
              <a href="/privacy/cookies" className="underline">
                Learn more
              </a>
              .
            </strong>
          </p>
        </div>

        <SheetFooter className="flex flex-col gap-2">
          <Button
            onClick={() => {
              setConsent("all-cookies-accepted");
              onOpenChange(false);
            }}
          >
            Accept All Cookies
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setConsent("reject-non-essential-cookies");
              onOpenChange(false);
            }}
          >
            Reject Non-Essential Cookies
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
