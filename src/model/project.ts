/**
 *
 * @export
 * @interface Project
 */
export interface Project {
  /**
   *
   * @type {string}
   * @memberof Project
   */
  _id?: string;
  /**
   *
   * @type {string}
   * @memberof Project
   */
  title: string;
  /**
   *
   * @type {string}
   * @memberof Project
   */
  description: string;
  /**
   *
   * @type {string}
   * @memberof Project
   */
  version: string;
  /**
   *
   * @type {string}
   * @memberof Project
   */
  link: string;
  /**
   *
   * @type {string}
   * @memberof Project
   */
  tag: string;
  /**
   *
   * @type {number}
   * @memberof Project
   */
  timestamp: number;
}
