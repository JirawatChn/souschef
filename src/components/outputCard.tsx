import { Text } from "@radix-ui/themes";

export const OutputCard = ({ text }: { text: string }) => {
  return (
    <div className="bg-white px-5 py-3 rounded-full inline-block border border-gray-200">
      <Text as="span" size="3" className="text-black leading-snug block">
        {text}
      </Text>
    </div>
  );
};
