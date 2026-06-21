const es = new EventSource('/stream');
es.onopen = () => console.log('SSE connected');
es.onmessage = (e) => { console.log('SSE message:', e.data); location.reload(); };
es.onerror = (e) => console.log('SSE error', e);
