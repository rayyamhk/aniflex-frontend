type cssModule = {
  readonly [key: string]: string;
};

export default function useStyle(styles: cssModule) {
  return (...classNames: unknown[]) => {
    const classes: string[] = [];
    classNames.forEach((className) => {
      if (typeof className === 'string' && className !== '') {
        classes.push(styles[className] || className);
      }
    });
    return classes.join(' ');
  };
}
