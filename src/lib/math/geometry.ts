/**
 * @file 2D Geometry Classes for CAD Application
 * @author [Your Name/Organization]
 * @version 1.0.0
 * Features chainable methods and static versions for flexible usage.
 */

/**
 * Represents a 2D point with x and y coordinates.
 */
export class Point {
  /** The x-coordinate of the point. */
  public x: number
  /** The y-coordinate of the point. */
  public y: number

  /**
   * Creates a new Point instance.
   * @param x The x-coordinate.
   * @param y The y-coordinate.
   */
  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  /**
   * Gets a new Point instance at (0,0).
   * @returns A new Point at the origin.
   */
  static get zero(): Point {
    return new Point(0, 0)
  }

  // Chainable instance methods

  /**
   * Adds the coordinates of another point to this point.
   * Modifies this point and returns it for chaining.
   * @param point The point to add.
   * @returns This point after addition.
   */
  public add(point: Point): Point {
    this.x += point.x
    this.y += point.y
    return this
  }

  /**
   * Subtracts the coordinates of another point from this point.
   * Modifies this point and returns it for chaining.
   * @param point The point to subtract.
   * @returns This point after subtraction.
   */
  public subtract(point: Point): Point {
    this.x -= point.x
    this.y -= point.y
    return this
  }

  /**
   * Multiplies the coordinates of this point by a scalar.
   * Modifies this point and returns it for chaining.
   * @param scalar The scalar value to multiply by.
   * @returns This point after multiplication.
   */
  public multiply(scalar: number): Point {
    this.x *= scalar
    this.y *= scalar
    return this
  }

  /**
   * Divides the coordinates of this point by a scalar.
   * Modifies this point and returns it for chaining.
   * @param scalar The scalar value to divide by.
   * @returns This point after division.
   * @throws Error if scalar is zero.
   */
  public divide(scalar: number): Point {
    if (scalar === 0) throw new Error('Division by zero')
    this.x /= scalar
    this.y /= scalar
    return this
  }

  /**
   * Normalizes this point to a unit length (length of 1).
   * If the length is zero, the point remains unchanged.
   * Modifies this point and returns it for chaining.
   * @returns This point after normalization.
   */
  public normalize(): Point {
    const length = this.length()
    if (length === 0) return this
    return this.divide(length)
  }

  /**
   * Rotates this point around the origin (0,0) by a given angle.
   * Modifies this point and returns it for chaining.
   * @param angle The angle in radians.
   * @returns This point after rotation.
   */
  public rotate(angle: number): Point {
    const cos = Math.cos(angle)
    const sin = Math.sin(angle)
    const newX = this.x * cos - this.y * sin
    const newY = this.x * sin + this.y * cos
    this.x = newX
    this.y = newY
    return this
  }

  // Utility methods

  /**
   * Calculates the Euclidean length (magnitude) of this point from the origin.
   * @returns The length of the point.
   */
  public length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }

  /**
   * Calculates the Euclidean distance to another point.
   * @param point The other point.
   * @returns The distance between this point and the given point.
   */
  public distanceTo(point: Point): number {
    return Point.distance(this, point)
  }

  /**
   * Creates a new Point instance with the same coordinates as this point.
   * @returns A new Point instance (a clone).
   */
  public clone(): Point {
    return new Point(this.x, this.y)
  }

  /**
   * Checks if this point is equal to another point within a given tolerance.
   * @param point The point to compare with.
   * @param tolerance The maximum difference allowed for coordinates to be considered equal. Defaults to 1e-10.
   * @returns True if the points are equal within tolerance, false otherwise.
   */
  public equals(point: Point, tolerance: number = 1e-10): boolean {
    return (
      Math.abs(this.x - point.x) < tolerance &&
      Math.abs(this.y - point.y) < tolerance
    )
  }

  /**
   * Returns a string representation of this point.
   * @returns A string in the format "Point(x, y)".
   */
  public toString(): string {
    return `Point(${this.x}, ${this.y})`
  }

  // Static methods

  /**
   * Creates a new Point by adding the coordinates of two points.
   * @param p1 The first point.
   * @param p2 The second point.
   * @returns A new Point representing the sum.
   */
  public static add(p1: Point, p2: Point): Point {
    return new Point(p1.x + p2.x, p1.y + p2.y)
  }

  /**
   * Creates a new Point by subtracting the coordinates of the second point from the first.
   * @param p1 The point to subtract from.
   * @param p2 The point to subtract.
   * @returns A new Point representing the difference.
   */
  public static subtract(p1: Point, p2: Point): Point {
    return new Point(p1.x - p2.x, p1.y - p2.y)
  }

  /**
   * Creates a new Point by multiplying the coordinates of a point by a scalar.
   * @param point The point to multiply.
   * @param scalar The scalar value.
   * @returns A new Point representing the scaled point.
   */
  public static multiply(point: Point, scalar: number): Point {
    return new Point(point.x * scalar, point.y * scalar)
  }

  /**
   * Creates a new Point by dividing the coordinates of a point by a scalar.
   * @param point The point to divide.
   * @param scalar The scalar value to divide by.
   * @returns A new Point representing the divided point.
   * @throws Error if scalar is zero.
   */
  public static divide(point: Point, scalar: number): Point {
    if (scalar === 0) throw new Error('Division by zero')
    return new Point(point.x / scalar, point.y / scalar)
  }

  /**
   * Calculates the Euclidean distance between two points.
   * @param p1 The first point.
   * @param p2 The second point.
   * @returns The distance between the two points.
   */
  public static distance(p1: Point, p2: Point): number {
    const dx = p2.x - p1.x
    const dy = p2.y - p1.y
    return Math.sqrt(dx * dx + dy * dy)
  }

  /**
   * Calculates the midpoint between two points.
   * @param p1 The first point.
   * @param p2 The second point.
   * @returns A new Point representing the midpoint.
   */
  public static midpoint(p1: Point, p2: Point): Point {
    return new Point((p1.x + p2.x) / 2, (p1.y + p2.y) / 2)
  }

  /**
   * Performs linear interpolation between two points.
   * @param p1 The starting point (t=0).
   * @param p2 The ending point (t=1).
   * @param t The interpolation parameter (typically between 0 and 1).
   * @returns A new Point representing the interpolated point.
   */
  public static lerp(p1: Point, p2: Point, t: number): Point {
    return new Point(p1.x + (p2.x - p1.x) * t, p1.y + (p2.y - p1.y) * t)
  }

  /**
   * Rotates a point around the origin (0,0) by a given angle.
   * @param point The point to rotate.
   * @param angle The angle in radians.
   * @returns A new Point representing the rotated point.
   */
  public static rotate(point: Point, angle: number): Point {
    const cos = Math.cos(angle)
    const sin = Math.sin(angle)
    return new Point(
      point.x * cos - point.y * sin,
      point.x * sin + point.y * cos,
    )
  }
}

/**
 * Represents a 2D vector, inheriting from Point.
 * Provides vector-specific operations like dot product, cross product, and angle calculations.
 */
export class Vector extends Point {
  /**
   * Creates a new Vector instance.
   * @param x The x-component of the vector.
   * @param y The y-component of the vector.
   */
  constructor(x: number, y: number) {
    super(x, y)
  }

  /**
   * Gets a new zero Vector (0,0).
   * @returns A new Vector with components (0,0).
   */
  public static override get zero(): Vector {
    return new Vector(0, 0)
  }

  /**
   * Gets a new one Vector (1,1).
   * @returns A new Vector with components (1,1).
   */
  public static get one(): Vector {
    return new Vector(1, 1)
  }

  // Vector-specific methods

  /**
   * Calculates the dot product of this vector and another vector.
   * @param vector The other vector.
   * @returns The dot product.
   */
  public dot(vector: Vector): number {
    return this.x * vector.x + this.y * vector.y
  }

  /**
   * Calculates the 2D cross product (magnitude of the 3D cross product) of this vector and another vector.
   * This is equivalent to `this.x * vector.y - this.y * vector.x`.
   * @param vector The other vector.
   * @returns The 2D cross product value.
   */
  public cross(vector: Vector): number {
    return this.x * vector.y - this.y * vector.x
  }

  /**
   * Calculates the angle of this vector in radians with respect to the positive x-axis.
   * The angle is in the range (-PI, PI].
   * @returns The angle in radians.
   */
  public angle(): number {
    return Math.atan2(this.y, this.x)
  }

  /**
   * Calculates the angle from this vector to another vector.
   * The angle is in the range (-PI, PI].
   * @param vector The target vector.
   * @returns The angle in radians.
   */
  public angleTo(vector: Vector): number {
    return Math.atan2(this.cross(vector), this.dot(vector))
  }

  /**
   * Calculates a perpendicular vector (rotated 90 degrees counter-clockwise).
   * This returns a new Vector instance.
   * @returns A new Vector perpendicular to this vector.
   */
  public perpendicular(): Vector {
    return new Vector(-this.y, this.x)
  }

  /**
   * Projects this vector onto another vector.
   * This returns a new Vector instance representing the projection.
   * @param onto The vector to project onto.
   * @returns A new Vector representing the projection, or a zero vector if `onto` has zero length.
   */
  public project(onto: Vector): Vector {
    const dot = this.dot(onto)
    const lengthSq = onto.x * onto.x + onto.y * onto.y // onto.length() squared
    if (lengthSq === 0) return new Vector(0, 0)
    const scalar = dot / lengthSq
    return Vector.multiply(onto, scalar) as Vector // Cast is safe as Vector.multiply returns Point, but contextually it's a Vector
  }

  /**
   * Reflects this vector across a normal vector.
   * Modifies this vector and returns it for chaining.
   * @param normal The normal vector (should be normalized for accurate reflection).
   * @returns This vector after reflection.
   */
  public reflect(normal: Vector): Vector {
    const dot = this.dot(normal)
    this.x -= 2 * dot * normal.x
    this.y -= 2 * dot * normal.y
    return this
  }

  /**
   * Normalizes this vector to a unit length (length of 1).
   * Overrides Point.normalize to ensure it returns a Vector.
   * Modifies this vector and returns it for chaining.
   * @returns This vector after normalization.
   */
  public override normalize(): Vector {
    return super.normalize() as Vector // Cast is safe as super.normalize returns `this` (which is a Vector)
  }

  /**
   * Creates a new Vector instance with the same components as this vector.
   * @returns A new Vector instance (a clone).
   */
  public override clone(): Vector {
    return new Vector(this.x, this.y)
  }

  /**
   * Returns a string representation of this vector.
   * @returns A string in the format "Vector(x, y)".
   */
  public override toString(): string {
    return `Vector(${this.x}, ${this.y})`
  }

  // Static methods

  /**
   * Creates a new Vector from an angle and magnitude.
   * @param angle The angle in radians.
   * @param magnitude The length of the vector. Defaults to 1.
   * @returns A new Vector.
   */
  public static fromAngle(angle: number, magnitude: number = 1): Vector {
    return new Vector(Math.cos(angle) * magnitude, Math.sin(angle) * magnitude)
  }

  /**
   * Calculates the dot product of two vectors.
   * @param v1 The first vector.
   * @param v2 The second vector.
   * @returns The dot product.
   */
  public static dot(v1: Vector, v2: Vector): number {
    return v1.x * v2.x + v1.y * v2.y
  }

  /**
   * Calculates the 2D cross product of two vectors.
   * @param v1 The first vector.
   * @param v2 The second vector.
   * @returns The 2D cross product value.
   */
  public static cross(v1: Vector, v2: Vector): number {
    return v1.x * v2.y - v1.y * v2.x
  }

  /**
   * Calculates the angle between two vectors.
   * The angle is in the range (-PI, PI].
   * @param v1 The first vector.
   * @param v2 The second vector.
   * @returns The angle in radians.
   */
  public static angle(v1: Vector, v2: Vector): number {
    return Math.atan2(Vector.cross(v1, v2), Vector.dot(v1, v2))
  }

  /**
   * Projects one vector onto another.
   * @param vector The vector to project.
   * @param onto The vector to project onto.
   * @returns A new Vector representing the projection, or a zero vector if `onto` has zero length.
   */
  public static project(vector: Vector, onto: Vector): Vector {
    const dot = Vector.dot(vector, onto)
    const lengthSq = onto.x * onto.x + onto.y * onto.y
    if (lengthSq === 0) return new Vector(0, 0)
    const scalar = dot / lengthSq
    // Vector.multiply returns Point, but result should be Vector
    const projectedPoint = Vector.multiply(onto, scalar)
    return new Vector(projectedPoint.x, projectedPoint.y)
  }

  /**
   * Reflects a vector across a normal vector.
   * @param vector The vector to reflect.
   * @param normal The normal vector (should be normalized for accurate reflection).
   * @returns A new Vector representing the reflected vector.
   */
  public static reflect(vector: Vector, normal: Vector): Vector {
    const dot = Vector.dot(vector, normal)
    return new Vector(
      vector.x - 2 * dot * normal.x,
      vector.y - 2 * dot * normal.y,
    )
  }
}

/**
 * Represents an axis-aligned rectangle defined by its top-left corner (x,y), width, and height.
 */
export class Rectangle {
  /** The x-coordinate of the top-left corner of the rectangle. */
  public x: number
  /** The y-coordinate of the top-left corner of the rectangle. */
  public y: number
  /** The width of the rectangle. Can be negative if not normalized. */
  public width: number
  /** The height of the rectangle. Can be negative if not normalized. */
  public height: number

  /**
   * Creates a new Rectangle instance.
   * @param x The x-coordinate of the top-left corner. Defaults to 0.
   * @param y The y-coordinate of the top-left corner. Defaults to 0.
   * @param width The width of the rectangle. Defaults to 0.
   * @param height The height of the rectangle. Defaults to 0.
   */
  constructor(
    x: number = 0,
    y: number = 0,
    width: number = 0,
    height: number = 0,
  ) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
  }

  // Chainable methods

  /**
   * Translates (moves) the rectangle by given deltas.
   * Modifies this rectangle and returns it for chaining.
   * @param dx The amount to move in the x-direction.
   * @param dy The amount to move in the y-direction.
   * @returns This rectangle after translation.
   */
  public translate(dx: number, dy: number): Rectangle {
    this.x += dx
    this.y += dy
    return this
  }

  /**
   * Scales the rectangle's width and height relative to its top-left corner.
   * Modifies this rectangle and returns it for chaining.
   * @param scaleX The factor to scale the width by.
   * @param scaleY The factor to scale the height by. If undefined, `scaleX` is used.
   * @returns This rectangle after scaling.
   */
  public scale(scaleX: number, scaleY: number = scaleX): Rectangle {
    this.width *= scaleX
    this.height *= scaleY
    return this
  }

  /**
   * Expands the rectangle by a given amount in all directions.
   * The top-left corner moves by (-amount, -amount) and width/height increase by 2 * amount.
   * Modifies this rectangle and returns it for chaining.
   * @param amount The amount to expand by. A negative amount will shrink the rectangle.
   * @returns This rectangle after expansion.
   */
  public expand(amount: number): Rectangle {
    this.x -= amount
    this.y -= amount
    this.width += amount * 2
    this.height += amount * 2
    return this
  }

  /**
   * Normalizes the rectangle so that its width and height are positive.
   * If width is negative, x is adjusted and width becomes positive.
   * If height is negative, y is adjusted and height becomes positive.
   * Modifies this rectangle and returns it for chaining.
   * @returns This rectangle after normalization.
   */
  public normalize(): Rectangle {
    if (this.width < 0) {
      this.x += this.width
      this.width = -this.width
    }
    if (this.height < 0) {
      this.y += this.height
      this.height = -this.height
    }
    return this
  }

  // Utility methods

  /**
   * Gets the x-coordinate of the left edge of the rectangle.
   * Assumes width is non-negative (call normalize() if unsure).
   * @returns The left edge x-coordinate.
   */
  public get left(): number {
    return this.x
  }

  /**
   * Gets the x-coordinate of the right edge of the rectangle.
   * Assumes width is non-negative (call normalize() if unsure).
   * @returns The right edge x-coordinate.
   */
  public get right(): number {
    return this.x + this.width
  }

  /**
   * Gets the y-coordinate of the top edge of the rectangle.
   * Assumes height is non-negative (call normalize() if unsure).
   * @returns The top edge y-coordinate.
   */
  public get top(): number {
    return this.y
  }

  /**
   * Gets the y-coordinate of the bottom edge of the rectangle.
   * Assumes height is non-negative (call normalize() if unsure).
   * @returns The bottom edge y-coordinate.
   */
  public get bottom(): number {
    return this.y + this.height
  }

  /**
   * Gets the x-coordinate of the center of the rectangle.
   * Assumes width is non-negative (call normalize() if unsure).
   * @returns The center x-coordinate.
   */
  public get centerX(): number {
    return this.x + this.width / 2
  }

  /**
   * Gets the y-coordinate of the center of the rectangle.
   * Assumes height is non-negative (call normalize() if unsure).
   * @returns The center y-coordinate.
   */
  public get centerY(): number {
    return this.y + this.height / 2
  }

  /**
   * Gets the center point of the rectangle.
   * Assumes width/height are non-negative (call normalize() if unsure).
   * @returns A new Point representing the center.
   */
  public center(): Point {
    return new Point(this.centerX, this.centerY)
  }

  /**
   * Gets the top-left corner point of the rectangle.
   * @returns A new Point representing the top-left corner.
   */
  public topLeft(): Point {
    return new Point(this.x, this.y)
  }

  /**
   * Gets the top-right corner point of the rectangle.
   * Assumes width is non-negative (call normalize() if unsure).
   * @returns A new Point representing the top-right corner.
   */
  public topRight(): Point {
    return new Point(this.right, this.y)
  }

  /**
   * Gets the bottom-left corner point of the rectangle.
   * Assumes height is non-negative (call normalize() if unsure).
   * @returns A new Point representing the bottom-left corner.
   */
  public bottomLeft(): Point {
    return new Point(this.x, this.bottom)
  }

  /**
   * Gets the bottom-right corner point of the rectangle.
   * Assumes width/height are non-negative (call normalize() if unsure).
   * @returns A new Point representing the bottom-right corner.
   */
  public bottomRight(): Point {
    return new Point(this.right, this.bottom)
  }

  /**
   * Calculates the area of the rectangle.
   * Assumes width/height are non-negative (call normalize() if unsure).
   * @returns The area of the rectangle.
   */
  public area(): number {
    return this.width * this.height
  }

  /**
   * Calculates the perimeter of the rectangle.
   * Assumes width/height are non-negative (call normalize() if unsure).
   * @returns The perimeter of the rectangle.
   */
  public perimeter(): number {
    return 2 * (this.width + this.height)
  }

  /**
   * Checks if this rectangle contains a given point or another rectangle.
   * Assumes this rectangle has non-negative width and height.
   * @param arg A Point or another Rectangle.
   * @returns True if the point or other rectangle is contained within this rectangle, false otherwise.
   */
  public contains(arg: Point | Rectangle): boolean {
    if (arg instanceof Point) {
      return (
        arg.x >= this.x &&
        arg.x <= this.right &&
        arg.y >= this.y &&
        arg.y <= this.bottom
      )
    } else {
      // arg is Rectangle
      return (
        arg.x >= this.x &&
        arg.right <= this.right &&
        arg.y >= this.y &&
        arg.bottom <= this.bottom
      )
    }
  }

  /**
   * Checks if this rectangle intersects with another rectangle.
   * Assumes both rectangles have non-negative width and height.
   * @param rect The other rectangle.
   * @returns True if the rectangles intersect, false otherwise.
   */
  public intersects(rect: Rectangle): boolean {
    return !(
      rect.x > this.right ||
      rect.right < this.x ||
      rect.y > this.bottom ||
      rect.bottom < this.y
    )
  }

  /**
   * Calculates the intersection of this rectangle with another rectangle.
   * Assumes both rectangles have non-negative width and height.
   * @param rect The other rectangle.
   * @returns A new Rectangle representing the intersection, or null if they do not intersect.
   */
  public intersection(rect: Rectangle): Rectangle | null {
    if (!this.intersects(rect)) return null

    const x = Math.max(this.x, rect.x)
    const y = Math.max(this.y, rect.y)
    const right = Math.min(this.right, rect.right)
    const bottom = Math.min(this.bottom, rect.bottom)

    return new Rectangle(x, y, right - x, bottom - y)
  }

  /**
   * Computes the union of this rectangle with another rectangle.
   * The union is the smallest rectangle that contains both rectangles.
   * Modifies this rectangle to become the union and returns it for chaining.
   * Assumes both rectangles have non-negative width and height.
   * @param rect The other rectangle.
   * @returns This rectangle, modified to be the union.
   */
  public union(rect: Rectangle): Rectangle {
    const x = Math.min(this.x, rect.x)
    const y = Math.min(this.y, rect.y)
    const right = Math.max(this.right, rect.right)
    const bottom = Math.max(this.bottom, rect.bottom)

    this.x = x
    this.y = y
    this.width = right - x
    this.height = bottom - y
    return this
  }

  /**
   * Creates a new Rectangle instance with the same properties as this rectangle.
   * @returns A new Rectangle instance (a clone).
   */
  public clone(): Rectangle {
    return new Rectangle(this.x, this.y, this.width, this.height)
  }

  /**
   * Checks if this rectangle is equal to another rectangle within a given tolerance.
   * @param rect The rectangle to compare with.
   * @param tolerance The maximum difference allowed for properties to be considered equal. Defaults to 1e-10.
   * @returns True if the rectangles are equal within tolerance, false otherwise.
   */
  public equals(rect: Rectangle, tolerance: number = 1e-10): boolean {
    return (
      Math.abs(this.x - rect.x) < tolerance &&
      Math.abs(this.y - rect.y) < tolerance &&
      Math.abs(this.width - rect.width) < tolerance &&
      Math.abs(this.height - rect.height) < tolerance
    )
  }

  /**
   * Returns a string representation of this rectangle.
   * @returns A string in the format "Rectangle(x, y, width, height)".
   */
  public toString(): string {
    return `Rectangle(${this.x}, ${this.y}, ${this.width}, ${this.height})`
  }

  // Static methods

  /**
   * Creates a new Rectangle defined by two opposite corner points.
   * The resulting rectangle will have non-negative width and height.
   * @param p1 The first corner point.
   * @param p2 The second corner point.
   * @returns A new Rectangle instance.
   */
  public static fromPoints(p1: Point, p2: Point): Rectangle {
    const x = Math.min(p1.x, p2.x)
    const y = Math.min(p1.y, p2.y)
    const width = Math.abs(p2.x - p1.x)
    const height = Math.abs(p2.y - p1.y)
    return new Rectangle(x, y, width, height)
  }

  /**
   * Creates a new Rectangle from a center point, width, and height.
   * @param center The center point of the rectangle.
   * @param width The width of the rectangle.
   * @param height The height of the rectangle.
   * @returns A new Rectangle instance.
   */
  public static fromCenter(
    center: Point,
    width: number,
    height: number,
  ): Rectangle {
    return new Rectangle(
      center.x - width / 2,
      center.y - height / 2,
      width,
      height,
    )
  }

  /**
   * Computes the union of two rectangles.
   * The union is the smallest rectangle that contains both given rectangles.
   * Assumes both input rectangles have non-negative width and height.
   * @param rect1 The first rectangle.
   * @param rect2 The second rectangle.
   * @returns A new Rectangle representing the union.
   */
  public static union(rect1: Rectangle, rect2: Rectangle): Rectangle {
    const x = Math.min(rect1.x, rect2.x)
    const y = Math.min(rect1.y, rect2.y)
    const right = Math.max(rect1.right, rect2.right)
    const bottom = Math.max(rect1.bottom, rect2.bottom)

    return new Rectangle(x, y, right - x, bottom - y)
  }

  /**
   * Calculates the intersection of two rectangles.
   * Assumes both input rectangles have non-negative width and height.
   * @param rect1 The first rectangle.
   * @param rect2 The second rectangle.
   * @returns A new Rectangle representing the intersection, or null if they do not intersect.
   */
  public static intersection(
    rect1: Rectangle,
    rect2: Rectangle,
  ): Rectangle | null {
    if (!rect1.intersects(rect2)) return null

    const x = Math.max(rect1.x, rect2.x)
    const y = Math.max(rect1.y, rect2.y)
    const right = Math.min(rect1.right, rect2.right)
    const bottom = Math.min(rect1.bottom, rect2.bottom)

    return new Rectangle(x, y, right - x, bottom - y)
  }
}

/**
 * Represents a circle defined by its center point and radius.
 */
export class Circle {
  /** The center point of the circle. */
  public center: Point
  /** The radius of the circle. Should be non-negative. */
  public radius: number

  /**
   * Creates a new Circle instance.
   * @param center The center point of the circle. Defaults to Point.zero.
   * @param radius The radius of the circle. Defaults to 0.
   */
  constructor(center: Point = Point.zero, radius: number = 0) {
    this.center = center
    this.radius = radius
  }

  // Chainable methods

  /**
   * Translates (moves) the circle by given deltas.
   * Modifies this circle's center and returns it for chaining.
   * @param dx The amount to move in the x-direction.
   * @param dy The amount to move in the y-direction.
   * @returns This circle after translation.
   */
  public translate(dx: number, dy: number): Circle {
    this.center.add(new Point(dx, dy))
    return this
  }

  /**
   * Scales the circle's radius by a given factor.
   * The center remains unchanged.
   * Modifies this circle's radius and returns it for chaining.
   * @param factor The factor to scale the radius by.
   * @returns This circle after scaling.
   */
  public scale(factor: number): Circle {
    this.radius *= factor
    return this
  }

  /**
   * Expands (or shrinks) the circle's radius by a given amount.
   * Modifies this circle's radius and returns it for chaining.
   * @param amount The amount to add to the radius. A negative amount will shrink the circle.
   * @returns This circle after expansion.
   */
  public expand(amount: number): Circle {
    this.radius += amount
    return this
  }

  // Utility methods

  /**
   * Calculates the area of the circle.
   * @returns The area of the circle.
   */
  public area(): number {
    return Math.PI * this.radius * this.radius
  }

  /**
   * Calculates the circumference of the circle.
   * @returns The circumference of the circle.
   */
  public circumference(): number {
    return 2 * Math.PI * this.radius
  }

  /**
   * Checks if this circle contains a given point.
   * A point on the boundary is considered contained.
   * @param point The point to check.
   * @returns True if the point is inside or on the boundary of the circle, false otherwise.
   */
  public contains(point: Point): boolean {
    return this.center.distanceTo(point) <= this.radius
  }

  /**
   * Checks if this circle intersects with another circle or a rectangle.
   * @param arg Another Circle or a Rectangle.
   * @returns True if this circle intersects with the given shape, false otherwise.
   */
  public intersects(arg: Circle | Rectangle): boolean {
    if (arg instanceof Circle) {
      const distance = this.center.distanceTo(arg.center)
      return distance <= this.radius + arg.radius
    } else {
      // arg is Rectangle
      // Find the closest point on the rectangle to the circle's center
      const closestX = Math.max(arg.x, Math.min(this.center.x, arg.right))
      const closestY = Math.max(arg.y, Math.min(this.center.y, arg.bottom))
      const distanceToClosestPoint = this.center.distanceTo(
        new Point(closestX, closestY),
      )
      return distanceToClosestPoint <= this.radius
    }
  }

  /**
   * Calculates the axis-aligned bounding box of this circle.
   * @returns A new Rectangle representing the bounding box.
   */
  public boundingBox(): Rectangle {
    return new Rectangle(
      this.center.x - this.radius,
      this.center.y - this.radius,
      this.radius * 2,
      this.radius * 2,
    )
  }

  /**
   * Gets a point on the circumference of the circle at a given angle.
   * @param angle The angle in radians (0 is typically to the right along the x-axis).
   * @returns A new Point on the circle's circumference.
   */
  public pointAt(angle: number): Point {
    return new Point(
      this.center.x + Math.cos(angle) * this.radius,
      this.center.y + Math.sin(angle) * this.radius,
    )
  }

  /**
   * Creates a new Circle instance with the same center and radius as this circle.
   * @returns A new Circle instance (a clone).
   */
  public clone(): Circle {
    return new Circle(this.center.clone(), this.radius)
  }

  /**
   * Checks if this circle is equal to another circle within a given tolerance.
   * @param circle The circle to compare with.
   * @param tolerance The maximum difference allowed for center coordinates and radius to be considered equal. Defaults to 1e-10.
   * @returns True if the circles are equal within tolerance, false otherwise.
   */
  public equals(circle: Circle, tolerance: number = 1e-10): boolean {
    return (
      this.center.equals(circle.center, tolerance) &&
      Math.abs(this.radius - circle.radius) < tolerance
    )
  }

  /**
   * Returns a string representation of this circle.
   * @returns A string in the format "Circle(Point(x, y), radius)".
   */
  public toString(): string {
    return `Circle(${this.center.toString()}, ${this.radius})`
  }

  // Static methods

  /**
   * Creates a new Circle that passes through three given points.
   * @param p1 The first point.
   * @param p2 The second point.
   * @param p3 The third point.
   * @returns A new Circle instance, or null if the points are collinear (no unique circle can be formed).
   */
  public static fromThreePoints(
    p1: Point,
    p2: Point,
    p3: Point,
  ): Circle | null {
    // Using the formula for the circumcircle of a triangle.
    // Denominator of the center coordinates
    const D =
      2 * (p1.x * (p2.y - p3.y) + p2.x * (p3.y - p1.y) + p3.x * (p1.y - p2.y))

    if (Math.abs(D) < 1e-10) return null // Points are collinear

    const p1Sq = p1.x * p1.x + p1.y * p1.y
    const p2Sq = p2.x * p2.x + p2.y * p2.y
    const p3Sq = p3.x * p3.x + p3.y * p3.y

    const centerX =
      (p1Sq * (p2.y - p3.y) + p2Sq * (p3.y - p1.y) + p3Sq * (p1.y - p2.y)) / D
    const centerY =
      (p1Sq * (p3.x - p2.x) + p2Sq * (p1.x - p3.x) + p3Sq * (p2.x - p1.x)) / D

    const center = new Point(centerX, centerY)
    const radius = center.distanceTo(p1)

    return new Circle(center, radius)
  }

  /**
   * Creates a new Circle from two points defining its diameter.
   * @param p1 One end point of the diameter.
   * @param p2 The other end point of the diameter.
   * @returns A new Circle instance.
   */
  public static fromDiameter(p1: Point, p2: Point): Circle {
    const center = Point.midpoint(p1, p2)
    const radius = Point.distance(p1, p2) / 2
    return new Circle(center, radius)
  }
}

/**
 * Represents a line segment defined by a start and an end point.
 */
export class Line {
  /** The starting point of the line segment. */
  public start: Point
  /** The ending point of the line segment. */
  public end: Point

  /**
   * Creates a new Line instance.
   * @param start The starting point. Defaults to Point.zero.
   * @param end The ending point. Defaults to Point.zero.
   */
  constructor(start: Point = Point.zero, end: Point = Point.zero) {
    this.start = start
    this.end = end
  }

  // Chainable methods

  /**
   * Translates (moves) the line segment by given deltas.
   * Modifies the start and end points of this line and returns it for chaining.
   * @param dx The amount to move in the x-direction.
   * @param dy The amount to move in the y-direction.
   * @returns This line after translation.
   */
  public translate(dx: number, dy: number): Line {
    this.start.add(new Point(dx, dy))
    this.end.add(new Point(dx, dy))
    return this
  }

  /**
   * Scales the line segment relative to an origin point.
   * Modifies the start and end points of this line and returns it for chaining.
   * @param factor The scaling factor.
   * @param origin The point about which to scale. Defaults to Point.zero.
   * @returns This line after scaling.
   */
  public scale(factor: number, origin: Point = Point.zero): Line {
    this.start.subtract(origin).multiply(factor).add(origin)
    this.end.subtract(origin).multiply(factor).add(origin)
    return this
  }

  /**
   * Rotates the line segment around an origin point by a given angle.
   * Modifies the start and end points of this line and returns it for chaining.
   * @param angle The angle in radians.
   * @param origin The point about which to rotate. Defaults to Point.zero.
   * @returns This line after rotation.
   */
  public rotate(angle: number, origin: Point = Point.zero): Line {
    this.start.subtract(origin).rotate(angle).add(origin)
    this.end.subtract(origin).rotate(angle).add(origin)
    return this
  }

  // Utility methods

  /**
   * Calculates the length of the line segment.
   * @returns The length of the line.
   */
  public length(): number {
    return this.start.distanceTo(this.end)
  }

  /**
   * Calculates the direction vector of the line segment (from start to end).
   * @returns A new Vector representing the direction.
   */
  public direction(): Vector {
    return new Vector(this.end.x - this.start.x, this.end.y - this.start.y)
  }

  /**
   * Calculates the normal vector of the line segment (perpendicular to the direction, rotated 90 degrees CCW, and normalized).
   * @returns A new Vector representing the normal.
   */
  public normal(): Vector {
    return this.direction().perpendicular().normalize()
  }

  /**
   * Calculates the midpoint of the line segment.
   * @returns A new Point representing the midpoint.
   */
  public midpoint(): Point {
    return Point.midpoint(this.start, this.end)
  }

  /**
   * Gets a point along the line segment at a given parameter t.
   * t=0 returns the start point, t=1 returns the end point.
   * Values of t outside [0,1] will extrapolate along the line.
   * @param t The parameter (typically between 0 and 1).
   * @returns A new Point on the line.
   */
  public pointAt(t: number): Point {
    return Point.lerp(this.start, this.end, t)
  }

  /**
   * Calculates the shortest distance from a point to this line segment.
   * @param point The point to calculate the distance to.
   * @returns The shortest distance from the point to the line segment.
   */
  public distanceToPoint(point: Point): number {
    const l2 = this.start.distanceTo(this.end) ** 2
    if (l2 === 0) return point.distanceTo(this.start) // Line is a point

    // Consider the line extending the segment.
    // P = A + t (B - A)
    // t = [(P-A) . (B-A)] / |B-A|^2
    const t =
      ((point.x - this.start.x) * (this.end.x - this.start.x) +
        (point.y - this.start.y) * (this.end.y - this.start.y)) /
      l2

    // Clamp t to the [0, 1] interval for the segment
    const tClamped = Math.max(0, Math.min(1, t))
    const projection = this.pointAt(tClamped)
    return point.distanceTo(projection)
  }

  /**
   * Checks if a point lies on this line segment within a given tolerance.
   * @param point The point to check.
   * @param tolerance The maximum distance allowed for the point to be considered on the line. Defaults to 1e-10.
   * @returns True if the point is on the line segment within tolerance, false otherwise.
   */
  public containsPoint(point: Point, tolerance: number = 1e-10): boolean {
    return this.distanceToPoint(point) <= tolerance
  }

  /**
   * Calculates the intersection point of this line segment with another line segment.
   * @param line The other line segment.
   * @returns A new Point representing the intersection, or null if the segments do not intersect or are collinear and overlapping.
   * Does not handle collinear overlapping segments returning an intersection point currently.
   */
  public intersects(line: Line): Point | null {
    const p0 = this.start
    const p1 = this.end
    const p2 = line.start
    const p3 = line.end

    const s1_x = p1.x - p0.x
    const s1_y = p1.y - p0.y
    const s2_x = p3.x - p2.x
    const s2_y = p3.y - p2.y

    const denominator = -s2_x * s1_y + s1_x * s2_y

    // Check if lines are parallel
    if (Math.abs(denominator) < 1e-10) {
      // TODO: Handle collinear overlapping case if needed
      return null // Parallel or collinear
    }

    const s = (-s1_y * (p0.x - p2.x) + s1_x * (p0.y - p2.y)) / denominator
    const t = (s2_x * (p0.y - p2.y) - s2_y * (p0.x - p2.x)) / denominator

    if (s >= 0 && s <= 1 && t >= 0 && t <= 1) {
      // Intersection point
      return new Point(p0.x + t * s1_x, p0.y + t * s1_y)
    }

    return null // No intersection within segments
  }

  /**
   * Calculates the axis-aligned bounding box of this line segment.
   * @returns A new Rectangle representing the bounding box.
   */
  public boundingBox(): Rectangle {
    const minX = Math.min(this.start.x, this.end.x)
    const minY = Math.min(this.start.y, this.end.y)
    const maxX = Math.max(this.start.x, this.end.x)
    const maxY = Math.max(this.start.y, this.end.y)

    return new Rectangle(minX, minY, maxX - minX, maxY - minY)
  }

  /**
   * Creates a new Line instance with the same start and end points as this line.
   * @returns A new Line instance (a clone).
   */
  public clone(): Line {
    return new Line(this.start.clone(), this.end.clone())
  }

  /**
   * Checks if this line segment is equal to another line segment within a given tolerance.
   * Order of start and end points matters.
   * @param line The line segment to compare with.
   * @param tolerance The maximum difference allowed for coordinates to be considered equal. Defaults to 1e-10.
   * @returns True if the line segments are equal within tolerance, false otherwise.
   */
  public equals(line: Line, tolerance: number = 1e-10): boolean {
    return (
      this.start.equals(line.start, tolerance) &&
      this.end.equals(line.end, tolerance)
    )
  }

  /**
   * Returns a string representation of this line segment.
   * @returns A string in the format "Line(Point(startX, startY), Point(endX, endY))".
   */
  public toString(): string {
    return `Line(${this.start.toString()}, ${this.end.toString()})`
  }

  // Static methods

  /**
   * Creates a new Line from a starting point, a direction vector, and a length.
   * @param point The starting point of the line.
   * @param direction The direction vector of the line (will be normalized).
   * @param length The length of the line.
   * @returns A new Line instance.
   */
  public static fromPointAndDirection(
    point: Point,
    direction: Vector,
    length: number,
  ): Line {
    const end = Point.add(
      point,
      Vector.multiply(direction.clone().normalize(), length),
    )
    return new Line(point.clone(), end)
  }

  /**
   * Creates a new Line from a starting point, an angle, and a length.
   * @param start The starting point of the line.
   * @param angle The angle of the line in radians (from the positive x-axis).
   * @param length The length of the line.
   * @returns A new Line instance.
   */
  public static fromAngle(start: Point, angle: number, length: number): Line {
    const end = new Point(
      start.x + Math.cos(angle) * length,
      start.y + Math.sin(angle) * length,
    )
    return new Line(start.clone(), end)
  }
}

/**
 * Represents a polygon defined by a list of vertices.
 * The vertices are stored in order. Polygons can be open or closed.
 */
export class Polygon {
  /**
   * The list of points defining the vertices of the polygon.
   * It's recommended to clone points before adding them if external modifications are possible.
   * This array is cloned upon construction and when new vertices are added/inserted.
   */
  public vertices: Point[]

  /**
   * Creates a new Polygon instance.
   * @param vertices An array of Points defining the polygon's vertices.
   * The provided array is cloned to prevent external modification of the Polygon's internal state.
   * Defaults to an empty array.
   */
  constructor(vertices: Point[] = []) {
    this.vertices = vertices.map((v) => v.clone())
  }

  // Chainable methods

  /**
   * Adds a new vertex to the end of the polygon's vertex list.
   * Modifies this polygon and returns it for chaining.
   * @param point The Point to add as a new vertex. The point is cloned.
   * @returns This polygon after adding the vertex.
   */
  public addVertex(point: Point): Polygon {
    this.vertices.push(point.clone())
    return this
  }

  /**
   * Inserts a new vertex at a specific index in the polygon's vertex list.
   * Modifies this polygon and returns it for chaining.
   * @param index The index at which to insert the new vertex.
   * @param point The Point to insert. The point is cloned.
   * @returns This polygon after inserting the vertex.
   */
  public insertVertex(index: number, point: Point): Polygon {
    this.vertices.splice(index, 0, point.clone())
    return this
  }

  /**
   * Removes a vertex at a specific index from the polygon's vertex list.
   * Modifies this polygon and returns it for chaining.
   * @param index The index of the vertex to remove.
   * @returns This polygon after removing the vertex.
   */
  public removeVertex(index: number): Polygon {
    if (index >= 0 && index < this.vertices.length) {
      this.vertices.splice(index, 1)
    }
    return this
  }

  /**
   * Translates (moves) all vertices of the polygon by given deltas.
   * Modifies this polygon and returns it for chaining.
   * @param dx The amount to move in the x-direction.
   * @param dy The amount to move in the y-direction.
   * @returns This polygon after translation.
   */
  public translate(dx: number, dy: number): Polygon {
    this.vertices.forEach((vertex) => vertex.add(new Point(dx, dy)))
    return this
  }

  /**
   * Scales all vertices of the polygon relative to an origin point.
   * Modifies this polygon and returns it for chaining.
   * @param factor The scaling factor.
   * @param origin The point about which to scale. Defaults to the polygon's centroid if calculable, otherwise Point.zero.
   * @returns This polygon after scaling.
   */
  public scale(factor: number, origin?: Point): Polygon {
    const actualOrigin =
      origin || (this.vertices.length > 0 ? this.centroid() : Point.zero)
    this.vertices.forEach((vertex) => {
      vertex.subtract(actualOrigin).multiply(factor).add(actualOrigin)
    })
    return this
  }

  /**
   * Rotates all vertices of the polygon around an origin point by a given angle.
   * Modifies this polygon and returns it for chaining.
   * @param angle The angle in radians.
   * @param origin The point about which to rotate. Defaults to the polygon's centroid if calculable, otherwise Point.zero.
   * @returns This polygon after rotation.
   */
  public rotate(angle: number, origin?: Point): Polygon {
    const actualOrigin =
      origin || (this.vertices.length > 0 ? this.centroid() : Point.zero)
    this.vertices.forEach((vertex) => {
      vertex.subtract(actualOrigin).rotate(angle).add(actualOrigin)
    })
    return this
  }

  /**
   * Reverses the order of vertices in the polygon.
   * Modifies this polygon and returns it for chaining.
   * @returns This polygon with reversed vertex order.
   */
  public reverse(): Polygon {
    this.vertices.reverse()
    return this
  }

  /**
   * Closes the polygon by adding a copy of the first vertex to the end if it's not already closed and has at least 3 vertices.
   * Modifies this polygon and returns it for chaining.
   * @returns This polygon, potentially closed.
   */
  public close(): Polygon {
    if (this.vertices.length > 2 && !this.isClosed()) {
      this.vertices.push(this.vertices[0].clone())
    }
    return this
  }

  // Utility methods

  /**
   * Gets the number of vertices in the polygon.
   * @returns The vertex count.
   */
  public get vertexCount(): number {
    return this.vertices.length
  }

  /**
   * Checks if the polygon is closed (i.e., the first and last vertices are the same).
   * Requires at least 3 vertices to be considered closed.
   * @returns True if the polygon is closed, false otherwise.
   */
  public isClosed(): boolean {
    return (
      this.vertices.length > 2 && // A polygon needs at least 3 distinct vertices to form an area, so >2 for closed check
      this.vertices[0].equals(this.vertices[this.vertices.length - 1])
    )
  }

  /**
   * Checks if the polygon is convex.
   * Assumes the polygon vertices are ordered (e.g., clockwise or counter-clockwise).
   * For a polygon with fewer than 3 vertices, it's considered not convex.
   * @returns True if the polygon is convex, false otherwise.
   */
  public isConvex(): boolean {
    if (this.vertices.length < 3) return false

    let sign = 0
    const n = this.vertices.length
    const pointsToTest = this.isClosed() ? n - 1 : n // If closed, last point is same as first, skip it in cross product loop

    for (let i = 0; i < pointsToTest; i++) {
      const p1 = this.vertices[i]
      const p2 = this.vertices[(i + 1) % n] // Loop back for last vertex
      const p3 = this.vertices[(i + 2) % n] // Loop back for last two vertices

      // Calculate the z-component of the cross product of (p2-p1) and (p3-p2)
      const crossProductZ =
        (p2.x - p1.x) * (p3.y - p2.y) - (p2.y - p1.y) * (p3.x - p2.x)

      // Using a small tolerance for floating point comparisons
      if (Math.abs(crossProductZ) > 1e-10) {
        const currentSign = crossProductZ > 0 ? 1 : -1
        if (sign === 0) {
          sign = currentSign // Initialize sign with the first non-collinear turn
        } else if (sign !== currentSign) {
          return false // Change in turn direction means it's concave
        }
      }
      // If crossProductZ is close to zero, points are collinear, continue checking
    }

    return true // All turns had the same sign (or were collinear)
  }

  /**
   * Calculates the area of the polygon using the shoelace formula.
   * Works for simple polygons (non-self-intersecting).
   * The result is always positive.
   * @returns The area of the polygon, or 0 if it has fewer than 3 vertices.
   */
  public area(): number {
    if (this.vertices.length < 3) return 0

    let area = 0
    const n = this.vertices.length

    for (let i = 0; i < n; i++) {
      const j = (i + 1) % n // Next vertex, wraps around for the last one
      area += this.vertices[i].x * this.vertices[j].y
      area -= this.vertices[j].x * this.vertices[i].y
    }

    return Math.abs(area) / 2
  }

  /**
   * Calculates the perimeter of the polygon.
   * If the polygon is not closed, it calculates the sum of lengths of segments defined by the vertices.
   * If it's closed (first and last points are same), it still sums all segments including the one closing it.
   * @returns The perimeter of the polygon, or 0 if it has fewer than 2 vertices.
   */
  public perimeter(): number {
    if (this.vertices.length < 2) return 0

    let perimeter = 0
    const n = this.vertices.length
    const limit = this.isClosed() && n > 1 ? n - 1 : n // If closed and more than one vertex, don't double count last segment.

    for (let i = 0; i < limit; i++) {
      const p1 = this.vertices[i]
      const p2 = this.vertices[(i + 1) % n] // Ensure it wraps for open polygons as well to get the last segment
      perimeter += p1.distanceTo(p2)
    }
    // if polygon is explicitly closed (last vertex === first vertex), the loop above correctly sums lengths.
    // if polygon is implicitly closed (vertices[0] ... vertices[n-1]), then above loop does up to vertices[n-1] to vertices[0]
    // if it's open, it sums all defined segments.

    return perimeter
  }

  /**
   * Calculates the centroid (geometric center) of the polygon.
   * For simple polygons (non-self-intersecting).
   * @returns A new Point representing the centroid. Returns Point.zero if area is zero or polygon has no vertices.
   * For degenerate cases (like a line or point), it falls back to the arithmetic mean of vertices.
   */
  public centroid(): Point {
    if (this.vertices.length === 0) return Point.zero
    if (this.vertices.length < 3) {
      // For lines or points, arithmetic mean is reasonable
      let sumX = 0
      let sumY = 0
      this.vertices.forEach((v) => {
        sumX += v.x
        sumY += v.y
      })
      return new Point(sumX / this.vertices.length, sumY / this.vertices.length)
    }

    let cx = 0
    let cy = 0
    let signedArea = 0 // Use signed area for centroid formula
    const n = this.vertices.length

    for (let i = 0; i < n; i++) {
      const p1 = this.vertices[i]
      const p2 = this.vertices[(i + 1) % n] // Next vertex, wraps around

      const crossProductTerm = p1.x * p2.y - p2.x * p1.y
      signedArea += crossProductTerm
      cx += (p1.x + p2.x) * crossProductTerm
      cy += (p1.y + p2.y) * crossProductTerm
    }

    if (Math.abs(signedArea) < 1e-10) {
      // Fallback for zero-area polygons (e.g., collinear points forming a line)
      // to arithmetic mean of vertices.
      const sum = this.vertices.reduce(
        (acc, v) => acc.add(v.clone()),
        Point.zero,
      ) // Use clone to avoid modifying original sum
      return Point.divide(sum, this.vertices.length)
    }

    signedArea /= 2 // Actual signed area
    cx /= 6 * signedArea
    cy /= 6 * signedArea

    return new Point(cx, cy)
  }

  /**
   * Calculates the axis-aligned bounding box of this polygon.
   * @returns A new Rectangle representing the bounding box. Returns an empty Rectangle if there are no vertices.
   */
  public boundingBox(): Rectangle {
    if (this.vertices.length === 0) return new Rectangle()

    let minX = this.vertices[0].x
    let maxX = this.vertices[0].x
    let minY = this.vertices[0].y
    let maxY = this.vertices[0].y

    for (let i = 1; i < this.vertices.length; i++) {
      const v = this.vertices[i]
      minX = Math.min(minX, v.x)
      maxX = Math.max(maxX, v.x)
      minY = Math.min(minY, v.y)
      maxY = Math.max(maxY, v.y)
    }

    return new Rectangle(minX, minY, maxX - minX, maxY - minY)
  }

  /**
   * Checks if a point is inside this polygon using the ray casting algorithm (even-odd rule).
   * Assumes the polygon is simple (does not self-intersect).
   * For points on the boundary, the result can be inconsistent due to floating point precision;
   * use `containsOnEdge` for explicit edge checks.
   * @param point The point to check.
   * @returns True if the point is inside the polygon, false otherwise. Returns false for polygons with < 3 vertices.
   */
  public contains(point: Point): boolean {
    if (this.vertices.length < 3) return false

    let inside = false
    const n = this.vertices.length

    for (let i = 0, j = n - 1; i < n; j = i++) {
      const vi = this.vertices[i]
      const vj = this.vertices[j]

      // Check if the ray from the point intersects with the edge (vi, vj)
      const intersect =
        vi.y > point.y !== vj.y > point.y && // Point y is between edge's y-range
        point.x < ((vj.x - vi.x) * (point.y - vi.y)) / (vj.y - vi.y) + vi.x // Point x is to the left of the edge's x at point.y

      if (intersect) {
        inside = !inside
      }
    }

    return inside
  }

  /**
   * Checks if a point lies on any edge of the polygon within a given tolerance.
   * @param point The point to check.
   * @param tolerance The maximum distance allowed for the point to be considered on an edge. Defaults to 1e-10.
   * @returns True if the point is on an edge of the polygon within tolerance, false otherwise.
   */
  public containsOnEdge(point: Point, tolerance: number = 1e-10): boolean {
    return this.getEdges().some((edge) => edge.containsPoint(point, tolerance))
  }

  /**
   * Gets a list of Line segments representing the edges of the polygon.
   * If the polygon is closed (first and last vertex are the same), the edge connecting the last distinct vertex
   * to the first vertex is included.
   * @returns An array of Line objects. Returns an empty array if there are fewer than 2 vertices.
   */
  public getEdges(): Line[] {
    if (this.vertices.length < 2) return []

    const edges: Line[] = []
    const n = this.vertices.length
    // Iterate up to n-1 for open polygons, or n-1 if closed (to avoid duplicate edge if last vertex is same as first)
    const limit = this.isClosed() && n > 1 ? n - 1 : n

    for (let i = 0; i < limit; i++) {
      const p1 = this.vertices[i]
      const p2 = this.vertices[(i + 1) % n] // Ensures the last edge connects to the first for implicitly closed polygons
      edges.push(new Line(p1, p2))
    }
    // If it is explicitly closed (e.g. A, B, C, A), the loop from 0 to n-1 is correct.
    // e.g., n=4. (A,B), (B,C), (C,A).
    // If it is implicitly closed (e.g. A, B, C defined as vertices),
    // n=3. loop i=0,1,2. (v[0],v[1]), (v[1],v[2]), (v[2],v[0])
    return edges
  }

  /**
   * Checks if this polygon intersects with another polygon.
   * This is a basic implementation that checks for edge intersections and
   * if one polygon contains a vertex of the other. More robust algorithms (like Separating Axis Theorem)
   * might be needed for complex cases or better performance.
   * @param polygon The other polygon to check for intersection.
   * @returns True if the polygons intersect, false otherwise.
   */
  public intersects(polygon: Polygon): boolean {
    if (this.vertices.length === 0 || polygon.vertices.length === 0)
      return false

    const edges1 = this.getEdges()
    const edges2 = polygon.getEdges()

    // Check for edge intersections
    for (const edge1 of edges1) {
      for (const edge2 of edges2) {
        if (edge1.intersects(edge2)) {
          return true
        }
      }
    }

    // Check if one polygon is (partially or fully) inside the other
    // This is a simplified check. A more robust check would involve checking if any vertex
    // of one polygon is inside the other, and also if no edges intersect AND one is inside the other.
    // The current `contains` method is for point-in-polygon.
    // A simple initial check:
    if (this.vertices.length > 0 && polygon.contains(this.vertices[0]))
      return true
    if (polygon.vertices.length > 0 && this.contains(polygon.vertices[0]))
      return true

    // This doesn't cover all cases (e.g., one polygon completely containing another without edge intersections,
    // which should be caught by the contains check if a vertex is used. Or, two separate polygons).
    // A full SAT implementation would be more robust for general polygon intersection.

    return false
  }

  /**
   * Simplifies the polygon using a basic version of the Ramer-Douglas-Peucker algorithm.
   * Removes vertices whose perpendicular distance to the edge formed by its neighbors is less than the tolerance.
   * The first and last vertices are always kept.
   * Modifies this polygon and returns it for chaining.
   * @param tolerance The maximum distance for a point to be considered redundant. Defaults to 1e-10.
   * @returns This polygon after simplification.
   */
  public simplify(tolerance: number = 1e-10): Polygon {
    if (this.vertices.length <= 2) return this // Cannot simplify a line or point

    const simplified: Point[] = [this.vertices[0].clone()] // Always keep the first point

    // If the polygon is closed and the last point is a duplicate of the first,
    // we should temporarily remove it for the main simplification loop to avoid issues
    // with the prev-curr-next logic at the seam.
    let effectiveVertices = this.vertices
    let wasClosedDuplicate = false
    if (this.isClosed() && this.vertices.length > 1) {
      effectiveVertices = this.vertices.slice(0, -1)
      wasClosedDuplicate = true
    }

    for (let i = 1; i < effectiveVertices.length - 1; i++) {
      // Iterate up to second to last
      const prev = simplified[simplified.length - 1] // Last point added to simplified list
      const curr = effectiveVertices[i]
      const next = effectiveVertices[i + 1] // The point after current

      // If prev, curr, next are collinear, curr might be redundant.
      // We check distance from curr to line segment prev-next.
      const line = new Line(prev, next)
      const distance = line.distanceToPoint(curr)

      if (distance > tolerance) {
        simplified.push(curr.clone())
      }
    }

    // Always add the last distinct point of the original set
    if (effectiveVertices.length > 1) {
      // ensure there is a last point
      simplified.push(effectiveVertices[effectiveVertices.length - 1].clone())
    }

    // If it was closed by a duplicate point, re-close it if needed based on the new simplified shape
    if (
      wasClosedDuplicate &&
      simplified.length > 1 &&
      !simplified[0].equals(simplified[simplified.length - 1])
    ) {
      simplified.push(simplified[0].clone())
    }

    this.vertices = simplified
    return this
  }

  /**
   * Gets a clone of the vertex at the specified index.
   * @param index The index of the vertex.
   * @returns A clone of the Point at the index, or null if the index is out of bounds.
   */
  public getVertex(index: number): Point | null {
    if (index < 0 || index >= this.vertices.length) return null
    return this.vertices[index].clone()
  }

  /**
   * Sets the vertex at the specified index to a new point.
   * Modifies this polygon and returns it for chaining.
   * @param index The index of the vertex to set.
   * @param point The new Point for the vertex. The point is cloned.
   * @returns This polygon after setting the vertex.
   */
  public setVertex(index: number, point: Point): Polygon {
    if (index >= 0 && index < this.vertices.length) {
      this.vertices[index] = point.clone()
    }
    return this
  }

  /**
   * Creates a new Polygon instance with the same vertices as this polygon.
   * Vertices are cloned.
   * @returns A new Polygon instance (a clone).
   */
  public clone(): Polygon {
    return new Polygon(this.vertices) // Constructor already clones vertices
  }

  /**
   * Checks if this polygon is equal to another polygon within a given tolerance.
   * Equality is based on having the same number of vertices and all corresponding vertices being equal.
   * Vertex order matters.
   * @param polygon The polygon to compare with.
   * @param tolerance The maximum difference allowed for vertex coordinates to be considered equal. Defaults to 1e-10.
   * @returns True if the polygons are equal within tolerance, false otherwise.
   */
  public equals(polygon: Polygon, tolerance: number = 1e-10): boolean {
    if (this.vertices.length !== polygon.vertices.length) return false

    for (let i = 0; i < this.vertices.length; i++) {
      if (!this.vertices[i].equals(polygon.vertices[i], tolerance)) {
        return false
      }
    }
    return true
  }

  /**
   * Returns a string representation of this polygon.
   * @returns A string in the format "Polygon([(x1, y1), (x2, y2), ...])".
   */
  public toString(): string {
    const vertexStrings = this.vertices
      .map((v) => `(${v.x}, ${v.y})`)
      .join(', ')
    return `Polygon([${vertexStrings}])`
  }

  // Static methods

  /**
   * Creates a regular polygon (e.g., triangle, square, pentagon).
   * @param center The center point of the polygon.
   * @param radius The distance from the center to each vertex (circumradius).
   * @param sides The number of sides (must be 3 or more).
   * @returns A new Polygon instance representing the regular polygon.
   * @throws Error if sides is less than 3.
   */
  public static regular(center: Point, radius: number, sides: number): Polygon {
    if (sides < 3) throw new Error('Polygon must have at least 3 sides')

    const vertices: Point[] = []
    const angleStep = (2 * Math.PI) / sides

    for (let i = 0; i < sides; i++) {
      // Start from angle 0 (positive x-axis) or adjust if a specific orientation is needed
      const angle = i * angleStep
      const x = center.x + radius * Math.cos(angle)
      const y = center.y + radius * Math.sin(angle)
      vertices.push(new Point(x, y))
    }
    const poly = new Polygon(vertices)
    poly.close() // Ensure it's explicitly closed
    return poly
  }

  /**
   * Creates a rectangular polygon from x, y, width, and height.
   * Vertices are ordered counter-clockwise starting from (x,y).
   * @param x The x-coordinate of the top-left corner.
   * @param y The y-coordinate of the top-left corner.
   * @param width The width of the rectangle.
   * @param height The height of the rectangle.
   * @returns A new Polygon instance representing the rectangle.
   */
  public static rectangle(
    x: number,
    y: number,
    width: number,
    height: number,
  ): Polygon {
    const poly = new Polygon([
      new Point(x, y),
      new Point(x + width, y),
      new Point(x + width, y + height),
      new Point(x, y + height),
    ])
    poly.close()
    return poly
  }

  /**
   * Creates a polygon from a Rectangle object.
   * Vertices are ordered counter-clockwise starting from the rectangle's top-left.
   * @param rect The Rectangle object.
   * @returns A new Polygon instance representing the rectangle.
   */
  public static fromRectangle(rect: Rectangle): Polygon {
    const poly = Polygon.rectangle(rect.x, rect.y, rect.width, rect.height)
    // Polygon.rectangle already closes it.
    return poly
  }

  /**
   * Creates a triangular polygon from three points.
   * @param p1 The first vertex.
   * @param p2 The second vertex.
   * @param p3 The third vertex.
   * @returns A new Polygon instance representing the triangle.
   */
  public static triangle(p1: Point, p2: Point, p3: Point): Polygon {
    const poly = new Polygon([p1, p2, p3])
    poly.close()
    return poly
  }

  /**
   * Creates a polygon that approximates a circle.
   * @param circle The Circle object to approximate.
   * @param segments The number of line segments to use for the approximation. Must be 3 or more.
   * @returns A new Polygon instance approximating the circle.
   * @throws Error if segments is less than 3.
   */
  public static fromCircle(circle: Circle, segments: number = 32): Polygon {
    if (segments < 3) {
      throw new Error('Circle approximation must have at least 3 segments')
    }

    const vertices: Point[] = []
    const angleStep = (2 * Math.PI) / segments

    for (let i = 0; i < segments; i++) {
      const angle = i * angleStep
      vertices.push(circle.pointAt(angle))
    }
    const poly = new Polygon(vertices)
    poly.close()
    return poly
  }

  /**
   * Computes the convex hull of a set of points using the Monotone Chain algorithm.
   * @param points An array of Points.
   * @returns A new Polygon representing the convex hull. Returns a polygon with the original points if less than 3 points are provided.
   * The resulting polygon's vertices are ordered counter-clockwise.
   */
  public static convexHull(points: Point[]): Polygon {
    if (points.length < 3) return new Polygon(points) // Convex hull is the points themselves

    // Sort points lexicographically (primarily by x, then by y)
    // Clone points to avoid modifying the input array during sort
    const sortedPoints = points
      .map((p) => p.clone())
      .sort((a, b) => {
        if (a.x === b.x) {
          return a.y - b.y
        }
        return a.x - b.x
      })

    const upperHull: Point[] = []
    const lowerHull: Point[] = []

    // Helper function for cross product (orientation test)
    const crossProduct = (o: Point, a: Point, b: Point): number => {
      return (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x)
    }

    // Build lower hull
    for (const p of sortedPoints) {
      while (
        lowerHull.length >= 2 &&
        crossProduct(
          lowerHull[lowerHull.length - 2],
          lowerHull[lowerHull.length - 1],
          p,
        ) <= 0
      ) {
        lowerHull.pop()
      }
      lowerHull.push(p)
    }

    // Build upper hull (iterate in reverse)
    for (let i = sortedPoints.length - 1; i >= 0; i--) {
      const p = sortedPoints[i]
      while (
        upperHull.length >= 2 &&
        crossProduct(
          upperHull[upperHull.length - 2],
          upperHull[upperHull.length - 1],
          p,
        ) <= 0
      ) {
        upperHull.pop()
      }
      upperHull.push(p)
    }

    // Concatenate hulls
    // Remove last point of each hull because it's repeated at the start of the other hull (or it's the same start/end point)
    lowerHull.pop()
    upperHull.pop()

    const hullVertices = lowerHull.concat(upperHull)
    return new Polygon(hullVertices) // Constructor clones vertices
  }
}
