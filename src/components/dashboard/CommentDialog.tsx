import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useState } from "react";

interface Comment {
  id: string;
  text: string;
  author: string;
  date: string;
}

interface CommentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
  comments: Comment[];
  onAddComment: (orderId: string, text: string) => void;
}

export function CommentDialog({
  isOpen,
  onClose,
  orderId,
  comments = [],
  onAddComment,
}: CommentDialogProps) {
  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(orderId, newComment);
      setNewComment("");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Comments</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-4 max-h-[300px] overflow-y-auto">
            {comments.map((comment) => (
              <div key={comment.id} className="bg-gray-50 p-3 rounded-lg">
                <div className="flex justify-between items-start">
                  <span className="font-medium">{comment.author}</span>
                  <span className="text-sm text-gray-500">{comment.date}</span>
                </div>
                <p className="mt-1 text-sm">{comment.text}</p>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="min-h-[80px]"
            />
            <Button type="submit" className="self-end">
              Add Comment
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
