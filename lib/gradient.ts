import { MathHelper } from '@daign/math';
import { Observable } from '@daign/observable';

import { Color } from './color';

/**
 * Internal class for a color point in a gradient
 */
class ColorStop extends Observable {
  private _position: number; // From 0 to 1
  private _color: Color | undefined;
  private colorSubscriptionRemover: ( () => void ) | undefined;

  /**
   * Getter for the position value
   * @returns The position value
   */
  public get position(): number {
    return this._position;
  }

  /**
   * Setter for the position value
   * @param inputValue The position value
   */
  public set position( inputValue: number ) {
    const value = MathHelper.clamp( inputValue, 0, 1 );

    // Only call observers if something changed.
    if ( this._position !== value ) {
      this._position = value;
      this.notifyObservers();
    }
  }

  /**
   * Getter for the color value
   * @returns The color value
   */
  public get color(): Color {
    if ( !this._color ) {
      throw new Error( 'Color not defined for color stop.' );
    }
    return this._color;
  }

  /**
   * Constructor
   * @param position The position value
   * @param color The color value
   */
  public constructor( position: number, color: Color ) {
    super();

    const p = MathHelper.clamp( position, 0, 1 );
    this._position = p;
    // The passed color is used directly, not cloned.
    this._color = color;

    // Notify observers when color has changes.
    const callback = (): void => {
      this.notifyObservers();
    };
    this.colorSubscriptionRemover = this._color.subscribeToChanges( callback );
  }

  /**
   * Clear the non-primitive properties and remove subscriptions
   */
  public clear(): void {
    this._color = undefined;

    if ( this.colorSubscriptionRemover ) {
      this.colorSubscriptionRemover();
      this.colorSubscriptionRemover = undefined;
    }
    this.clearObservers();
  }
}

/**
 * Linear gradient with multiple color stops
 */
export class Gradient extends Observable {
  private _stops: ColorStop[];
  private stopSubscriptionRemovers: ( () => void )[];

  /**
   * Getter for the color stops
   * @returns The color stops
   */
  public get stops(): ColorStop[] {
    return this._stops;
  }

  /**
   * Constructor
   */
  public constructor() {
    super();
    this._stops = [];
    this.stopSubscriptionRemovers = [];
  }

  /**
   * Add a new color stop
   * @param position The position value from 0 to 1
   * @param color The color value
   * @returns A reference to itself
   */
  public addColorStop( position: number, color: Color ): Gradient {
    const colorStop = new ColorStop( position, color );
    this._stops.push( colorStop );

    // Notify observers when color stop changes.
    const callback = (): void => {
      this.sortStops();
      this.notifyObservers();
    };
    this.stopSubscriptionRemovers.push( colorStop.subscribeToChanges( callback ) );

    this.sortStops();
    this.notifyObservers();
    return this;
  }

  /**
   * Calculate the interpolated color at a given position on the gradient
   * @param t The gradient position from 0 to 1
   * @returns The calculated color
   */
  public colorAt( t: number ): Color {
    /* Search for the index of the lowest stop position bigger than t, or length of array if no stop
     * position is bigger than t. */
    let u = 0;
    while ( this._stops[ u ] && this._stops[ u ].position < t && u < this._stops.length ) {
      u += 1;
    }

    if ( u === 0 ) {
      return this._stops[ 0 ].color.clone();
    } else if ( u === this._stops.length ) {
      return this._stops[ this._stops.length - 1 ].color.clone();
    } else {
      const lowerStop = this._stops[ u - 1 ];
      const upperStop = this._stops[ u ];
      const tSection = ( t - lowerStop.position ) / ( upperStop.position - lowerStop.position );

      const result = new Color();
      result.lerp( lowerStop.color, upperStop.color, tSection );
      return result;
    }
  }

  /**
   * Remove all color stops
   * @returns A reference to itself
   */
   public clear(): Gradient {
     // Remove change subscriptions on stops.
     this.stopSubscriptionRemovers.forEach( ( callback: () => void ): void => {
       callback();
     } );
     this.stopSubscriptionRemovers = [];

     // Need to call clear on all ColorStops because they hold references to the color objects.
     this._stops.forEach( ( c: ColorStop ): void => {
       c.clear();
     } );
     this._stops = [];

     return this;
   }

  /**
   * Set this gradient to the deep copied color stops of another gradient
   * @param g The other gradient
   * @returns A reference to itself
   */
  public copy( g: Gradient ): Gradient {
    this.clear();

    g.stops.forEach( ( s: ColorStop ): void => {
      this.addColorStop( s.position, s.color.clone() );
    } );

    return this;
  }

  /**
   * Generate a new instance with the same deep copied color stops
   * @returns A new gradient
   */
  public clone(): Gradient {
    return new Gradient().copy( this );
  }

  /**
   * Sorts the color stops
   * @returns A reference to itself
   */
  private sortStops(): Gradient {
    this._stops.sort( ( a: ColorStop, b: ColorStop ): number => {
      if ( a.position < b.position ) {
        return -1;
      } else if ( a.position > b.position ) {
        return 1;
      } else {
        return 0;
      }
    } );
    return this;
  }
}
