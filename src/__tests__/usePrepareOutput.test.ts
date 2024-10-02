import usePrepareOutput from '@/hooks/usePrepareOutput';
import { TRequestMethod } from '@/interfaces/RequestMethod';
import type { ITextBody, IResponse } from '@/interfaces/Response';
import { renderHook } from '@testing-library/react';

const INDENT = 2;

describe('usePrepareOutput', () => {
  it('should return an object with the correct outputData shape', () => {
    const res = null;
    const get = TRequestMethod.GET;

    const { result } = renderHook(() => usePrepareOutput(res, get));

    expect(result.current.outputData).toEqual({ content: '', type: 'text', language: 'text' });
  });

  it('should return an object with the correct outputData if response.body is null', () => {
    const res: IResponse = {
      body: null,
      status: 200,
      statusText: 'OK',
      headers: {
        'content-type': 'text/plain',
      },
    };
    const get = TRequestMethod.GET;

    const { result } = renderHook(() => usePrepareOutput(res, get));

    expect(result.current.outputData).toEqual({ content: '', type: 'text', language: 'text' });
  });

  it('should return an object with the correct outputData if content is JSON', () => {
    const res: IResponse = {
      body: {
        data: 'test_data',
      },
      status: 200,
      statusText: 'OK',
      headers: {
        'content-type': 'application/json',
      },
    };
    const get = TRequestMethod.GET;

    const { result } = renderHook(() => usePrepareOutput(res, get));

    expect(result.current.outputData).toEqual({
      content: JSON.stringify(res.body, null, INDENT),
      type: 'text',
      language: 'json',
    });
  });

  it('should return an object with the correct outputData if content is HTML', () => {
    const res: IResponse = {
      body: {
        text: '<html></html>',
      },
      status: 200,
      statusText: 'OK',
      headers: {
        'content-type': 'text/html',
      },
    };
    const get = TRequestMethod.GET;

    const { result } = renderHook(() => usePrepareOutput(res, get));

    expect(result.current.outputData).toEqual({
      content: (res.body as ITextBody).text.trim(),
      type: 'text',
      language: 'html',
    });
  });

  it('should return an object with the correct outputData if content is CSS', () => {
    const res: IResponse = {
      body: {
        text: '.section { color: red; }',
      },
      status: 200,
      statusText: 'OK',
      headers: {
        'content-type': 'text/css',
      },
    };
    const get = TRequestMethod.GET;

    const { result } = renderHook(() => usePrepareOutput(res, get));

    expect(result.current.outputData).toEqual({
      content: (res.body as ITextBody).text.trim(),
      type: 'text',
      language: 'css',
    });
  });

  it('should return an object with the correct outputData if content is javascript', () => {
    const res: IResponse = {
      body: {
        text: 'console.log("test");',
      },
      status: 200,
      statusText: 'OK',
      headers: {
        'content-type': 'text/javascript',
      },
    };
    const get = TRequestMethod.GET;

    const { result } = renderHook(() => usePrepareOutput(res, get));

    expect(result.current.outputData).toEqual({
      content: (res.body as ITextBody).text.trim(),
      type: 'text',
      language: 'javascript',
    });
  });

  it('should return an object with the correct outputData if content is XML', () => {
    const res: IResponse = {
      body: {
        text: '<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema"></xs:schema>',
      },
      status: 200,
      statusText: 'OK',
      headers: {
        'content-type': 'text/xml',
      },
    };
    const get = TRequestMethod.GET;

    const { result } = renderHook(() => usePrepareOutput(res, get));

    expect(result.current.outputData).toEqual({
      content: (res.body as ITextBody).text.trim(),
      type: 'text',
      language: 'xml',
    });
  });

  it('should return an object with the correct outputData if content is text', () => {
    const res: IResponse = {
      body: {
        text: 'Hello!',
      },
      status: 200,
      statusText: 'OK',
      headers: {
        'content-type': 'text',
      },
    };
    const get = TRequestMethod.GET;

    const { result } = renderHook(() => usePrepareOutput(res, get));

    expect(result.current.outputData).toEqual({
      content: (res.body as ITextBody).text.trim(),
      type: 'text',
      language: 'text',
    });
  });

  it('should return an object with the correct imageData if content is image', () => {
    const res: IResponse = {
      body: {
        url: 'https://test.com/img.png',
        width: 60,
        height: 60,
      },
      status: 200,
      statusText: 'OK',
      headers: {
        'content-type': 'image/png',
      },
    };
    const get = TRequestMethod.GET;

    const { result } = renderHook(() => usePrepareOutput(res, get));

    expect(result.current.imageData).toEqual({ url: 'https://test.com/img.png', width: 60, height: 60 });
  });

  it('should return an object with the correct outputData if content is unpredictable', () => {
    const res: IResponse = {
      body: {
        data: 'Hello!',
      },
      status: 200,
      statusText: 'OK',
      headers: {
        'content-type': 'something',
      },
    };
    const get = TRequestMethod.GET;

    const { result } = renderHook(() => usePrepareOutput(res, get));

    expect(result.current.outputData).toEqual({ content: '', type: 'text', language: 'text' });
  });

  it('should return correct status string when method is HEAD', () => {
    const res: IResponse = {
      body: null,
      status: 200,
      statusText: 'OK',
      headers: {},
    };
    const get = TRequestMethod.HEAD;

    const { result } = renderHook(() => usePrepareOutput(res, get));

    expect(result.current.statusString).toEqual({ value: '200 OK', color: 'green' });
  });
});
