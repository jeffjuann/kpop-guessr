import { revalidatePath } from "next/cache";
import { Dialog, DialogContent, DialogFooter } from "./ui/dialog";
import { revalidatePage } from "@/lib/check-guess";
import { Button } from "./ui/button";

export default function WinDialog({ isOpen, guessCount }: { isOpen: boolean, guessCount: number })
{
  async function playAgain()
  {
      await revalidatePage();
      location.reload();
  }

  return (
    <Dialog open={isOpen}>
      <DialogContent className="max-w-[320px] rounded-sm bg-white p-5">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">You Win !!!</h2>
        <p>Congratulations, You have successfully guessed correctly after {guessCount} attempts.</p>
        <DialogFooter>
          <Button onClick={() => playAgain()} className="btn btn-primary">Play Again</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}