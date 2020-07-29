import React from "react";
import reactCSS from "reactcss";
import _ from "lodash";
import { listOfNames } from "../../helpers/strings";

import FacebookCounterReaction from "./FacebookCounterReaction";

export const FacebookCounter = ({
  counters,
  user,
  important,
  onClick,
  bg,
  styleCounter,
  styleName
}) => {
  const styles = reactCSS({
    default: {
      counter: {
        display: "flex",
        cursor: "pointer"
      },
      name: {
        paddingLeft: "4px"
      }
    }
  });

  if (typeof styleCounter !== "undefined") {
    styles.counter = Object.assign(styles.counter, styleCounter);
  }

  if (typeof styleName !== "undefined") {
    styles.name = Object.assign(styles.name, styleName);
  }

  const groups = _.groupBy(counters, "emoji");
  const names = _.map(counters, "by");

  const nameString = [];
  if (_.includes(names, user)) {
    nameString.push("Bạn");
  }
  if (important.length) {
    if (_.includes(names, important[0])) {
      nameString.push(important[0]);
    }
    if (_.includes(names, important[1])) {
      nameString.push(important[1]);
    }
  }
  if (names.length - nameString.length > 0)
    nameString.push(`${names.length - nameString.length} người khác`);

  return (
    <div style={styles.counter} onClick={onClick}>
      {_.map(_.keys(groups), (reaction, i, reactions) => {
        return (
          <FacebookCounterReaction
            key={i}
            reaction={reaction}
            index={reactions.length - i}
            bg={bg}
          />
        );
      })}
      <div style={styles.name}>{listOfNames(nameString)}</div>
    </div>
  );
};

FacebookCounter.defaultProps = {
  important: [],
  bg: "#fff",
  styleCounter: {},
  styleName: {}
};

export default FacebookCounter;
