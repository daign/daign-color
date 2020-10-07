import { expect } from 'chai';
import * as sinon from 'sinon';

import { Color } from '../lib/color';
import { Gradient } from '../lib/gradient';

describe( 'Gradient', (): void => {
  describe( 'stops getter', (): void => {
    it( 'should return the stops array', (): void => {
      // Arrange
      const g = new Gradient();
      g.addColorStop( 0.5, new Color() );

      // Act
      const result = g.stops;

      // Assert
      expect( result.length ).to.equal( 1 );
    } );
  } );

  describe( 'constructor', (): void => {
    it( 'should initialize empty stop array', (): void => {
      // Act
      const g = new Gradient();

      // Assert
      expect( g.stops.length ).to.equal( 0 );
    } );
  } );

  describe( 'addColorStop', (): void => {
    it( 'should add a color stop', (): void => {
      // Arrange
      const g = new Gradient();

      // Act
      g.addColorStop( 0.2, new Color() );

      // Assert
      expect( g.stops.length ).to.equal( 1 );
    } );

    it( 'should call observers', (): void => {
      // Arrange
      const g = new Gradient();
      const spy = sinon.spy( g as any, 'notifyObservers' );

      // Act
      g.addColorStop( 0.2, new Color() );

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );

    it( 'should call sortStops', (): void => {
      // Arrange
      const g = new Gradient();
      const spy = sinon.spy( g as any, 'sortStops' );

      // Act
      g.addColorStop( 0.2, new Color() );

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );

    it( 'should call observers if the passed color changes', (): void => {
      // Arrange
      const g = new Gradient();
      const c = new Color();
      const spy = sinon.spy( g as any, 'notifyObservers' );

      // Act
      g.addColorStop( 0.2, c );
      spy.resetHistory();
      c.r = 1;

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );

    it( 'should call sortStops if the position of the color stop changes', (): void => {
      // Arrange
      const g = new Gradient();
      const spy = sinon.spy( g as any, 'sortStops' );

      // Act
      g.addColorStop( 0.2, new Color() );
      spy.resetHistory();
      g.stops[ 0 ].position = 0.3;

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );

    it( 'should not call sortStops if the position of the color stop is set to the same value',
      (): void => {
        // Arrange
        const g = new Gradient();
        const spy = sinon.spy( g as any, 'sortStops' );

        // Act
        g.addColorStop( 0.2, new Color() );
        spy.resetHistory();
        g.stops[ 0 ].position = 0.2;

        // Assert
        expect( spy.notCalled ).to.be.true;
      }
    );
  } );

  describe( 'colorAt', (): void => {
    it( 'should get the interpolated color', (): void => {
      // Arrange
      const g = new Gradient();
      const c1 = new Color( 0, 203, 190, 0.1 );
      const c2 = new Color( 0, 247, 98, 0.9 );

      g.addColorStop( 0, new Color() );
      g.addColorStop( 0.2, c1 );
      g.addColorStop( 0.6, c2 );

      // Act
      const result = g.colorAt( 0.3 );

      // Assert
      expect( result.r ).to.be.closeTo( 0, 0.001 );
      expect( result.g ).to.be.closeTo( 214, 0.001 );
      expect( result.b ).to.be.closeTo( 167, 0.001 );
      expect( result.a ).to.be.closeTo( 0.3, 0.001 );
    } );

    it( 'should get the color of the first stop if requested position is smaller', (): void => {
      // Arrange
      const g = new Gradient();
      const c = new Color( 0, 203, 190, 0.1 );

      g.addColorStop( 0.2, c );
      g.addColorStop( 0.6, new Color() );

      // Act
      const result = g.colorAt( 0.1 );

      // Assert
      expect( result.equals( c ) ).to.be.true;
    } );

    it( 'should get the color of the last stop if requested position is the same', (): void => {
      // Arrange
      const g = new Gradient();
      const c = new Color( 0, 203, 190, 0.1 );

      g.addColorStop( 0.2, new Color() );
      g.addColorStop( 1, c );

      // Act
      const result = g.colorAt( 1 );

      // Assert
      expect( result.equals( c ) ).to.be.true;
    } );

    it( 'should get the color of the last stop if requested position is bigger', (): void => {
      // Arrange
      const g = new Gradient();
      const c = new Color( 0, 203, 190, 0.1 );

      g.addColorStop( 0.2, new Color() );
      g.addColorStop( 0.8, c );

      // Act
      const result = g.colorAt( 1 );

      // Assert
      expect( result.equals( c ) ).to.be.true;
    } );

    it( 'should throw error when a color stop has been cleared', (): void => {
      // Arrange
      const g = new Gradient();
      g.addColorStop( 0.2, new Color() );
      g.stops[ 0 ].clear();

      // Act
      const badFn = (): void => {
        g.colorAt( 0 );
      };

      // Assert
      expect( badFn ).to.throw( Error );
    } );
  } );

  describe( 'clear', (): void => {
    it( 'should not call observers if referenced color changes afterwards', (): void => {
      // Arrange
      const g = new Gradient();
      const c = new Color();
      g.addColorStop( 0.2 , c );
      const spy = sinon.spy( g as any, 'notifyObservers' );

      // Act
      g.clear();
      spy.resetHistory();
      c.r = 1;

      // Assert
      expect( spy.notCalled ).to.be.true;
    } );

    it( 'should remove listeners from referenced colors', (): void => {
      // Arrange
      const g = new Gradient();
      const c = new Color();
      g.addColorStop( 0.2 , c );

      // Act
      g.clear();

      // Assert
      expect( ( c as any ).listeners.length ).to.equal( 0 );
    } );

    it( 'should not throw error when a color stop has been already cleared', (): void => {
      // Arrange
      const g = new Gradient();
      g.addColorStop( 0.2, new Color() );
      g.stops[ 0 ].clear();

      // Act
      const badFn = (): void => {
        g.clear();
      };

      // Assert
      expect( badFn ).to.not.throw();
    } );
  } );

  describe( 'copy', (): void => {
    it( 'should copy color value from other gradient', (): void => {
      // Arrange
      const g1 = new Gradient();
      const g2 = new Gradient();
      const c = new Color( 1, 2, 3 );
      g2.addColorStop( 0.2, c );

      // Act
      g1.copy( g2 );

      // Assert
      expect( g1.stops[ 0 ].color.equals( c ) ).to.be.true;
    } );

    it( 'should call observers', (): void => {
      // Arrange
      const g1 = new Gradient();
      const g2 = new Gradient();
      g2.addColorStop( 0.2, new Color() );
      const spy = sinon.spy( g1 as any, 'notifyObservers' );

      // Act
      g1.copy( g2 );

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );

    it( 'should not call observers if copied color changes', (): void => {
      // Arrange
      const g1 = new Gradient();
      const g2 = new Gradient();
      const c = new Color();
      g2.addColorStop( 0.2, c );
      const spy = sinon.spy( g1 as any, 'notifyObservers' );

      // Act
      g1.copy( g2 );
      spy.resetHistory();
      c.r = 1;

      // Assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'clone', (): void => {
    it( 'should copy color value from other gradient', (): void => {
      // Arrange
      const g = new Gradient();
      const c = new Color( 1, 2, 3 );
      g.addColorStop( 0.2, c );

      // Act
      const result = g.clone();

      // Assert
      expect( result.stops[ 0 ].color.equals( c ) ).to.be.true;
    } );

    it( 'should not call observers if copied color changes', (): void => {
      // Arrange
      const g = new Gradient();
      const c = new Color();
      g.addColorStop( 0.2, c );

      // Act
      const result = g.clone();
      const spy = sinon.spy( result as any, 'notifyObservers' );
      c.r = 1;

      // Assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'sortStops', (): void => {
    it( 'should sort the color stops', (): void => {
      // Arrange
      const g = new Gradient();
      g.addColorStop( 0.2, new Color() );
      g.addColorStop( 1, new Color() );
      g.addColorStop( 0, new Color() );

      // Act
      ( g as any ).sortStops();

      // Assert
      const stops = g.stops;
      expect( stops[ 0 ].position ).to.equal( 0 );
      expect( stops[ 1 ].position ).to.equal( 0.2 );
      expect( stops[ 2 ].position ).to.equal( 1 );
    } );

    it( 'should sort the color stops with same position', (): void => {
      // Arrange
      const g = new Gradient();
      g.addColorStop( 0.2, new Color() );
      g.addColorStop( 1, new Color() );
      g.addColorStop( 0.2, new Color() );
      g.addColorStop( 0, new Color() );

      // Act
      ( g as any ).sortStops();

      // Assert
      const stops = g.stops;
      expect( stops[ 0 ].position ).to.equal( 0 );
      expect( stops[ 1 ].position ).to.equal( 0.2 );
      expect( stops[ 2 ].position ).to.equal( 0.2 );
      expect( stops[ 3 ].position ).to.equal( 1 );
    } );
  } );
} );
