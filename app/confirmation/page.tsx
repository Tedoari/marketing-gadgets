import { Suspense } from "react";
import Confirmation from "./ConfirmationClient";

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div>Loading confirmation page...</div>}>
      <Confirmation />
    </Suspense>
  );
}
