import { MathHelper } from '@daign/math';
import { Observable } from '@daign/observable';

/**
 * Color
 */
export class Color extends Observable {
  // RGB color with opacity a
  private _r: number; // Integer 0-255
  private _g: number; // Integer 0-255
  private _b: number; // Integer 0-255
  private _a: number; // Float 0-1, 0 = transparent, 1 = opaque

  /**
   * Get the red channel value
   * @returns The red channel value
   */
  public get r(): number {
    return this._r;
  }

  /**
   * Set the red channel value
   * @param inputValue The red channel value
   */
  public set r( inputValue: number ) {
    let value = Math.round( inputValue );
    value = MathHelper.clamp( value, 0, 255 );

    // Only call observers if something changed.
    if ( this._r !== value ) {
      this._r = value;
      this.notifyObservers();
    }
  }

  /**
   * Get the green channel value
   * @returns The green channel value
   */
  public get g(): number {
    return this._g;
  }

  /**
   * Set the green channel value
   * @param inputValue The green channel value
   */
  public set g( inputValue: number ) {
    let value = Math.round( inputValue );
    value = MathHelper.clamp( value, 0, 255 );

    // Only call observers if something changed.
    if ( this._g !== value ) {
      this._g = value;
      this.notifyObservers();
    }
  }

  /**
   * Get the blue channel value
   * @returns The blue channel value
   */
  public get b(): number {
    return this._b;
  }

  /**
   * Set the blue channel value
   * @param inputValue The blue channel value
   */
  public set b( inputValue: number ) {
    let value = Math.round( inputValue );
    value = MathHelper.clamp( value, 0, 255 );

    // Only call observers if something changed.
    if ( this._b !== value ) {
      this._b = value;
      this.notifyObservers();
    }
  }

  /**
   * Get the opacity channel value
   * @returns The opacity channel value
   */
  public get a(): number {
    return this._a;
  }

  /**
   * Set the opacity channel value
   * @param inputValue The opacity channel value
   */
  public set a( inputValue: number ) {
    const value = MathHelper.clamp( inputValue, 0, 1 );

    // Only call observers if something changed.
    if ( this._a !== value ) {
      this._a = value;
      this.notifyObservers();
    }
  }

  /**
   * Get an RGBA string representation of the color
   * @returns The RGBA string
   */
  public get rgba(): string {
    return `rgba(${this.r},${this.g},${this.b},${this.a})`;
  }

  /**
   * Get a hexadecimal string representation of the color without opacity
   * @returns The hexadecimal string
   */
  public get hex(): string {
    return (
      // tslint:disable-next-line:no-bitwise
      `#${( ( 1 << 24 ) + ( this.r << 16 ) + ( this.g << 8 ) + this.b ).toString( 16 ).slice( 1 )}`
    );
  }

  /**
   * Constructor
   * @param r Red value
   * @param g Green value
   * @param b Blue value
   * @param a Opacity value
   */
  public constructor( r?: number, g?: number, b?: number, a?: number ) {
    super();
    this._r = 0;
    this._g = 0;
    this._b = 0;
    this._a = 0;

    // Set to black, fully opaque if no parameters passed.
    this.set(
      r || 0,
      g || 0,
      b || 0,
      ( a !== undefined ) ? a : 1
    );
  }

  /**
   * Set the values
   * @param rIn Red value
   * @param gIn Green value
   * @param bIn Blue value
   * @param aIn Opacity value
   * @returns A reference to itself
   */
  public set( rIn: number, gIn: number, bIn: number, aIn?: number ): Color {
    let r = Math.round( rIn );
    r = MathHelper.clamp( r, 0, 255 );

    let g = Math.round( gIn );
    g = MathHelper.clamp( g, 0, 255 );

    let b = Math.round( bIn );
    b = MathHelper.clamp( b, 0, 255 );

    let a = ( aIn !== undefined ) ? aIn : this._a;
    a = MathHelper.clamp( a, 0, 1 );

    // Only call observers if something changed.
    if ( this._r !== r || this._g !== g || this._b !== b || this._a !== a ) {
      this._r = r;
      this._g = g;
      this._b = b;
      this._a = a;
      this.notifyObservers();
    }
    return this;
  }

  /**
   * Set color from hexadecimal string and opacity value
   * @param hex The hexadecimal string
   * @param aIn Opacity value
   * @returns A reference to itself
   */
  public setFromHex( hex: string, aIn?: number ): Color {
    const r = parseInt( hex.substring( 1, 3 ), 16 );
    const g = parseInt( hex.substring( 3, 5 ), 16 );
    const b = parseInt( hex.substring( 5, 7 ), 16 );
    const a = ( aIn !== undefined ) ? aIn : this._a;

    this.set( r, g, b, a );
    return this;
  }

  /**
   * Set this color to the values of another color
   * @param c The other color
   * @returns A reference to itself
   */
  public copy( c: Color ): Color {
    this.set( c.r, c.g, c.b, c.a );
    return this;
  }

  /**
   * Create a new color object with the same values
   * @returns A new color object
   */
  public clone(): Color {
    return new Color( this.r, this.g, this.b, this.a );
  }

  /**
   * Test equality of values for two colors
   * @param c Another color
   * @returns Whether colors are equal
   */
  public equals( c: Color ): boolean {
    return (
      ( this.r === c.r ) &&
      ( this.g === c.g ) &&
      ( this.b === c.b ) &&
      ( this.a === c.a )
    );
  }

  /**
   * Linear interpolation between two colors
   * @param start The start color
   * @param end The end color
   * @param t The interpolation rate from 0 to 1
   * @returns A reference to itself
   */
  public lerp( start: Color, end: Color, t: number ): Color {
    this.set(
      MathHelper.lerp( start.r, end.r, t ),
      MathHelper.lerp( start.g, end.g, t ),
      MathHelper.lerp( start.b, end.b, t ),
      MathHelper.lerp( start.a, end.a, t )
    );
    return this;
  }
}
