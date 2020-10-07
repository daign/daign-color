import { expect } from 'chai';
import * as sinon from 'sinon';

import { Color } from '../lib/color';

describe( 'Color', (): void => {
  describe( 'getter r', (): void => {
    it( 'should get red channel value', (): void => {
      // Arrange
      const c = new Color( 1, 2, 3 );

      // Act and assert
      expect( c.r ).to.equal( 1 );
    } );
  } );

  describe( 'setter r', (): void => {
    it( 'should set red channel value', (): void => {
      // Arrange
      const c = new Color();

      // Act
      c.r = 1;

      // Assert
      expect( c.r ).to.equal( 1 );
    } );

    it( 'should round the input value for the red channel', (): void => {
      // Arrange
      const c = new Color();

      // Act
      c.r = 1.2;

      // Assert
      expect( c.r ).to.equal( 1 );
    } );

    it( 'should apply upper limit to the input value for the red channel', (): void => {
      // Arrange
      const c = new Color();

      // Act
      c.r = 300;

      // Assert
      expect( c.r ).to.equal( 255 );
    } );

    it( 'should apply lower limit to the input value for the red channel', (): void => {
      // Arrange
      const c = new Color();

      // Act
      c.r = -5;

      // Assert
      expect( c.r ).to.equal( 0 );
    } );

    it( 'should call notifyObservers', (): void => {
      // Arrange
      const c = new Color();
      const spy = sinon.spy( c as any, 'notifyObservers' );

      // Act
      c.r = 1;

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );

    it( 'should not call notifyObservers when value does not change', (): void => {
      // Arrange
      const c = new Color( 1, 2, 3 );
      const spy = sinon.spy( c as any, 'notifyObservers' );

      // Act
      c.r = 1;

      // Assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'getter g', (): void => {
    it( 'should get green channel value', (): void => {
      // Arrange
      const c = new Color( 1, 2, 3 );

      // Act and assert
      expect( c.g ).to.equal( 2 );
    } );
  } );

  describe( 'setter g', (): void => {
    it( 'should set green channel value', (): void => {
      // Arrange
      const c = new Color();

      // Act
      c.g = 2;

      // Assert
      expect( c.g ).to.equal( 2 );
    } );

    it( 'should round the input value for the green channel', (): void => {
      // Arrange
      const c = new Color();

      // Act
      c.g = 1.2;

      // Assert
      expect( c.g ).to.equal( 1 );
    } );

    it( 'should apply upper limit to the input value for the green channel', (): void => {
      // Arrange
      const c = new Color();

      // Act
      c.g = 300;

      // Assert
      expect( c.g ).to.equal( 255 );
    } );

    it( 'should apply lower limit to the input value for the green channel', (): void => {
      // Arrange
      const c = new Color();

      // Act
      c.g = -5;

      // Assert
      expect( c.g ).to.equal( 0 );
    } );

    it( 'should call notifyObservers', (): void => {
      // Arrange
      const c = new Color();
      const spy = sinon.spy( c as any, 'notifyObservers' );

      // Act
      c.g = 1;

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );

    it( 'should not call notifyObservers when value does not change', (): void => {
      // Arrange
      const c = new Color( 1, 2, 3 );
      const spy = sinon.spy( c as any, 'notifyObservers' );

      // Act
      c.g = 2;

      // Assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'getter b', (): void => {
    it( 'should get blue channel value', (): void => {
      // Arrange
      const c = new Color( 1, 2, 3 );

      // Act and assert
      expect( c.b ).to.equal( 3 );
    } );
  } );

  describe( 'setter b', (): void => {
    it( 'should set blue channel value', (): void => {
      // Arrange
      const c = new Color();

      // Act
      c.b = 1;

      // Assert
      expect( c.b ).to.equal( 1 );
    } );

    it( 'should round the input value for the blue channel', (): void => {
      // Arrange
      const c = new Color();

      // Act
      c.b = 1.2;

      // Assert
      expect( c.b ).to.equal( 1 );
    } );

    it( 'should apply upper limit to the input value for the blue channel', (): void => {
      // Arrange
      const c = new Color();

      // Act
      c.b = 300;

      // Assert
      expect( c.b ).to.equal( 255 );
    } );

    it( 'should apply lower limit to the input value for the blue channel', (): void => {
      // Arrange
      const c = new Color();

      // Act
      c.b = -5;

      // Assert
      expect( c.b ).to.equal( 0 );
    } );

    it( 'should call notifyObservers', (): void => {
      // Arrange
      const c = new Color();
      const spy = sinon.spy( c as any, 'notifyObservers' );

      // Act
      c.b = 1;

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );

    it( 'should not call notifyObservers when value does not change', (): void => {
      // Arrange
      const c = new Color( 1, 2, 3 );
      const spy = sinon.spy( c as any, 'notifyObservers' );

      // Act
      c.b = 3;

      // Assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'getter a', (): void => {
    it( 'should get opacity channel value', (): void => {
      // Arrange
      const c = new Color( 1, 2, 3, 0.2 );

      // Act and assert
      expect( c.a ).to.equal( 0.2 );
    } );
  } );

  describe( 'setter a', (): void => {
    it( 'should set opacity channel value', (): void => {
      // Arrange
      const c = new Color();

      // Act
      c.a = 0.2;

      // Assert
      expect( c.a ).to.equal( 0.2 );
    } );

    it( 'should apply upper limit to the input value for the opacity channel', (): void => {
      // Arrange
      const c = new Color();

      // Act
      c.a = 1.2;

      // Assert
      expect( c.a ).to.equal( 1 );
    } );

    it( 'should apply lower limit to the input value for the opacity channel', (): void => {
      // Arrange
      const c = new Color();

      // Act
      c.a = -1;

      // Assert
      expect( c.a ).to.equal( 0 );
    } );

    it( 'should call notifyObservers', (): void => {
      // Arrange
      const c = new Color();
      const spy = sinon.spy( c as any, 'notifyObservers' );

      // Act
      c.a = 0.2;

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );

    it( 'should not call notifyObservers when value does not change', (): void => {
      // Arrange
      const c = new Color( 1, 2, 3, 0.2 );
      const spy = sinon.spy( c as any, 'notifyObservers' );

      // Act
      c.a = 0.2;

      // Assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'getter rgba', (): void => {
    it( 'should get the rgba string representation', (): void => {
      // Arrange
      const c = new Color( 1, 2, 3, 0.2 );

      // Act and assert
      expect( c.rgba ).to.equal( 'rgba(1,2,3,0.2)' );
    } );
  } );

  describe( 'getter hex', (): void => {
    it( 'should get the hexadecimal string representation', (): void => {
      // Arrange
      const c = new Color( 255, 140, 100 );

      // Act and assert
      expect( c.hex ).to.equal( '#ff8c64' );
    } );
  } );

  describe( 'constructor', (): void => {
    it( 'should set the properties', (): void => {
      // Act
      const c = new Color( 1, 2, 3, 0.2 );

      // Assert
      expect( c.r ).to.equal( 1 );
      expect( c.g ).to.equal( 2 );
      expect( c.b ).to.equal( 3 );
      expect( c.a ).to.equal( 0.2 );
    } );

    it( 'should set the opacity channel to 1 if not passed', (): void => {
      // Act
      const c = new Color( 1, 2, 3 );

      // Assert
      expect( c.a ).to.equal( 1 );
    } );

    it( 'should set zero values for color channels if uninitialised', (): void => {
      // Act
      const c = new Color();

      // Assert
      expect( c.r ).to.equal( 0 );
      expect( c.g ).to.equal( 0 );
      expect( c.b ).to.equal( 0 );
    } );

    it( 'should apply limits to input values', (): void => {
      // Act
      const c = new Color( -6, 34, 300, 2 );
      const expected = new Color( 0, 34, 255, 1 );

      // Assert
      expect( c.equals( expected ) ).to.be.true;
    } );

    it( 'should round input values except for opacity', (): void => {
      // Act
      const c = new Color( 0.2, 5.5, 7.7, 0.2 );
      const expected = new Color( 0, 6, 8, 0.2 );

      // Assert
      expect( c.equals( expected ) ).to.be.true;
    } );
  } );

  describe( 'set', (): void => {
    it( 'should set the properties', (): void => {
      // Arrange
      const c = new Color();

      // Act
      c.set( 1, 2, 3, 0.2 );

      // Assert
      expect( c.r ).to.equal( 1 );
      expect( c.g ).to.equal( 2 );
      expect( c.b ).to.equal( 3 );
      expect( c.a ).to.equal( 0.2 );
    } );

    it( 'should apply limits to input values', (): void => {
      // Arrange
      const c = new Color();

      // Act
      c.set( -6, 34, 300, 2 );

      // Assert
      const expected = new Color( 0, 34, 255, 1 );
      expect( c.equals( expected ) ).to.be.true;
    } );

    it( 'should round input values except for opacity', (): void => {
      // Arrange
      const c = new Color();

      // Act
      c.set( 0.2, 5.5, 7.7, 0.2 );

      // Assert
      const expected = new Color( 0, 6, 8, 0.2 );
      expect( c.equals( expected ) ).to.be.true;
    } );

    it( 'should not change opacity channel if not passed', (): void => {
      // Arrange
      const c = new Color( 1, 2, 3, 0.2 );

      // Act
      c.set( 1, 2, 3 );

      // Assert
      expect( c.a ).to.equal( 0.2 );
    } );

    it( 'should call notifyObservers', (): void => {
      // Arrange
      const c = new Color();
      const spy = sinon.spy( c as any, 'notifyObservers' );

      // Act
      c.set( 1, 2, 3, 0.2 );

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );

    it( 'should not call notifyObservers when value does not change', (): void => {
      // Arrange
      const c = new Color( 1, 2, 3, 0.2 );
      const spy = sinon.spy( c as any, 'notifyObservers' );

      // Act
      c.set( 1, 2, 3, 0.2 );

      // Assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'setFromHex', (): void => {
    it( 'should set from hexadecimal string and opacity', (): void => {
      // Arrange
      const c = new Color();

      // Act
      c.setFromHex( '#ff8c64', 0.2 );

      // Assert
      const expected = new Color( 255, 140, 100, 0.2 );
      expect( c.equals( expected ) ).to.be.true;
    } );

    it( 'should not change opacity channel if not passed', (): void => {
      // Arrange
      const c = new Color( 1, 2, 3, 0.2 );

      // Act
      c.setFromHex( '#ff8c64' );

      // Assert
      expect( c.a ).to.equal( 0.2 );
    } );

    it( 'should call set', (): void => {
      // Arrange
      const c = new Color();
      const spy = sinon.spy( c, 'set' );

      // Act
      c.setFromHex( '#ff8c64' );

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );
  } );

  describe( 'copy', (): void => {
    it( 'should copy the properties', (): void => {
      // Arrange
      const c1 = new Color();
      const c2 = new Color( 1, 2, 3, 0.2 );

      // Act
      c1.copy( c2 );

      // Assert
      expect( c1.equals( c2 ) ).to.be.true;
    } );

    it( 'should call set', (): void => {
      // Arrange
      const c1 = new Color();
      const c2 = new Color( 1, 2, 3, 0.2 );
      const spy = sinon.spy( c1, 'set' );

      // Act
      c1.copy( c2 );

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );
  } );

  describe( 'clone', (): void => {
    it( 'should return an object with the same value', (): void => {
      // Arrange
      const c = new Color( 1, 2, 3, 0.2 );

      // Act
      const result = c.clone();

      // Assert
      expect( result.equals( c ) ).to.be.true;
    } );

    it( 'should not call notifyObservers when original value changes', (): void => {
      // Arrange
      const c = new Color( 1, 2, 3, 0.2 );
      const clone = c.clone();
      const spy = sinon.spy( clone as any, 'notifyObservers' );

      // Act
      c.r = 100;

      // Assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'equals', (): void => {
    it( 'should return true if values equal', (): void => {
      // Arrange
      const c1 = new Color( 1, 2, 3, 0.2 );
      const c2 = new Color( 1, 2, 3, 0.2 );

      // Act
      const result = c1.equals( c2 );

      // Assert
      expect( result ).to.be.true;
    } );

    it( 'should return false if values do not equal', (): void => {
      // Arrange
      const c1 = new Color( 1, 2, 3, 0.2 );
      const c2 = new Color( 1, 2, 4, 0.2 );

      // Act
      const result = c1.equals( c2 );

      // Assert
      expect( result ).to.be.false;
    } );
  } );

  describe( 'lerp', (): void => {
    it( 'should interpolate between two Colors', (): void => {
      // Arrange
      const c = new Color();
      const start = new Color( 0, 203, 190, 0.1 );
      const end = new Color( 0, 247, 98, 0.9 );

      // Act
      c.lerp( start, end, 0.25 );

      // Assert
      expect( c.r ).to.be.closeTo( 0, 0.001 );
      expect( c.g ).to.be.closeTo( 214, 0.001 );
      expect( c.b ).to.be.closeTo( 167, 0.001 );
      expect( c.a ).to.be.closeTo( 0.3, 0.001 );
    } );

    it( 'should call set', (): void => {
      // Arrange
      const c = new Color();
      const start = new Color();
      const end = new Color();
      const spy = sinon.spy( c, 'set' );

      // Act
      c.lerp( start, end, 0.5 );

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );
  } );
} );
