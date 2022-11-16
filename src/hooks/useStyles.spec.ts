import useStyles from './useStyles';

const cssModule = {
  headline: 'headline-hash',
  button: 'button-hash',
};

describe('useStyles', () => {
  it('Should return single className.', () => {
    const css = useStyles(cssModule);
    expect(css('headline')).toBe('headline-hash');
    expect(css('button')).toBe('button-hash');
  });

  it('Should return multiple classNames.', () => {
    const css = useStyles(cssModule);
    expect(css('headline', 'button')).toBe('headline-hash button-hash');
  });

  it('Should return multiple classNames with non-exist class.', () => {
    const css = useStyles(cssModule);
    expect(css('headline', 'something-else')).toBe('headline-hash something-else');
  });

  it('Should filter non-string.', () => {
    const css = useStyles(cssModule);
    expect(css(true && 'headline', false && 'button', undefined)).toBe('headline-hash');
  });
});