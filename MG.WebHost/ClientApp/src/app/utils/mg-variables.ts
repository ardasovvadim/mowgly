export abstract class MgVariables {
  public static readonly SmBreakpoint: number = 640;
  public static readonly MdBreakpoint: number = 960;
  public static readonly LgBreakpoint: number = 1200;
  public static readonly XlBreakpoint: number = 1600;
}

export abstract class MgColors {
  public static readonly GreenMain: string = '#52926C';
  public static readonly YellowMain: string = '#F6DF32';
  public static readonly GreenText: string = '#344B35';
  public static readonly White: string = '#fff';
  public static readonly LightBackground: string = '#F6F9F6';

  public static getColor = (colorName: string) => MgColors.colorNames[colorName];

  private static colorNames: {[key: string]: string} = {
    'green-main': MgColors.GreenMain,
    'yellow-main': MgColors.YellowMain,
    'green-text': MgColors.GreenText,
    'white': MgColors.White,
    'light-background': MgColors.LightBackground
  }
}
