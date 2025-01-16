import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback } from "./ui/avatar";

type CommentItemProps = {
  name: string;
  timeStamp: string;
  comment: string;
};

export function CommentItem({ comment, timeStamp, name }: CommentItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="flex items-center mb-2">
            <Avatar className="h-8 w-8 mr-2">
              <AvatarFallback>{name.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-sm">{name}</p>
              <p className="text-xs text-gray-500">{timeStamp}</p>
            </div>
          </div>
          <p className="text-gray-800">{comment}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
