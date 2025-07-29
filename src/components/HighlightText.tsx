import React, { memo } from 'react';
import { StyleProp, TextStyle } from 'react-native';
import AppText from './AppText';

type TagConfigMap = {
  [tag: string]: {
    style: StyleProp<TextStyle>;
    onPress?: () => void;
  };
};

type Props = {
  text: string;
  style?: StyleProp<TextStyle>;
  tagConfigMap: TagConfigMap;
};

function getTagName(htmlString: string) {
  const tagMatch = htmlString.match(/<\s*([a-zA-Z0-9-]+)/);
  return tagMatch ? tagMatch[1] : null;
}

const HighlightText = ({ text, style, tagConfigMap }: Props) => {
  const splitRegex = /\s*((?:[^\s<]*<\w[^>]*>[\s\S]*?<\/\w[^>]*>)+[^\s<]*)\s*/;
  const htmRegex = /(<([^>]+)>)/gi;

  const rawText = text
    .split(splitRegex)
    .map((x) => x.trim())
    .filter(Boolean);
  return (
    <AppText style={style}>
      {rawText.map((child: string, i: number) => {
        const isLastElement = i === rawText.length - 1;
        const isHighlightPart = htmRegex.test(child);
        if (isHighlightPart) {
          const tagName = getTagName(child) as string;
          const childStyle = tagConfigMap[tagName]?.style;
          const childOnPress = tagConfigMap[tagName]?.onPress || undefined;
          return (
            <AppText
              key={i.toString()}
              style={childStyle}
              onPress={childOnPress}
            >{`${child.replace(htmRegex, '')}${!isLastElement ? ' ' : ''}`}</AppText>
          );
        }
        return (
          <AppText
            key={i.toString()}
          >{`${child}${!isLastElement ? ' ' : ''}`}</AppText>
        );
      })}
    </AppText>
  );
};

export default memo(HighlightText);
