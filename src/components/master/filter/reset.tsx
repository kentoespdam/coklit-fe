"use client"
import { Button } from "@ui/button";
import { useRouter } from "next/navigation";

const ResetFilter = () => {
    const { replace } = useRouter()
    const doReset = () => {
        replace(`${location.pathname}`)
    };
    return (
        <Button
            type="reset"
            variant="destructive"
            onClick={doReset}
        >
            RESET
        </Button>
    );
}

export default ResetFilter;