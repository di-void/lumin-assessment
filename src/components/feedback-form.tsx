import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { useComment } from "@/hooks/use-comment";
import { CommentItem } from "./comment-item";
import type { Comment } from "@/hooks/use-comment";

export default function FeedbackForm() {
  const {
    loading: { isFetching, isSubmitting },
    setState,
    comments,
    handleSubmit,
    comment,
  } = useComment();

  return (
    <div className="max-w-2xl w-full mx-auto p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full mb-8 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-purple-700">
              We Value Your Feedback
            </CardTitle>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent>
              <Input
                placeholder="Name"
                required
                value={comment.name}
                onChange={(e) => setState("name", e.target.value)}
              />
            </CardContent>
            <CardContent>
              <Textarea
                placeholder="Share your thoughts with us..."
                value={comment.text}
                onChange={(e) => setState("text", e.target.value)}
                className="min-h-[120px] resize-none"
                required
              />
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 transition-colors"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Feedback"
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-xl font-semibold mb-4 text-purple-700">
          Previous Feedback
        </h2>
        <div>
          {isFetching ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Fetching Comments...
            </>
          ) : (
            <Comments comments={comments} />
          )}
        </div>
      </motion.div>
    </div>
  );
}

function Comments({ comments }: { comments: Comment[] }) {
  if (comments.length === 0) {
    return <p>No feedback yet.</p>;
  }

  return (
    <div>
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment.text}
          timeStamp={comment.timeStamp}
          name={comment.name}
        />
      ))}
    </div>
  );
}
