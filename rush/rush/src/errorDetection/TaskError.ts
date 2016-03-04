/**
 * @file TaskError.ts
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 *
 * Encapsulates information about an error
 */

import { ErrorDetectionMode } from '../errorDetection/ErrorDetector';

export default class TaskError {
  protected _type: string;
  protected _message: string;

  constructor(type: string, message: string) {
    this._type = type;
    this._message = message;
  }

  public toString(mode: ErrorDetectionMode) {
    const errorMessage = `[${this._type}] '${this._message}'`;
    return this._appendPrefix(errorMessage, mode);
  }

  protected _appendPrefix(errorMessage: string, mode: ErrorDetectionMode) {
    if (mode === ErrorDetectionMode.VisualStudioOnline) {
      return `##vso[task.logissue type=error;]${errorMessage}`;
    }
    return errorMessage;
  }
}

/**
 * TestTaskError extends TaskError
 */
export class BuildTaskError extends TaskError {
  protected _file: string;
  protected _line: number;
  protected _offset: number;

  constructor(type: string, message: string, file: string, line: number, offset: number) {
    super(type, message);
    this._file = file;
    this._line = line;
    this._offset = offset;
  }

  public toString(mode: ErrorDetectionMode) {
    const errorMessage = `${this._file}(${this._line}, ${this._offset}): [${this._type}] ${this._message}`;
    return this._appendPrefix(errorMessage, mode);
  }
}
