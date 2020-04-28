declare namespace LayoutScssModule {
  export interface ILayoutScss {
    soho_layout_center: string;
    soho_layout_content: string;
    soho_layout_header: string;
    soho_layout_menu: string;
    soho_layout_wrap: string;
    wrap: string;
  }
}

declare const LayoutScssModule: LayoutScssModule.ILayoutScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: LayoutScssModule.ILayoutScss;
};

export = LayoutScssModule;
