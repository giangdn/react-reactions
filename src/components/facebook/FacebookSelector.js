import React from "react";
import reactCSS from "reactcss";
import _ from "lodash";
import icons from "../../helpers/icons";

import FacebookSelectorEmoji from "./FacebookSelectorEmoji";

export const FacebookSelector = ({
  iconSize,
  reactions,
  variant,
  onSelect,
  customIcons,
  styleSelector
}) => {
  const styles = reactCSS({
    default: {
      selector: {
        backgroundColor: "#fff",
        borderRadius: "50px",
        padding: "2px",
        boxShadow: "0 0 0 1px rgba(0, 0, 0, .05), 0 1px 2px rgba(0, 0, 0, .15)",
        display: "flex"
      },
      icon: {
        width: `${iconSize + 10}px`
      }
    }
  });

  if (typeof styleSelector !== "undefined") {
    styles.selector = Object.assign(styles.selector, styleSelector);
  }

  return (
    <div style={styles.selector}>
      {_.map(reactions, reaction => {
        return (
          <div style={styles.icon} key={reaction}>
            <FacebookSelectorEmoji
              icon={
                typeof customIcons !== "undefined"
                  ? customIcons.find(variant, reaction)
                  : icons.find(variant, reaction)
              }
              label={reaction}
              onSelect={onSelect}
            />
          </div>
        );
      })}
    </div>
  );
};

FacebookSelector.defaultProps = {
  reactions: ["like", "love", "haha", "wow", "sad", "angry"],
  iconSize: 38,
  variant: "facebook"
};

export default FacebookSelector;
