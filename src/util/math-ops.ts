/**
 * Provides the angle in radians on a mathematical x/y plane between two objects
 * @param origin The x/y coordinates of the first object
 * @param obj The x/y coordinates of the second object
 * @returns The angle (in radians) between the 2 objects
 */
export function easyAngle2PI(origin: { x: number, y: number }, obj: { x: number, y: number }): number {
    let dx = origin.x - obj.x;
    let dy = -origin.y - -obj.y;
    let angle = Math.atan2(dy, dx);
    return angle < 0 ? angle + (2 * Math.PI) : angle;
}

/**
 * Provides the angle in degrees on a mathematical x/y plane between two objects
 * @param origin The x/y coordinates of the first object
 * @param obj The x/y coordinates of the second object
 * @returns The angle (in degrees) between the 2 objects
 */
export function easyAngle360(origin: { x: number, y: number }, obj: { x: number, y: number }): number {
    return easyAngle2PI(origin, obj) * (180 / Math.PI);
}