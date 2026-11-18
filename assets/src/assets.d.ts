/// <reference types="react" />

declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.svg?react' {
  import * as React from 'react';
  const ReactComponent: React.FunctionComponent<React.ComponentProps<'svg'> & { title?: string }>;
  export default ReactComponent;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}
